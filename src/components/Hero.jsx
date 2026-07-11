import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE, COMPANY, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const CAPABILITIES = [
  {
    title: 'Research & Innovation',
    description: 'Generating knowledge and exploring possibilities before building technology',
  },
  {
    title: 'Product Innovation',
    description: 'Transforming research into products we own, evolve, and scale',
  },
  {
    title: 'Solution Engineering',
    description: 'Tailored technology solutions for organizations and communities',
  },
  {
    title: 'Talent Development',
    description: 'Empowering the next generation of researchers and innovators',
  },
];

const HERO_BG_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
    alt: 'Circuit board and microchip technology close-up',
  },
  {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80',
    alt: 'Cybersecurity and digital technology network',
  },
  {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80',
    alt: 'Artificial intelligence and neural network visualization',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    alt: 'Earth from space with global digital connectivity',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Developers collaborating with laptops in a tech workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80',
    alt: 'Robotics and intelligent machine innovation',
  },
];

const HERO_STATS = [
  { value: STATS.projects, label: 'Products' },
  { value: STATS.studentsTrained, label: 'Talent Developed', accent: true },
  { value: STATS.researchPapers, label: 'Research Outputs' },
];

const parseStatValue = (value) => {
  const match = String(value).match(/^(\d+)(\+?)$/);
  return match
    ? { target: parseInt(match[1], 10), suffix: match[2] || '' }
    : { target: 0, suffix: String(value) };
};

const HeroStat = ({ value, label, accent = false }) => {
  const { target, suffix } = parseStatValue(value);
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setCount(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="hero-stat-item">
      <div className={`hero-stat-value${accent ? ' hero-stat-value--accent' : ''}`}>
        {count}
        {suffix}
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
};

const HeroBackgroundSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % HERO_BG_SLIDES.length);
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || paused) return undefined;

    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <div
      className="hero-bg-slider"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_BG_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-bg-slide${index === active ? ' hero-bg-slide--active' : ''}`}
        >
          <img
            src={slide.src}
            alt=""
            className="hero-bg-image"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      <div className="hero-bg-wash" />
      <div className="hero-bg-vignette" />

      <div className="hero-bg-dots">
        {HERO_BG_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`hero-bg-dot${index === active ? ' hero-bg-dot--active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Show background ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');

  return (
    <section
      id="home"
      className="hero-section relative overflow-hidden min-h-screen flex flex-col border-b border-[#C2C1BF]/60"
    >
      <HeroBackgroundSlider />
      <div className="hero-dot-grid" aria-hidden="true" />

      <div className="hero-inner flex-1 flex flex-col justify-center w-full max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 pt-20 md:pt-[5.75rem] lg:pt-24 pb-5 md:pb-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-stretch w-full">
          <div className="flex flex-col text-left min-w-0">
            <h1 className="hero-headline hero-fade-in hero-delay-2">
              <span className="hero-headline-line">Turning Research into</span>
              <span className="hero-headline-line">Real-World Solutions</span>
            </h1>

            <p className="hero-tagline hero-fade-in hero-delay-2">{SITE.tagline}</p>

            <p className="hero-body hero-fade-in hero-delay-3">
              {COMPANY.intro} We engage with communities, conduct research, and engineer technology
              that creates meaningful, lasting impact.
            </p>

            <p className="hero-quote hero-fade-in hero-delay-4">
              &ldquo;{SITE.philosophy}&rdquo;
            </p>

            <div className="hero-fade-in hero-delay-4 flex flex-wrap gap-3">
              <button type="button" onClick={goToContact} className="hero-btn-primary">
                Contact Us
                <ArrowRight className="ml-2.5" size={18} />
              </button>
              <button type="button" onClick={() => navigate('/services')} className="hero-btn-secondary">
                View Services
              </button>
            </div>

            <div className="hero-stats-bar hero-fade-in hero-delay-5">
              {HERO_STATS.map((stat) => (
                <HeroStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="hero-fade-in hero-delay-3 w-full min-w-0 flex">
            <div className="hero-pillars-panel flex-1">
              <div className="hero-pillars-panel-header">
                <h2 className="hero-pillars-label">Strategic Pillars</h2>
                <p className="hero-pillars-sub">The Beta-Tech Way</p>
              </div>

              <div className="hero-pillars-grid">
                {CAPABILITIES.map(({ title, description }) => (
                  <div key={title} className="hero-capability-card group/cap">
                    <h3 className="hero-cap-title">{title}</h3>
                    <p className="hero-cap-desc">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
