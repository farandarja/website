import { createHash } from "crypto";
import pool from "@/lib/db";
import { coreApi, serverKey } from "@/lib/midtrans";
import { sendTicketEmailIfNeeded } from "@/lib/ticket-email";

// Midtrans akan POST JSON ke endpoint ini
export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      transaction_id,
      payment_type,
    } = notification ?? {};

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return Response.json({ error: "Bad notification payload" }, { status: 400 });
    }

    // 1) Verify signature_key (wajib)
    // rumus resmi: SHA512(order_id+status_code+gross_amount+ServerKey)
    const raw = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const expected = createHash("sha512").update(raw).digest("hex");

    if (expected !== signature_key) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2) (Best practice) cek status ke Midtrans API biar lebih valid
    const status = await coreApi.transaction.status(order_id);

    const trxStatus = status.transaction_status; // settlement/capture/pending/deny/expire/cancel
    const fraud = status.fraud_status; // accept/challenge/deny
    const midtransPaymentType = status.payment_type;

    let newOrderStatus: "PENDING" | "PAID" | "CANCELLED" | "EXPIRED" = "PENDING";
    let newPaymentStatus: "PENDING" | "PAID" | "FAILED" = "PENDING";

    const isPaid =
      trxStatus === "settlement" ||
      (trxStatus === "capture" && (fraud === "accept" || fraud == null));

    if (isPaid) {
      newOrderStatus = "PAID";
      newPaymentStatus = "PAID";
    } else if (trxStatus === "expire") {
      newOrderStatus = "EXPIRED";
      newPaymentStatus = "FAILED";
    } else if (trxStatus === "cancel" || trxStatus === "deny") {
      newOrderStatus = "CANCELLED";
      newPaymentStatus = "FAILED";
    } else {
      newOrderStatus = "PENDING";
      newPaymentStatus = "PENDING";
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      
      // Ambil status sebelumnya (buat mencegah email terkirim berkali-kali)
      const [prevRows] = await conn.query(
        `SELECT status FROM orders WHERE order_code = ? LIMIT 1`,
        [order_id]
      );
      const prev = Array.isArray(prevRows) ? (prevRows[0] as any) : null;
      const prevStatus: string | null = prev?.status ?? null;

// update orders
      await conn.execute(`UPDATE orders SET status = ? WHERE order_code = ?`, [
        newOrderStatus,
        order_id,
      ]);

      // update payments (ambil payment terbaru utk order ini) - versi aman tanpa JOIN+ORDER BY+LIMIT
      await conn.execute(
        `
        UPDATE payments
        SET status = ?,
            paid_at = IF(? = 'PAID', NOW(), paid_at),
            midtrans_transaction_id = ?,
            midtrans_status = ?,
            method = 'MIDTRANS_SNAP',
            provider_ref = ?
        WHERE id = (
          SELECT id FROM (
            SELECT p.id
            FROM payments p
            JOIN orders o ON o.id = p.order_id
            WHERE o.order_code = ?
            ORDER BY p.id DESC
            LIMIT 1
          ) t
        )
        `,
        [
          newPaymentStatus,
          newPaymentStatus,
          status.transaction_id ?? transaction_id ?? null,
          trxStatus ?? transaction_status ?? null,
          midtransPaymentType ?? payment_type ?? null,
          order_id,
        ]
      );

      await conn.commit();
    

      // Kirim email hanya saat transisi ke PAID (jangan bikin Midtrans retry kalau email gagal)
      if (newOrderStatus === "PAID" && prevStatus !== "PAID" && prevStatus !== "USED") {
        try {
          await sendTicketEmailIfNeeded(order_id);
        } catch (e) {
          console.error("EMAIL SEND ERROR:", e);
        }
      }
} catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    return Response.json(
      { error: "Server error", message: err?.message ?? "unknown" },
      { status: 500 }
    );
  }
}