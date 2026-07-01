import React from 'react';
import { Search, Package, Settings, GraduationCap, Check } from 'lucide-react';
import { STRATEGIC_PILLARS } from '../config/site';

const PILLAR_ICONS = {
  research: Search,
  product: Package,
  engineering: Settings,
  talent: GraduationCap,
};

const OurFocus = () => (
  <section id="our-focus" className="py-10 md:py-12 bg-dark-200 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
          Strategic Pillars
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white font-heading leading-tight mb-3">
          The Beta-Tech{' '}
          <span className="text-gold-500">Ecosystem</span>
        </h2>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
          Four interconnected pillars where research generates knowledge, product innovation
          creates long-term value, solution engineering delivers for partners, and talent
          development sustains the future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {STRATEGIC_PILLARS.map((area, index) => {
          const Icon = PILLAR_ICONS[area.id] || Search;
          return (
            <article
              key={area.id}
              className="group relative rounded-2xl border border-gray-800 bg-dark-100 overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500/20 via-gold-500/40 to-transparent" />

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold-500" size={22} />
                  </div>
                  <span className="text-sm font-bold text-gold-500/30 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1.5">
                  {area.label}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {area.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                  {area.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
                    {area.listTitle}
                  </p>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="text-gold-500 flex-shrink-0 mt-0.5" size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default OurFocus;
