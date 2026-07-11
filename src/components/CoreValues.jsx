import React from 'react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const getRevealVariant = (index) => {
  const col = index % 2;
  return col === 0 ? 'left' : 'right';
};

const getRevealDelay = (index) => {
  const row = Math.floor(index / 2);
  const col = index % 2;
  return row * 140 + col * 90;
};

const CoreValues = () => {
  const { content } = useSiteContent();
  const coreValues = content?.coreValues || defaultSiteContent.coreValues;

  return (
    <section id="values" className="cv-section">
      <div className="cv-inner">
        <Reveal variant="up" className="cv-header" rootMargin="0px 0px -10% 0px">
          <p className="cv-eyebrow">Our Values</p>
          <h2 className="cv-heading cv-heading--nowrap">Principles that guide how we build</h2>
          <p className="cv-intro">
            Core values define the principles that guide our decisions, shape our culture, and
            influence how we work with one another, our clients, and our communities.
          </p>
        </Reveal>

        <div className="cv-grid">
          {coreValues.map((value, index) => (
            <Reveal
              key={value.id || value.title}
              variant={getRevealVariant(index)}
              delay={getRevealDelay(index)}
              className="h-full"
              rootMargin="0px 0px -8% 0px"
            >
              <article className="cv-card h-full">
                <span className="cv-index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="cv-title">{value.title}</h3>
                <p className="cv-motto">&ldquo;{value.motto}&rdquo;</p>
                <p className="cv-desc">{value.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
