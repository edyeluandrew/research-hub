import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ChevronUp,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
} from 'lucide-react';
import logo from '../assets/logo.png';
import { SITE, CONTACT, SOCIAL } from '../config/site';
import HashLink from './HashLink';

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'How We Work', href: '/#about' },
  { name: 'Our Focus', href: '/#our-focus' },
  { name: 'Our Values', href: '/#values' },
  { name: 'Team', href: '/#team' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/#contact' },
];

const FOCUS_AREAS = [
  'Research & Innovation',
  'Product Innovation',
  'Solution Engineering',
  'Talent Development',
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: MapPin,
      text: CONTACT.address.headline,
      sub: `${CONTACT.address.plusCode} · ${CONTACT.address.area}`,
      link: CONTACT.mapLinkUrl,
    },
    { icon: Mail, text: CONTACT.email, link: `mailto:${CONTACT.email}` },
    { icon: Phone, text: CONTACT.phone, link: `tel:${CONTACT.phoneTel}` },
    { icon: Clock, text: CONTACT.hours },
  ];

  const socialLinks = [
    { icon: Twitter, href: SOCIAL.x, label: 'X', tone: 'x' },
    { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn', tone: 'linkedin' },
    { icon: Github, href: SOCIAL.github, label: 'GitHub', tone: 'github' },
  ];

  const renderLink = (link) => {
    if (link.href.includes('#')) {
      return (
        <HashLink to={link.href} className="ft-link">
          {link.name}
        </HashLink>
      );
    }
    return (
      <Link to={link.href} className="ft-link">
        {link.name}
      </Link>
    );
  };

  return (
    <footer className="ft-footer">
      <div className="ft-topline" aria-hidden="true" />
      <div className="ft-pattern" aria-hidden="true" />

      <div className="ft-inner">
        <div className="ft-grid">
          <div className="ft-brand">
            <Link to="/" className="ft-brand-link">
              <img src={logo} alt={`${SITE.name} logo`} className="ft-logo" />
              <div>
                <p className="ft-brand-name">{SITE.name}</p>
                <p className="ft-brand-tag">{SITE.tagline}</p>
              </div>
            </Link>
            <p className="ft-brand-copy">
              {SITE.brandPromise}. Based in {SITE.location}.
            </p>
            <div className="ft-socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ft-social ft-social--${social.tone}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={19} color="#FFFFFF" strokeWidth={2.25} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="ft-col">
            <h4 className="ft-col-title">Quick Links</h4>
            <ul className="ft-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h4 className="ft-col-title">What We Do</h4>
            <ul className="ft-list">
              {FOCUS_AREAS.map((area) => (
                <li key={area}>
                  <HashLink to="/#our-focus" className="ft-link">
                    {area}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col ft-col--contact">
            <h4 className="ft-col-title">Contact</h4>
            <ul className="ft-contact-list">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="ft-contact-item">
                    <div className="ft-contact-icon-wrap">
                      <Icon size={17} strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0">
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="ft-link ft-link--contact"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="ft-contact-text">{item.text}</span>
                      )}
                      {item.sub && <span className="ft-contact-sub">{item.sub}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>

            <HashLink to="/#newsletter" className="ft-newsletter-btn">
              <Mail size={17} strokeWidth={2.25} />
              Subscribe to newsletter
              <ArrowRight size={16} className="ft-newsletter-arrow" />
            </HashLink>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p className="ft-copy">
            &copy; {currentYear} {SITE.legalName}. All rights reserved.
          </p>
          <div className="ft-legal">
            <Link to="/privacy" className="ft-legal-link">
              Privacy Policy
            </Link>
            <span className="ft-legal-sep" aria-hidden="true">·</span>
            <Link to="/terms" className="ft-legal-link">
              Terms of Service
            </Link>
            <span className="ft-legal-sep" aria-hidden="true">·</span>
            <Link to="/cookies" className="ft-legal-link">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="ft-top"
        aria-label="Back to top"
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;
