import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wordmark from '../components/Wordmark';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { SITE } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import useSiteContent from '../hooks/useSiteContent';
import { getServicesData, defaultSiteContent } from '../data/dataStore';
import { getServiceIcon } from '../utils/serviceIcons';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { content } = useSiteContent();
  const [technologies, setTechnologies] = useState([]);

  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');

  const pillars = content?.strategicPillars || defaultSiteContent.strategicPillars;
  const servicesPage = content?.servicesPage || defaultSiteContent.servicesPage;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getServicesData();
        setTechnologies([...(data?.core || []), ...(data?.additional || [])]);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    load();
    const onUpdate = () => load();
    window.addEventListener('servicesDataUpdated', onUpdate);
    return () => window.removeEventListener('servicesDataUpdated', onUpdate);
  }, []);

  return (
    <>
      <SEO
        title="What We Do - Research, Products & Engineering"
        description={`${SITE.legalName}: ${SITE.brandPromise} Research, product innovation, solution engineering, and talent development from ${SITE.location}.`}
        keywords="AI services Uganda, blockchain development Kabale, IoT solutions Uganda, software engineering East Africa, product development, research collaboration"
        ogUrl={`${SITE.url}/services`}
        ogImage={`${SITE.url}/images/og-services.svg`}
      />

      <div className="page">
        <Header />

        <main className="page-main">
          <PageHero
            eyebrow="What we do"
            title={
              <>
                Four divisions that turn research into <em>working technology</em>
              </>
            }
            lead="Research generates the knowledge. Products carry it forward. Engineering delivers it for partners. Talent development sustains all three."
            actions={
              <>
                <button type="button" className="btn btn--accent" onClick={goToContact}>
                  Start a project
                  <ArrowRight size={17} />
                </button>
                <button
                  type="button"
                  className="btn btn--ghost-ink"
                  onClick={() => navigate('/projects')}
                >
                  See our work
                </button>
              </>
            }
          />

          <section className="section">
            <div className="shell">
              <Reveal className="sec-head">
                <p className="eyebrow">Our divisions</p>
                <h2 className="display-2" style={{ marginTop: '1rem' }}>
                  Strategic pillars.
                </h2>
              </Reveal>

              <div className="sv-pillars">
                {pillars.map((pillar, index) => (
                  <Reveal key={pillar.id || pillar.label} delay={index * 70}>
                    <article className="panel panel--interactive panel--accent">
                      <div className="sv-card-head">
                        <span className="sv-card-label">{pillar.label}</span>
                        <span className="sv-card-num">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="display-3">{pillar.title}</h3>
                      <p className="panel-text">{pillar.description}</p>

                      <ul className="sv-list">
                        {pillar.items.map((item) => (
                          <li key={item}>
                            <Check size={15} strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section section--muted">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Our stack</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    Technologies we work with.
                  </h2>
                </div>
                <p className="lead">{servicesPage.techSectionSubtitle}</p>
              </Reveal>

              <Reveal>
                <div className="sv-tech">
                  {technologies.map((tech) => {
                    const Icon = getServiceIcon(tech.icon);
                    return (
                      <article key={tech.id || tech.title} className="sv-tech-card">
                        <span className="sv-tech-icon">
                          <Icon size={19} strokeWidth={1.9} />
                        </span>
                        <h3 className="sv-tech-title">{tech.title}</h3>
                        <p className="sv-tech-desc">{tech.description}</p>
                      </article>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">How we deliver</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    The innovation pipeline.
                  </h2>
                </div>
                <p className="lead">
                  How validated research becomes products, solutions, and measurable impact.
                </p>
              </Reveal>

              <div className="sv-pipeline">
                {servicesPage.engagementSteps.map((step, index) => (
                  <Reveal key={step.step} delay={index * 60} className="sv-step">
                    <span className="sv-step-num">{step.step}</span>
                    <h3 className="sv-step-title">{step.title}</h3>
                    <p className="sv-step-text">{step.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-band">
            <div className="shell">
              <h2 className="cta-heading">Ready to start?</h2>
              <p className="cta-lead">
                Tell us about your project. We respond within one business day and scope work
                honestly.
              </p>
              <div className="cta-actions">
                <button type="button" className="btn btn--lg btn--accent" onClick={goToContact}>
                  <Send size={17} />
                  Contact us
                </button>
                <button
                  type="button"
                  className="btn btn--lg btn--ghost-ink"
                  onClick={() => navigate('/projects')}
                >
                  View our work
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Wordmark />
        <Footer />
      </div>
    </>
  );
};

export default Services;
