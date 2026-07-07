import React from 'react';
import { SITE } from '../config/site';
import { Target, Eye, Compass } from 'lucide-react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';

const MissionVision = () => {
  const { content } = useSiteContent();
  const mission = content?.mission || defaultSiteContent.mission;

  const cards = [
    { icon: Compass, label: 'Our Purpose', text: mission.purpose },
    { icon: Eye, label: 'Our Vision', text: mission.vision },
    { icon: Target, label: 'Our Mission', text: mission.mission },
  ];

  return (
    <section className="py-10 md:py-12 bg-dark-200 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
        <Reveal className="text-center max-w-3xl mx-auto mb-8 group">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
            {mission.sectionEyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight mb-3">
            {mission.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-snug mb-2">
            {mission.positioningStatement}
          </p>
          <p className="text-sm font-semibold text-gold-500 accent-word">{SITE.brandPromise}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-6">
          {cards.map(({ icon: Icon, label, text }, index) => (
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
            <p className="text-base md:text-lg font-bold text-white mb-1">{mission.philosophy}</p>
            <p className="text-sm text-gray-400 leading-snug max-w-3xl mx-auto mb-3">
              {mission.philosophyPractice}
            </p>
            <p className="text-xs text-gray-500 italic max-w-2xl mx-auto">
              Guiding principle: &ldquo;{SITE.guidingQuestion}&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MissionVision;
