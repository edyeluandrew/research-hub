import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreResearch = () => {
    navigate('/research');
  };

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center bg-gold-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
              <i className="fas fa-map-marker-alt text-gold-500 mr-2"></i>
              <span className="text-gold-300 text-sm">Kabale, Uganda</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Innovating in</span>
              <br />
              <span className="gold-gradient-text">AI & Blockchain</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're a research hub driving cutting-edge innovation in Artificial Intelligence 
              and Blockchain technology. Based in Kabale, we're shaping the future of tech 
              in Uganda and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={handleExploreResearch}
                className="btn-primary"
              >
                <i className="fas fa-rocket mr-2"></i>
                Explore Our Research
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">10+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">100+</div>
                <div className="text-sm text-gray-400">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">5+</div>
                <div className="text-sm text-gray-400">Research Papers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative">
            <div className="card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4">
                {/* AI Section */}
                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <i className="fas fa-robot text-dark-200 text-xl"></i>
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">AI Research</h3>
                  <p className="text-sm text-gray-400">Machine Learning, NLP, Computer Vision</p>
                </div>

                {/* Blockchain Section */}
                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <i className="fas fa-link text-dark-200 text-xl"></i>
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Blockchain</h3>
                  <p className="text-sm text-gray-400">Smart Contracts, dApps, DeFi</p>
                </div>

                {/* Software Section */}
                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <i className="fas fa-code text-dark-200 text-xl"></i>
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Development</h3>
                  <p className="text-sm text-gray-400">Web, Mobile & Desktop Apps</p>
                </div>

                {/* Education Section */}
                <div className="bg-dark-200 rounded-lg p-4 border border-gold-500/30">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center mb-3">
                    <i className="fas fa-graduation-cap text-dark-200 text-xl"></i>
                  </div>
                  <h3 className="text-gold-500 font-semibold mb-2">Education</h3>
                  <p className="text-sm text-gray-400">Internships & Training</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <i className="fas fa-star text-dark-200 text-sm"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gold-300 rounded-full flex items-center justify-center">
                <i className="fas fa-bolt text-dark-200 text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <i className="fas fa-chevron-down text-gold-500 text-xl"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;