import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProjectsData, PROJECT_LOGOS } from '../data/dataStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import {
  Globe,
  Github,
  ArrowRight,
  Send,
  Layers,
  FolderKanban,
  Rocket,
  Hammer,
  BookOpen,
  Clock,
} from 'lucide-react';
import { SITE, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import Reveal from '../components/Reveal';

const STATUS_CLASS = {
  Launched: 'pj-status--launched',
  'In Development': 'pj-status--dev',
  'In Testing': 'pj-status--testing',
  'In Planning': 'pj-status--planning',
};

const HERO_STATS = [
  { key: 'total', icon: FolderKanban, tone: 'blue', label: 'Total projects' },
  { key: 'launched', icon: Rocket, tone: 'green', label: 'Launched' },
  { key: 'active', icon: Hammer, tone: 'amber', label: 'In active build' },
  { key: 'research', icon: BookOpen, tone: 'slate', label: 'Research outputs' },
];

const ProjectCard = ({ project }) => {
  const statusClass = STATUS_CLASS[project.status] || STATUS_CLASS['In Planning'];

  return (
    <article className="pj-card group">
      <div className="pj-card-banner">
        {project.image || PROJECT_LOGOS[project.title?.toLowerCase().trim()] ? (
          <img
            src={project.image || PROJECT_LOGOS[project.title?.toLowerCase().trim()]}
            alt={`${project.title} logo`}
            loading="lazy"
          />
        ) : (
          <div className="pj-card-placeholder">
            <Layers size={26} strokeWidth={2} />
          </div>
        )}
        {project.status && (
          <span className={`pj-status ${statusClass}`}>{project.status}</span>
        )}
      </div>

      <div className="pj-card-body">
        {project.category && <p className="pj-card-category">{project.category}</p>}
        <h3 className="pj-card-title">{project.title}</h3>
        <p className="pj-card-desc">{project.description || '\u00A0'}</p>

        <div className="pj-card-links">
          {!project.liveUrlPrivate && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-link pj-link--live"
            >
              <span className="pj-link-icon pj-link-icon--live" aria-hidden="true">
                <Globe size={13} strokeWidth={2.25} />
              </span>
              Live Site
            </a>
          )}
          {!project.liveUrlPrivate && !project.liveUrl && project.liveUrlStatus === 'coming-soon' && (
            <span className="pj-link pj-link--soon">
              <span className="pj-link-icon pj-link-icon--soon" aria-hidden="true">
                <Clock size={13} strokeWidth={2.25} />
              </span>
              Coming Soon
            </span>
          )}
          {!project.githubRepoPrivate && project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-link pj-link--github"
            >
              <span className="pj-link-icon pj-link-icon--github" aria-hidden="true">
                <Github size={13} strokeWidth={2.25} />
              </span>
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
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

    loadProjects();
    const handleUpdate = () => loadProjects();
    window.addEventListener('projectsDataUpdated', handleUpdate);
    return () => window.removeEventListener('projectsDataUpdated', handleUpdate);
  }, []);

  const launchedCount = projects.filter((p) => p.status === 'Launched').length;
  const activeCount = projects.filter(
    (p) => p.status === 'In Development' || p.status === 'In Testing'
  ).length;

  const statValues = {
    total: projects.length,
    launched: launchedCount,
    active: activeCount,
    research: STATS.researchPapers,
  };

  return (
    <>
      <SEO
        title="Our Projects - AI, Blockchain, IoT & Software"
        description={`Explore products from ${SITE.name}, Fasiri, Cultural Hub, StellarIDE, Rowan, RetiSight, Numba, and more from ${SITE.location}.`}
        keywords="Beta Tech Labs projects, Stellar Uganda, blockchain products Kabale, software portfolio East Africa, IoT AI projects"
        ogUrl={`${SITE.url}/projects`}
        ogImage={`${SITE.url}/images/og-image.svg`}
      />

      <div className="pj-page min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="pj-hero">
            <div className="pj-dot-grid" aria-hidden="true" />
            <div className="pj-inner">
              <p className="pj-eyebrow hero-fade-in hero-delay-1">Our Portfolio</p>
              <h1 className="pj-heading hero-fade-in hero-delay-1">
                Products We&apos;ve{' '}
                <span className="pj-heading-accent">Built & Shipped</span>
              </h1>
              <p className="pj-lead hero-fade-in hero-delay-2">
                Real platforms in AI, blockchain, IoT, and web engineering, researched, designed,
                and delivered by the Beta-Tech Labs team from Kabale, Uganda.
              </p>

              {!loading && projects.length > 0 && (
                <div className="pj-stats hero-fade-in hero-delay-3">
                  {HERO_STATS.map(({ key, icon: Icon, tone, label }) => (
                    <div key={key} className="pj-stat-item">
                      <span className={`pj-stat-icon pj-stat-icon--${tone}`} aria-hidden="true">
                        <Icon size={15} strokeWidth={2.15} />
                      </span>
                      <div className="pj-stat-content">
                        <p className={`pj-stat-value${tone === 'green' ? ' pj-stat-value--accent' : ''}`}>
                          {statValues[key]}
                        </p>
                        <p className="pj-stat-label">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="pj-section pj-section--sand">
            <div className="pj-inner">
              {loading ? (
                <p className="pj-loading">Loading projects...</p>
              ) : projects.length === 0 ? (
                <div className="pj-empty">
                  <span className="pj-empty-icon" aria-hidden="true">
                    <Layers size={28} strokeWidth={2} />
                  </span>
                  <p>New projects are on the way.</p>
                  <button type="button" onClick={goToContact} className="sv-btn-primary">
                    <Send size={16} />
                    Discuss a project with us
                  </button>
                </div>
              ) : (
                <div className="pj-grid">
                  {projects.map((project, index) => (
                    <Reveal key={project.id} delay={index * 70}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="pj-cta">
            <div className="pj-cta-inner">
              <h2 className="pj-cta-heading">Have a Product Idea?</h2>
              <p className="pj-cta-lead">
                We partner with founders, institutions, and teams to research, build, and launch
                technology that holds up in production, from first prototype to deployed platform.
              </p>
              <div className="pj-cta-actions">
                <button type="button" onClick={goToContact} className="sv-btn-primary">
                  <Send size={16} />
                  Contact Us
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className="sv-btn-secondary"
                >
                  Our Services
                  <ArrowRight size={16} />
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

export default Projects;
