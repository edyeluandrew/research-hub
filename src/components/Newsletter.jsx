import React from 'react';
import { Mail, Calendar, Rocket, Lightbulb } from 'lucide-react';
import Reveal from './Reveal';
import NewsletterForm from './NewsletterForm';

const BENEFITS = [
  {
    icon: Calendar,
    title: 'Event invites',
    text: 'Be the first to know about workshops, bootcamps, and meetups.',
  },
  {
    icon: Rocket,
    title: 'Product launches',
    text: 'Get notified when we ship new products and features.',
  },
  {
    icon: Lightbulb,
    title: 'Research insights',
    text: 'Occasional deep-dives on AI, blockchain, and what we are building.',
  },
];

const Newsletter = () => {
  return (
    <section id="newsletter" className="nl-section">
      <div className="nl-inner">
        <Reveal>
          <div className="nl-box">
            <div className="nl-grid">
              <div>
                <div className="nl-badge">
                  <Mail size={14} />
                  <span>Newsletter</span>
                </div>
                <h2 className="nl-heading">
                  Stay in the loop with Beta-Tech Labs
                </h2>
                <p className="nl-lead">
                  Join our list for occasional updates on events, new products, and research from the
                  team. No spam, unsubscribe anytime.
                </p>

                <ul className="nl-benefits">
                  {BENEFITS.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <li key={benefit.title} className="nl-benefit">
                        <div className="nl-benefit-icon">
                          <Icon size={16} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="nl-benefit-title">{benefit.title}</p>
                          <p className="nl-benefit-text">{benefit.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="nl-form-panel">
                <h3 className="nl-form-title">Subscribe for updates</h3>
                <p className="nl-form-lead">Drop your email below, that is all it takes.</p>
                <NewsletterForm theme="light" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;
