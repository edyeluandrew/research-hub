import React from 'react';
import { SITE } from '../config/site';
import { Target, Eye, Compass } from 'lucide-react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const MissionVision = () => {
  const { content } = useSiteContent();
  const mission = content?.mission || defaultSiteContent.mission;

  const cards = [
    { icon: Compass, label: 'Our Purpose', text: mission.purpose },
    { icon: Eye, label: 'Our Vision', text: mission.vision },
    { icon: Target, label: 'Our Mission', text: mission.mission },
  ];

  return (
    <section className="mv-section border-b border-[#C2C1BF]/70">
      <div className="mv-inner">
        <Reveal className="mv-header">
          <h2 className="mv-heading">{mission.sectionEyebrow}</h2>
          <p className="mv-positioning">{mission.positioningStatement}</p>
        </Reveal>

        <div className="mv-cards">
          {cards.map(({ icon: Icon, label, text }, index) => (
            <Reveal key={label} delay={index * 80} className="h-full">
              <article className="mv-card h-full">
                <div className="mv-card-icon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="mv-card-label">{label}</h3>
                <p className="mv-card-text">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mv-philosophy">
            <p className="mv-philosophy-eyebrow">Our Philosophy</p>
            <p className="mv-philosophy-quote">&ldquo;{mission.philosophy}&rdquo;</p>
            <p className="mv-philosophy-practice">{mission.philosophyPractice}</p>
            <p className="mv-philosophy-guide">
              Guiding principle: &ldquo;{SITE.guidingQuestion}&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MissionVision;
