import React from 'react';
import { CORE_VALUES } from '../config/site';
import Reveal from './Reveal';

const CoreValues = () => (
  <section id="values" className="py-10 md:py-12 bg-dark-100 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
      <Reveal className="text-center max-w-3xl mx-auto mb-8 md:mb-10 group">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
          Our Values
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-3">
          Principles That Guide Every Decision
        </h2>
        <p className="text-sm md:text-base text-gray-400 leading-snug">
          These values shape how we conduct research, develop products, collaborate with partners,
          and support one another as a team.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {CORE_VALUES.map((value, index) => (
          <Reveal key={value.title} delay={index * 60}>
            <article className="group interactive-card rounded-xl p-5 md:p-6 flex flex-col h-full">
              <h3 className="text-base md:text-lg font-bold text-white mb-1 leading-snug transition-colors duration-300 group-hover:text-gold-50">
                {value.title}
              </h3>
              <p className="text-sm font-medium text-gold-500 mb-2 leading-snug">{value.motto}</p>
              <p className="text-sm text-gray-400 leading-snug flex-1 transition-colors duration-300 group-hover:text-gray-300">
                {value.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default CoreValues;
