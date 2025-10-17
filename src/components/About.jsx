import React from 'react';
import { 
  // Flask, 
  Search, 
  Settings, 
  Eye, 
  ArrowRight,
  Users,
  MapPin,
  Lightbulb,
  Cpu,
  Link
} from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-300/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Visual Elements */}
          <div className="relative">
            {/* Main Research Hub Graphic */}
            <div className="card p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-gold-500 to-gold-300 rounded-2xl p-8 text-dark-200 text-center">
                <Flask className="mx-auto mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-4">Research First</h3>
                <p className="text-lg opacity-90">Building Solutions from Research</p>
              </div>
              
              {/* Floating Research Cards */}
              <div className="absolute -bottom-6 -left-6 card p-6 bg-dark-200 border-gold-500/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                    <Search className="text-dark-200" size={24} />
                  </div>
                  <div>
                    <div className="text-gold-500 font-semibold">Identify Gaps</div>
                    <div className="text-xs text-gray-400">Through Research</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 card p-6 bg-dark-200 border-gold-500/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center">
                    <Settings className="text-dark-200" size={24} />
                  </div>
                  <div>
                    <div className="text-gold-500 font-semibold">Build Solutions</div>
                    <div className="text-xs text-gray-400">From Findings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8">
            <div>
              <h2 className="section-title text-left">Who Are We?</h2>
              <div className="w-20 h-1 bg-gold-500 rounded-full mb-6"></div>
            </div>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="flex items-start">
                <Users className="text-gold-400 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>
                  We are a dedicated <span className="text-gold-400 font-semibold">research hub</span> 
                  of computing students in <span className="text-gold-400 font-semibold">Kabale, Uganda</span>, 
                  focused on pioneering innovation in AI and Blockchain technology.
                </span>
              </p>

              <p className="flex items-start">
                <Lightbulb className="text-gold-400 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>
                  Our core mission is to conduct <span className="text-gold-400 font-semibold">groundbreaking research studies</span> 
                  and build practical solutions that address real-world gaps identified through our research.
                </span>
              </p>

              <p className="flex items-start">
                <Cpu className="text-gold-400 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>
                  Everything we do stems from research - we identify problems, study them deeply, 
                  and then engineer software solutions that make a tangible impact.
                </span>
              </p>
            </div>

            {/* Core Focus Areas */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Search className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-gold-500 font-semibold mb-2">Research Studies</h4>
                  <p className="text-gray-400 text-sm">
                    In-depth research in AI and Blockchain to uncover industry challenges
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Settings className="text-gold-500" size={24} />
                </div>
                <div>
                  <h4 className="text-gold-500 font-semibold mb-2">Solution Building</h4>
                  <p className="text-gray-400 text-sm">
                    Developing software solutions based on research findings
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="btn-primary flex items-center justify-center">
                <Eye className="mr-2" size={18} />
                View Our Research
              </button>
              <button className="btn-secondary flex items-center justify-center">
                <ArrowRight className="mr-2" size={18} />
                View Other Services
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar - Focused on Research */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500 mb-2 flex items-center justify-center">
              <Search size={28} className="mr-2" />
              Research
            </div>
            <div className="text-gray-400">Driven Hub</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500 mb-2 flex items-center justify-center">
              <Cpu size={28} className="mr-2" />
              AI + 
              <Link size={28} className="mx-1" />
              Blockchain
            </div>
            <div className="text-gray-400">Core Focus</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500 mb-2 flex items-center justify-center">
              <Settings size={28} className="mr-2" />
              Solutions
            </div>
            <div className="text-gray-400">From Research</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-500 mb-2 flex items-center justify-center">
              <MapPin size={28} className="mr-2" />
              Kabale
            </div>
            <div className="text-gray-400">Based in Uganda</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;