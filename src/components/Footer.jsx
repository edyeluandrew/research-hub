import React from 'react';
import { 
  Brain, 
  Link, 
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
  MessageSquare,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Contact', href: '#contact' },
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
    {
      icon: MapPin,
      text: 'Kabale, Uganda',
    },
    {
      icon: Mail,
      text: 'hello@techresearchhub.ug',
      link: 'mailto:hello@techresearchhub.ug'
    },
    {
      icon: Phone,
      text: '+256 XXX XXX XXX',
      link: 'tel:+256XXXXXXXXX'
    },
    {
      icon: Clock,
      text: 'Mon - Fri: 9:00 AM - 5:00 PM',
    },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      name: 'Twitter',
      href: '#',
      color: 'hover:text-white hover:bg-black'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: '#',
      color: 'hover:text-white hover:bg-blue-600'
    },
    {
      icon: Github,
      name: 'GitHub',
      href: '#',
      color: 'hover:text-white hover:bg-gray-800'
    },
    {
      icon: MessageSquare,
      name: 'Discord',
      href: '#',
      color: 'hover:text-white hover:bg-indigo-600'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      href: '#',
      color: 'hover:text-white hover:bg-red-600'
    },
  ];

  return (
    <footer className="bg-dark-200 border-t border-gold-500/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gold-300 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center shadow-gold">
                <Brain className="text-dark-200" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold-500">TechResearch</h3>
                <p className="text-sm text-gray-400 -mt-1">AI & Blockchain Hub</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Driving innovation in AI and Blockchain technology from Kabale, Uganda. 
              We're passionate students building the future through research and development.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-dark-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 transition-all duration-300 hover:border-gold-500 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <SocialIcon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 font-semibold text-lg mb-6 flex items-center">
              <Link className="mr-2" size={20} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="text-gold-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-500 font-semibold text-lg mb-6 flex items-center">
              <Settings className="mr-2" size={20} />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-gold-500 transition-colors duration-300 flex items-center group cursor-pointer">
                    <Check className="text-gold-500 mr-2 opacity-70" size={14} />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
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
                      <a
                        href={contact.link}
                        className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-gray-400">{contact.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-gold-400 font-medium mb-3">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-dark-100 border border-gray-700 rounded-l-lg focus:outline-none focus:border-gold-500 text-white placeholder-gray-500"
                />
                <button className="bg-gold-500 hover:bg-gold-600 text-dark-200 px-4 py-2 rounded-r-lg transition-colors duration-300 font-medium flex items-center">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Banner */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 text-center">
            <h4 className="text-gold-500 font-semibold text-lg mb-2 flex items-center justify-center">
              <Handshake className="mr-2" size={20} />
              Looking to Partner With Us?
            </h4>
            <p className="text-gray-400 mb-4">
              We're open to collaborations, research partnerships, and joint projects in AI and Blockchain.
            </p>
            <button className="btn-primary">
              <MessageCircle className="mr-2" size={16} />
              Start Conversation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} TechResearch Hub. All rights reserved.
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart className="text-red-500 mx-1" size={14} fill="currentColor" /> from Beta Tech Hub, Uganda
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors duration-300 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gold-500 hover:bg-gold-600 text-dark-200 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;