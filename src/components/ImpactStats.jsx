import React from 'react';
import { STATS } from '../config/site';
import Reveal from './Reveal';

const ITEMS = [
  { value: STATS.projects, label: 'Products researched, built, and shipped' },
  { value: STATS.studentsTrained, label: 'Students and young professionals trained' },
  { value: STATS.researchPapers, label: 'Research outputs and knowledge assets' },
  { value: STATS.workshops, label: 'Workshops, bootcamps, and hackathons' },
];

const ImpactStats = () => (
  <section className="section section--ink section--tight">
    <div className="shell">
      <Reveal className="sec-head">
        <p className="eyebrow">Impact so far</p>
        <p className="lead" style={{ maxWidth: '48ch' }}>
          We measure ourselves by what changes for people, not by how much technology we ship.
        </p>
      </Reveal>

      <Reveal>
        <div className="im-grid">
          {ITEMS.map((item) => (
            <div key={item.label} className="im-item">
              <p className="im-value">{item.value}</p>
              <p className="im-label">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default ImpactStats;
