import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';
import CycleDiagram from './diagrams/CycleDiagram';
import { PILLAR_DIAGRAMS } from './diagrams/PillarDiagrams';

// Admin-editable pillars may arrive without ids, so the canonical order from
// config is what maps a pillar to its illustration.
const DIAGRAM_ORDER = ['research', 'product', 'engineering', 'talent'];

const IterativeProcess = () => {
  const { content } = useSiteContent();
  const pillars = content?.strategicPillars || defaultSiteContent.strategicPillars;

  const stages = pillars.map((pillar, index) => ({
    ...pillar,
    id: pillar.id || DIAGRAM_ORDER[index] || `stage-${index}`,
    diagramKey: DIAGRAM_ORDER.includes(pillar.id) ? pillar.id : DIAGRAM_ORDER[index],
  }));

  const [activeId, setActiveId] = useState(stages[0]?.id);
  const active = stages.find((stage) => stage.id === activeId) || stages[0];
  const Diagram = active ? PILLAR_DIAGRAMS[active.diagramKey] : null;

  if (!active) return null;

  return (
    <section id="what-we-do" className="section section--flush-bottom">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">The cycle</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              Research in.
              <br />
              Engineers out.
            </h2>
          </div>
          <p className="lead">
            Our four divisions are one loop, not four departments. Research raises the questions,
            products and partner systems answer them in the field, and the people we train carry
            what we learned back to the start.
          </p>
        </Reveal>
      </div>

      <Reveal className="cyc">
        <div className="shell shell--wide">
          <CycleDiagram stages={stages} activeId={activeId} onSelect={setActiveId} />
        </div>
      </Reveal>

      <div className="shell">
        <div className="tabs" role="tablist" aria-label="Pillars of the cycle">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              type="button"
              role="tab"
              id={`tab-${stage.id}`}
              aria-selected={activeId === stage.id}
              aria-controls={`panel-${stage.id}`}
              className={`tab${activeId === stage.id ? ' tab--active' : ''}`}
              onClick={() => setActiveId(stage.id)}
            >
              <span className="tab-num">{String(index + 1).padStart(2, '0')}</span>
              {stage.label}
            </button>
          ))}
        </div>

        <div
          className="tab-panel"
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          key={active.id}
        >
          <div className="tab-copy">
            <p className="mono">{active.label.toLowerCase().replace(/\s+&\s+/g, ' + ')}</p>
            <h3 className="display-3">{active.title}</h3>
            <p className="body">{active.description}</p>

            {active.items?.length > 0 && (
              <ul className="tab-list">
                {active.items.map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/services" className="btn-text" style={{ marginTop: '1.75rem' }}>
              Explore what we do
              <ArrowRight size={15} />
            </Link>
          </div>

          {Diagram && <Diagram />}
        </div>
      </div>
    </section>
  );
};

export default IterativeProcess;
