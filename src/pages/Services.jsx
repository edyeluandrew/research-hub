import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { SITE } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import Reveal from '../components/Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { getServicesData, defaultSiteContent } from '../data/dataStore';
import { getServiceIcon } from '../utils/serviceIcons';

const SERVICES_BG_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
    alt: 'Circuit board and microchip technology',
  },
  {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80',
    alt: 'Cybersecurity and digital technology network',
  },
  {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80',
    alt: 'Artificial intelligence visualization',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    alt: 'Global digital connectivity from space',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Developers collaborating in a tech workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80',
    alt: 'Robotics and intelligent machine innovation',
  },
];

const ServicesHeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % SERVICES_BG_SLIDES.length);
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
      className="sv-hero-slider"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SERVICES_BG_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`sv-hero-slide${index === active ? ' sv-hero-slide--active' : ''}`}
        >
          <img
            src={slide.src}
            alt=""
            className="sv-hero-image"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}
      <div className="sv-hero-wash" />
      <div className="sv-hero-dots">
        {SERVICES_BG_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`sv-hero-dot${index === active ? ' sv-hero-dot--active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Show background ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ pillar, index }) => (
  <article className="sv-card">
    <div className="sv-card-top">
      <span className="sv-card-label">{pillar.label}</span>
      <span className="sv-card-num">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <h3 className="sv-card-title">{pillar.title}</h3>
    <p className="sv-card-desc">{pillar.description}</p>
    <ul className="sv-card-list">
      {pillar.items.map((item) => (
        <li key={item}>
          <Check size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');
  const { content } = useSiteContent();
  const [serviceAreas, setServiceAreas] = useState([]);

  const strategicPillars = content?.strategicPillars || defaultSiteContent.strategicPillars;
  const servicesPage = content?.servicesPage || defaultSiteContent.servicesPage;

  const servicePillars = strategicPillars.map((pillar) => ({
    label: pillar.label,
    title: pillar.title,
    description: pillar.description,
    items: pillar.items,
  }));

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServicesData();
        const areas = [
          ...(data?.core || []).map((service) => ({ ...service, isCore: true })),
          ...(data?.additional || []).map((service) => ({ ...service, isCore: false })),
        ];
        setServiceAreas(areas);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    loadServices();
    const handleUpdate = () => loadServices();
    window.addEventListener('servicesDataUpdated', handleUpdate);
    return () => window.removeEventListener('servicesDataUpdated', handleUpdate);
  }, []);

  return (
    <>
      <SEO
        title="Our Services - Research, Product Innovation & Engineering"
        description={`${SITE.legalName}: ${SITE.brandPromise} Research, product innovation, solution engineering, and talent development from ${SITE.location}.`}
        keywords="AI services Uganda, blockchain development Kabale, IoT solutions Uganda, software engineering East Africa, product development, research collaboration, tech consulting Uganda"
        ogUrl={`${SITE.url}/services`}
        ogImage={`${SITE.url}/images/og-services.svg`}
      />

      <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="sv-hero">
            <ServicesHeroSlider />
            <div className="sv-hero-inner">
              <p className="sv-eyebrow">The Beta-Tech Way</p>
              <h1 className="sv-hero-heading">
                <span className="sv-hero-heading-line">Turning Research into</span>
                <span className="sv-hero-heading-line">Real-World Solutions</span>
              </h1>
              <p className="sv-hero-lead">
                We conduct research, develop products, engineer solutions, and develop talent
                through The Beta-Tech Way, a disciplined approach that starts with understanding,
                not assumption.
              </p>
            </div>
          </section>

          <section className="sv-section sv-section--sand">
            <div className="sv-inner">
              <Reveal className="sv-section-header">
                <p className="sv-eyebrow">What We Offer</p>
                <h2 className="sv-heading">Strategic Pillars</h2>
                <p className="sv-intro">{servicesPage.pillarsSubtitle}</p>
              </Reveal>
              <div className="sv-pillars-grid">
                {servicePillars.map((pillar, index) => (
                  <Reveal key={pillar.label} delay={index * 80}>
                    <ServiceCard pillar={pillar} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="sv-section sv-section--cream">
            <div className="sv-inner">
              <Reveal className="sv-section-header">
                <p className="sv-eyebrow">Our Stack</p>
                <h2 className="sv-heading">Technologies We Work With</h2>
                <p className="sv-intro">{servicesPage.techSectionSubtitle}</p>
              </Reveal>
              <div className="sv-tech-grid">
                {serviceAreas.map((tech, index) => {
                  const Icon = getServiceIcon(tech.icon);
                  return (
                    <Reveal key={tech.id || tech.title} delay={index * 50}>
                      <article className="sv-tech-card">
                        <div className="sv-tech-icon">
                          <Icon size={22} />
                        </div>
                        <h3 className="sv-tech-title">{tech.title}</h3>
                        <p className="sv-tech-desc">{tech.description}</p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="sv-section sv-section--sand">
            <div className="sv-inner">
              <Reveal className="sv-section-header">
                <p className="sv-eyebrow">How We Deliver</p>
                <h2 className="sv-heading">The Beta-Tech Innovation Pipeline</h2>
                <p className="sv-intro">
                  How validated research becomes products, solutions, and measurable impact.
                </p>
              </Reveal>
              <div className="sv-pipeline-grid">
                {servicesPage.engagementSteps.map((item, index) => (
                  <Reveal key={item.step} delay={index * 60}>
                    <article className="sv-pipeline-card">
                      <span className="sv-pipeline-num">{item.step}</span>
                      <h3 className="sv-pipeline-title">{item.title}</h3>
                      <p className="sv-pipeline-text">{item.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="sv-cta">
            <div className="sv-cta-inner">
              <h2 className="sv-cta-heading">Ready to Start?</h2>
              <p className="sv-cta-lead">
                Tell us about your project, research idea, or engineering challenge. We respond
                within one business day and scope work honestly, with no inflated promises.
              </p>
              <div className="sv-cta-actions">
                <button type="button" onClick={goToContact} className="sv-btn-primary">
                  <Send size={18} />
                  Contact Us
                </button>
                <button type="button" onClick={() => navigate('/projects')} className="sv-btn-secondary">
                  View Our Work
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
