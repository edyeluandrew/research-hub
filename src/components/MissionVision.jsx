import React from 'react';
import { SITE, COMPANY } from '../config/site';
import { Target, Eye, Compass } from 'lucide-react';
import Reveal from './Reveal';

const CARDS = [
  {
    icon: Compass,
    label: 'Our Purpose',
    text: COMPANY.purpose,
  },
  {
    icon: Eye,
    label: 'Our Vision',
    text: COMPANY.vision,
  },
  {
    icon: Target,
    label: 'Our Mission',
    text: COMPANY.mission,
  },
];

const MissionVision = () => (
  <section className="py-10 md:py-12 bg-dark-200 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
      <Reveal className="text-center max-w-3xl mx-auto mb-8 group">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
          Who We Are
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight mb-3">
          A Research-Driven Technology Company
        </h2>
        <p className="text-sm md:text-base text-gray-400 leading-snug mb-2">
          {COMPANY.positioningStatement}
        </p>
        <p className="text-sm font-semibold text-gold-500 accent-word">{SITE.brandPromise}</p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-6">
        {CARDS.map(({ icon: Icon, label, text }, index) => (
          <Reveal key={label} delay={index * 80}>
            <article className="group interactive-card-light rounded-xl p-5 md:p-6 h-full">
              <div className="icon-box w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
                <Icon className="text-gold-500 transition-transform duration-300" size={18} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-500 mb-2">
                {label}
              </h3>
              <p className="text-sm text-gray-400 leading-snug transition-colors duration-300 group-hover:text-gray-300">
                {text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="philosophy-banner rounded-xl border border-gold-500/20 bg-gold-500/5 px-5 py-4 md:px-6 md:py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1 section-eyebrow">
            Our Philosophy
          </p>
          <p className="text-base md:text-lg font-bold text-white mb-1">{SITE.philosophy}</p>
          <p className="text-sm text-gray-400 leading-snug max-w-3xl mx-auto">
            {SITE.philosophyPractice}
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default MissionVision;
