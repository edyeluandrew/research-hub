import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Github,
  Linkedin,
  Loader,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import { CONTACT, SOCIAL } from '../config/site';
import Reveal from './Reveal';

const CHANNELS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    hint: 'Best for detailed proposals',
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: 'Phone & WhatsApp',
    value: CONTACT.phone,
    hint: CONTACT.hours,
    href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      'Hello Beta-Tech Labs, I would like to discuss a project.'
    )}`,
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: CONTACT.address.headline,
    hint: CONTACT.address.landmark,
    href: CONTACT.mapLinkUrl,
  },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: SOCIAL.x, name: 'X' },
  { icon: Linkedin, href: SOCIAL.linkedin, name: 'LinkedIn' },
  { icon: Github, href: SOCIAL.github, name: 'GitHub' },
  { icon: MessageSquare, href: SOCIAL.discord, name: 'Discord' },
  { icon: Youtube, href: SOCIAL.youtube, name: 'YouTube' },
];

const SUBJECTS = [
  { value: 'research', label: 'Research collaboration' },
  { value: 'product', label: 'Product development' },
  { value: 'engineering', label: 'Solution engineering' },
  { value: 'partnership', label: 'Partnership inquiry' },
  { value: 'talent', label: 'Talent & training' },
  { value: 'other', label: 'General inquiry' },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setStatusMessage('Message received. We reply within one business day.');
      setFormData(EMPTY_FORM);
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
      setStatusMessage(`Something went wrong. Email us directly at ${CONTACT.email}.`);
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section section--muted">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              Dream it. Build with us.
            </h2>
          </div>
          <div>
            <p className="lead">
              Tell us about your research goal, product idea, or engineering challenge.
            </p>
            <p className="ct-response" style={{ marginTop: '1.25rem' }}>
              Replies within 24 hours on business days
            </p>
          </div>
        </Reveal>

        <div className="ct-layout">
          <Reveal delay={80}>
            <div className="ct-form-card">
              <h3 className="title">Send a message</h3>

              <form onSubmit={handleSubmit} className="ct-form">
                <div className="ct-form-row">
                  <div className="field">
                    <label className="field-label" htmlFor="contact-name">
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="contact-email">
                      Work email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-subject">
                    How can we help?
                  </label>
                  <div className="control-icon control-icon--end">
                    <ChevronDown size={17} />
                    <select
                      id="contact-subject"
                      name="subject"
                      className="control"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic</option>
                      {SUBJECTS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-message">
                    Project details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="control"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your challenge, goals, and timeline..."
                    required
                  />
                </div>

                {status === 'success' && (
                  <div className="alert alert--success">
                    <CheckCircle size={17} />
                    <p>{statusMessage}</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="alert alert--error">
                    <AlertCircle size={17} />
                    <p>{statusMessage}</p>
                  </div>
                )}

                <button type="submit" className="btn btn--primary btn--block" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader size={17} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={17} />
                    </>
                  )}
                </button>

                <p className="field-note">
                  By submitting you agree to our privacy policy. We never share your information.
                </p>
              </form>
            </div>
          </Reveal>

          <Reveal delay={160} className="ct-side">
            <ul className="ct-channels">
              {CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const external = channel.href.startsWith('http');

                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="ct-channel"
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      <span className="ct-channel-icon" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <span className="ct-channel-body">
                        <span className="ct-channel-label">{channel.label}</span>
                        <span className="ct-channel-value">{channel.value}</span>
                        <span className="ct-channel-hint">{channel.hint}</span>
                      </span>
                      <ArrowUpRight className="ct-channel-arrow" size={16} />
                    </a>
                  </li>
                );
              })}

              <li>
                <div className="ct-channel">
                  <span className="ct-channel-icon" aria-hidden="true">
                    <Clock size={17} strokeWidth={1.9} />
                  </span>
                  <span className="ct-channel-body">
                    <span className="ct-channel-label">Office hours</span>
                    <span className="ct-channel-value">{CONTACT.hours}</span>
                    <span className="ct-channel-hint">
                      Office: {CONTACT.officePhone}
                    </span>
                  </span>
                </div>
              </li>
            </ul>

            <div className="ct-socials">
              {SOCIAL_LINKS.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-social"
                  aria-label={name}
                  title={name}
                >
                  <Icon size={17} strokeWidth={1.9} />
                </a>
              ))}
            </div>

            <div className="ct-map">
              <div className="ct-map-frame">
                <iframe
                  title="Beta-Tech Labs Co. Limited on Google Maps, Kabale, Uganda"
                  src={CONTACT.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="ct-map-footer">
                <div style={{ minWidth: 0 }}>
                  <p className="ct-map-name">{CONTACT.address.businessName}</p>
                  <p className="ct-map-address">
                    {CONTACT.address.plusCode} · {CONTACT.address.area}
                  </p>
                </div>
                <a
                  href={CONTACT.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text"
                >
                  Directions
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
