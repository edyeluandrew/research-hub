import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { SITE, SOCIAL, CONTACT } from '../config/site';
import HashLink from './HashLink';
import { getHashId } from '../utils/homeNavigation';

const NAV_ITEMS = [
  { name: 'What We Do', href: '/services' },
  { name: 'Approach', href: '/#approach' },
  { name: 'Work', href: '/projects' },
  { name: 'Events', href: '/events' },
  { name: 'Team', href: '/#team' },
];

const SOCIAL_LINKS = [
  { href: SOCIAL.github, label: 'GitHub', icon: Github },
  { href: SOCIAL.linkedin, label: 'LinkedIn', icon: Linkedin },
];

// Routes that open with a dark hero band, so the bar can sit transparently on top.
const OVERLAY_ROUTES = new Set([
  '/',
  '/services',
  '/projects',
  '/events',
  '/research',
  '/admin-login',
]);

const isRoute = (href) => href.startsWith('/') && !href.includes('#');

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const overlay = OVERLAY_ROUTES.has(location.pathname) && !scrolled && !menuOpen;

  const isActive = (href) => {
    if (isRoute(href)) return location.pathname === href;
    return location.pathname === '/' && location.hash === `#${getHashId(href)}`;
  };

  const closeMenu = () => setMenuOpen(false);

  const renderLink = (href, children, className, active) => {
    const props = {
      className,
      onClick: closeMenu,
      'aria-current': active ? 'page' : undefined,
    };

    return isRoute(href) ? (
      <Link to={href} {...props}>
        {children}
      </Link>
    ) : (
      <HashLink to={href} {...props}>
        {children}
      </HashLink>
    );
  };

  return (
    <>
      <header className={`nav-bar ${overlay ? 'nav-bar--overlay' : 'nav-bar--solid'}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand" onClick={closeMenu} aria-label={`${SITE.name} home`}>
            <img src={logo} alt="" className="nav-logo" width="32" height="32" decoding="async" fetchPriority="high" />
            <span className="nav-wordmark">
              <span className="nav-name">{SITE.name}</span>
              <span className="nav-tag">{SITE.tagline}</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <React.Fragment key={item.name}>
                  {renderLink(
                    item.href,
                    item.name,
                    `nav-link${active ? ' nav-link--active' : ''}`,
                    active
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="nav-actions">
            <div className="nav-social">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social-link"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>

            <span className="nav-divider" aria-hidden="true" />

            <HashLink to="/#contact" className="btn btn--sm btn--primary nav-cta" onClick={closeMenu}>
              Start a project
            </HashLink>

            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="nav-drawer">
          <nav className="nav-drawer-links" aria-label="Mobile navigation">
            {[{ name: 'Home', href: '/' }, ...NAV_ITEMS].map((item) => {
              const active = isActive(item.href);
              return (
                <React.Fragment key={item.name}>
                  {renderLink(
                    item.href,
                    <>
                      {item.name}
                      <ArrowUpRight size={18} />
                    </>,
                    `nav-drawer-link${active ? ' nav-drawer-link--active' : ''}`,
                    active
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="nav-drawer-footer">
            <HashLink to="/#contact" className="btn btn--primary btn--block" onClick={closeMenu}>
              Start a project
            </HashLink>

            <div className="nav-drawer-social">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>

            <p className="nav-drawer-meta">
              {CONTACT.email}
              <br />
              {SITE.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
