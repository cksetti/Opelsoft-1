import { sendMail, isMailConfigured } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RECIPIENT = process.env.INTAKE_TO;

const esc = (s) => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const subject = (body.subject || '').toString().trim();
  const message = (body.message || '').toString().trim();
  if (!name || !email || !subject || !message) {
    return Response.json({ success: false, message: 'All fields are required.' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!isMailConfigured() || !RECIPIENT) {
    console.warn('Contact form submitted but email is not configured (MS_*/INTAKE_TO env vars missing).');
    return Response.json({ success: false, message: 'Email is temporarily unavailable. Please email us directly.' }, { status: 503 });
  }

  try {
    await sendMail({
      to: RECIPIENT,
      replyTo: email,
      subject: `Contact form - ${subject}`,
      text: `A message was submitted via the OpelSoft contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0f172a">
        <h2 style="margin:0 0 12px">New contact form message</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:600">${esc(name)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Email</td><td style="padding:6px 0;font-weight:600">${esc(email)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Subject</td><td style="padding:6px 0;font-weight:600">${esc(subject)}</td></tr>
        </table>
        <p style="margin:16px 0 0;white-space:pre-wrap">${esc(message)}</p>
      </div>`,
    });
  } catch (e) {
    console.error('Contact email failed:', e.message);
    return Response.json({ success: false, message: 'Sending failed. Please try again later.' }, { status: 502 });
  }

  return Response.json({ success: true });
}
