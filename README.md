# Firebase Studio

This is a Next.js starter project built with Firebase Studio.

To get started, check the main page at:
src/app/page.tsx

==================================================

# 1. Install Dependencies

Command:
npm install

==================================================

# 2. Create .env.local

########################################
# MySQL
########################################
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=website_kolam


########################################
# Midtrans (Sandbox / Testing)
########################################
MIDTRANS_SERVER_KEY=Mid-server-hVV3QtHNCRIlLSH12Y9UXQOh
MIDTRANS_CLIENT_KEY=Mid-client-jNq7o36t_Xc59LiX
MIDTRANS_IS_PRODUCTION=false


########################################
# Base URL (localhost)
########################################
APP_BASE_URL=http://localhost:9002


########################################
# Scan Gate API (Petugas)
########################################
SCAN_API_KEY=RZ^*&^%^&%*8989854kkeE


########################################
# Email SMTP (WAJIB untuk kirim e-ticket)
########################################

# Contoh pakai Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true

# Email pengirim (SERVER)
SMTP_USER=skwp33@gmail.com
SMTP_PASS=htatqjubxhvftvhf

MAIL_FROM_NAME=Kolam Renang
MAIL_FROM_EMAIL=skwp33@gmail.com


########################################
# Simulasi Pembayaran (DEV ONLY)
########################################
NEXT_PUBLIC_ENABLE_PAYMENT_SIM=true
PAYMENT_SIM_SECRET=12345

==================================================


Project ready to run 🚀
