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
} from 'lucide-react';
import { SITE, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const STATUS_STYLES = {
  Launched: 'bg-green-500/15 text-green-400 border-green-500/30',
  'In Development': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'In Testing': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'In Planning': 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

const ProjectCard = ({ project }) => {
  const statusClass = STATUS_STYLES[project.status] || STATUS_STYLES['In Planning'];

  return (
    <article className="rounded-xl border border-gray-800 bg-dark-100 overflow-hidden flex flex-col h-full">
      {/* Logo banner */}
      <div className="relative h-36 md:h-40 bg-dark-200 border-b border-gray-800 flex items-center justify-center p-6">
        {project.image || PROJECT_LOGOS[project.title?.toLowerCase().trim()] ? (
          <img
            src={project.image || PROJECT_LOGOS[project.title?.toLowerCase().trim()]}
            alt={`${project.title} logo`}
            className="max-h-full max-w-[220px] w-auto object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
            <Layers className="text-gold-500" size={28} />
          </div>
        )}
        {project.status && (
          <span
            className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full border font-medium ${statusClass}`}
          >
            {project.status}
          </span>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {project.category && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1.5 leading-snug">
            {project.category}
          </p>
        )}
        <h3 className="text-xl font-bold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-gray-400 leading-snug mb-4 flex-1">
          {project.description || '\u00A0'}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
          {!project.liveUrlPrivate && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gold-400 border border-gold-500/30 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 transition-colors"
            >
              <Globe size={14} />
              Live Site
            </a>
          )}
          {!project.liveUrlPrivate && !project.liveUrl && project.liveUrlStatus === 'coming-soon' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-700 rounded-lg bg-dark-200">
              <Globe size={14} />
              Coming Soon
            </span>
          )}
          {!project.githubRepoPrivate && project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 border border-gray-700 rounded-lg bg-dark-200 hover:border-gray-600 transition-colors"
            >
              <Github size={14} />
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

  return (
    <>
      <SEO
        title="Our Projects - AI, Blockchain, IoT & Software"
        description={`Explore products from ${SITE.name}, Fasiri, Cultural Hub, StellarIDE, Rowan, RetiSight, Numba, and more from ${SITE.location}.`}
        keywords="Beta Tech Labs projects, Stellar Uganda, blockchain products Kabale, software portfolio East Africa, IoT AI projects"
        ogUrl={`${SITE.url}/projects`}
        ogImage={`${SITE.url}/images/og-image.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="pt-20 pb-8 md:pb-10 bg-gold-gradient border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-3 max-w-3xl">
                Products We&apos;ve{' '}
                <span className="text-gold-500">Built & Shipped</span>
              </h1>
              <p className="text-sm md:text-base text-gray-400 leading-snug max-w-2xl">
                Real platforms in AI, blockchain, IoT, and web engineering, researched, designed,
                and delivered by the Beta-Tech Labs team from Kabale, Uganda.
              </p>

              {!loading && projects.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-6 pt-5 border-t border-gray-800/80">
                  <div>
                    <p className="text-xl font-bold text-white">{projects.length}</p>
                    <p className="text-xs text-gray-500">Total projects</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gold-500">{launchedCount}</p>
                    <p className="text-xs text-gray-500">Launched</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{activeCount}</p>
                    <p className="text-xs text-gray-500">In active build</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{STATS.researchPapers}</p>
                    <p className="text-xs text-gray-500">Research outputs</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Projects grid */}
          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-gray-800 bg-dark-200">
                  <p className="text-sm text-gray-400 mb-4">New projects are on the way.</p>
                  <button
                    onClick={goToContact}
                    className="btn-primary text-sm inline-flex items-center"
                  >
                    <Send className="mr-2" size={16} />
                    Discuss a project with us
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-8 md:py-10 bg-dark-200">
            <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                Have a Product Idea?
              </h2>
              <p className="text-sm text-gray-400 leading-snug mb-5">
                We partner with founders, institutions, and teams to research, build, and launch
                technology that holds up in production, from first prototype to deployed platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={goToContact}
                  className="btn-primary inline-flex items-center justify-center text-sm"
                >
                  <Send className="mr-2" size={16} />
                  Contact Us
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="btn-secondary inline-flex items-center justify-center text-sm"
                >
                  Our Services
                  <ArrowRight className="ml-2" size={16} />
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
