import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { SITE } from '../config/site';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'How We Work', href: '/#about' },
    { name: 'Team', href: '/#team' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isRoute = (href) => href.startsWith('/') && !href.includes('#');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-200/95 backdrop-blur-md border-b border-gold-500/20 gold-border-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt={`${SITE.name} Logo`}
              className="w-11 h-11 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gold-500 leading-tight">{SITE.name}</h1>
              <p className="text-xs text-gray-400 -mt-0.5">{SITE.tagline}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) =>
              isRoute(item.href) ? (
                <Link key={item.name} to={item.href} className="nav-link relative group text-sm">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full duration-300" />
                </Link>
              ) : (
                <a key={item.name} href={item.href} className="nav-link relative group text-sm">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full duration-300" />
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <a href="/#contact" className="btn-primary inline-flex items-center text-sm py-2 px-4" onClick={() => setIsMenuOpen(false)}>
              <Send className="mr-2" size={15} />
              Get Started
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-gold-500 hover:bg-gold-500/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700 bg-dark-200/95 backdrop-blur-md">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) =>
                isRoute(item.href) ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="nav-link py-2.5 px-3 rounded-lg hover:bg-gold-500/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="nav-link py-2.5 px-3 rounded-lg hover:bg-gold-500/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}
              <a
                href="/#contact"
                className="btn-primary w-full mt-3 text-center flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Send className="mr-2" size={15} />
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
