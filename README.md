# Le Foin® Wallet Platform

Digital Asset Infrastructure for the Le Foin Ecosystem.

## Overview

Le Foin Identity Platform is the centralized authentication service powering the entire Le Foin ecosystem. It provides secure user registration, login, identity verification, and future Single Sign-On (SSO) capabilities for all Le Foin applications.

This project serves as the foundation for:

* 🌾 Le Foin Catalog
* 🌾 Le Foin Tarot
* 🌾 Le Foin Wallet
* 🌾 Future Le Foin services

---

## Current Features

* ✅ User Registration API
* ✅ User Login API
* ✅ JWT Authentication
* ✅ Password Hashing
* ✅ PostgreSQL Database
* ✅ Prisma ORM
* ✅ Protected `/api/me` Endpoint
* ✅ Production Deployment
* ✅ HTTPS Enabled
* ✅ PM2 Process Management
* ✅ Nginx Reverse Proxy

---

## Technology Stack

* Next.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* PM2
* Nginx

---

## API Endpoints

### Register

```
POST /api/register
```

Create a new user account.

---

### Login

```
POST /api/login
```

Authenticate a user and generate a JWT session.

---

### Current User

```
GET /api/me
```

Return the authenticated user's information.

---

## Architecture

```
Internet
        │
        ▼
Cloudflare
        │
        ▼
Nginx
        │
        ▼
PM2
        │
        ▼
Le Foin Identity Platform
        │
        ▼
PostgreSQL
```

---

## Ecosystem

```
                Le Foin®

                     │

         ┌───────────┼───────────┐

         │           │           │

      Catalog      Tarot      Wallet

         │           │           │

         └───────────┼───────────┘

                     │

          Identity Platform
```

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Deployment

Typical deployment workflow:

```bash
git add .
git commit -m "your message"
git push
```

On the production server:

```bash
cd /var/www/auth

git pull

npm run build

pm2 restart auth
```

---

## Vision

Le Foin Identity Platform is designed as a long-term authentication infrastructure rather than a standalone application. It aims to provide a unified identity layer for scientific, educational, and digital products developed under the Le Foin ecosystem.

---

© 2026 Le Foin®

Building scientific digital infrastructure.
