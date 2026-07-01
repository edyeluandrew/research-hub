import React from 'react';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { defaultSiteContent } from '../data/dataStore';
import { getPillarIcon } from '../utils/serviceIcons';

const OurFocus = () => {
  const { content } = useSiteContent();
  const strategicPillars = content?.strategicPillars || defaultSiteContent.strategicPillars;

  return (
    <section id="our-focus" className="py-10 md:py-12 bg-dark-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-8 md:mb-10 group">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
            Strategic Pillars
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white font-heading leading-tight mb-3">
            The Beta-Tech{' '}
            <span className="text-gold-500 accent-word">Ecosystem</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            Four interconnected pillars where research generates knowledge, product innovation
            creates long-term value, solution engineering delivers for partners, and talent
            development sustains the future.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {strategicPillars.map((area, index) => {
            const Icon = getPillarIcon(area.id);
            return (
              <Reveal key={area.id} delay={index * 80}>
                <article className="group relative interactive-card-light rounded-2xl overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500/20 via-gold-500/40 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="icon-box w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gold-500 transition-transform duration-300" size={22} />
                      </div>
                      <span className="text-sm font-bold text-gold-500/30 tabular-nums transition-colors duration-300 group-hover:text-gold-500/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1.5">
                      {area.label}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug transition-colors duration-300 group-hover:text-gold-50">
                      {area.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4 transition-colors duration-300 group-hover:text-gray-300">
                      {area.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-800">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
                        {area.listTitle}
                      </p>
                      <ul className="space-y-2">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200"
                          >
                            <Check className="text-gold-500 flex-shrink-0 mt-0.5" size={15} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurFocus;
