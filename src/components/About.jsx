import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RESEARCH_FRAMEWORK, COMPANY, SITE } from '../config/site';
import FrameworkDiagram from './diagrams/FrameworkDiagram';
import Reveal from './Reveal';

const About = () => (
  <section id="approach" className="section">
    <div className="shell">
      <Reveal className="sec-head sec-head--split">
        <div>
          <p className="eyebrow">How we work</p>
          <h2 className="display-2" style={{ marginTop: '1rem' }}>
            We begin with the problem, not the product.
          </h2>
        </div>
        <div>
          <p className="lead">
            Most technology projects ask what they can build. We ask what needs solving, then let
            the evidence decide the rest.
          </p>
          <Link to="/services" className="btn-text" style={{ marginTop: '1.25rem' }}>
            The Beta-Tech Way
            <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>

      <div className="ap-steps">
        {RESEARCH_FRAMEWORK.map((step, index) => (
          <Reveal key={step.phase} delay={index * 70} className="ap-step">
            <span className="ap-step-num">{String(index + 1).padStart(2, '0')}</span>
            <p className="ap-step-phase">{step.phase}</p>
            <h3 className="ap-step-title">{step.title}</h3>
          </Reveal>
        ))}
      </div>

      <Reveal className="ap-media">
        <FrameworkDiagram />
      </Reveal>

      <Reveal className="ap-note">
        <p className="ap-note-label">How we started</p>
        <p className="ap-note-text">{COMPANY.foundingStory}</p>
      </Reveal>

      <Reveal className="ap-quote">
        <span className="ap-quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <p className="quote">{COMPANY.storyQuote}</p>
        <p className="ap-quote-attr">{SITE.name}</p>
      </Reveal>
    </div>
  </section>
);

export default About;
