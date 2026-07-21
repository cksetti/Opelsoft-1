// Sends mail via Microsoft Graph using an Entra app registration
// (client-credentials flow with the Mail.Send application permission).
// Configured entirely via env so no secrets live in the repo; callers can
// check isMailConfigured() to degrade gracefully instead of throwing.
const SENDER = process.env.MS_SENDER;

let token; // { value, expiresAt } — cached until near expiry

export function isMailConfigured() {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;
  return !!(MS_TENANT_ID && MS_CLIENT_ID && MS_CLIENT_SECRET && SENDER);
}

async function getToken() {
  if (token && Date.now() < token.expiresAt) return token.value;
  const res = await fetch(`https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID,
      client_secret: process.env.MS_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Graph auth failed: ${data.error_description || res.status}`);
  token = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return token.value;
}

export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!isMailConfigured()) {
    throw new Error('Email is not configured (set MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER).');
  }
  const message = {
    subject,
    body: html ? { contentType: 'HTML', content: html } : { contentType: 'Text', content: text },
    toRecipients: [{ emailAddress: { address: to } }],
  };
  if (replyTo) message.replyTo = [{ emailAddress: { address: replyTo } }];

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(SENDER)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, saveToSentItems: true }),
  });
  if (!res.ok) throw new Error(`Graph sendMail failed: ${res.status} ${await res.text()}`);
}
