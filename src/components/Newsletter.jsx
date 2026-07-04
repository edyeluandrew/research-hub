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
    <section
      id="newsletter"
      className="py-10 md:py-14 bg-dark-200 border-t border-gray-800/50 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] max-w-full rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
        <Reveal>
          <div className="interactive-card rounded-2xl p-6 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: pitch */}
              <div className="group">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 mb-4">
                  <Mail className="text-gold-500" size={14} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 section-eyebrow">
                    Newsletter
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-3">
                  Stay in the loop with{' '}
                  <span className="text-gold-500 accent-word">Beta-Tech Labs</span>
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-snug mb-6 max-w-md">
                  Join our list for occasional updates on events, new products, and research from the
                  team. No spam, unsubscribe anytime.
                </p>

                <ul className="space-y-3">
                  {BENEFITS.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <li key={benefit.title} className="flex items-start gap-3">
                        <div className="icon-box w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-gold-500" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white leading-snug">
                            {benefit.title}
                          </p>
                          <p className="text-xs text-gray-500 leading-snug">{benefit.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: form */}
              <div className="interactive-card-light rounded-xl p-5 md:p-6">
                <h3 className="text-lg font-bold text-white mb-1">Subscribe for updates</h3>
                <p className="text-sm text-gray-500 leading-snug mb-4">
                  Drop your email below, that is all it takes.
                </p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;
