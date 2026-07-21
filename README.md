# OpelSoft Website

Marketing and recruiting site for [opelsoft.com](https://opelsoft.com), built with Next.js (App Router).

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values. `.env` is gitignored — never commit it.

| Variable | Purpose |
| --- | --- |
| `MS_TENANT_ID` / `MS_CLIENT_ID` / `MS_CLIENT_SECRET` | Entra app registration ("opelsoft-website") with the Microsoft Graph `Mail.Send` application permission. Used to send email for the contact and Find Jobs forms. |
| `MS_SENDER` | Mailbox the emails are sent from (alex.smith@opelsoft.com). |
| `INTAKE_TO` | Mailbox that receives form submissions. |
| `NEXT_PUBLIC_STAFFINGOS_ORIGIN` | Origin of the recruiting dashboard job listings widget. |

## Email

`src/lib/mailer.js` sends via the Microsoft Graph API (client-credentials flow) — no SMTP. If the app secret expires, create a new client secret in Entra (App registrations → opelsoft-website → Certificates & secrets) and update `MS_CLIENT_SECRET` locally and in the Hostinger environment.

- `/api/contact` — contact page form → emails `INTAKE_TO`
- `/api/intake` — Find Jobs form → stores in MySQL, emails `INTAKE_TO`, auto-replies to the candidate
