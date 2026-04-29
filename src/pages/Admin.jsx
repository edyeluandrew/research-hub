import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LogOut, 
  Calendar, 
  Users, 
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Brain,
  Code,
  GraduationCap,
  Projector,
  Cpu,
  Link,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  getTeamData, 
  saveTeamData, 
  getEventsData, 
  saveEventsData
} from '../data/dataStore';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const teamData = await getTeamData();
        const eventsData = await getEventsData();
        
        if (teamData) {
          // Load ALL team members (CEO + topRow + bottomRow)
          const allMembers = [];
          if (teamData.ceo) allMembers.push(teamData.ceo);
          if (teamData.topRow) allMembers.push(...teamData.topRow);
          if (teamData.bottomRow) allMembers.push(...teamData.bottomRow);
          setTeamMembers(allMembers);
        }
        if (eventsData) {
          setEvents(Array.isArray(eventsData) ? eventsData : []);
        }
        
        // Also load from localStorage as fallback
        const savedEvents = localStorage.getItem('betaTechHubEvents');
        const savedServices = localStorage.getItem('betaTechHubServices');
        const savedProjects = localStorage.getItem('betaTechHubProjects');

        if (savedEvents) setEvents(JSON.parse(savedEvents));
        if (savedServices) setServices(JSON.parse(savedServices));
        if (savedProjects) setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Sync team data to Firebase
  useEffect(() => {
    if (teamMembers.length > 0 && !loading) {
      const syncTeamData = async () => {
        const currentTeamData = await getTeamData();
        const updatedTeamData = {
          ...currentTeamData,
          ceo: teamMembers[0], // First member is CEO
          topRow: teamMembers.slice(1, 3), // Next 2 are top row
          bottomRow: teamMembers.slice(3) // Rest are bottom row
        };
        await saveTeamData(updatedTeamData);
      };
      syncTeamData();
    }
  }, [teamMembers, loading]);

  // Sync events data to Firebase
  useEffect(() => {
    if (events.length > 0 && !loading) {
      const syncEventsData = async () => {
        await saveEventsData(events);
      };
      syncEventsData();
    }
  }, [events, loading]);

  // Save data to localStorage whenever it changes (backup)
  useEffect(() => {
    localStorage.setItem('betaTechHubEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('betaTechHubTeam', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('betaTechHubServices', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('betaTechHubProjects', JSON.stringify(projects));
  }, [projects]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleViewSite = () => {
    navigate('/');
  };

  // Events Management
  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Event',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM - 4:00 PM',
      location: 'Beta Tech Hub, Kabale',
      description: 'Event description',
      attendees: 25
    };
    setEvents(prev => [...prev, newEvent]);
    setIsEditing(newEvent.id);
    setEditData(newEvent);
  };

  const updateEvent = (id, updates) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Team Management
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Member',
      role: 'Team Member',
      image: '/images/team/placeholder.jpg',
      description: 'Member description',
      handles: {
        x: 'username',
        linkedin: 'username',
        github: 'username'
      }
    };
    setTeamMembers(prev => [...prev, newMember]);
    setIsEditing(`team-${newMember.id}`);
    setEditData(newMember);
  };

  const updateTeamMember = (id, updates) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const deleteTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  // Services Management
  const addService = () => {
    const newService = {
      id: Date.now(),
      title: 'New Service',
      description: 'Service description',
      features: ['Feature 1', 'Feature 2'],
      isCore: false
    };
    setServices(prev => [...prev, newService]);
    setIsEditing(`service-${newService.id}`);
    setEditData(newService);
  };

  const updateService = (id, updates) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  // Projects Management
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      status: 'In Planning',
      category: 'Development',
      progress: 0,
      tags: [],
      startDate: new Date().toISOString().split('T')[0],
      expectedEnd: new Date().toISOString().split('T')[0],
      team: [],
      highlights: ['Highlight 1']
    };
    setProjects(prev => [...prev, newProject]);
    setIsEditing(`project-${newProject.id}`);
    setEditData(newProject);
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const startEditing = (type, id, data) => {
    setIsEditing(`${type}-${id}`);
    setEditData(data);
  };

  const stopEditing = () => {
    setIsEditing(null);
    setEditData({});
    setImagePreview(null);
  };

  const saveEdit = () => {
    const [type, id] = isEditing.split('-');
    const numericId = parseInt(id);

    switch (type) {
      case 'event':
        updateEvent(numericId, editData);
        break;
      case 'team':
        updateTeamMember(numericId, editData);
        break;
      case 'service':
        updateService(numericId, editData);
        break;
      case 'project':
        updateProject(numericId, editData);
        break;
      default:
        break;
    }
    stopEditing();
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialHandleChange = (platform, value) => {
    setEditData(prev => ({
      ...prev,
      handles: {
        ...prev.handles,
        [platform]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result;
      setImagePreview(base64String);
      handleEditChange('image', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...(editData.features || [])];
    newFeatures[index] = value;
    setEditData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setEditData(prev => ({
      ...prev,
      features: [...(prev.features || []), 'New Feature']
    }));
  };

  const removeFeature = (index) => {
    setEditData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...(editData.highlights || [])];
    newHighlights[index] = value;
    setEditData(prev => ({
      ...prev,
      highlights: newHighlights
    }));
  };

  const addHighlight = () => {
    setEditData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), 'New Highlight']
    }));
  };

  const removeHighlight = (index) => {
    setEditData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...(editData.tags || [])];
    newTags[index] = value;
    setEditData(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  const addTag = () => {
    setEditData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), 'New Tag']
    }));
  };

  const removeTag = (index) => {
    setEditData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Header */}
      <header className="bg-dark-100 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <Settings className="text-dark-200" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gold-500">Beta Tech Hub Admin</h1>
                <p className="text-xs text-gray-400 -mt-1">Management Panel</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleViewSite}
                className="btn-secondary flex items-center"
              >
                <Eye className="mr-2" size={16} />
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="btn-primary flex items-center"
              >
                <LogOut className="mr-2" size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-dark-100 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'services', label: 'Services', icon: BookOpen },
              { id: 'projects', label: 'Projects', icon: Projector }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-gold-500 text-gold-500'
                      : 'border-transparent text-gray-400 hover:text-gold-400'
                  }`}
                >
                  <TabIcon className="mr-2" size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Events Management */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Events Management</h2>
              <button
                onClick={addEvent}
                className="btn-primary flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Add Event
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="card p-6">
                  {isEditing === `event-${event.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Event Title"
                      />
                      <input
                        type="date"
                        value={editData.date || ''}
                        onChange={(e) => handleEditChange('date', e.target.value)}
                        className="form-input text-sm"
                      />
                      <input
                        type="text"
                        value={editData.time || ''}
                        onChange={(e) => handleEditChange('time', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Time"
                      />
                      <input
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => handleEditChange('location', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Location"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="3"
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        value={editData.attendees || ''}
                        onChange={(e) => handleEditChange('attendees', parseInt(e.target.value))}
                        className="form-input text-sm"
                        placeholder="Attendees"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="btn-primary flex-1 flex items-center justify-center text-sm"
                        >
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button
                          onClick={stopEditing}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-gold-500 mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{event.date} • {event.time}</p>
                      <p className="text-gray-400 text-sm mb-2">{event.location}</p>
                      <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                      <p className="text-gold-400 text-sm">Attendees: {event.attendees}</p>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => startEditing('event', event.id, event)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Trash2 className="mr-1" size={14} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Management */}
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Team Management</h2>
              <button
                onClick={addTeamMember}
                className="btn-primary flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Add Member
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="card p-6">
                  {isEditing === `team-${member.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.name || ''}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editData.role || ''}
                        onChange={(e) => handleEditChange('role', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Role"
                      />
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <label className="flex-1">
                            <div className="flex items-center space-x-2 bg-dark-100 border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-gold-500/50 transition">
                              <Upload size={16} className="text-gold-500" />
                              <span className="text-sm text-gray-300">Click to upload image</span>
                            </div>
                            <input
                              type="file"
                              onChange={handleImageUpload}
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                            />
                          </label>
                        </div>
                        {(imagePreview || editData.image) && typeof (imagePreview || editData.image) === 'string' && (imagePreview || editData.image).startsWith('data:') && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gold-500/30">
                            <img 
                              src={imagePreview || editData.image} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {editData.image && typeof editData.image === 'string' && !editData.image.startsWith('data:') && (
                          <div className="text-xs text-gray-400">Image URL: {editData.image.substring(0, 50)}...</div>
                        )}
                      </div>
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="3"
                        placeholder="Description"
                      />
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editData.handles?.x || ''}
                          onChange={(e) => handleSocialHandleChange('x', e.target.value)}
                          className="form-input text-sm"
                          placeholder="X/Twitter Handle"
                        />
                        <input
                          type="text"
                          value={editData.handles?.linkedin || ''}
                          onChange={(e) => handleSocialHandleChange('linkedin', e.target.value)}
                          className="form-input text-sm"
                          placeholder="LinkedIn Handle"
                        />
                        <input
                          type="text"
                          value={editData.handles?.github || ''}
                          onChange={(e) => handleSocialHandleChange('github', e.target.value)}
                          className="form-input text-sm"
                          placeholder="GitHub Handle"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="btn-primary flex-1 flex items-center justify-center text-sm"
                        >
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button
                          onClick={stopEditing}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {member.image && (
                        <div className="mb-4 rounded-lg overflow-hidden h-48">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gold-500 mb-1">{member.name}</h3>
                      <p className="text-gold-300 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-3">{member.description}</p>
                      <div className="text-gray-400 text-xs space-y-1 mb-4">
                        <p>X: {member.handles?.x || 'N/A'}</p>
                        <p>LinkedIn: {member.handles?.linkedin || 'N/A'}</p>
                        {member.handles?.github && <p>GitHub: {member.handles.github}</p>}
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => startEditing('team', member.id, member)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTeamMember(member.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Trash2 className="mr-1" size={14} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Management */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Services Management</h2>
              <button
                onClick={addService}
                className="btn-primary flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Add Service
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.id} className="card p-6">
                  {isEditing === `service-${service.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Service Title"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="3"
                        placeholder="Description"
                      />
                      <div className="space-y-2">
                        <label className="form-label text-sm">Features</label>
                        {(editData.features || []).map((feature, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              className="form-input text-sm flex-1"
                              placeholder="Feature"
                            />
                            <button
                              onClick={() => removeFeature(index)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 rounded-lg transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addFeature}
                          className="btn-secondary w-full text-sm"
                        >
                          <Plus className="mr-1" size={14} />
                          Add Feature
                        </button>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editData.isCore || false}
                          onChange={(e) => handleEditChange('isCore', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-gray-400 text-sm">Core Service</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="btn-primary flex-1 flex items-center justify-center text-sm"
                        >
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button
                          onClick={stopEditing}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-gold-500 mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                      <div className="space-y-1 mb-4">
                        {service.features.map((feature, index) => (
                          <p key={index} className="text-gray-400 text-sm">• {feature}</p>
                        ))}
                      </div>
                      {service.isCore && (
                        <span className="text-gold-500 text-sm font-medium">Core Service</span>
                      )}
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => startEditing('service', service.id, service)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Trash2 className="mr-1" size={14} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Management */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Projects Management</h2>
              <button
                onClick={addProject}
                className="btn-primary flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Add Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card p-6">
                  {isEditing === `project-${project.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Project Title"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="2"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={editData.category || ''}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Category"
                      />
                      <select
                        value={editData.status || 'In Planning'}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="form-input text-sm"
                      >
                        <option>In Planning</option>
                        <option>In Development</option>
                        <option>In Testing</option>
                        <option>Launched</option>
                      </select>
                      <div className="flex space-x-2">
                        <label className="text-gray-400 text-sm">Progress: {editData.progress}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editData.progress || 0}
                          onChange={(e) => handleEditChange('progress', parseInt(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={editData.startDate || ''}
                          onChange={(e) => handleEditChange('startDate', e.target.value)}
                          className="form-input text-sm flex-1"
                        />
                        <input
                          type="date"
                          value={editData.expectedEnd || ''}
                          onChange={(e) => handleEditChange('expectedEnd', e.target.value)}
                          className="form-input text-sm flex-1"
                        />
                      </div>
                      <input
                        type="text"
                        value={(editData.team || []).join(', ')}
                        onChange={(e) => handleEditChange('team', e.target.value.split(', ').map(t => t.trim()))}
                        className="form-input text-sm"
                        placeholder="Team members (comma-separated)"
                      />
                      <div className="space-y-2">
                        <label className="form-label text-sm">Tags</label>
                        {(editData.tags || []).map((tag, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              value={tag}
                              onChange={(e) => handleTagChange(index, e.target.value)}
                              className="form-input text-sm flex-1"
                              placeholder="Tag"
                            />
                            <button
                              onClick={() => removeTag(index)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 rounded-lg transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addTag}
                          className="btn-secondary w-full text-sm"
                        >
                          <Plus className="mr-1" size={14} />
                          Add Tag
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="form-label text-sm">Highlights</label>
                        {(editData.highlights || []).map((highlight, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => handleHighlightChange(index, e.target.value)}
                              className="form-input text-sm flex-1"
                              placeholder="Highlight"
                            />
                            <button
                              onClick={() => removeHighlight(index)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 rounded-lg transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addHighlight}
                          className="btn-secondary w-full text-sm"
                        >
                          <Plus className="mr-1" size={14} />
                          Add Highlight
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="btn-primary flex-1 flex items-center justify-center text-sm"
                        >
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button
                          onClick={stopEditing}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gold-500 mb-1">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4 ${
                          project.status === 'Launched' 
                            ? 'bg-green-500/20 text-green-400'
                            : project.status === 'In Development'
                            ? 'bg-blue-500/20 text-blue-400'
                            : project.status === 'In Testing'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gold-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                            style={{width: `${project.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      <p className="text-gold-300 text-sm mb-2">{project.category}</p>
                      <p className="text-gray-400 text-xs mb-2">
                        {project.startDate} to {project.expectedEnd}
                      </p>
                      <div className="mb-3 space-y-2">
                        {project.team && project.team.length > 0 && (
                          <p className="text-gray-400 text-sm">Team: {project.team.join(', ')}</p>
                        )}
                        {project.highlights && project.highlights.length > 0 && (
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Highlights:</p>
                            <div className="space-y-1">
                              {project.highlights.map((highlight, index) => (
                                <p key={index} className="text-gray-400 text-sm">• {highlight}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="bg-gold-500/20 text-gold-400 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing('project', project.id, project)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Trash2 className="mr-1" size={14} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;