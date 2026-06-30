import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Rocket,
  Bot,
  Link,
  Code,
  GraduationCap,
  Star,
  Zap,
  ChevronDown,
} from 'lucide-react';
import { SITE, STATS } from '../config/site';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreResearch = () => {
    navigate('/research');
  };

  const handleWorkWithUs = () => {
    navigate('/contact');
  };

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center bg-gold-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
              <MapPin className="text-gold-500 mr-2" size={16} />
              <span className="text-gold-300 text-sm">{SITE.location}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Research-Led</span>
              <br />
              <span className="gold-gradient-text">AI & Blockchain</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {SITE.name} builds production-ready software for startups, educators, and teams —
              grounded in real research from {SITE.location}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={handleWorkWithUs} className="btn-primary flex items-center justify-center">
                <Rocket className="mr-2" size={18} />
                Work With Us
              </button>
              <button onClick={handleExploreResearch} className="btn-secondary flex items-center justify-center">
                Explore Research
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">{STATS.projects}</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">{STATS.studentsTrained}</div>
                <div className="text-sm text-gray-400">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">{STATS.researchPapers}</div>
                <div className="text-sm text-gray-400">Research Papers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <Bot className="text-dark-200" size={24} />
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">AI Research</h3>
                  <p className="text-sm text-gray-400">Machine Learning, NLP, Computer Vision</p>
                </div>

                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <Link className="text-dark-200" size={24} />
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Blockchain</h3>
                  <p className="text-sm text-gray-400">Smart Contracts, dApps, DeFi</p>
                </div>

                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <Code className="text-dark-200" size={24} />
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Development</h3>
                  <p className="text-sm text-gray-400">Web, Mobile & Desktop Apps</p>
                </div>

                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <GraduationCap className="text-dark-200" size={24} />
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Education</h3>
                  <p className="text-sm text-gray-400">Internships & Training</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <Star className="text-dark-200" size={14} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gold-300 rounded-full flex items-center justify-center">
                <Zap className="text-dark-200" size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ChevronDown className="text-gold-500 mx-auto" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
