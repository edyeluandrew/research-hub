import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wordmark from '../components/Wordmark';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { RESEARCH_FRAMEWORK, SITE, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const TRACKS = [
  {
    status: 'Active',
    title: 'Applied artificial intelligence',
    text: 'Language, vision, and decision systems evaluated against the constraints of low-bandwidth, low-power environments.',
  },
  {
    status: 'Active',
    title: 'Distributed systems & blockchain',
    text: 'Practical assessments of where distributed ledgers genuinely improve trust, settlement, and record keeping.',
  },
  {
    status: 'Exploratory',
    title: 'IoT and edge deployment',
    text: 'Field studies on sensing, connectivity, and maintenance realities for hardware deployed outside the lab.',
  },
];

const Research = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <SEO
        title="Research - Applied AI, Distributed Systems & IoT"
        description={`Applied research at ${SITE.name}: artificial intelligence, distributed systems, and IoT studies conducted through the Beta-Tech Research Framework.`}
        keywords="AI research Uganda, blockchain research, applied research Africa, research framework, innovation hub Kabale"
        ogUrl={`${SITE.url}/research`}
        ogImage={`${SITE.url}/images/og-research.svg`}
      />

      <div className="page">
        <Header />

        <main className="page-main">
          <PageHero
            eyebrow="Research"
            title={
              <>
                Evidence before <em>engineering</em>
              </>
            }
            lead="Our research programme investigates problems worth solving, then publishes what we learn. Portfolio and publications are being prepared for release."
            stats={[
              { value: STATS.researchPapers, label: 'Research outputs' },
              { value: '5', label: 'Framework phases', accent: true },
              { value: '3', label: 'Active tracks' },
              { value: STATS.studentsTrained, label: 'Researchers trained' },
            ]}
          />

          <section className="section">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Current tracks</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    What we are studying.
                  </h2>
                </div>
                <p className="lead">
                  Three areas where we believe rigorous investigation still changes the outcome.
                </p>
              </Reveal>

              <Reveal>
                <div className="rs-tracks">
                  {TRACKS.map((track) => (
                    <article key={track.title} className="rs-track">
                      <p className="rs-track-status">{track.status}</p>
                      <h3 className="panel-title">{track.title}</h3>
                      <p className="panel-text">{track.text}</p>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section section--muted">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Our method</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    The Beta-Tech Research Framework.
                  </h2>
                </div>
                <p className="lead">
                  Five phases every initiative passes through before a single line of production
                  code is written.
                </p>
              </Reveal>

              <div className="sv-pipeline">
                {RESEARCH_FRAMEWORK.map((step, index) => (
                  <Reveal key={step.phase} delay={index * 60} className="sv-step">
                    <span className="sv-step-num">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="sv-step-title">{step.phase}</h3>
                    <p className="sv-step-text">{step.title}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="shell">
              <Reveal className="rs-notice">
                <div>
                  <h2 className="display-3">Publications are on the way.</h2>
                  <p className="body" style={{ marginTop: '0.75rem', maxWidth: '52ch' }}>
                    We are preparing our first research portfolio for publication. If you would like
                    early access or want to collaborate, get in touch.
                  </p>
                </div>

                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => navigateToHomeSection(navigate, location, 'contact')}
                  >
                    <Mail size={17} />
                    Contact the team
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => navigate('/projects')}
                  >
                    See our work
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Wordmark />
        <Footer />
      </div>
    </>
  );
};

export default Research;
