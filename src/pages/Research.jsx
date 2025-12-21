import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Search, 
  ArrowLeft,
  Mail
} from 'lucide-react';

const Research = () => {
  const navigate = useNavigate();

  const handleContactResearchTeam = () => {
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      <SEO 
        title="Research Hub - AI & Blockchain Innovation"
        description="Discover groundbreaking AI and Blockchain research at Beta Tech Hub. Our research team conducts cutting-edge studies to identify industry gaps and develop innovative solutions for Uganda and beyond."
        keywords="AI research, Blockchain research, machine learning studies, research publications, innovation hub Uganda, tech research Kabale, AI models, Blockchain protocols"
        ogUrl="https://www.beta-techlabs.com/research"
        ogImage="https://www.beta-techlabs.com/images/og-research.svg"
      />

      <section id="research" className="py-20 bg-dark-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <button 
              onClick={handleBackToHome}
              className="flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Research Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where Innovation Meets Discovery in AI and Blockchain
            </p>
          </div>

          {/* Detailed 3D Cat Animation Section */}
          <div className="relative mb-16">
            <div className="glass-card p-12 text-center">
              
              {/* 3D Cat Scene Container */}
              <div className="relative w-full max-w-2xl h-96 mx-auto mb-8">
                
                {/* Cat Container with 3D Perspective */}
                <div className="absolute inset-0 transform perspective-1000">
                  
                  {/* Main Cat Body with 3D Rotation */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 animate-float-3d">
                    
                    {/* Cat Body - Main Oval */}
                    <div className="relative w-48 h-32 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-full shadow-2xl transform rotate-6">
                      
                      {/* Fur Texture */}
                      <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full opacity-50"></div>
                      
                      {/* Spine Line */}
                      <div className="absolute top-2 left-4 right-4 h-1 bg-gray-800 rounded-full"></div>
                      
                      {/* Back Legs */}
                      <div className="absolute -bottom-2 left-6 w-5 h-8 bg-gray-700 rounded-t-full transform -rotate-12 shadow-lg">
                        <div className="absolute bottom-0 w-6 h-3 bg-gray-800 rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-2 right-6 w-5 h-8 bg-gray-700 rounded-t-full transform rotate-12 shadow-lg">
                        <div className="absolute bottom-0 w-6 h-3 bg-gray-800 rounded-full"></div>
                      </div>
                      
                      {/* Front Legs - Holding Sign */}
                      <div className="absolute -top-8 left-12 w-6 h-10 bg-gray-700 rounded-full transform -rotate-45 shadow-lg z-20">
                        <div className="absolute bottom-1 left-1 w-4 h-2 bg-gray-600 rounded-full"></div>
                        <div className="absolute -bottom-1 left-2 w-3 h-1 bg-gray-500 rounded-full"></div>
                      </div>
                      <div className="absolute -top-8 right-12 w-6 h-10 bg-gray-700 rounded-full transform rotate-45 shadow-lg z-20">
                        <div className="absolute bottom-1 right-1 w-4 h-2 bg-gray-600 rounded-full"></div>
                        <div className="absolute -bottom-1 right-2 w-3 h-1 bg-gray-500 rounded-full"></div>
                      </div>

                      {/* Tail */}
                      <div className="absolute -right-8 top-8 w-20 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full transform rotate-45 shadow-xl">
                        <div className="absolute right-0 w-6 h-6 bg-gray-800 rounded-full -mt-1"></div>
                      </div>
                    </div>

                    {/* Cat Head */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-36 h-32 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-full shadow-2xl transform -rotate-6">
                      
                      {/* Head Fur Texture */}
                      <div className="absolute inset-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full opacity-40"></div>
                      
                      {/* Ears */}
                      <div className="absolute -top-4 -left-2 w-8 h-10 bg-gray-700 rounded-t-full transform -rotate-12 shadow-lg">
                        <div className="absolute top-1 left-1 w-5 h-6 bg-pink-300 rounded-t-full opacity-80"></div>
                      </div>
                      <div className="absolute -top-4 -right-2 w-8 h-10 bg-gray-700 rounded-t-full transform rotate-12 shadow-lg">
                        <div className="absolute top-1 right-1 w-5 h-6 bg-pink-300 rounded-t-full opacity-80"></div>
                      </div>
                      
                      {/* Face */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full">
                        
                        {/* Eyes Container */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                          
                          {/* Left Eye */}
                          <div className="relative w-8 h-8 bg-green-400 rounded-full animate-pulse-slow shadow-glow">
                            <div className="absolute inset-1 bg-green-300 rounded-full animate-pulse"></div>
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                            <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-80"></div>
                            {/* Eyelids */}
                            <div className="absolute -top-1 left-0 w-8 h-2 bg-gray-700 rounded-full animate-blink"></div>
                          </div>
                          
                          {/* Right Eye */}
                          <div className="relative w-8 h-8 bg-green-400 rounded-full animate-pulse-slow shadow-glow">
                            <div className="absolute inset-1 bg-green-300 rounded-full animate-pulse"></div>
                            <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full"></div>
                            <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-80"></div>
                            {/* Eyelids */}
                            <div className="absolute -top-1 right-0 w-8 h-2 bg-gray-700 rounded-full animate-blink"></div>
                          </div>
                        </div>
                        
                        {/* Nose and Mouth */}
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
                          {/* Nose */}
                          <div className="w-4 h-3 bg-pink-400 rounded-b-full mx-auto shadow-sm"></div>
                          
                          {/* Mouth */}
                          <div className="flex justify-center space-x-1 mt-1">
                            <div className="w-6 h-1 bg-gray-800 rounded-full"></div>
                          </div>
                          
                          {/* Smile */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 border-b-2 border-gray-800 rounded-full"></div>
                        </div>
                        
                        {/* Whiskers */}
                        <div className="absolute top-10 -left-8 space-y-2">
                          <div className="w-8 h-0.5 bg-gray-400 transform -rotate-12"></div>
                          <div className="w-8 h-0.5 bg-gray-400"></div>
                          <div className="w-8 h-0.5 bg-gray-400 transform rotate-12"></div>
                        </div>
                        <div className="absolute top-10 -right-8 space-y-2">
                          <div className="w-8 h-0.5 bg-gray-400 transform rotate-12"></div>
                          <div className="w-8 h-0.5 bg-gray-400"></div>
                          <div className="w-8 h-0.5 bg-gray-400 transform -rotate-12"></div>
                        </div>
                      </div>
                    </div>

                    {/* Coming Soon Sign - Being Held */}
                    <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 -rotate-6 animate-gentle-sway z-10">
                      <div className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 text-dark-200 px-10 py-6 rounded-2xl font-bold text-2xl shadow-2xl border-4 border-gold-400 relative">
                        🚧 Coming Soon! 🚧
                        {/* Sign Shine Effect */}
                        <div className="absolute top-2 left-2 right-2 h-4 bg-white/20 rounded-full blur-sm"></div>
                        {/* Sign Shadow */}
                        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gold-600/30 rounded-full blur-md"></div>
                      </div>
                    </div>

                    {/* Floor Shadow */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/30 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div className="space-y-6 max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-gold-500 bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
                  Research in Progress
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our brilliant research team is meticulously working on groundbreaking AI and Blockchain projects. 
                  Like this careful cat, we're taking our time to ensure every detail is perfect before unveiling 
                  our research to the world.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    AI Research Projects
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></div>
                    Blockchain Studies
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2"></div>
                    Innovation Hub
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="card p-8 max-w-2xl mx-auto">
              <Search size={48} className="mx-auto mb-4 text-gold-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-4">Curious About Our Work?</h3>
              <p className="text-gray-300 mb-6">
                While we prepare our research portfolio, we'd love to hear about your ideas 
                and explore potential collaborations.
              </p>
              <button 
                onClick={handleContactResearchTeam}
                className="btn-primary flex items-center justify-center mx-auto transform hover:scale-105 transition-transform duration-300"
              >
                <Mail className="mr-2" size={18} />
                Contact Research Team
              </button>
            </div>
          </div>
        </div>

        {/* Custom CSS Animations */}
        <style jsx>{`
          @keyframes float-3d {
            0%, 100% { 
              transform: translateY(0px) rotate(12deg) rotateX(5deg); 
            }
            25% { 
              transform: translateY(-8px) rotate(14deg) rotateX(3deg); 
            }
            50% { 
              transform: translateY(-12px) rotate(12deg) rotateX(5deg); 
            }
            75% { 
              transform: translateY(-8px) rotate(10deg) rotateX(7deg); 
            }
          }
          
          @keyframes gentle-sway {
            0%, 100% { 
              transform: translateX(0px) rotate(-6deg); 
            }
            50% { 
              transform: translateX(4px) rotate(-4deg); 
            }
          }
          
          @keyframes blink {
            0%, 90%, 100% { 
              height: 2px; 
              top: -1px; 
            }
            95% { 
              height: 8px; 
              top: -4px; 
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% { 
              opacity: 1; 
            }
            50% { 
              opacity: 0.8; 
            }
          }

          .animate-float-3d {
            animation: float-3d 6s ease-in-out infinite;
          }
          
          .animate-gentle-sway {
            animation: gentle-sway 3s ease-in-out infinite;
          }
          
          .animate-blink {
            animation: blink 4s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
          
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .shadow-glow {
            box-shadow: 
              0 0 15px #10B981, 
              0 0 30px #10B981,
              inset 0 0 10px #10B981;
          }
        `}</style>
      </section>
    </>
  );
};

export default Research;