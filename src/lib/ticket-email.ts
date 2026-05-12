import pool from "@/lib/db";
import QRCode from "qrcode";
import { getFromAddress, getTransporter } from "@/lib/mailer";

function formatIDR(n: number) {
  return `Rp ${Number(n).toLocaleString("id-ID")}`;
}

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

/**
 * HTML email yang mobile-friendly (portrait) dengan layout TABLE
 * supaya tidak kepotong di Gmail mobile / app email lain.
 *
 * QR akan ditampilkan lewat CID: src="cid:ticket-qr"
 */
function ticketEmailHtml(data: {
  customerName: string;
  orderCode: string;
  visitDateLabel: string;
  ticketName: string;
  qty: number;
  total: string;
  websiteUrl: string;
}) {
  const qtyLabel = `${data.qty}x ${data.ticketName}`;

  return `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>E-Ticket</title>
    <style>
      @media only screen and (max-width: 520px) {
        .container { width: 100% !important; }
        .p-outer { padding: 14px !important; }
        .p-inner { padding: 16px !important; }
        .title { font-size: 18px !important; }
        .subtitle { font-size: 12px !important; }
        .qr { width: 220px !important; height: 220px !important; }
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background:#f6f7fb;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#f6f7fb;">
      <tr>
        <td align="center" class="p-outer" style="padding:24px;font-family:Arial,sans-serif;">
          <!-- Container -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" class="container"
            style="width:640px;max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e8ee;">

            <!-- Header -->
            <tr>
              <td style="padding:18px 22px;background:#0f172a;color:#ffffff;">
                <div class="title" style="font-size:18px;font-weight:700;line-height:1.3;">E-Ticket Kolam Renang</div>
                <div class="subtitle" style="opacity:.85;font-size:12px;margin-top:4px;line-height:1.4;">
                  Pembayaran berhasil • Order <b>#${data.orderCode}</b>
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="p-inner" style="padding:22px;">
                <p style="margin:0 0 10px;font-size:14px;color:#0f172a;">Halo <b>${data.customerName}</b>,</p>
                <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6;">
                  Terima kasih! Pembayaran tiket Anda sudah kami terima. Simpan email ini sebagai bukti pembelian.
                </p>

                <!-- Ticket Detail Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                  style="border:1px solid #e7e8ee;border-radius:12px;background:#ffffff;">
                  <tr>
                    <td style="padding:14px;">
                      <div style="font-size:12px;color:#64748b;margin-bottom:8px;">Detail Tiket</div>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:2px 0;font-size:13px;color:#64748b;">Tanggal kunjungan</td>
                          <td align="right" style="padding:2px 0;font-size:13px;color:#0f172a;"><b>${data.visitDateLabel}</b></td>
                        </tr>
                        <tr>
                          <td style="padding:2px 0;font-size:13px;color:#64748b;">Jenis tiket</td>
                          <td align="right" style="padding:2px 0;font-size:13px;color:#0f172a;"><b>${qtyLabel}</b></td>
                        </tr>
                        <tr>
                          <td style="padding:2px 0;font-size:13px;color:#64748b;">Total</td>
                          <td align="right" style="padding:2px 0;font-size:13px;color:#0f172a;"><b>${data.total}</b></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- QR Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                  style="margin-top:14px;border:1px solid #e7e8ee;border-radius:12px;background:#f8fafc;">
                  <tr>
                    <td align="center" style="padding:14px;">
                      <div style="font-size:12px;color:#64748b;margin-bottom:10px;">QR Masuk</div>

                      <img alt="QR Ticket" src="cid:ticket-qr" class="qr"
                        style="width:240px;height:240px;max-width:100%;display:block;margin:0 auto;border-radius:10px;" />

                      <div style="font-size:11px;color:#64748b;margin-top:10px;">
                        Tunjukkan QR ini ke petugas (bisa dari HP atau lampiran email).
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Instructions -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                  <tr>
                    <td style="border-top:1px solid #eef2ff;padding-top:14px;">
                      <div style="font-size:12px;color:#64748b;margin-bottom:6px;">Petunjuk</div>
                      <ul style="margin:0;padding-left:18px;color:#334155;font-size:13px;line-height:1.6;">
                        <li>Datang sesuai tanggal kunjungan yang dipilih.</li>
                        <li>QR hanya berlaku sekali (status berubah menjadi <b>USED</b> setelah discan).</li>
                      </ul>
                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                  <tr>
                    <td>
                      <a href="${data.websiteUrl}"
                        style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:700;">
                        Buka Detail Order
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:11px;color:#94a3b8;padding-top:10px;line-height:1.4;">
                      Jika tombol tidak berfungsi, salin tautan ini:<br/>
                      ${data.websiteUrl}
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e7e8ee;color:#64748b;font-size:11px;line-height:1.5;">
                Email ini dikirim otomatis. Jika Anda tidak merasa melakukan pembelian, abaikan email ini.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

/**
 * Kirim email e-ticket jika order sudah PAID/USED.
 * QR dikirim sebagai attachment PNG + ditampilkan inline via CID (Gmail friendly).
 */
export async function sendTicketEmailIfNeeded(orderCode: string) {
  const [rows] = await pool.query(
    `
    SELECT
      o.order_code,
      o.status,
      o.customer_name,
      o.customer_email,
      DATE_FORMAT(o.visit_date, '%Y-%m-%d') AS visit_date,
      o.total_amount,
      o.qr_token,
      tt.name AS ticket_name,
      oi.qty
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    JOIN ticket_types tt ON tt.id = oi.ticket_type_id
    WHERE o.order_code = ?
    LIMIT 1
    `,
    [orderCode]
  );

  const order = Array.isArray(rows) ? (rows[0] as any) : null;
  if (!order) return;

  const status = String(order.status);
  if (status !== "PAID" && status !== "USED") return;

  // Isi QR yang discan petugas
  const qrData = `KOLAM|${order.order_code}|${order.qr_token}`;

  // Buffer PNG (lebih kompatibel dari data URL di Gmail)
  const qrPng = await QRCode.toBuffer(qrData, { margin: 1, width: 260 });

  const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:9002";
  const orderUrl = `${appBaseUrl}/beli-tiket/konfirmasi?order=${encodeURIComponent(order.order_code)}`;

  const html = ticketEmailHtml({
    customerName: order.customer_name,
    orderCode: order.order_code,
    visitDateLabel: formatIDDate(order.visit_date),
    ticketName: order.ticket_name,
    qty: Number(order.qty ?? 1),
    total: formatIDR(Number(order.total_amount ?? 0)),
    websiteUrl: orderUrl,
  });

  const transporter = getTransporter();
  await transporter.sendMail({
    from: getFromAddress(),
    to: order.customer_email,
    subject: `E-Ticket Kolam Renang • #${order.order_code}`,
    html,
    attachments: [
      {
        filename: `QR-${order.order_code}.png`,
        content: qrPng,
        contentType: "image/png",
        cid: "ticket-qr", // harus sama dengan src="cid:ticket-qr"
      },
    ],
  });
}