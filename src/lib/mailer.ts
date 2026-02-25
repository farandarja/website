import nodemailer from "nodemailer";

export type MailerConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
};

function getMailerConfig(): MailerConfig {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = String(process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER ?? "";
  const pass = process.env.SMTP_PASS ?? "";
  const fromName = process.env.MAIL_FROM_NAME ?? "Kolam Renang";
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? user;

  if (!user || !pass) {
    throw new Error("SMTP belum dikonfigurasi. Isi SMTP_USER dan SMTP_PASS di .env.local");
  }

  return { host, port, secure, user, pass, fromName, fromEmail };
}

export function getTransporter() {
  const cfg = getMailerConfig();
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
}

export function getFromAddress() {
  const cfg = getMailerConfig();
  return `${cfg.fromName} <${cfg.fromEmail}>`;
}
