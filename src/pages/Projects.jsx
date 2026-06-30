import React, { useState, useEffect } from 'react';
import { getProjectsData } from '../data/dataStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Globe, Github } from 'lucide-react';
import { SITE } from '../config/site';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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

    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener('projectsDataUpdated', handleUpdate);
    return () => window.removeEventListener('projectsDataUpdated', handleUpdate);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Launched':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'In Development':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'In Testing':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <>
      <SEO
        title="Our Projects - AI, Blockchain & Software"
        description={`Explore cutting-edge projects from ${SITE.name} — AI, blockchain, and advanced software solutions built in ${SITE.location}.`}
        keywords="AI projects Uganda, blockchain projects, software development Kabale, tech portfolio"
        ogUrl={`${SITE.url}/projects`}
        ogImage={`${SITE.url}/images/og-image.svg`}
      />
      <div className="min-h-screen bg-dark-200">
        <Header />

        <section className="pt-20 pb-12 bg-gradient-to-b from-dark-100 to-dark-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gold-500 mb-4">Our Projects</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Cutting-edge projects in AI, blockchain, and advanced software solutions.
              Explore the innovations we&apos;re building at {SITE.name}.
            </p>
          </div>
        </section>

        <section className="py-8 border-b border-gray-800 bg-dark-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-400">
              Showing {showAll ? projects.length : Math.min(3, projects.length)} of {projects.length} projects
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No projects yet. Check back soon!</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
                  {(showAll ? projects : projects.slice(0, 3)).map((project) => (
                    <div
                      key={project.id}
                      className="card p-8 hover:border-gold-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3 gap-4">
                        <h3 className="text-2xl font-bold text-gold-500 group-hover:text-gold-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        )}
                      </div>

                      {project.category && (
                        <p className="text-gold-300 text-sm mb-3">{project.category}</p>
                      )}

                      <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-gold-500/10 text-gold-400 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        {!project.liveUrlPrivate && (
                          <>
                            {project.liveUrlStatus === 'coming-soon' ? (
                              <span className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-lg">
                                <Globe size={16} />
                                <span className="text-sm font-medium">Coming Soon</span>
                              </span>
                            ) : project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 border border-gold-500/30 rounded-lg transition-all duration-300"
                              >
                                <Globe size={16} />
                                <span className="text-sm font-medium">Live Site</span>
                              </a>
                            ) : null}
                          </>
                        )}
                        {!project.githubRepoPrivate && project.githubRepo && (
                          <a
                            href={project.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600/10 text-gray-400 hover:bg-gray-600/20 border border-gray-600/30 rounded-lg transition-all duration-300"
                          >
                            <Github size={16} />
                            <span className="text-sm font-medium">GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {projects.length > 3 && !showAll && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={() => setShowAll(true)}
                      className="btn-primary px-8 py-3 text-base flex items-center gap-2"
                    >
                      View All Projects ({projects.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Projects;
