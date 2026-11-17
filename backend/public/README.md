# Namman dental Hospital Mail Service

A Node.js backend service for sending HTML emails via SMTP, with Swagger API documentation.

## Features
- Send emails with HTML body.
- Support for To, CC, BCC.
- Custom "From" name.
- Swagger API Documentation.

## Prerequisites
- Node.js installed.
- SMTP Credentials (cPanel/Email Server).

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Ensure the `.env` file is present in the root directory with the following variables:
   ```env
   PORT=5000
   SMTP_HOST=mail.sbgmdigital.com
   SMTP_PORT=465
   SMTP_USER=info@sbgmdigital.com
   SMTP_PASS=your_password
   DEFAULT_FROM_EMAIL=sbgmdigitalindiapvtltd@gmail.com
   ```

## Running the Application

Start the server:
```bash
npm start
```

Run in development mode (auto-restart):
```bash
npm run dev
```

## API Documentation

Once the server is running, access the Swagger UI at:
http://localhost:5000/api-docs

## API Wrapper

### Send Email
**POST** `/api/mail/send`

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Test Subject",
  "body": "<h1>Hello</h1><p>This is a test email.</p>",
  "fromName": "Notifications",
  "cc": "manager@example.com",
  "bcc": "audit@example.com"
}
```

- `to`, `subject`, and `body` are required.
- `fromName`, `cc`, `bcc` are optional.
