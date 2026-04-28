import React, { useState, useEffect } from 'react';
import { getProjectsData } from '../data/dataStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

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

  // Get unique categories and statuses
  const categories = ['All', ...new Set(projects.map(p => p.category || 'Other'))];
  const statuses = ['All', ...new Set(projects.map(p => p.status || 'Planned'))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gold-500 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gold-500 text-dark-200 font-medium'
                        : 'bg-dark-200 text-gray-400 hover:bg-dark-100 border border-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gold-500 mb-3">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-gold-500 text-dark-200 font-medium'
                        : 'bg-dark-200 text-gray-400 hover:bg-dark-100 border border-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found matching the selected filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="card p-8 hover:border-gold-500/50 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gold-500 mb-2 group-hover:text-gold-400 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className={`text-sm px-3 py-1 rounded-full inline-block ${getStatusColor(project.status)}`}>
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Category and Dates */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-700">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Category</p>
                      <p className="text-gold-400">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Start Date</p>
                      <p className="text-gray-300">{project.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Expected End</p>
                      <p className="text-gray-300">{project.expectedEnd}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-gold-500 font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-gold-500 to-gold-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team */}
                  {project.team && project.team.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Team</p>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member, index) => (
                          <span key={index} className="bg-dark-100 text-gray-300 text-sm px-3 py-1 rounded-lg">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Key Features</p>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="text-gold-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                            <span className="text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gold-500/10 text-gold-400 text-xs px-2.5 py-1 rounded-full border border-gold-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
