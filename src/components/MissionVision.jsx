import React from 'react';
import { COMPANY } from '../config/site';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const IDENTITY = [
  { key: 'Our tool', value: COMPANY.identity.technology },
  { key: 'Our methodology', value: COMPANY.identity.research },
  { key: 'Our purpose', value: COMPANY.identity.impact },
];

const MissionVision = () => {
  const { content } = useSiteContent();
  const mission = content?.mission || defaultSiteContent.mission;

  const pillars = [
    { label: 'Purpose', text: mission.purpose },
    { label: 'Vision', text: mission.vision },
    { label: 'Mission', text: mission.mission },
  ];

  return (
    <section id="who-we-are" className="section">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="st-statement" style={{ marginTop: '1rem' }}>
              A research company that ships.
            </h2>
          </div>
          <p className="lead st-lead">{mission.positioningStatement}</p>
        </Reveal>

        <div className="st-pillars">
          {pillars.map(({ label, text }, index) => (
            <Reveal key={label} delay={index * 90} className="st-pillar">
              <p className="st-pillar-label">{label}</p>
              <p className="st-pillar-text">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="st-identity">
            {IDENTITY.map(({ key, value }) => (
              <div key={key} className="st-identity-item">
                <p className="st-identity-key">{key}</p>
                <p className="st-identity-value">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MissionVision;
