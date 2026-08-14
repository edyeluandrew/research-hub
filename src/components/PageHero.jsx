import React from 'react';

// Opening band shared by every inner page: a lit near-black stage under the
// transparent navigation bar, so each page starts with the same rhythm.
const PageHero = ({ eyebrow, title, lead, actions, stats }) => (
  <section className="ph">
    <div className="ph-stage" aria-hidden="true">
      <div className="ph-glow" />
      <div className="grid-texture grid-texture--ink ph-grid" />
    </div>

    <div className="ph-inner">
      <div className="shell shell--wide">
        {eyebrow && (
          <p className="ph-kicker">
            <span className="ph-kicker-dot" />
            {eyebrow}
          </p>
        )}
        <h1 className="ph-title">{title}</h1>
        {lead && <p className="ph-lead">{lead}</p>}
        {actions && <div className="btn-row ph-actions">{actions}</div>}

        {stats?.length > 0 && (
          <div className="ph-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className={`ph-stat-value${stat.accent ? ' ph-stat-value--accent' : ''}`}>
                  {stat.value}
                </p>
                <p className="ph-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
