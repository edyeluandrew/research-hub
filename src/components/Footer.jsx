import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Clock, Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import logo from '../assets/logo-mark.png';
import { SITE, CONTACT, SOCIAL } from '../config/site';
import HashLink from './HashLink';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { name: 'Who we are', href: '/#who-we-are' },
      { name: 'How we work', href: '/#approach' },
      { name: 'Our values', href: '/#values' },
      { name: 'Team', href: '/#team' },
    ],
  },
  {
    title: 'Work',
    links: [
      { name: 'What we do', href: '/services' },
      { name: 'Products', href: '/projects' },
      { name: 'Events', href: '/events' },
      { name: 'Contact', href: '/#contact' },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, href: SOCIAL.x, label: 'X' },
  { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
  { icon: Github, href: SOCIAL.github, label: 'GitHub' },
];

const Footer = ({ className = '' }) => {
  const year = new Date().getFullYear();

  const contactItems = [
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

  return (
    <footer className={`ft ${className}`.trim()}>
      <button
        type="button"
        className="ft-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ChevronUp size={20} strokeWidth={2.25} />
      </button>

      <div className="ft-top">
        <div className="shell shell--wide">
          <div className="ft-grid">
            <div className="ft-brand">
              <Link to="/" className="ft-brand-link">
                <img src={logo} alt="" className="ft-logo" />
                <span>
                  <span className="ft-brand-name">{SITE.name}</span>
                  <br />
                  <span className="ft-brand-tag">{SITE.tagline}</span>
                </span>
              </Link>

              <p className="ft-brand-copy">
                {SITE.brandPromise}. A community research-driven technology company based in{' '}
                {SITE.location}.
              </p>

              <div className="ft-socials">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-social"
                    aria-label={label}
                  >
                    <Icon size={17} strokeWidth={1.9} />
                  </a>
                ))}
              </div>
            </div>

            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="ft-col-title">{column.title}</h2>
                <ul className="ft-list">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      {link.href.includes('#') ? (
                        <HashLink to={link.href} className="ft-link">
                          {link.name}
                        </HashLink>
                      ) : (
                        <Link to={link.href} className="ft-link">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="ft-col-title">Contact</h2>
              <ul className="ft-contact-list">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const external = item.link?.startsWith('http');

                  return (
                    <li key={item.text} className="ft-contact-item">
                      <span className="ft-contact-icon" aria-hidden="true">
                        <Icon size={15} strokeWidth={1.9} />
                      </span>
                      <span style={{ minWidth: 0 }}>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="ft-contact-text"
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="ft-contact-text">{item.text}</span>
                        )}
                        {item.sub && <span className="ft-contact-sub">{item.sub}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="shell shell--wide">
          <div className="ft-bottom-inner">
            <p className="ft-copy">
              &copy; {year} {SITE.legalName}. All rights reserved.
            </p>

            <div className="ft-legal">
              <Link to="/privacy" className="ft-legal-link">
                Privacy
              </Link>
              <span className="ft-legal-sep" aria-hidden="true">
                /
              </span>
              <Link to="/terms" className="ft-legal-link">
                Terms
              </Link>
              <span className="ft-legal-sep" aria-hidden="true">
                /
              </span>
              <Link to="/cookies" className="ft-legal-link">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
