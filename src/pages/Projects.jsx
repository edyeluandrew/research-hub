import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Clock, Github, Globe, Layers, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wordmark from '../components/Wordmark';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import { getProjectsData, PROJECT_LOGOS } from '../data/dataStore';
import { SITE, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const STATUS_TONE = {
  Launched: 'pd-status--launched',
  'In Development': 'pd-status--dev',
  'In Testing': 'pd-status--dev',
};

const ProjectCard = ({ project }) => {
  const logo = project.image || PROJECT_LOGOS[project.title?.toLowerCase().trim()];
  const showLive = !project.liveUrlPrivate && project.liveUrl;
  const showSoon =
    !project.liveUrlPrivate && !project.liveUrl && project.liveUrlStatus === 'coming-soon';
  const showRepo = !project.githubRepoPrivate && project.githubRepo;

  return (
    <article className="pd-card">
      <div className="pd-thumb">
        {logo ? (
          <img src={logo} alt={`${project.title} logo`} loading="lazy" />
        ) : (
          <span className="pd-thumb-fallback">
            <Layers size={28} strokeWidth={1.5} />
          </span>
        )}
        {project.status && (
          <span className={`status-pill pd-status ${STATUS_TONE[project.status] || ''}`}>
            {project.status}
          </span>
        )}
      </div>

      <div className="pd-body">
        {project.category && <p className="pd-category">{project.category}</p>}
        <h3 className="pd-title">{project.title}</h3>
        {project.description && <p className="pd-desc">{project.description}</p>}

        {(showLive || showSoon || showRepo) && (
          <div className="pj-links">
            {showLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-link"
              >
                <Globe size={13} strokeWidth={2.25} />
                Live site
              </a>
            )}
            {showSoon && (
              <span className="pj-link pj-link--soon">
                <Clock size={13} strokeWidth={2.25} />
                Coming soon
              </span>
            )}
            {showRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-link"
              >
                <Github size={13} strokeWidth={2.25} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectsData();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    const onUpdate = () => load();
    window.addEventListener('projectsDataUpdated', onUpdate);
    return () => window.removeEventListener('projectsDataUpdated', onUpdate);
  }, []);

  const launched = projects.filter((project) => project.status === 'Launched').length;
  const building = projects.filter(
    (project) => project.status === 'In Development' || project.status === 'In Testing'
  ).length;

  return (
    <>
      <SEO
        title="Our Work - AI, Blockchain, IoT & Software"
        description={`Explore products from ${SITE.name}: Fasiri, Cultural Hub, StellarIDE, Rowan, RetiSight, Numba, and more from ${SITE.location}.`}
        keywords="Beta Tech Labs projects, Stellar Uganda, blockchain products Kabale, software portfolio East Africa, IoT AI projects"
        ogUrl={`${SITE.url}/projects`}
        ogImage={`${SITE.url}/images/og-image.svg`}
      />

      <div className="page">
        <Header />

        <main className="page-main">
          <PageHero
            eyebrow="Our work"
            title={
              <>
                Products we have <em>built and shipped</em>
              </>
            }
            lead="Platforms in AI, blockchain, IoT, and web engineering, researched and delivered by our team in Kabale, Uganda."
            stats={
              loading
                ? undefined
                : [
                    { value: projects.length, label: 'Total projects' },
                    { value: launched, label: 'Launched', accent: true },
                    { value: building, label: 'In active build' },
                    { value: STATS.researchPapers, label: 'Research outputs' },
                  ]
            }
          />

          <section className="section">
            <div className="shell">
              {loading ? (
                <p className="pj-loading">Loading projects...</p>
              ) : projects.length === 0 ? (
                <div className="pj-empty">
                  <span className="pj-empty-icon" aria-hidden="true">
                    <Layers size={26} strokeWidth={1.75} />
                  </span>
                  <p className="lead">New projects are on the way.</p>
                  <button type="button" className="btn btn--primary" onClick={goToContact}>
                    <Send size={16} />
                    Discuss a project
                  </button>
                </div>
              ) : (
                <div className="pj-grid">
                  {projects.map((project, index) => (
                    <Reveal key={project.id} delay={(index % 3) * 70}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="cta-band">
            <div className="shell">
              <h2 className="cta-heading">Have a product idea?</h2>
              <p className="cta-lead">
                We partner with founders, institutions, and teams to research, build, and launch
                technology that holds up in production.
              </p>
              <div className="cta-actions">
                <button type="button" className="btn btn--lg btn--accent" onClick={goToContact}>
                  <Send size={17} />
                  Contact us
                </button>
                <button
                  type="button"
                  className="btn btn--lg btn--ghost-ink"
                  onClick={() => navigate('/services')}
                >
                  What we do
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

export default Projects;
