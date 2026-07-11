import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { SITE } from '../config/site';
import HashLink from './HashLink';

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
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-nowrap items-center justify-between gap-4 xl:gap-6 h-16 md:h-[4.5rem]">
          <Link
            to="/"
            className="flex flex-nowrap items-center gap-3.5 md:gap-4 group shrink-0 min-w-0"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt={`${SITE.name} Logo`}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-cover ring-1 ring-[#2A2E22] transition-all duration-300 group-hover:ring-[#A6FF1A] group-hover:shadow-[0_0_20px_rgba(166,255,26,0.2)] group-hover:scale-105 shrink-0"
            />
            <div className="hidden sm:block shrink-0">
              <h1 className="text-lg md:text-xl font-bold font-heading leading-tight tracking-tight whitespace-nowrap transition-colors duration-300 group-hover:tracking-wide">
                <span className="text-[#F3F5F7] group-hover:text-white">Beta-Tech</span>
                <span className="text-[#B8BCC0] group-hover:text-[#D4D8DC]"> Labs</span>
              </h1>
              <p className="text-xs md:text-sm text-[#9CA3A8] font-semibold tracking-wide -mt-0.5 whitespace-nowrap group-hover:text-[#C8CCD0] transition-colors duration-300">
                {SITE.tagline}
              </p>
            </div>
          </Link>

          <nav className="hidden xl:flex flex-nowrap items-center justify-center gap-10 2xl:gap-12 shrink-0">
            {navItems.map((item) =>
              isRoute(item.href) ? (
                <Link key={item.name} to={item.href} className="nav-link text-sm xl:text-base">
                  {item.name}
                </Link>
              ) : (
                <HashLink key={item.name} to={item.href} className="nav-link text-sm xl:text-base">
                  {item.name}
                </HashLink>
              )
            )}
          </nav>

          <div className="hidden xl:block shrink-0">
            <HashLink
              to="/#contact"
              className="nav-cta text-sm py-2.5 px-5"
            >
              <Send className="mr-2.5 shrink-0" size={18} />
              Get Started
            </HashLink>
          </div>

          <button
            className="xl:hidden p-3 rounded-xl text-[#E4E6E8] hover:text-white hover:bg-white/[0.06] hover:ring-1 hover:ring-[#A6FF1A]/40 transition-all duration-300 shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden py-5 border-t border-[#1A1D20] bg-black">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) =>
                isRoute(item.href) ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="nav-link py-3 px-4 text-base rounded-xl hover:bg-white/[0.04] whitespace-nowrap"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <HashLink
                    key={item.name}
                    to={item.href}
                    className="nav-link py-3 px-4 text-base rounded-xl hover:bg-white/[0.04] whitespace-nowrap"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </HashLink>
                )
              )}
              <HashLink
                to="/#contact"
                className="nav-cta w-full mt-4 text-center justify-center text-base py-3 px-5 whitespace-nowrap"
                onClick={closeMenu}
              >
                <Send className="mr-2.5 shrink-0" size={18} />
                Get Started
              </HashLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
