import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader, Mail, Send } from 'lucide-react';
import { addNewsletterSubscriber } from '../data/dataStore';

// Reusable newsletter subscribe form. Saves the email to Firebase and syncs it
// to the email service (Brevo) via /api/subscribe.
//
// Props:
//   layout: 'stacked' (input above button) | 'inline' (input beside button)
//   buttonLabel: text on the submit button
//   showPrivacyNote: whether to render the small privacy line
//   theme: 'light' (on a light surface) | 'dark' (on an ink surface)
const NewsletterForm = ({
  layout = 'stacked',
  buttonLabel = 'Subscribe',
  showPrivacyNote = true,
  theme = 'light',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    const result = await addNewsletterSubscriber(value);

    if (!result.ok) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    // Non-blocking: the address is already stored in Firebase, so a failed sync
    // should not surface as an error to the visitor.
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
    } catch {
      /* ignore */
    }

    setStatus('success');
    setMessage(
      result.reason === 'exists'
        ? "You're already on the list. Thank you."
        : "You're in. Watch your inbox for updates."
    );
    setEmail('');
    setTimeout(() => setStatus(null), 6000);
  };

  const inline = layout === 'inline';
  const buttonClass = theme === 'dark' ? 'btn btn--accent' : 'btn btn--primary';

  return (
    <form onSubmit={handleSubmit} className={className} noValidate={false}>
      <div
        style={
          inline
            ? { display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }
            : { display: 'flex', flexDirection: 'column', gap: '0.75rem' }
        }
      >
        <div className="control-icon" style={{ flex: '1 1 14rem', minWidth: 0 }}>
          <Mail size={17} />
          <input
            type="email"
            className="control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            required
            disabled={status === 'loading'}
          />
        </div>

        <button
          type="submit"
          className={`${buttonClass}${inline ? '' : ' btn--block'}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader size={16} className="animate-spin" />
              Subscribing
            </>
          ) : (
            <>
              <Send size={16} />
              {buttonLabel}
            </>
          )}
        </button>
      </div>

      {status === 'success' && (
        <div className="alert alert--success" style={{ marginTop: '0.75rem' }}>
          <CheckCircle size={16} />
          <p>{message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="alert alert--error" style={{ marginTop: '0.75rem' }}>
          <AlertCircle size={16} />
          <p>{message}</p>
        </div>
      )}

      {showPrivacyNote && (
        <p className="field-note" style={{ marginTop: '0.75rem' }}>
          No spam. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
