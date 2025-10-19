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
  Link
} from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('betaTechHubEvents');
    const savedTeam = localStorage.getItem('betaTechHubTeam');
    const savedServices = localStorage.getItem('betaTechHubServices');

    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
    if (savedServices) setServices(JSON.parse(savedServices));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('betaTechHubEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('betaTechHubTeam', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('betaTechHubServices', JSON.stringify(services));
  }, [services]);

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

  const startEditing = (type, id, data) => {
    setIsEditing(`${type}-${id}`);
    setEditData(data);
  };

  const stopEditing = () => {
    setIsEditing(null);
    setEditData({});
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
              { id: 'services', label: 'Services', icon: BookOpen }
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
                      <h3 className="text-lg font-bold text-gold-500 mb-2">{member.name}</h3>
                      <p className="text-gold-300 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.description}</p>
                      <div className="text-gray-400 text-sm space-y-1">
                        <p>X: @{member.handles.x}</p>
                        <p>LinkedIn: {member.handles.linkedin}</p>
                        <p>GitHub: {member.handles.github}</p>
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
      </div>
    </div>
  );
};

export default Admin;