import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Twitter, Linkedin, Github, Crown, Star } from 'lucide-react';
import { getTeamData } from '../data/dataStore';

const Team = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState(null);

  // Listen for updates from admin panel
  useEffect(() => {
    const loadData = async () => {
      const data = await getTeamData();
      setTeamData(data);
    };
    loadData();
  }, []);

  // Real-time listener for Firebase updates
  useEffect(() => {
    const handleUpdate = () => {
      getTeamData().then(data => setTeamData(data));
    };
    window.addEventListener('teamDataUpdated', handleUpdate);
    return () => window.removeEventListener('teamDataUpdated', handleUpdate);
  }, []);

  const handleApplyForInternship = () => {
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

  // Get data from store with defaults
  const { ceo, topRow, bottomRow } = teamData || { ceo: {}, topRow: [], bottomRow: [] };

  const SocialHandle = ({ platform, username, url }) => {
    const getPlatformInfo = (platform) => {
      const platforms = {
        x: {
          icon: Twitter,
          color: 'hover:text-black hover:bg-white',
          name: 'X'
        },
        linkedin: {
          icon: Linkedin,
          color: 'hover:text-white hover:bg-blue-600',
          name: 'LinkedIn'
        },
        github: {
          icon: Github,
          color: 'hover:text-white hover:bg-gray-800',
          name: 'GitHub'
        }
      };
      return platforms[platform] || platforms.x;
    };

    const platformInfo = getPlatformInfo(platform);
    const IconComponent = platformInfo.icon;

    return (
      <a
        href={url || `https://${platform === 'x' ? 'twitter.com' : platform}.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 bg-dark-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 transition-all duration-300 hover:scale-110 ${platformInfo.color}`}
        aria-label={`Visit ${username}'s ${platformInfo.name}`}
      >
        <IconComponent size={18} />
      </a>
    );
  };

  // Team Card Comonent
  const TeamCard = ({ member, SocialHandle, isCeo = false }) => (
    <div 
      className={`card p-8 group hover:transform hover:scale-105 transition-all duration-500 relative ${isCeo ? 'border-2 border-gold-500/50' : ''}`}
    >
      {/* Member Image */}
      <div className="relative mb-6">
        <div className={`${isCeo ? 'w-44 h-44' : 'w-36 h-36'} mx-auto rounded-full overflow-hidden border-4 ${isCeo ? 'border-gold-500' : 'border-gold-500/30'} group-hover:border-gold-500/50 transition-all duration-500 mb-4 group-hover:scale-110`}>
          <img
            src={member.image}
            alt={`${member.name || 'Team Member'} - ${member.role || 'Beta Tech Labs'} at Beta Tech Labs`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback with initials */}
          <div 
            className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-300 rounded-full flex items-center justify-center text-4xl text-dark-200 font-bold"
            style={{ display: 'none' }}
          >
            {(member.name || 'BT').split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        {isCeo ? (
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
            <Crown size={20} className="text-dark-200" />
          </div>
        ) : (
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
            <Star size={12} className="text-dark-200" />
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="text-center mb-6">
        <h3 className={`${isCeo ? 'text-3xl' : 'text-2xl'} font-bold font-heading text-gold-500 mb-2 group-hover:text-gold-400 transition-colors duration-300`}>
          {member.name || 'Team Member'}
        </h3>
        <p className="text-gold-300 font-medium mb-4 text-lg">{member.role || 'Team Member'}</p>
        <p className="text-gray-400 leading-relaxed">
          {member.description || 'Contributing to innovation in computing'}
        </p>
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {member.skills?.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>

      {/* Social Handles */}
      <div className="flex justify-center space-x-4 pt-6 border-t border-gray-700">
        <SocialHandle platform="x" url={(member.handles?.x) || '#'} />
        <SocialHandle platform="linkedin" url={(member.handles?.linkedin) || '#'} />
        {(member.handles?.github) && member.handles.github !== '#' && (
          <SocialHandle platform="github" url={member.handles.github} />
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
    </div>
  );

  return (
    <section id="team" className="py-20 bg-dark-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-300/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title font-heading">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate computing students driving innovation in AI and Blockchain from Kabale, Uganda.
          </p>
        </div>

        {/* Team Layout: 2 up, CEO center, 2 down */}
        <div className="max-w-6xl mx-auto">
          
          {/* Top Row - 2 Members */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {topRow.map((member, index) => (
              <TeamCard key={`top-${index}`} member={member} SocialHandle={SocialHandle} />
            ))}
          </div>

          {/* Middle Row - CEO */}
          <div className="flex justify-center mb-8">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <TeamCard member={ceo} SocialHandle={SocialHandle} isCeo={true} />
            </div>
          </div>

          {/* Bottom Row - 2 Members */}
          <div className="grid md:grid-cols-2 gap-8">
            {bottomRow.map((member, index) => (
              <TeamCard key={`bottom-${index}`} member={member} SocialHandle={SocialHandle} />
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gold-500/10 to-gold-300/10 border border-gold-500/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gold-500 mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate computing students who want to make an impact 
              in AI and Blockchain research. Join us in shaping the future of technology in Uganda.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={handleApplyForInternship}
                className="btn-primary"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Apply for Internship
              </button>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold font-heading text-gold-500 mb-2">5</div>
            <div className="text-gray-400">Core Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-heading text-gold-500 mb-2">100%</div>
            <div className="text-gray-400">Student-Led</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-heading text-gold-500 mb-2">AI & Blockchain</div>
            <div className="text-gray-400">Specialized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-heading text-gold-500 mb-2">Kabale</div>
            <div className="text-gray-400">Based</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;