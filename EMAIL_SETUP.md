# Email Setup Guide - Beta Tech Labs

## Overview
The contact form now uses **EmailJS** to send real emails directly from your React app. No backend server needed!

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a **free account** (up to 200 emails/month)
3. Verify your email address

### Step 2: Create Email Service
1. Go to **Admin Dashboard → Email Services**
2. Click **"Add Service"**
3. Select **Gmail** (or your email provider)
4. Follow the steps to authorize your email:
   - For Gmail, you'll need to create an **App Password**:
     - Go to Google Account → Security
     - Enable 2-Step Verification if not enabled
     - Create an App Password for Gmail
     - Use this password in EmailJS
5. Name it: `gmail_service` (or whatever you prefer)
6. **Copy your Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Admin Dashboard → Email Templates**
2. Click **"Create New Template"**
3. Copy this template configuration:

**Template Name:** `contact_form_template`

**Email Template Content:**

**Subject:**
```
New Message from {{from_name}}
```

**HTML Content:**
```html
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
<p><strong>Subject:</strong> {{subject}}</p>
<hr>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><em>Reply directly to {{from_email}} or use the contact form on the website.</em></p>
```

4. **Copy your Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to **Account → API Keys**
2. Copy your **Public Key**

### Step 5: Add Environment Variables
1. Create or update `.env` file in your project root:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=gmail_service
VITE_EMAILJS_TEMPLATE_ID=contact_form_template
```

2. Restart your dev server: `npm run dev`

### Step 6: Test the Form
1. Go to your site's Contact section
2. Fill out the form
3. Click "Send Message"
4. Check your email for the message!

## How It Works

1. User fills out contact form on your website
2. They click "Send Message"
3. The form data is sent to **EmailJS servers**
4. **EmailJS** uses your **Gmail account** to send the email
5. Email arrives in your inbox
6. User sees success message

## Troubleshooting

### "Failed to send message"
- Check that `.env` variables are correct
- Verify Service ID and Template ID match your EmailJS account
- Make sure your Gmail App Password is correct
- Restart your dev server after changing `.env`

### Emails not arriving
- Check spam folder
- Verify the email address in Admin.jsx is correct (betatechlabs10@gmail.com)
- Test with the EmailJS demo email first

### Rate Limiting
- Free plan: 200 emails/month
- Premium plan: Unlimited emails
- Upgrade if needed

## Security Notes

- **Public Key is safe** - it's meant to be public
- **Email addresses are not exposed** - kept server-side
- **No sensitive data** stored in environment variables
- All emails encrypted in transit

## Next Steps

- Customize the email template design
- Add email notifications to admin (notify team members)
- Set up auto-reply emails to users
- Add file attachments to emails
- Set up contact tracking/analytics

---

**Need help?** Check EmailJS docs: https://www.emailjs.com/docs/
