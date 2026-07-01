import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Search, Package, Settings, GraduationCap } from 'lucide-react';
import { SITE, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const CAPABILITIES = [
  {
    icon: Search,
    title: 'Research & Innovation',
    description: 'Understanding problems before choosing technology',
  },
  {
    icon: Package,
    title: 'Product Innovation',
    description: 'Transforming research into products we own and evolve',
  },
  {
    icon: Settings,
    title: 'Solution Engineering',
    description: 'Tailored technology solutions for partner organizations',
  },
  {
    icon: GraduationCap,
    title: 'Talent Development',
    description: 'Empowering the next generation of innovators',
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');

  return (
    <section id="home" className="bg-gold-gradient relative overflow-hidden pt-16 pb-10 md:pb-12 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-3">
              {SITE.positioning}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-2">
              <span className="text-white">{SITE.tagline}</span>
            </h1>

            <p className="text-base md:text-lg text-gold-500/90 font-medium mb-4">
              {SITE.brandPromise}
            </p>

            <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Every meaningful innovation begins with understanding the problem. We combine research,
              engineering, creativity, and continuous learning to transform ideas into technology
              that creates lasting impact.
            </p>

            <p className="text-sm text-gray-500 italic mb-6 max-w-xl mx-auto lg:mx-0">
              &ldquo;{SITE.philosophy}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={goToContact}
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
                <div className="text-xs md:text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-gold-500">{STATS.studentsTrained}</div>
                <div className="text-xs md:text-sm text-gray-500">Talent Developed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl md:text-2xl font-bold text-white">{STATS.researchPapers}</div>
                <div className="text-xs md:text-sm text-gray-500">Research Outputs</div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <div className="hero-panel p-5 md:p-6">
              <div className="mb-4 pb-3 border-b border-gray-800">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300">
                  Strategic Pillars
                </h2>
                <p className="text-xs text-gray-500 mt-1">The Beta-Tech Way</p>
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
