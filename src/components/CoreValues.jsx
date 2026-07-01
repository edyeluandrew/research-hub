import React from 'react';
import { CORE_VALUES } from '../config/site';

const CoreValues = () => (
  <section id="values" className="py-10 md:py-12 bg-dark-100 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
          Our Values
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight mb-3">
          Principles That Guide Every Decision
        </h2>
        <p className="text-sm md:text-base text-gray-400 leading-snug">
          These values shape how we conduct research, develop products, collaborate with partners,
          and support one another as a team.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {CORE_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-xl border border-gray-800 bg-dark-200 p-5 md:p-6 flex flex-col h-full"
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-1 leading-snug">
              {value.title}
            </h3>
            <p className="text-sm font-medium text-gold-500 mb-2 leading-snug">{value.motto}</p>
            <p className="text-sm text-gray-400 leading-snug flex-1">{value.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default CoreValues;
