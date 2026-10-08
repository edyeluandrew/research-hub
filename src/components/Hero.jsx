import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import HeroScene from './HeroScene';

const HERO_STATS = [
  { value: STATS.projects, label: 'Products shipped' },
  { value: STATS.studentsTrained, label: 'Talent developed', accent: true },
  { value: STATS.researchPapers, label: 'Research outputs' },
  { value: STATS.workshops, label: 'Workshops run' },
];

const parseStat = (value) => {
  const match = String(value).match(/^(\d+)(\+?)$/);
  return match
    ? { target: parseInt(match[1], 10), suffix: match[2] || '' }
    : { target: 0, suffix: String(value) };
};

const HeroStat = ({ value, label, accent }) => {
  const { target, suffix } = parseStat(value);
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / 1400, 1);
          setCount(Math.round((1 - (1 - progress) ** 3) * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="hero-stat">
      <p className={`hero-stat-value${accent ? ' hero-stat-value--accent' : ''}`}>
        {count}
        {suffix}
      </p>
      <p className="hero-stat-label">{label}</p>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const heroRef = useRef(null);

  /**
   * Publish scroll progress through the hero as --sy (0 to 1) so the dust veil
   * can thicken as the section leaves the viewport.
   */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = el.getBoundingClientRect();
      const travelled = -top / (height * 0.8);
      el.style.setProperty('--sy', Math.min(Math.max(travelled, 0), 1).toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-glow" />
        <HeroScene />
      </div>

      <div className="hero-body">
        <div className="shell shell--wide">
          <div className="hero-content">
            <p className="hero-kicker">Driven by research</p>

            <h1 className="hero-title">Turning research into products that last.</h1>

            <p className="hero-lead">
              We start with the problem, not the technology. Then we build, test, and ship.
            </p>

            <div className="btn-row hero-actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => navigateToHomeSection(navigate, location, 'contact')}
              >
                Start a project
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn btn--ghost-ink"
                onClick={() => navigate('/projects')}
              >
                See our work
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bar">
        <div className="shell shell--wide">
          <div className="hero-bar-inner">
            {HERO_STATS.map((stat) => (
              <HeroStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Sits above the copy so the smoke can genuinely swallow the hero */}
      <div className="hero-veil" aria-hidden="true" />
    </section>
  );
};

export default Hero;
