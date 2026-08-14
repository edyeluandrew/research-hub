import React from 'react';
import { Calendar, Lightbulb, Rocket } from 'lucide-react';
import Reveal from './Reveal';
import NewsletterForm from './NewsletterForm';

const META = [
  { icon: Calendar, label: 'Event invites' },
  { icon: Rocket, label: 'Product launches' },
  { icon: Lightbulb, label: 'Research notes' },
];

const Newsletter = () => (
  <section id="newsletter" className="section section--ink section--tight">
    <div className="shell">
      <Reveal>
        <div className="nl-band">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 className="nl-heading" style={{ marginTop: '1rem' }}>
              Stay close to what we are building.
            </h2>
            <p className="nl-lead">
              Occasional updates on events, new products, and research from the team.
            </p>

            <div className="nl-meta">
              {META.map(({ icon: Icon, label }) => (
                <span key={label} className="nl-meta-item">
                  <Icon size={15} strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="nl-form-card">
            <p className="nl-form-title">Subscribe for updates</p>
            <NewsletterForm theme="dark" buttonLabel="Subscribe" />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Newsletter;
