// Vercel serverless function.
// Adds a newsletter subscriber to a Brevo contact list.
// The email is ALSO stored in Firebase by the frontend, so this endpoint
// failing (or Brevo not being configured yet) never blocks a subscription.
//
// Required Vercel environment variables (NO "VITE_" prefix, server-side only):
//   BREVO_API_KEY   - your Brevo API v3 key
//   BREVO_LIST_ID   - the numeric ID of the Brevo contact list

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  // Not configured yet: the frontend already saved the email to Firebase,
  // so report success but flag that it was not synced to the email service.
  if (!apiKey || !listId) {
    return res.status(200).json({
      ok: true,
      synced: false,
      message: 'Saved. Email service is not configured yet.',
    });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (response.status === 201 || response.status === 204) {
      return res.status(200).json({ ok: true, synced: true });
    }

    const data = await response.json().catch(() => ({}));
    if (data && data.code === 'duplicate_parameter') {
      return res.status(200).json({ ok: true, synced: true, message: 'Already subscribed' });
    }

    return res.status(200).json({
      ok: true,
      synced: false,
      message: (data && data.message) || 'Saved, but email sync failed.',
    });
  } catch (error) {
    return res.status(200).json({
      ok: true,
      synced: false,
      message: 'Saved, but email sync failed.',
    });
  }
};
