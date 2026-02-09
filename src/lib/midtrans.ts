import midtransClient from "midtrans-client";

const serverKey = process.env.MIDTRANS_SERVER_KEY!;
const clientKey = process.env.MIDTRANS_CLIENT_KEY!;
const isProduction = String(process.env.MIDTRANS_IS_PRODUCTION).toLowerCase() === "true";

if (!serverKey || !clientKey) {
  throw new Error("MIDTRANS_SERVER_KEY / MIDTRANS_CLIENT_KEY belum di-set di .env.local");
}

export const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

export const coreApi = new midtransClient.CoreApi({
  isProduction,
  serverKey,
  clientKey,
});

export { serverKey };
