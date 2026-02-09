import { z } from "zod";
import pool from "@/lib/db";

const ScanSchema = z.object({
  orderCode: z.string().min(3),
  qrToken: z.string().min(10),
});

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.SCAN_API_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = ScanSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validasi gagal", details: parsed.error.flatten() }, { status: 400 });
  }

  const { orderCode, qrToken } = parsed.data;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      `SELECT id, status, used_at, qr_token FROM orders WHERE order_code = ? LIMIT 1`,
      [orderCode]
    );
    const order = Array.isArray(rows) ? (rows[0] as any) : null;

    if (!order) {
      await conn.rollback();
      return Response.json({ ok: false, reason: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    if (order.qr_token !== qrToken) {
      await conn.rollback();
      return Response.json({ ok: false, reason: "INVALID_QR" }, { status: 400 });
    }

    if (order.status !== "PAID") {
      await conn.rollback();
      return Response.json({ ok: false, reason: "NOT_PAID", status: order.status }, { status: 400 });
    }

    if (order.used_at) {
      await conn.rollback();
      return Response.json({ ok: false, reason: "ALREADY_USED" }, { status: 400 });
    }

    await conn.execute(
      `UPDATE orders SET status='USED', used_at=NOW() WHERE id=?`,
      [order.id]
    );

    await conn.commit();
    return Response.json({ ok: true, message: "VALID - masuk diizinkan" });
  } catch (e: any) {
    await conn.rollback();
    return Response.json({ error: "Server error", message: e?.message ?? "unknown" }, { status: 500 });
  } finally {
    conn.release();
  }
}
