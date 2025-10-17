import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Send, Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-200/95 backdrop-blur-md border-b border-gold-500/20 gold-border-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shadow-gold">
              <Brain className="text-dark-200" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gold-500">Beta Tech Hub</h1>
              <p className="text-xs text-gray-400 -mt-1">AI & Blockchain Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full duration-300"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full duration-300"></span>
                </a>
              )
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="btn-primary flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Send className="mr-2" size={16} />
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gold-500 hover:bg-gold-500/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 bg-dark-200/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="nav-link py-2 px-4 rounded-lg hover:bg-gold-500/10 transition-colors duration-200 flex items-center group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ArrowRight className="mr-2 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={14} />
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="nav-link py-2 px-4 rounded-lg hover:bg-gold-500/10 transition-colors duration-200 flex items-center group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ArrowRight className="mr-2 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={14} />
                    {item.name}
                  </a>
                )
              ))}
              <a 
                href="#contact" 
                className="btn-primary w-full mt-4 text-center flex items-center justify-center" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Send className="mr-2" size={16} />
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