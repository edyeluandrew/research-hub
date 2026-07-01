import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Code, Settings, GraduationCap } from 'lucide-react';
import { STATS } from '../config/site';

const CAPABILITIES = [
  {
    icon: Search,
    title: 'Research & Innovation',
    description: 'Exploring challenges and uncovering opportunities',
  },
  {
    icon: Code,
    title: 'Product Development',
    description: 'Building innovative products from research insights',
  },
  {
    icon: Settings,
    title: 'Solution Engineering',
    description: 'Custom technology solutions that create lasting impact',
  },
  {
    icon: GraduationCap,
    title: 'Talent Development',
    description: 'Growing the next generation of tech leaders',
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="bg-gold-gradient relative overflow-hidden pt-16 pb-10 md:pb-12 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="text-center lg:text-left">
            <p className="text-sm md:text-base text-gold-500/90 italic mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              &ldquo;Every great solution begins with understanding the problem&rdquo;
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4">
              <span className="text-white">Research-Led</span>{' '}
              <span className="text-gold-500">AI & Blockchain</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
              At Beta-Tech Labs, research is the foundation of everything we build. We explore
              challenges, uncover opportunities, and transform our findings into innovative products
              and custom technology solutions that create lasting impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-hero-primary inline-flex items-center justify-center"
              >
                Contact Us
                <ArrowRight className="ml-2" size={16} />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="btn-hero-secondary inline-flex items-center justify-center"
              >
                View Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-800">
              <div className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-white">{STATS.projects}</div>
                <div className="text-xs md:text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-gold-500">{STATS.studentsTrained}</div>
                <div className="text-xs md:text-sm text-gray-500">Students Trained</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-white">{STATS.researchPapers}</div>
                <div className="text-xs md:text-sm text-gray-500">Research Papers</div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="hero-panel p-5 md:p-6">
              <div className="mb-4 pb-3 border-b border-gray-800">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300">
                  Core Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAPABILITIES.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="hero-capability">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gold-500" size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white mb-0.5">{title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
