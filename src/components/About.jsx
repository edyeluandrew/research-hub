import React from 'react';
import { RESEARCH_FRAMEWORK, COMPANY } from '../config/site';
import { Search, BookOpen, FileText, CheckCircle, Rocket } from 'lucide-react';
import ResearchImageSlider from './ResearchImageSlider';
import Reveal from './Reveal';

const STEP_ICONS = [Search, BookOpen, FileText, CheckCircle, Rocket];

const About = () => (
  <section id="about" className="py-12 md:py-16 bg-dark-100 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
        <Reveal className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
            The Beta-Tech Way
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 font-heading mb-4">
            How We Work
          </h2>
          <div className="w-14 h-1 bg-gold-500 rounded-full mb-6 transition-all duration-500 hover:w-20" />

          <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Many technology initiatives ask, &ldquo;What can we build?&rdquo; We begin with a
              different question: &ldquo;What problem are we solving?&rdquo; Before designing a product
              or writing code, we invest time in understanding the challenge through community
              engagement and research.
            </p>
            <p>
              Whether developing our own products or partnering with organizations, our commitment
              remains the same: understand first, then innovate with purpose. The result is not
              simply technology — it is purposeful, practical, and sustainable solutions built to
              solve real problems.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              {COMPANY.foundingStory}
            </p>
          </div>

          <ResearchImageSlider />

          <p className="text-sm md:text-base text-gray-400 leading-relaxed italic mt-auto pt-6 border-t border-gray-800">
            &ldquo;{COMPANY.storyQuote}&rdquo;
          </p>
        </Reveal>

        <div className="flex flex-col gap-4 h-full">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-3">
              Beta-Tech Research Framework (BTRF)
            </p>
          </Reveal>
          {RESEARCH_FRAMEWORK.map((step, index) => {
            const Icon = STEP_ICONS[index] || Search;
            return (
              <Reveal key={step.phase} delay={index * 70}>
              <div
                className="group/step interactive-card rounded-xl flex gap-4 p-5 md:p-6 flex-1"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center transition-all duration-300 group-hover/step:border-gold-500/45 group-hover/step:bg-gold-500/15">
                    <Icon className="text-gold-500 transition-transform duration-300 group-hover/step:scale-110" size={22} />
                  </div>
                  <span className="text-xs font-bold text-gold-500/50 tabular-nums group-hover/step:text-gold-500/70 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
                    {step.phase}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover/step:text-gold-50 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover/step:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default About;
