import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { getTeamData } from '../data/dataStore';
import Reveal from './Reveal';

const SocialHandle = ({ platform, url }) => {
  const platforms = {
    x: { icon: Twitter, color: 'hover:text-black hover:bg-white', name: 'X' },
    linkedin: { icon: Linkedin, color: 'hover:text-white hover:bg-blue-600', name: 'LinkedIn' },
    github: { icon: Github, color: 'hover:text-white hover:bg-gray-800', name: 'GitHub' },
  };
  const platformInfo = platforms[platform] || platforms.x;
  const IconComponent = platformInfo.icon;

  if (!url || url === '#') return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-9 h-9 bg-dark-200 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 transition-all duration-300 hover:scale-110 ${platformInfo.color}`}
      aria-label={`Visit ${platformInfo.name} profile`}
    >
      <IconComponent size={16} />
    </a>
  );
};

const TeamCard = ({ member }) => (
  <article className="group relative interactive-card rounded-xl flex flex-col h-full overflow-hidden">
    <div className="p-4 md:p-5 flex flex-col flex-1">
      <div className="mb-3">
        <div className="mx-auto w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden border-2 border-gold-500/30 transition-all duration-500 group-hover:scale-105 group-hover:border-gold-500">
          <img
            src={member.image}
            alt={`${member.name || 'Team member'}, ${member.role || 'Beta Tech Labs'}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-300 items-center justify-center text-lg text-dark-200 font-bold"
            style={{ display: 'none' }}
          >
            {(member.name || 'BT').split(' ').map((n) => n[0]).join('')}
          </div>
        </div>
      </div>

      <div className="text-center flex-1">
        <h3 className="text-base font-bold font-heading text-white mb-0.5 leading-snug transition-colors duration-300 group-hover:text-gold-50">
          {member.name || 'Team Member'}
        </h3>
        <p className="text-sm font-medium text-gold-500 mb-2 leading-snug">{member.role || 'Team Member'}</p>
        <p className="text-sm text-gray-400 leading-snug">
          {member.description || 'Building research-backed technology at Beta-Tech Labs.'}
        </p>
      </div>

      {member.skills?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {member.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gold-500/10 text-gold-400 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-gray-800">
        <SocialHandle platform="x" url={member.handles?.x} />
        <SocialHandle platform="linkedin" url={member.handles?.linkedin} />
        <SocialHandle platform="github" url={member.handles?.github} />
      </div>
    </div>
  </article>
);

const Team = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    getTeamData().then(setTeamData);
  }, []);

  useEffect(() => {
    const handleUpdate = () => getTeamData().then(setTeamData);
    window.addEventListener('teamDataUpdated', handleUpdate);
    return () => window.removeEventListener('teamDataUpdated', handleUpdate);
  }, []);

  const { ceo, topRow, bottomRow } = teamData || { ceo: {}, topRow: [], bottomRow: [] };

  // Handbook order: CEO → CTO → COO → CFO → CMO
  const executives = [ceo, ...(topRow || []), ...(bottomRow || [])].filter((m) => m?.id);

  return (
    <section id="team" className="py-8 md:py-10 bg-dark-100 relative overflow-hidden border-t border-gray-800/50">
      <div className="absolute top-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-6 group">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1.5 section-eyebrow">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2 leading-tight">
            Executive Leadership
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-snug">
            Researchers, engineers, and strategists united by a shared belief: technology should
            create meaningful impact, measured not by complexity, but by the value it delivers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {executives.map((member, index) => (
            <Reveal key={member.id || `exec-${index}`} delay={index * 80}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
