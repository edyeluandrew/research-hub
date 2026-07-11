import React from 'react';
import { RESEARCH_FRAMEWORK, COMPANY } from '../config/site';
import { Search, BookOpen, FileText, CheckCircle, Rocket } from 'lucide-react';
import ResearchImageSlider from './ResearchImageSlider';
import Reveal from './Reveal';

const STEP_ICONS = [Search, BookOpen, FileText, CheckCircle, Rocket];

const About = () => (
  <section id="about" className="ab-section">
    <div className="ab-inner">
      <div className="ab-layout">
        <Reveal className="ab-story">
          <p className="ab-eyebrow">The Beta-Tech Way</p>
          <h2 className="ab-heading">How We Work</h2>

          <div className="ab-copy">
            <p>
              Many technology initiatives ask, &ldquo;What can we build?&rdquo; We begin with a
              different question: &ldquo;What problem are we solving?&rdquo; Before designing a product
              or writing code, we invest time in understanding the challenge through community
              engagement and research.
            </p>
            <p>
              Whether developing our own products or partnering with organizations, our commitment
              remains the same: understand first, then innovate with purpose. The result is not
              simply technology. It is purposeful, practical, and sustainable solutions built to
              solve real problems.
            </p>
            <p className="ab-story-note">{COMPANY.foundingStory}</p>
          </div>

          <ResearchImageSlider />

          <p className="ab-quote">&ldquo;{COMPANY.storyQuote}&rdquo;</p>
        </Reveal>

        <div className="ab-steps">
          <Reveal>
            <p className="ab-steps-label">Beta-Tech Research Framework (BTRF)</p>
          </Reveal>
          {RESEARCH_FRAMEWORK.map((step, index) => {
            const Icon = STEP_ICONS[index] || Search;
            return (
              <Reveal key={step.phase} delay={index * 70}>
                <article className="ab-step">
                  <div className="ab-step-meta">
                    <div className="ab-step-icon">
                      <Icon size={22} />
                    </div>
                    <span className="ab-step-num">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="ab-step-body">
                    <span className="ab-step-phase">{step.phase}</span>
                    <h3 className="ab-step-title">{step.title}</h3>
                    <p className="ab-step-desc">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default About;
