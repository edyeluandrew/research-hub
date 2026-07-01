import React from 'react';
import { RESEARCH_FRAMEWORK, COMPANY } from '../config/site';
import { Search, BookOpen, FileText, CheckCircle, Rocket } from 'lucide-react';

const STEP_ICONS = [Search, BookOpen, FileText, CheckCircle, Rocket];

const About = () => (
  <section id="about" className="py-12 md:py-16 bg-dark-100 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
            The Beta-Tech Way
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 font-heading mb-4">
            How We Work
          </h2>
          <div className="w-14 h-1 bg-gold-500 rounded-full mb-6" />

          <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Many technology companies ask, &ldquo;What can we build?&rdquo; We begin by asking,
              &ldquo;What problem are we solving?&rdquo; Before designing a product or writing code,
              we invest time in understanding the challenge through research.
            </p>
            <p>
              Whether developing our own products or partnering with organizations, our commitment
              remains the same: understand first, then innovate with purpose.
            </p>
          </div>

          <div className="my-6 lg:my-8 flex-1 min-h-[220px] lg:min-h-[280px] rounded-xl overflow-hidden border border-gray-800 relative group">
            <img
              src="/images/how-we-work.jpg"
              alt="Team collaborating on research and product planning"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-200/80 via-dark-200/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
                Beta-Tech Research Framework
              </p>
              <p className="text-sm md:text-base text-white font-medium">
                From problem discovery to innovation readiness
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed italic mt-auto pt-6 border-t border-gray-800">
            &ldquo;{COMPANY.storyQuote}&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-4 h-full">
          {RESEARCH_FRAMEWORK.map((step, index) => {
            const Icon = STEP_ICONS[index] || Search;
            return (
              <div
                key={step.phase}
                className="flex gap-4 p-5 md:p-6 rounded-xl border border-gray-800 bg-dark-200/50 flex-1"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
                    <Icon className="text-gold-500" size={22} />
                  </div>
                  <span className="text-xs font-bold text-gold-500/50 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
                    {step.phase}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default About;
