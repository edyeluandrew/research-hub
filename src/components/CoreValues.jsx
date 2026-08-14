import React from 'react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const CoreValues = () => {
  const { content } = useSiteContent();
  const coreValues = content?.coreValues || defaultSiteContent.coreValues;

  return (
    <section id="values" className="section">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">Our values</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              Principles that guide how we build.
            </h2>
          </div>
          <p className="lead">
            Seven commitments that shape our decisions, our culture, and the standard we hold each
            other to.
          </p>
        </Reveal>

        <div className="vl-grid">
          {coreValues.map((value, index) => (
            <Reveal
              key={value.id || value.title}
              delay={(index % 2) * 80}
              className="vl-item"
              rootMargin="0px 0px -6% 0px"
            >
              <span className="vl-num">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="vl-title">{value.title}</h3>
              <p className="vl-motto">{value.motto}</p>
              <p className="vl-desc">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
