import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  User,
  ChevronDown,
  Send,
  Twitter,
  Linkedin,
  Github,
  MessageSquare,
  Youtube,
  CheckCircle,
  AlertCircle,
  Loader,
  ArrowUpRight,
} from 'lucide-react';
import { CONTACT, SOCIAL } from '../config/site';
import Reveal from './Reveal';

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    hint: 'Best for detailed proposals and documents',
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: 'Phone & WhatsApp',
    value: CONTACT.phone,
    hint: `${CONTACT.hours} · Weekend by appointment`,
    href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hello Beta-Tech Labs, I would like to discuss a project.')}`,
    featured: true,
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: CONTACT.address.headline,
    hint: `${CONTACT.address.plusCode} · ${CONTACT.address.landmark}`,
    href: CONTACT.mapLinkUrl,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 24 hours',
    hint: 'Business days · Urgent requests via WhatsApp',
  },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: SOCIAL.x, name: 'X', bg: '#020201' },
  { icon: Linkedin, href: SOCIAL.linkedin, name: 'LinkedIn', bg: '#0A66C2' },
  { icon: Github, href: SOCIAL.github, name: 'GitHub', bg: '#24292F' },
  { icon: MessageSquare, href: SOCIAL.discord, name: 'Discord', bg: '#5865F2' },
  { icon: Youtube, href: SOCIAL.youtube, name: 'YouTube', bg: '#FF0000' },
];

const SUBJECT_OPTIONS = [
  { value: 'research', label: 'Research Collaboration' },
  { value: 'product', label: 'Product Development' },
  { value: 'engineering', label: 'Solution Engineering' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'talent', label: 'Talent & Training Programs' },
  { value: 'other', label: 'General Inquiry' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          to_email: CONTACT.email,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setStatus('success');
      setStatusMessage('Thank you. We received your message and will respond within one business day.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
      setStatusMessage(`Something went wrong. Email us directly at ${CONTACT.email} or message us on WhatsApp.`);
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="ct-section">
      <div className="ct-glow" aria-hidden="true" />
      <div className="ct-dot-grid" aria-hidden="true" />

      <div className="ct-inner">
        <Reveal className="ct-header">
          <h2 className="ct-heading">Dream it. Build with us.</h2>
          <p className="ct-intro">
            Tell us about your research goals, product idea, or engineering challenge. We work with
            founders, institutions, and teams who need serious technology delivered with clarity.
          </p>
        </Reveal>

        <div className="ct-layout">
          <Reveal className="ct-form-col" delay={80}>
            <div className="ct-card ct-card--form">
              <div className="ct-card-head">
                <div>
                  <h3 className="ct-card-title">Send a message</h3>
                  <p className="ct-card-lead">
                    Share as much context as you can: scope, timeline, and what success looks like for you.
                  </p>
                </div>
                <span className="ct-response-pill">
                  <Clock size={14} />
                  Reply in 24h
                </span>
              </div>

              <form onSubmit={handleSubmit} className="ct-form">
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label htmlFor="name" className="ct-label">
                      Full name *
                    </label>
                    <div className="ct-input-wrap">
                      <User className="ct-input-icon" size={18} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="ct-input"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="email" className="ct-label">
                      Work email *
                    </label>
                    <div className="ct-input-wrap">
                      <Mail className="ct-input-icon" size={18} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="ct-input"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="ct-field">
                  <label htmlFor="subject" className="ct-label">
                    How can we help? *
                  </label>
                  <div className="ct-input-wrap">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="ct-input ct-select"
                    >
                      <option value="">Select a topic</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="ct-select-icon" size={18} />
                  </div>
                </div>

                <div className="ct-field">
                  <label htmlFor="message" className="ct-label">
                    Project details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="ct-input ct-textarea"
                    placeholder="Describe your challenge, goals, timeline, and any constraints we should know about..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`ct-submit ${isLoading ? 'ct-submit--loading' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={18} />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="ct-status ct-status--success">
                    <CheckCircle size={20} />
                    <div>
                      <p className="ct-status-title">Message sent</p>
                      <p className="ct-status-text">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="ct-status ct-status--error">
                    <AlertCircle size={20} />
                    <div>
                      <p className="ct-status-title">Could not send</p>
                      <p className="ct-status-text">{statusMessage}</p>
                    </div>
                  </div>
                )}

                <p className="ct-privacy">
                  By submitting, you agree to our privacy policy. We never share your information.
                </p>
              </form>
            </div>
          </Reveal>

          <Reveal className="ct-side" delay={160}>
            <div className="ct-card">
              <h3 className="ct-card-title">Direct contact</h3>
              <p className="ct-card-lead ct-card-lead--tight">
                Prefer a faster route? Reach us through any of these channels.
              </p>
              <ul className="ct-channels">
                {CONTACT_CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  const content = (
                    <>
                      <div className="ct-channel-icon">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="ct-channel-label">{channel.label}</p>
                        <p className="ct-channel-value">{channel.value}</p>
                        <p className="ct-channel-hint">{channel.hint}</p>
                      </div>
                      {channel.href && <ArrowUpRight className="ct-channel-arrow" size={16} />}
                    </>
                  );

                  return (
                    <li key={channel.label}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.href.startsWith('http') ? '_blank' : undefined}
                          rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`ct-channel${channel.featured ? ' ct-channel--featured' : ''}`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="ct-channel ct-channel--static">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="ct-card">
              <h3 className="ct-card-title">Connect online</h3>
              <p className="ct-card-lead ct-card-lead--tight">
                Follow the work, research, and community updates.
              </p>
              <div className="ct-socials">
                {SOCIAL_LINKS.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ct-social"
                      style={{ background: social.bg, color: '#FFFFFF', borderColor: social.bg }}
                      aria-label={social.name}
                      title={social.name}
                    >
                      <SocialIcon size={18} color="#FFFFFF" strokeWidth={2.25} />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="ct-card ct-map-card">
              <div className="ct-map-info">
                <div className="flex items-start gap-3">
                  <div className="ct-channel-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="ct-map-name">{CONTACT.address.businessName}</p>
                    <p className="ct-map-headline">{CONTACT.address.headline}</p>
                    <p className="ct-channel-hint">
                      {CONTACT.address.road} · {CONTACT.address.landmark}
                    </p>
                    <p className="ct-channel-hint">
                      {CONTACT.address.plusCode} · {CONTACT.address.area}
                    </p>
                    <p className="ct-channel-hint mt-1.5">{CONTACT.address.directions}</p>
                    <p className="ct-channel-hint mt-2">
                      Office:{' '}
                      <a href={`tel:${CONTACT.officePhoneTel}`} className="ct-link">
                        {CONTACT.officePhone}
                      </a>
                      {' · '}
                      {CONTACT.hours}
                    </p>
                  </div>
                </div>
              </div>
              <iframe
                title="Beta-Tech Labs Co. Limited on Google Maps, Kabale, Uganda"
                src={CONTACT.mapEmbedUrl}
                className="ct-map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="ct-map-footer">
                <a
                  href={CONTACT.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-map-link"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
