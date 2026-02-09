# Firebase Studio

This is a Next.js starter project built with Firebase Studio.

To get started, check the main page at:
src/app/page.tsx

==================================================

# 1. Install Dependencies

Command:
npm install

==================================================

# 2. Setup Database MySQL

Create Database:

DROP DATABASE IF EXISTS website_kolam;

CREATE DATABASE website_kolam

  CHARACTER SET utf8mb4
  
  COLLATE utf8mb4_unicode_ci;

USE website_kolam;

CREATE TABLE users (

  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  name VARCHAR(150) NOT NULL,
  
  email VARCHAR(190) NOT NULL,
  
  phone VARCHAR(30) NULL,
  
  password_hash VARCHAR(255) NOT NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  
  UNIQUE KEY uq_users_email (email)
  
) ENGINE=InnoDB;

CREATE TABLE ticket_types (

  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  code VARCHAR(30) NOT NULL,
  
  name VARCHAR(150) NOT NULL,
  
  price INT UNSIGNED NOT NULL,

  description VARCHAR(255) NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  
  UNIQUE KEY uq_ticket_types_code (code)
  
) ENGINE=InnoDB;

CREATE TABLE orders (

  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  order_code VARCHAR(30) NOT NULL,
  
  user_id BIGINT UNSIGNED NULL,
  
  customer_name VARCHAR(150) NOT NULL,
  
  customer_email VARCHAR(190) NOT NULL,
  
  customer_phone VARCHAR(30) NOT NULL,
  
  visit_date DATE NOT NULL,
  
  status ENUM('PENDING','PAID','USED','CANCELLED','EXPIRED') NOT NULL DEFAULT 'PENDING',
  
  total_amount INT UNSIGNED NOT NULL DEFAULT 0,
  
  qr_token VARCHAR(80) NOT NULL,
  
  used_at DATETIME NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  
  UNIQUE KEY uq_orders_order_code (order_code),
  
  KEY idx_orders_user_id (user_id),
  
  CONSTRAINT fk_orders_user
  
  FOREIGN KEY (user_id) REFERENCES users(id)
    
  ON DELETE SET NULL
    
) ENGINE=InnoDB;


CREATE TABLE order_items (

  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  order_id BIGINT UNSIGNED NOT NULL,
  
  ticket_type_id BIGINT UNSIGNED NOT NULL,
  
  qty INT UNSIGNED NOT NULL DEFAULT 1,
  
  unit_price INT UNSIGNED NOT NULL,
  
  subtotal INT UNSIGNED NOT NULL,
  
  PRIMARY KEY (id),
  
  CONSTRAINT fk_order_items_order
  
  FOREIGN KEY (order_id) REFERENCES orders(id)
  ON DELETE CASCADE,
  
  CONSTRAINT fk_order_items_ticket_type
  
  FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
  ON DELETE RESTRICT
  
) ENGINE=InnoDB;

CREATE TABLE payments (

  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  order_id BIGINT UNSIGNED NOT NULL,
  
  method VARCHAR(50) NOT NULL,
  
  provider_ref VARCHAR(100) NULL,
  
  amount INT UNSIGNED NOT NULL,
  
  status ENUM('PENDING','PAID','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  
  paid_at DATETIME NULL,
  
  snap_token VARCHAR(100) NULL,

  redirect_url VARCHAR(255) NULL,
  
  midtrans_transaction_id VARCHAR(100) NULL,
  
  midtrans_status VARCHAR(50) NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  
  CONSTRAINT fk_payments_order
  
  FOREIGN KEY (order_id) REFERENCES orders(id)
  ON DELETE CASCADE
  
) ENGINE=InnoDB;


INSERT INTO ticket_types (code, name, price, description)
VALUES

  ('anak', 'Anak (di bawah 12 tahun)', 50000, 'Tiket anak'),
  
  ('dewasa', 'Dewasa', 75000, 'Tiket dewasa'),
  
  ('keluarga', 'Paket Keluarga (2 Dewasa, 2 Anak)', 220000, 'Paket keluarga');

==================================================

# 3. Create .env.local

MySQL

DB_HOST=127.0.0.1

DB_PORT=3306

DB_USER=root

DB_PASSWORD=

DB_NAME=website_kolam

Midtrans

MIDTRANS_SERVER_KEY=Mid-server-hVV3QtHNCRIlLSH12Y9UXQOh

MIDTRANS_CLIENT_KEY=Mid-client-jNq7o36t_Xc59LiX

MIDTRANS_IS_PRODUCTION=false

URL (kalau sudah hosting ganti domain)

APP_BASE_URL=http://localhost:9002

Kunci untuk fitur scan (buat petugas)

SCAN_API_KEY=RZ^*&^%^&%*8989854kkeE

==================================================


Project ready to run 🚀
