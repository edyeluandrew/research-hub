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
import { CONTACT, SOCIAL, SITE } from '../config/site';
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
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: CONTACT.address.headline,
    hint: `${CONTACT.address.landmark} · ${CONTACT.address.area}`,
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
  { icon: Twitter, href: SOCIAL.x, name: 'X' },
  { icon: Linkedin, href: SOCIAL.linkedin, name: 'LinkedIn' },
  { icon: Github, href: SOCIAL.github, name: 'GitHub' },
  { icon: MessageSquare, href: SOCIAL.discord, name: 'Discord' },
  { icon: Youtube, href: SOCIAL.youtube, name: 'YouTube' },
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
    <section id="contact" className="py-8 md:py-10 bg-dark-100 relative overflow-hidden border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-6 md:mb-8 group">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1.5 section-eyebrow">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading mb-3 leading-tight">
            Dream it.{' '}
            <span className="text-gold-500 accent-word">Build with us.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-snug">
            Tell us about your research goals, product idea, or engineering challenge. We work with
            founders, institutions, and teams who need serious technology delivered with clarity.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-4 md:gap-5 items-start">
          {/* Contact form, primary column */}
          <Reveal className="lg:col-span-7" delay={80}>
          <div className="interactive-card rounded-xl p-4 md:p-6 h-full">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-1">Send a message</h3>
              <p className="text-sm text-gray-500 leading-snug">
                Share as much context as you can, scope, timeline, and what success looks like for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/70" size={16} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input pl-10 py-3"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Work email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/70" size={16} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input pl-10 py-3"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  How can we help? *
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input appearance-none bg-dark-100 py-3 cursor-pointer"
                  >
                    <option value="" className="bg-dark-100 text-gray-400">
                      Select a topic
                    </option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-dark-100 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-500/70 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Project details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-input resize-none py-3 leading-snug"
                  placeholder="Describe your challenge, goals, timeline, and any constraints we should know about..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn-primary w-full flex items-center justify-center py-3 ${
                  isLoading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={16} />
                    Send message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 flex items-start gap-2">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-green-400 text-sm font-semibold leading-snug">Message sent</p>
                    <p className="text-green-300/90 text-xs leading-snug">{statusMessage}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2">
                  <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-red-400 text-sm font-semibold leading-snug">Could not send</p>
                    <p className="text-red-300/90 text-xs leading-snug">{statusMessage}</p>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center leading-snug">
                By submitting, you agree to our privacy policy. We never share your information.
              </p>
            </form>
          </div>
          </Reveal>

          {/* Contact channels, sidebar */}
          <Reveal className="lg:col-span-5 space-y-3 md:space-y-4" delay={160}>
            <div className="interactive-card rounded-xl p-4 md:p-5">
              <h3 className="text-base font-bold text-white mb-3">Direct contact</h3>
              <ul className="space-y-3">
                {CONTACT_CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  const content = (
                    <>
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gold-500" size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 leading-snug">
                          {channel.label}
                        </p>
                        <p className="text-sm font-semibold text-white leading-snug break-all">
                          {channel.value}
                        </p>
                        <p className="text-xs text-gray-500 leading-snug">{channel.hint}</p>
                      </div>
                      {channel.href && (
                        <ArrowUpRight className="text-gold-500/50 flex-shrink-0" size={14} />
                      )}
                    </>
                  );

                  return (
                    <li key={channel.label}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          target={channel.href.startsWith('http') ? '_blank' : undefined}
                          rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:translate-x-0.5"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 p-2 -mx-2">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="interactive-card rounded-xl p-4 md:p-5">
              <h3 className="text-base font-bold text-white mb-3">Connect online</h3>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-gray-700 bg-dark-100 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                      aria-label={social.name}
                    >
                      <SocialIcon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="interactive-card rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-800">
                <div className="flex items-start gap-2">
                  <MapPin className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {CONTACT.address.headline}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">
                      {CONTACT.address.road} · {CONTACT.address.landmark}
                    </p>
                    <p className="text-xs text-gray-400 leading-snug mt-1.5">
                      {CONTACT.address.directions}
                    </p>
                  </div>
                </div>
              </div>
              <iframe
                title="Beta-Tech Labs near Kabale Central Police Station, Uganda"
                src={CONTACT.mapEmbedUrl}
                className="w-full h-44 md:h-48 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-4 py-2.5 border-t border-gray-800">
                <a
                  href={CONTACT.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
                >
                  Open in Google Maps →
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
