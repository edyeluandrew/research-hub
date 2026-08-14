import React, { useEffect, useState } from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { getTeamData } from '../data/dataStore';
import Reveal from './Reveal';

const PLATFORMS = {
  x: { icon: Twitter, name: 'X' },
  linkedin: { icon: Linkedin, name: 'LinkedIn' },
  github: { icon: Github, name: 'GitHub' },
};

const SocialHandle = ({ platform, url, memberName }) => {
  if (!url || url === '#') return null;

  const { icon: Icon, name } = PLATFORMS[platform] || PLATFORMS.x;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="tm-social"
      aria-label={`${memberName} on ${name}`}
    >
      <Icon size={15} strokeWidth={2} />
    </a>
  );
};

const initials = (name = 'BT') =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

const TeamCard = ({ member }) => {
  const name = member.name || 'Team member';

  return (
    <article className="tm-card">
      <div className="tm-photo">
        <img
          src={member.image}
          alt={`${name}, ${member.role || 'Beta-Tech Labs'}`}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.target.style.display = 'none';
            event.target.nextSibling.style.display = 'grid';
          }}
        />
        <div className="tm-fallback" style={{ display: 'none' }}>
          {initials(member.name)}
        </div>

        <div className="tm-socials">
          <SocialHandle platform="x" url={member.handles?.x} memberName={name} />
          <SocialHandle platform="linkedin" url={member.handles?.linkedin} memberName={name} />
          <SocialHandle platform="github" url={member.handles?.github} memberName={name} />
        </div>
      </div>

      <h3 className="tm-name">{name}</h3>
      <p className="tm-role">{member.role || 'Team member'}</p>
    </article>
  );
};

const Team = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const load = () => getTeamData().then(setTeamData);
    load();
    window.addEventListener('teamDataUpdated', load);
    return () => window.removeEventListener('teamDataUpdated', load);
  }, []);

  const { ceo, topRow, bottomRow } = teamData || { ceo: {}, topRow: [], bottomRow: [] };
  const members = [ceo, ...(topRow || []), ...(bottomRow || [])].filter((member) => member?.id);

  return (
    <section id="team" className="section section--muted">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">The team</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              Leadership.
            </h2>
          </div>
          <p className="lead">
            Researchers, engineers, and strategists who believe technology is measured by the value
            it delivers, not its complexity.
          </p>
        </Reveal>

        <div className="tm-grid">
          {members.map((member, index) => (
            <Reveal key={member.id || `member-${index}`} delay={index * 60}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
