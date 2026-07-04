// Vercel serverless function.
// Sends a newsletter to every subscriber by creating and sending a Brevo
// email campaign to the configured contact list. Brevo automatically adds
// the required unsubscribe footer to campaigns.
//
// Required Vercel environment variables (NO "VITE_" prefix, server-side only):
//   NEWSLETTER_ADMIN_KEY - a secret passphrase; the admin must type it to send
//   BREVO_API_KEY        - your Brevo API v3 key
//   BREVO_LIST_ID        - the numeric ID of the Brevo contact list
//   BREVO_SENDER_EMAIL   - a verified sender email in your Brevo account
//   BREVO_SENDER_NAME    - (optional) display name, defaults to "Beta-Tech Labs"

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[c];
  });
}

function buildHtml({ title, message, ctaLabel, ctaUrl, senderName }) {
  const paragraphs = String(message)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(
      (line) =>
        `<p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.7;">${escapeHtml(line)}</p>`
    )
    .join('');

  const cta =
    ctaUrl && ctaLabel
      ? `<div style="margin:28px 0 8px;"><a href="${escapeHtml(
          ctaUrl
        )}" style="display:inline-block;background:#d4a017;color:#111827;text-decoration:none;font-weight:700;padding:13px 26px;border-radius:8px;font-size:15px;">${escapeHtml(
          ctaLabel
        )}</a></div>`
      : '';

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#111827;padding:22px 32px;">
                <span style="color:#d4a017;font-size:20px;font-weight:800;letter-spacing:0.5px;">${escapeHtml(
                  senderName
                )}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 18px;color:#111827;font-size:24px;line-height:1.3;">${escapeHtml(
                  title
                )}</h1>
                ${paragraphs}
                ${cta}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;line-height:1.6;">
                You are receiving this because you subscribed to updates from ${escapeHtml(
                  senderName
                )}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const { subject, title, message, ctaLabel, ctaUrl, passphrase } = body;

  const adminKey = process.env.NEWSLETTER_ADMIN_KEY;
  if (!adminKey) {
    return res
      .status(500)
      .json({ ok: false, error: 'Broadcast is not configured (missing NEWSLETTER_ADMIN_KEY).' });
  }
  if (!passphrase || passphrase !== adminKey) {
    return res.status(401).json({ ok: false, error: 'Invalid send passphrase.' });
  }

  if (!subject || !String(subject).trim() || !message || !String(message).trim()) {
    return res.status(400).json({ ok: false, error: 'Subject and message are required.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Beta-Tech Labs';

  if (!apiKey || !listId || !senderEmail) {
    return res.status(500).json({
      ok: false,
      error: 'Email service not configured (missing Brevo keys or sender email).',
    });
  }

  const htmlContent = buildHtml({
    title: (title && String(title).trim()) || String(subject).trim(),
    message: String(message),
    ctaLabel: ctaLabel && String(ctaLabel).trim(),
    ctaUrl: ctaUrl && String(ctaUrl).trim(),
    senderName,
  });

  try {
    const createRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        name: `Newsletter ${new Date().toISOString()}`,
        subject: String(subject).trim(),
        sender: { name: senderName, email: senderEmail },
        type: 'classic',
        htmlContent,
        recipients: { listIds: [Number(listId)] },
      }),
    });

    const createData = await createRes.json().catch(() => ({}));
    if (!createRes.ok || !createData || !createData.id) {
      return res
        .status(502)
        .json({ ok: false, error: (createData && createData.message) || 'Could not create campaign.' });
    }

    const sendRes = await fetch(
      `https://api.brevo.com/v3/emailCampaigns/${createData.id}/sendNow`,
      {
        method: 'POST',
        headers: { accept: 'application/json', 'api-key': apiKey },
      }
    );

    if (sendRes.status !== 204 && !sendRes.ok) {
      const sendData = await sendRes.json().catch(() => ({}));
      return res.status(502).json({
        ok: false,
        error: (sendData && sendData.message) || 'Campaign created but sending failed.',
      });
    }

    return res.status(200).json({ ok: true, message: 'Newsletter sent to all subscribers.' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Failed to send newsletter.' });
  }
};
