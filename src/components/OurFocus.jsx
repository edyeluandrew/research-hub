import React from 'react';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const OurFocus = () => {
  const { content } = useSiteContent();
  const strategicPillars = content?.strategicPillars || defaultSiteContent.strategicPillars;

  return (
    <section id="our-focus" className="of-section">
      <div className="of-inner">
        <Reveal className="of-header">
          <p className="of-eyebrow">Strategic Pillars</p>
          <h2 className="of-heading">The Beta-Tech Ecosystem</h2>
          <p className="of-intro">
            Four interconnected pillars where research generates knowledge, product innovation
            creates long-term value, solution engineering delivers for partners, and talent
            development sustains Africa&apos;s growing digital economy.
          </p>
        </Reveal>

        <div className="of-grid">
          {strategicPillars.map((area, index) => (
            <Reveal key={area.id} delay={index * 80}>
              <article className="of-card">
                <div className="of-card-top">
                  <span className="of-label">{area.label}</span>
                  <span className="of-num">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="of-title">{area.title}</h3>
                <p className="of-desc">{area.description}</p>

                <div className="of-list-wrap">
                  <p className="of-list-title">{area.listTitle}</p>
                  <ul className="of-list">
                    {area.items.map((item) => (
                      <li key={item}>
                        <Check size={17} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFocus;
