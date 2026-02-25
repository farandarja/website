import pool from "@/lib/db";
import { sendTicketEmailIfNeeded } from "@/lib/ticket-email";

// Endpoint DEV untuk simulasi pembayaran sukses.
// Aman: otomatis nonaktif di production + butuh secret.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const secret = process.env.PAYMENT_SIM_SECRET || "";
  if (!secret) {
    return Response.json({ error: "PAYMENT_SIM_SECRET belum di-set di .env.local" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const orderCode = String(body?.orderCode ?? "").trim();
  const provided = String(body?.secret ?? "").trim();

  if (!orderCode) return Response.json({ error: "orderCode wajib" }, { status: 400 });
  if (provided !== secret) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [prevRows] = await conn.query(
      `SELECT status FROM orders WHERE order_code = ? LIMIT 1`,
      [orderCode]
    );
    const prev = Array.isArray(prevRows) ? (prevRows[0] as any) : null;
    const prevStatus: string | null = prev?.status ?? null;

    await conn.execute(`UPDATE orders SET status = 'PAID' WHERE order_code = ?`, [orderCode]);

    await conn.execute(
      `
      UPDATE payments
      SET status = 'PAID',
          paid_at = NOW(),
          midtrans_status = 'SIMULATED',
          method = 'MIDTRANS_SNAP'
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
      [orderCode]
    );

    await conn.commit();

    if (prevStatus !== "PAID" && prevStatus !== "USED") {
      try {
        await sendTicketEmailIfNeeded(orderCode);
      } catch (e) {
        console.error("EMAIL SEND ERROR:", e);
      }
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    await conn.rollback();
    return Response.json({ error: "Simulasi gagal", message: e?.message ?? "unknown" }, { status: 500 });
  } finally {
    conn.release();
  }
}
