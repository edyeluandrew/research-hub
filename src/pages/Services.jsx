import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  ArrowLeft, 
  Home, 
  Mail, 
  Search, 
  Settings, 
  Code, 
  GraduationCap, 
  Projector, 
  Cpu, 
  Link, 
  BookOpen,
  Check,
  Star
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const coreServices = [
    {
      icon: Search,
      title: 'Research & Development',
      description: 'Our primary focus. We conduct cutting-edge research studies in AI and Blockchain to identify industry gaps and develop innovative solutions.',
      features: [
        'AI Model Research & Development',
        'Blockchain Protocol Studies',
        'Academic Research Publications',
        'Industry Problem Analysis',
        'Solution Feasibility Studies'
      ],
      isCore: true
    },
    {
      icon: Settings,
      title: 'Solution Engineering',
      description: 'Building practical software solutions based on our research findings to address real-world problems.',
      features: [
        'Research-Based Software Development',
        'Proof of Concept Implementation',
        'Prototype Development',
        'Solution Scaling & Deployment'
      ],
      isCore: true
    }
  ];

  const additionalServices = [
    {
      icon: Code,
      title: 'Software Engineering',
      description: 'End-to-end software development services leveraging our research expertise.',
      features: [
        'Web Application Development',
        'Mobile App Development (iOS & Android)',
        'Desktop Software Solutions',
        'API & Backend Development'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Student Internships',
      description: 'Hands-on internship programs for computing students to gain research and development experience.',
      features: [
        'Research Methodology Training',
        'Practical Tech Skill Development',
        'Project-Based Learning',
        'Career Mentorship'
      ]
    },
    {
      icon: Projector,
      title: 'Final Year Projects',
      description: 'Comprehensive support for students working on research-focused final year projects.',
      features: [
        'Research Project Guidance',
        'Technical Implementation Support',
        'Academic Writing Assistance',
        'Project Documentation'
      ]
    },
    {
      icon: Cpu,
      title: 'AI Consulting',
      description: 'Expert consulting services for AI implementation based on our research findings.',
      features: [
        'AI Strategy Development',
        'Machine Learning Solutions',
        'Computer Vision Systems',
        'Natural Language Processing'
      ]
    },
    {
      icon: Link,
      title: 'Blockchain Solutions',
      description: 'Blockchain development services informed by our ongoing research.',
      features: [
        'Smart Contract Development',
        'dApp Architecture',
        'Blockchain Integration',
        'Token System Design'
      ]
    },
    {
      icon: BookOpen,
      title: 'Tech Workshops',
      description: 'Educational workshops and training sessions based on our research insights.',
      features: [
        'AI & ML Workshops',
        'Blockchain Development Training',
        'Research Methodology Sessions',
        'Tech Skill Building'
      ]
    }
  ];

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gold-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Home Button */}
          <div className="mb-8">
            <button 
              onClick={handleBackHome}
              className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
              Back Home
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="gold-gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              While research is at the core of everything we do, we also offer additional services 
              that leverage our expertise and support our mission of driving innovation in Uganda's tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">
              Core Focus Areas
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These are the fundamental services that define our research hub and drive our mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div key={index} className="card p-8 border-2 border-gold-500/30">
                  <div className="w-20 h-20 bg-gold-500 rounded-2xl flex items-center justify-center mb-6">
                    <ServiceIcon className="text-dark-200" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gold-500 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-400">
                        <Check className="text-gold-500 mr-3" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gold-500/20">
                    <span className="text-gold-500 text-sm font-semibold flex items-center">
                      <Star className="mr-1" size={14} fill="currentColor" />
                      Core Service
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">
              Additional Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Services we offer to support our research mission and contribute to the tech community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div key={index} className="card p-6 group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                    <ServiceIcon className="text-gold-500 group-hover:text-dark-200 transition-colors duration-300" size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gold-500 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-400 text-sm">
                        <Check className="text-gold-500 mr-2" size={12} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-6">
            Interested in Our Services?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for research collaboration, software development, or educational programs, 
            we'd love to discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center">
              <Mail className="mr-2" size={18} />
              Get In Touch
            </button>
            <button 
              onClick={handleBackHome}
              className="btn-secondary flex items-center justify-center"
            >
              <Home className="mr-2" size={18} />
              Back Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;