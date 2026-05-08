import React, { useState, useEffect } from 'react';
import { getProjectsData } from '../data/dataStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Globe, Github } from 'lucide-react';

const Projects = () => {
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

    // Listen for updates
    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener('projectsDataUpdated', handleUpdate);
    return () => window.removeEventListener('projectsDataUpdated', handleUpdate);
  }, []);

  // Use all projects without filtering

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
    <div className="min-h-screen bg-dark-200">
      <Header />

      {/* Page Hero */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-dark-100 to-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-500 mb-4">
            Our Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Cutting-edge projects in AI, blockchain, and advanced software solutions. 
            Explore the innovations we're building at Beta Tech Labs.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-800 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400">Showing all projects</p>
        </div>
      </section>

      {/* Projects Grid */}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="card p-8 hover:border-gold-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gold-500 group-hover:text-gold-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Links */}
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
