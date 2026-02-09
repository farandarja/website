import { createHash } from "crypto";
import pool from "@/lib/db";
import { coreApi, serverKey } from "@/lib/midtrans";

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
    // rumus resmi: SHA512(order_id+status_code+gross_amount+ServerKey) :contentReference[oaicite:1]{index=1}
    const raw = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const expected = createHash("sha512").update(raw).digest("hex");

    if (expected !== signature_key) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2) (Best practice) cek status ke Midtrans API biar lebih valid
    const status = await coreApi.transaction.status(order_id);

    // Mapping status Midtrans -> status order kita
    const trxStatus = status.transaction_status; // settlement/capture/pending/deny/expire/cancel
    const fraud = status.fraud_status; // accept/challenge/deny (untuk kartu)
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

      // update orders
      await conn.execute(
        `UPDATE orders SET status = ? WHERE order_code = ?`,
        [newOrderStatus, order_id]
      );

      // update payments (ambil payment row terakhir utk order ini)
      await conn.execute(
        `
        UPDATE payments p
        JOIN orders o ON o.id = p.order_id
        SET p.status = ?,
            p.paid_at = IF(? = 'PAID', NOW(), p.paid_at),
            p.midtrans_transaction_id = ?,
            p.midtrans_status = ?,
            p.method = 'MIDTRANS_SNAP',
            p.provider_ref = ?
        WHERE o.order_code = ?
        ORDER BY p.id DESC
        LIMIT 1
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
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    // Midtrans butuh response 200 supaya tidak retry terus
    return Response.json({ ok: true });
  } catch (err: any) {
    return Response.json({ error: "Server error", message: err?.message ?? "unknown" }, { status: 500 });
  }
}
