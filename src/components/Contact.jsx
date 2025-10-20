import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageCircle, 
  User, 
  Tag, 
  ChevronDown, 
  Send,
  Map,
  Twitter,
  Linkedin,
  Github,
  MessageSquare,
  Youtube
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Kabale, Uganda',
      description: 'Come visit our research hub in beautiful Kabale'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'betatechlabs10@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+256 791018086',
      description: 'Mon to Fri, 9am to 5pm'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon - Fri: 9:00 - 17:00',
      description: 'Weekend research by appointment'
    }
  ];

  const socialLinks = [
    {
      icon: Twitter,
      href: '#',
      name: 'Twitter'
    },
    {
      icon: Linkedin,
      href: '#',
      name: 'LinkedIn'
    },
    {
      icon: Github,
      href: '#',
      name: 'GitHub'
    },
    {
      icon: MessageSquare,
      href: '#',
      name: 'Discord'
    },
    {
      icon: Youtube,
      href: '#',
      name: 'YouTube'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-dark-200 to-gold-300/5"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gold-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to collaborate on research or discuss your project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information - Glassmorphism Cards */}
          <div className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gold-500 mb-6 flex items-center">
                <MessageCircle className="mr-3" size={24} />
                Let's Start a Conversation
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you're interested in research collaboration, software development, 
                internships, or just want to learn more about our work, we're here to help 
                bring your ideas to life.
              </p>

              {/* Contact Methods Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div 
                      key={index}
                      className="glass-card-inner p-6 group hover:transform hover:scale-105 transition-all duration-500"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-300 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-dark-200" size={24} />
                      </div>
                      <h4 className="text-gold-500 font-semibold mb-2">{method.title}</h4>
                      <p className="text-white font-medium mb-1">{method.details}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-gold-500 font-semibold mb-4">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 glass-card-inner rounded-xl flex items-center justify-center text-gold-500 hover:text-gold-300 hover:scale-110 transition-all duration-300"
                        aria-label={social.name}
                      >
                        <SocialIcon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Map className="text-gold-500" size={20} />
                <h4 className="text-gold-500 font-semibold">Our Location</h4>
              </div>
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-300/20 rounded-xl h-48 flex items-center justify-center border border-gold-500/30">
                <div className="text-center">
                  <Map className="text-gold-500 mx-auto mb-2" size={32} />
                  <p className="text-gold-500 font-semibold">Kabale, Uganda</p>
                  <p className="text-gray-400 text-sm">Tech Research Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Glassmorphism */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-gold-500 mb-2">Send us a Message</h3>
            <p className="text-gray-400 mb-8">We typically respond within 24 hours</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500" size={18} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input pl-12"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input pl-12"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500" size={18} />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input pl-12 appearance-none bg-dark-100 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  >
                    <option value="" className="bg-dark-100 text-gray-400">Select a subject</option>
                    <option value="research" className="bg-dark-100 text-white">Research Collaboration</option>
                    <option value="software" className="bg-dark-100 text-white">Software Development</option>
                    <option value="internship" className="bg-dark-100 text-white">Internship Program</option>
                    <option value="project" className="bg-dark-100 text-white">Final Year Project</option>
                    <option value="partnership" className="bg-dark-100 text-white">Partnership</option>
                    <option value="other" className="bg-dark-100 text-white">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold-500 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-4 text-gold-500" size={18} />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-input pl-12 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-600 hover:to-gold-400 text-dark-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-gold-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 flex items-center justify-center"
              >
                <Send className="mr-2" size={18} />
                Send Message
              </button>

              <p className="text-gray-400 text-sm text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;