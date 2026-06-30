import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Link as LinkIcon,
  Settings,
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Handshake,
  MessageCircle,
  Heart,
  ChevronUp,
  ChevronRight,
  Check,
  Twitter,
  Linkedin,
  Github,
  X,
  MessageCircleMore,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
import { SITE, CONTACT, SOCIAL } from '../config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showConversationOptions, setShowConversationOptions] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    'AI Research & Development',
    'Blockchain Solutions',
    'Software Engineering',
    'Student Internships',
    'Final Year Projects',
    'Tech Consultancy',
  ];

  const contactInfo = [
    { icon: MapPin, text: SITE.location },
    { icon: Mail, text: CONTACT.email, link: `mailto:${CONTACT.email}` },
    { icon: Phone, text: CONTACT.phone, link: `tel:${CONTACT.phoneTel}` },
    { icon: Clock, text: CONTACT.hours },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      name: 'X / Twitter',
      href: SOCIAL.x,
      color: 'hover:text-white hover:bg-black',
      ariaLabel: 'Follow us on X',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: SOCIAL.linkedin,
      color: 'hover:text-white hover:bg-blue-600',
      ariaLabel: 'Connect on LinkedIn',
    },
    {
      icon: Github,
      name: 'GitHub',
      href: SOCIAL.github,
      color: 'hover:text-white hover:bg-gray-800',
      ariaLabel: 'View our GitHub',
    },
  ];

  const conversationOptions = [
    {
      icon: Mail,
      name: 'Email',
      description: 'Send us an email',
      action: () => window.open(`mailto:${CONTACT.email}`, '_blank'),
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      color: 'hover:bg-red-500 hover:text-white',
    },
    {
      icon: MessageCircleMore,
      name: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      action: () =>
        window.open(`https://wa.me/${CONTACT.whatsapp}`, '_blank'),
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      color: 'hover:bg-green-500 hover:text-white',
    },
    {
      icon: PhoneCall,
      name: 'Phone Call',
      description: 'Call us directly',
      action: () => window.open(`tel:${CONTACT.phoneTel}`, '_blank'),
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      color: 'hover:bg-blue-500 hover:text-white',
    },
  ];

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent('Newsletter Subscription')}&body=${encodeURIComponent(`Please add me to the newsletter: ${newsletterEmail}`)}`,
      '_blank'
    );
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(null), 4000);
  };

  return (
    <>
      <footer className="bg-dark-200 border-t border-gold-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-gold-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center shadow-gold">
                  <Brain className="text-dark-200" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gold-500">{SITE.name}</h3>
                  <p className="text-sm text-gray-400 -mt-1">{SITE.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Driving innovation in AI and Blockchain from {SITE.location}. Research-led
                software for teams that want real results.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-dark-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 transition-all duration-300 hover:border-gold-500 hover:scale-110 ${social.color}`}
                      aria-label={social.ariaLabel}
                    >
                      <SocialIcon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-gold-500 font-semibold text-lg mb-6 flex items-center">
                <LinkIcon className="mr-2" size={20} />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/#') ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                      >
                        <ChevronRight className="text-gold-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={14} />
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                      >
                        <ChevronRight className="text-gold-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={14} />
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gold-500 font-semibold text-lg mb-6 flex items-center">
                <Settings className="mr-2" size={20} />
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-gray-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                    >
                      <Check className="text-gold-500 mr-2 opacity-70" size={14} />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-gold-500 font-semibold text-lg mb-6 flex items-center">
                <Mail className="mr-2" size={20} />
                Get In Touch
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const ContactIcon = contact.icon;
                  return (
                    <li key={index} className="flex items-start space-x-3">
                      <ContactIcon className="text-gold-500 mt-0.5 flex-shrink-0" size={16} />
                      {contact.link ? (
                        <a href={contact.link} className="text-gray-400 hover:text-gold-500 transition-colors duration-300">
                          {contact.text}
                        </a>
                      ) : (
                        <span className="text-gray-400">{contact.text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <form onSubmit={handleNewsletter} className="mt-6">
                <h5 className="text-gold-400 font-medium mb-3">Stay Updated</h5>
                <div className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 bg-dark-100 border border-gray-700 rounded-l-lg focus:outline-none focus:border-gold-500 text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-gold-500 hover:bg-gold-600 text-dark-200 px-4 py-2 rounded-r-lg transition-colors duration-300 font-medium flex items-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {newsletterStatus === 'success' && (
                  <p className="text-green-400 text-xs mt-2 flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Check your email client to confirm.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 text-center">
              <h4 className="text-gold-500 font-semibold text-lg mb-2 flex items-center justify-center">
                <Handshake className="mr-2" size={20} />
                Looking to Partner With Us?
              </h4>
              <p className="text-gray-400 mb-4">
                Collaborations, research partnerships, and joint projects in AI and Blockchain.
              </p>
              <button onClick={() => setShowConversationOptions(true)} className="btn-primary">
                <MessageCircle className="mr-2" size={16} />
                Start Conversation
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                &copy; {currentYear} {SITE.name}. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  Made with <Heart className="text-red-500 mx-1" size={14} fill="currentColor" /> in Uganda
                </span>
              </div>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gold-500 hover:bg-gold-600 text-dark-200 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-40"
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      </footer>

      {showConversationOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 border border-gold-500/30 rounded-2xl shadow-2xl max-w-md w-full mx-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-gold-500 flex items-center">
                <MessageCircle className="mr-2" size={20} />
                Start a Conversation
              </h3>
              <button
                onClick={() => setShowConversationOptions(false)}
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300 p-1 rounded-lg hover:bg-gold-500/10"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-6 text-center">Choose your preferred way to get in touch</p>
              <div className="space-y-4">
                {conversationOptions.map((option, index) => {
                  const OptionIcon = option.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        option.action();
                        setShowConversationOptions(false);
                      }}
                      className={`w-full p-4 rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-4 ${option.bgColor} ${option.color} group`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.bgColor} group-hover:bg-white/20 transition-colors duration-300`}>
                        <OptionIcon className={`${option.textColor} group-hover:text-white transition-colors duration-300`} size={24} />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className={`font-semibold ${option.textColor} group-hover:text-white transition-colors duration-300`}>
                          {option.name}
                        </h4>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                          {option.description}
                        </p>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-white transition-colors duration-300" size={16} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
