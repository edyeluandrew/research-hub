import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Twitter, Linkedin, Github, Crown, Star } from 'lucide-react';

const Team = () => {
  const navigate = useNavigate();

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

  // CEO (center)
  const ceo = {
    name: 'Edyelu Andrew',
    role: 'CEO & Web3 Developer',
    image: '/images/team/edyelu-andrew.jpg',
    description: 'Full-stack Web3 developer specializing in Rust, Solana, Stellar, smart contracts, and MERN stack. Leads our blockchain initiatives and overall strategy.',
    handles: {
      x: 'https://x.com/edyeluandrew1?t=JQ1KHN-CaMk6rACTnaJNWg&s=09',
      linkedin: 'https://www.linkedin.com/in/edyelu-andrew-118992330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/edyeluandrew/'
    },
    skills: ['Rust', 'React js', 'Stellar', 'NodeJs', 'UI/UX']
  };

  // Top row (2 members)
  const topRow = [
    {
      name: 'Ahmed Umar Khemis',
      role: 'Co-Founder & AI Engineer',
      image: '/images/team/ahmed-umar-khemis.jpg',
      description: 'AI Engineer and Neuroscientist with expertise in machine learning, neural networks, and software engineering. Drives our AI research forward.',
      handles: {
        x: 'ahmedumar_khemis',
        linkedin: 'http://linkedin.com/in/ahmed-umar-khemis',
        github: 'http://github.com/umarkhemis'
      },
      skills: ['Django', 'Arduino', 'Research Lead']
    },
    {
      name: 'Aliho Gilbert',
      role: 'Co-Founder & AI Engineer',
      image: '/images/team/aliho-gilbert.jpg',
      description: 'Specializes in Computer Vision, Explainable AI, and Backend Engineering. Focuses on making AI systems transparent and reliable.',
      handles: {
        x: 'https://x.com/GilbertAliho',
        linkedin: 'https://www.linkedin.com/in/aliho-gilbert-a0b5b5292/',
        github: 'https://github.com/Gibsdevops'
      },
      skills: ['Django', 'React', 'Backend Engineering']
    }
  ];

  // Bottom row (2 members)
  const bottomRow = [
    {
      name: 'Muhereza Alouzious',
      role: 'Co-Founder & Blockchain Developer',
      image: '/images/team/muhereza-alouzious.jpg',
      description: 'Blockchain expert in Rust engineering, NFTs, DeFi, and dApps. Builds secure and scalable decentralized applications.',
      handles: {
        x: 'https://x.com/alouzious?t=yDaksnt2IIunL6IJ97RjTg&s=09',
        linkedin: 'https://www.linkedin.com/in/alouzious-muhereza-89116b328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://Github.com/Alouzious'
      },
      skills: ['Rust', 'NFTs', 'DeFi', 'dApps']
    },
    {
      name: 'Kyomugisha Evelyn',
      role: 'Marketing Director & Project Manager',
      image: '/images/team/kyomugisha-evelyn.jpg',
      description: 'Strategic marketing leader and project manager driving brand growth, community engagement, and ensuring seamless project execution.',
      handles: {
        x: 'https://x.com/EvelynK2486',
        linkedin: 'https://www.linkedin.com/in/kyomugisha-evelyn-2877722b4',
        github: '#'
      },
      skills: ['Marketing', 'Project Management', 'Strategy']
    }
  ];

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

  // Team Card Component
  const TeamCard = ({ member, SocialHandle, isCeo = false }) => (
    <div 
      className={`card p-8 group hover:transform hover:scale-105 transition-all duration-500 relative ${isCeo ? 'border-2 border-gold-500/50' : ''}`}
    >
      {/* Member Image */}
      <div className="relative mb-6">
        <div className={`${isCeo ? 'w-44 h-44' : 'w-36 h-36'} mx-auto rounded-full overflow-hidden border-4 ${isCeo ? 'border-gold-500' : 'border-gold-500/30'} group-hover:border-gold-500/50 transition-all duration-500 mb-4 group-hover:scale-110`}>
          <img
            src={member.image}
            alt={`${member.name} - ${member.role} at Beta Tech Labs`}
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
            {member.name.split(' ').map(n => n[0]).join('')}
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
          {member.name}
        </h3>
        <p className="text-gold-300 font-medium mb-4 text-lg">{member.role}</p>
        <p className="text-gray-400 leading-relaxed">
          {member.description}
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
        <SocialHandle platform="x" url={member.handles.x} />
        <SocialHandle platform="linkedin" url={member.handles.linkedin} />
        {member.handles.github !== '#' && (
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