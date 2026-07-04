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
      sub: CONTACT.address.area,
      link: CONTACT.mapLinkUrl,
    },
    { icon: Mail, text: CONTACT.email, link: `mailto:${CONTACT.email}` },
    { icon: Phone, text: CONTACT.phone, link: `tel:${CONTACT.phoneTel}` },
    { icon: Clock, text: CONTACT.hours },
  ];

  const socialLinks = [
    { icon: Twitter, href: SOCIAL.x, label: 'X' },
    { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
    { icon: Github, href: SOCIAL.github, label: 'GitHub' },
  ];

  const renderLink = (link) => {
    const className = 'text-sm text-gray-400 hover:text-gold-500 transition-colors leading-snug';
    if (link.href.includes('#')) {
      return (
        <HashLink to={link.href} className={className}>
          {link.name}
        </HashLink>
      );
    }
    return (
      <Link to={link.href} className={className}>
        {link.name}
      </Link>
    );
  };

  return (
    <footer className="bg-dark-200 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt={`${SITE.name} logo`}
                className="w-11 h-11 rounded-lg object-cover"
              />
              <div>
                <p className="text-base font-bold text-gold-500 leading-snug">{SITE.name}</p>
                <p className="text-xs text-gray-500 leading-snug">{SITE.tagline}</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-snug mb-4 max-w-sm">
              {SITE.brandPromise}. A {SITE.positioning.toLowerCase()} based in {SITE.location}.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-gray-700 bg-dark-100 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Focus areas */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-3">
              What We Do
            </h4>
            <ul className="space-y-2">
              {FOCUS_AREAS.map((area) => (
                <li key={area}>
                  <HashLink
                    to="/#our-focus"
                    className="text-sm text-gray-400 hover:text-gold-500 transition-colors leading-snug flex items-start gap-2"
                  >
                    <span className="text-gold-500/60 mt-0.5">·</span>
                    {area}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-3">
              Contact
            </h4>
            <ul className="space-y-2.5 mb-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-2.5">
                    <Icon className="text-gold-500/80 flex-shrink-0 mt-0.5" size={14} />
                    <div className="min-w-0">
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gray-400 hover:text-gold-500 transition-colors leading-snug block"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400 leading-snug block">{item.text}</span>
                      )}
                      {item.sub && (
                        <span className="text-xs text-gray-500 leading-snug block">{item.sub}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Stay updated</p>
              <HashLink
                to="/#newsletter"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
              >
                <Mail size={14} />
                Subscribe to our newsletter
              </HashLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-gray-500 leading-snug">
            &copy; {currentYear} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gold-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gold-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-gray-500 hover:text-gold-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-10 h-10 bg-gold-500 hover:bg-gold-600 text-dark-200 rounded-full shadow-lg transition-colors flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <ChevronUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;
