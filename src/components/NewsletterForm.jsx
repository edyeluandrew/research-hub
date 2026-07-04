import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { addNewsletterSubscriber } from '../data/dataStore';

// Reusable newsletter subscribe form. Saves the email to Firebase and syncs
// it to the email service (Brevo) via /api/subscribe. Used by the homepage
// Newsletter section and the Events page callout.
//
// Props:
//   layout: 'stacked' (input above button) | 'inline' (input beside button)
//   buttonLabel: text on the submit button
//   showPrivacyNote: whether to render the small privacy line
//   align: 'left' | 'center' (affects the note + message alignment)
const NewsletterForm = ({
  layout = 'stacked',
  buttonLabel = 'Subscribe',
  showPrivacyNote = true,
  align = 'left',
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    // Sync to the email service (Brevo). Non-blocking: the email is already
    // saved in Firebase, so we still show success even if this fails.
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
    } catch {
      /* ignore, subscriber is already stored */
    }

    setStatus('success');
    setMessage(
      result.reason === 'exists'
        ? "You're already on the list. Thank you!"
        : "You're in! Watch your inbox for updates."
    );
    setEmail('');
    setTimeout(() => setStatus(null), 6000);
  };

  const inline = layout === 'inline';
  const centered = align === 'center';

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={inline ? 'flex flex-col sm:flex-row gap-2' : 'space-y-3'}>
        <div className="relative flex-1">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/70"
            size={16}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === 'loading'}
            className="w-full pl-10 pr-3 py-3 text-sm bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-gold-500 text-white placeholder-gray-500 disabled:opacity-60 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`btn-primary flex items-center justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed ${
            inline ? 'sm:w-auto whitespace-nowrap' : 'w-full'
          }`}
        >
          {status === 'loading' ? (
            <>
              <Loader className="mr-2 animate-spin" size={16} />
              Subscribing...
            </>
          ) : (
            <>
              <Send className="mr-2" size={16} />
              {buttonLabel}
            </>
          )}
        </button>
      </div>

      {status === 'success' && (
        <div className="mt-3 rounded-lg border border-green-500/30 bg-green-500/10 p-3 flex items-start gap-2 text-left">
          <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-green-300/90 text-sm leading-snug">{message}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2 text-left">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-red-300/90 text-sm leading-snug">{message}</p>
        </div>
      )}

      {showPrivacyNote && (
        <p
          className={`text-xs text-gray-600 leading-snug mt-3 ${
            centered ? 'text-center' : ''
          }`}
        >
          We respect your privacy and never share your email.
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
