import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { getTeamData } from '../data/dataStore';
import Reveal from './Reveal';

const SOCIAL_STYLES = {
  x: {
    background: '#020201',
    color: '#FFFFFF',
  },
  linkedin: {
    background: '#0A66C2',
    color: '#FFFFFF',
  },
  github: {
    background: '#24292F',
    color: '#FFFFFF',
  },
};

const SocialHandle = ({ platform, url }) => {
  const platforms = {
    x: { icon: Twitter, name: 'X', tone: 'x' },
    linkedin: { icon: Linkedin, name: 'LinkedIn', tone: 'linkedin' },
    github: { icon: Github, name: 'GitHub', tone: 'github' },
  };
  const platformInfo = platforms[platform] || platforms.x;
  const IconComponent = platformInfo.icon;
  const style = SOCIAL_STYLES[platformInfo.tone];

  if (!url || url === '#') return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="tm-social"
      style={style}
      aria-label={`Visit ${platformInfo.name} profile`}
    >
      <IconComponent size={18} strokeWidth={2.25} color={style.color} />
    </a>
  );
};

const TeamCard = ({ member }) => (
  <article className="tm-card group">
    <div className="tm-avatar">
      <img
        src={member.image}
        alt={`${member.name || 'Team member'}, ${member.role || 'Beta Tech Labs'}`}
        loading="lazy"
        decoding="async"
        className="tm-avatar-img"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="tm-avatar-fallback" style={{ display: 'none' }}>
        {(member.name || 'BT')
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
    </div>

    <div className="tm-card-body">
      <h3 className="tm-name">{member.name || 'Team Member'}</h3>
      <p className="tm-role">{member.role || 'Team Member'}</p>
      <p className="tm-bio">
        {member.description || 'Building research-backed technology at Beta-Tech Labs.'}
      </p>

      {member.skills?.length > 0 && (
        <div className="tm-skills">
          {member.skills.map((skill, i) => (
            <span key={i} className="tm-skill">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="tm-socials">
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
  const executives = [ceo, ...(topRow || []), ...(bottomRow || [])].filter((m) => m?.id);

  return (
    <section id="team" className="tm-section">
      <div className="tm-inner">
        <Reveal className="tm-header">
          <h2 className="tm-heading">Executive Leadership</h2>
          <p className="tm-intro">
            Researchers, engineers, and strategists united by a shared belief: technology should
            create meaningful impact, measured not by complexity, but by the value it delivers.
          </p>
        </Reveal>

        <div className="tm-grid">
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
