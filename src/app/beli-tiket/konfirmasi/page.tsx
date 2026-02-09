import pool from "@/lib/db";
import QRCode from "qrcode";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

function formatIDDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function KonfirmasiPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const orderCode = searchParams.order?.trim();
  if (!orderCode) {
    return (
      <div className="container mx-auto max-w-2xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold">Order tidak ditemukan</h1>
      </div>
    );
  }

  const [rows] = await pool.query(
    `
    SELECT
      o.id,
      o.order_code,
      o.status,
      o.customer_name,
      DATE_FORMAT(o.visit_date, '%Y-%m-%d') AS visit_date,
      o.total_amount,
      o.qr_token,
      o.used_at,
      tt.name AS ticket_name,
      oi.qty,
      p.redirect_url,
      p.status AS payment_status
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN ticket_types tt ON tt.id = oi.ticket_type_id
    LEFT JOIN payments p ON p.order_id = o.id
    WHERE o.order_code = ?
    ORDER BY p.id DESC
    LIMIT 1
    `,
    [orderCode]
  );

  const order = Array.isArray(rows) ? (rows[0] as any) : null;
  if (!order) {
    return (
      <div className="container mx-auto max-w-2xl py-16 px-4 text-center">
        <h1 className="text-3xl font-bold">Order tidak ditemukan</h1>
        <p>Kode: {orderCode}</p>
      </div>
    );
  }

  const visitDateLabel = formatIDDate(order.visit_date);
  const qtyLabel = `${order.qty}x ${order.ticket_name}`;
  const totalLabel = `Rp ${Number(order.total_amount).toLocaleString("id-ID")}`;

  const isPaid = order.status === "PAID" || order.status === "USED";
  const isUsed = order.status === "USED";

  const qrData = isPaid ? `KOLAM|${order.order_code}|${order.qr_token}` : "";
  const qrDataUrl = isPaid ? await QRCode.toDataURL(qrData, { margin: 1, width: 220 }) : null;

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-2xl py-16 lg:py-24 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isPaid ? "Tiket Anda Siap!" : "Menunggu Pembayaran"}
        </h1>
        <p className="text-muted-foreground mb-8">
          Order ID: <b>#{order.order_code}</b>
        </p>

        <Card className="text-left shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>E-Ticket Kolam Renang</span>
              <span className="text-sm font-medium text-primary">{order.status}</span>
            </CardTitle>
            <CardDescription>
              {isPaid ? "Tunjukkan QR ini di pintu masuk." : "Silakan selesaikan pembayaran di Midtrans."}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p className="font-semibold">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Kunjungan</p>
                <p className="font-semibold">{visitDateLabel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jenis Tiket</p>
                <p className="font-semibold">{qtyLabel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-semibold">{totalLabel}</p>
              </div>
              {isUsed && (
                <div>
                  <p className="text-sm text-muted-foreground">Status Masuk</p>
                  <p className="font-semibold">SUDAH DIPAKAI</p>
                </div>
              )}
            </div>

            <div className="md:col-span-1 flex flex-col items-center justify-center bg-secondary p-4 rounded-lg">
              {isPaid && qrDataUrl ? (
                <>
                  <img src={qrDataUrl} alt="QR Ticket" />
                  <p className="text-xs text-muted-foreground mt-2">Scan di Pintu Masuk</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-center">Belum ada QR</p>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    QR akan muncul setelah pembayaran sukses.
                  </p>
                </>
              )}
            </div>
          </CardContent>

          <Separator className="my-4" />

          <CardFooter className="flex justify-end gap-2">
            {!isPaid && order.redirect_url && (
              <a href={order.redirect_url}>
                <Button>Bayar Sekarang</Button>
              </a>
            )}
            <Button disabled>Unduh E-Ticket (opsional)</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
