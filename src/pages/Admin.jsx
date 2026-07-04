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
  Image as ImageIcon,
  MessageSquare,
  Target,
  Gem,
  Layers3,
  Mail,
  Send,
  Download,
  Loader,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { 
  getTeamData, 
  saveTeamData, 
  getEventsData, 
  saveEventsData,
  getServicesData,
  saveServicesData,
  getProjectsData,
  saveProjectsData,
  getTestimonialsData,
  deleteTestimonial,
  updateTestimonial,
  getSiteContent,
  saveSiteContent,
  defaultSiteContent,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
} from '../data/dataStore';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [broadcast, setBroadcast] = useState({
    subject: '',
    title: '',
    message: '',
    ctaLabel: '',
    ctaUrl: '',
    passphrase: '',
  });
  const [broadcastStatus, setBroadcastStatus] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const teamData = await getTeamData();
        const eventsData = await getEventsData();
        const projectsData = await getProjectsData();
        
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
        if (projectsData) {
          setProjects(Array.isArray(projectsData) ? projectsData : []);
        }

        const testimonialsData = await getTestimonialsData();
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);

        const servicesData = await getServicesData();
        if (servicesData) {
          const flatServices = [
            ...(servicesData.core || []).map((s) => ({ ...s, isCore: true })),
            ...(servicesData.additional || []).map((s) => ({ ...s, isCore: false })),
          ];
          setServices(flatServices);
        }

        const content = await getSiteContent();
        setSiteContent(content);

        const subscriberData = await getNewsletterSubscribers();
        setSubscribers(Array.isArray(subscriberData) ? subscriberData : []);

        const savedPassphrase = sessionStorage.getItem('newsletterSendKey');
        if (savedPassphrase) {
          setBroadcast((prev) => ({ ...prev, passphrase: savedPassphrase }));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const persistTeam = async (members) => {
    if (members.length === 0) return;
    await saveTeamData({
      ceo: members[0],
      topRow: members.slice(1, 3),
      bottomRow: members.slice(3),
    });
  };

  const persistServices = async (flatServices) => {
    await saveServicesData({
      core: flatServices.filter((s) => s.isCore),
      additional: flatServices.filter((s) => !s.isCore),
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminLoginTime');
    navigate('/admin-login');
  };

  const handleViewSite = () => {
    navigate('/');
  };

  const persistSiteContent = async (next) => {
    setSiteContent(next);
    await saveSiteContent(next);
  };

  const handleMissionChange = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      mission: { ...prev.mission, [field]: value },
    }));
  };

  const saveMission = async () => {
    await saveSiteContent(siteContent);
  };

  const addCoreValue = () => {
    const newValue = {
      id: `value-${Date.now()}`,
      title: 'New Value',
      motto: 'Motto here',
      description: 'Value description',
    };
    const next = { ...siteContent, coreValues: [...siteContent.coreValues, newValue] };
    persistSiteContent(next);
    startEditing(`value-${newValue.id}`, newValue);
  };

  const updateCoreValue = (id, updates) => {
    const next = {
      ...siteContent,
      coreValues: siteContent.coreValues.map((value) =>
        value.id === id ? { ...value, ...updates } : value
      ),
    };
    persistSiteContent(next);
  };

  const deleteCoreValue = (id) => {
    const next = {
      ...siteContent,
      coreValues: siteContent.coreValues.filter((value) => value.id !== id),
    };
    persistSiteContent(next);
  };

  const addPillar = () => {
    const newPillar = {
      id: `pillar-${Date.now()}`,
      label: 'New Pillar',
      title: 'Pillar title',
      description: 'Pillar description',
      listTitle: 'Focus Areas',
      items: ['Item one'],
    };
    const next = { ...siteContent, strategicPillars: [...siteContent.strategicPillars, newPillar] };
    persistSiteContent(next);
    startEditing(`pillar-${newPillar.id}`, newPillar);
  };

  const updatePillar = (id, updates) => {
    const next = {
      ...siteContent,
      strategicPillars: siteContent.strategicPillars.map((pillar) =>
        pillar.id === id ? { ...pillar, ...updates } : pillar
      ),
    };
    persistSiteContent(next);
  };

  const deletePillar = (id) => {
    const next = {
      ...siteContent,
      strategicPillars: siteContent.strategicPillars.filter((pillar) => pillar.id !== id),
    };
    persistSiteContent(next);
  };

  const handlePillarItemChange = (index, value) => {
    const items = [...(editData.items || [])];
    items[index] = value;
    handleEditChange('items', items);
  };

  const addPillarItem = () => {
    handleEditChange('items', [...(editData.items || []), 'New item']);
  };

  const removePillarItem = (index) => {
    handleEditChange('items', (editData.items || []).filter((_, i) => i !== index));
  };

  const handleServicesPageChange = (field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      servicesPage: { ...prev.servicesPage, [field]: value },
    }));
  };

  const saveServicesPage = async () => {
    await saveSiteContent(siteContent);
  };

  const updateEngagementStep = (step, updates) => {
    const next = {
      ...siteContent,
      servicesPage: {
        ...siteContent.servicesPage,
        engagementSteps: siteContent.servicesPage.engagementSteps.map((item) =>
          item.step === step ? { ...item, ...updates } : item
        ),
      },
    };
    persistSiteContent(next);
  };

  // Events Management
  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Event',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM - 4:00 PM',
      location: 'Beta Tech Labs, Kabale Main Town',
      venue: 'Beta Tech Labs HQ',
      category: 'Workshop',
      description: 'Event description',
      attendees: 25,
      images: [],
      highlights: [],
      registrationLink: '',
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    saveEventsData(updated);
    setIsEditing(newEvent.id);
    setEditData(newEvent);
  };

  const updateEvent = (id, updates) => {
    const updated = events.map((event) =>
      event.id === id ? { ...event, ...updates } : event
    );
    setEvents(updated);
    saveEventsData(updated);
  };

  const deleteEvent = (id) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    saveEventsData(updated);
  };

  const removeTestimonial = async (id) => {
    const ok = await deleteTestimonial(id);
    if (ok) {
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateFeedback = async (id, updates) => {
    const ok = await updateTestimonial(id, updates);
    if (ok) {
      setTestimonials((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    }
  };

  // Newsletter
  const removeSubscriber = async (id) => {
    const ok = await deleteNewsletterSubscriber(id);
    if (ok) {
      setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  const exportSubscribersCsv = () => {
    if (subscribers.length === 0) return;
    const rows = [
      ['Email', 'Subscribed At'],
      ...subscribers.map((sub) => [sub.email, sub.subscribedAt || '']),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBroadcastChange = (field, value) => {
    setBroadcast((prev) => ({ ...prev, [field]: value }));
  };

  const sendBroadcast = async () => {
    if (!broadcast.subject.trim() || !broadcast.message.trim()) {
      setBroadcastStatus('error');
      setBroadcastMessage('Subject and message are required.');
      return;
    }
    if (!broadcast.passphrase.trim()) {
      setBroadcastStatus('error');
      setBroadcastMessage('Enter your send passphrase.');
      return;
    }

    setBroadcastStatus('loading');
    setBroadcastMessage('');

    try {
      const response = await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(broadcast),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        sessionStorage.setItem('newsletterSendKey', broadcast.passphrase);
        setBroadcastStatus('success');
        setBroadcastMessage(data.message || 'Newsletter sent to all subscribers.');
        setBroadcast((prev) => ({
          ...prev,
          subject: '',
          title: '',
          message: '',
          ctaLabel: '',
          ctaUrl: '',
        }));
      } else {
        setBroadcastStatus('error');
        setBroadcastMessage(
          data.error ||
            'Could not send. Make sure the email service is configured on Vercel.'
        );
      }
    } catch (error) {
      setBroadcastStatus('error');
      setBroadcastMessage(
        'Could not reach the send service. This only works on the deployed site, not local preview.'
      );
    }
  };

  // Team Management
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Member',
      role: 'Team Member',
      image: '', // Start with empty image - Team component shows initials fallback
      description: 'Member description',
      handles: {
        x: 'username',
        linkedin: 'username',
        github: 'username'
      }
    };
    const updated = [...teamMembers, newMember];
    setTeamMembers(updated);
    persistTeam(updated);
    setIsEditing(`team-${newMember.id}`);
    setEditData(newMember);
  };

  const updateTeamMember = (id, updates) => {
    const updated = teamMembers.map((member) =>
      member.id === id ? { ...member, ...updates } : member
    );
    setTeamMembers(updated);
    persistTeam(updated);
  };

  const deleteTeamMember = (id) => {
    const updated = teamMembers.filter((member) => member.id !== id);
    setTeamMembers(updated);
    persistTeam(updated);
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
    const updated = [...services, newService];
    setServices(updated);
    persistServices(updated);
    setIsEditing(`service-${newService.id}`);
    setEditData(newService);
  };

  const updateService = (id, updates) => {
    const updated = services.map((service) =>
      service.id === id ? { ...service, ...updates } : service
    );
    setServices(updated);
    persistServices(updated);
  };

  const deleteService = (id) => {
    const updated = services.filter((service) => service.id !== id);
    setServices(updated);
    persistServices(updated);
  };

  // Projects Management
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project overview',
      status: 'In Planning',
      category: 'Development',
      progress: 0,
      tags: [],
      startDate: new Date().toISOString().split('T')[0],
      expectedEnd: new Date().toISOString().split('T')[0],
      team: [],
      highlights: [],
      liveUrl: '',
      liveUrlStatus: 'available',
      liveUrlPrivate: false,
      githubRepo: '',
      githubRepoPrivate: false
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    saveProjectsData(updated);
    setIsEditing(`project-${newProject.id}`);
    setEditData(newProject);
  };

  const updateProject = (id, updates) => {
    const updated = projects.map((project) =>
      project.id === id ? { ...project, ...updates } : project
    );
    setProjects(updated);
    saveProjectsData(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter((project) => project.id !== id);
    setProjects(updated);
    saveProjectsData(updated);
  };

  const startEditing = (type, id, data) => {
    setIsEditing(`${type}-${id}`);
    setEditData({ ...data }); // Create a copy to avoid reference issues
    // Initialize imagePreview - only set for URLs, not base64 (to avoid stale preview)
    if (data.image && typeof data.image === 'string' && !data.image.startsWith('data:')) {
      setImagePreview(data.image);
    } else {
      setImagePreview(null);
    }
  };

  const stopEditing = () => {
    setIsEditing(null);
    setEditData({});
    setImagePreview(null);
  };

  const saveEdit = () => {
    const dashIndex = isEditing.indexOf('-');
    const type = isEditing.substring(0, dashIndex);
    const id = isEditing.substring(dashIndex + 1);
    const numericId = Number(id);
    const resolvedId = Number.isNaN(numericId) ? id : numericId;

    switch (type) {
      case 'event':
        updateEvent(resolvedId, editData);
        break;
      case 'team':
        updateTeamMember(resolvedId, editData);
        break;
      case 'service':
        updateService(resolvedId, editData);
        break;
      case 'project':
        updateProject(resolvedId, editData);
        break;
      case 'feedback':
        updateFeedback(resolvedId, editData);
        break;
      case 'value':
        updateCoreValue(resolvedId, editData);
        break;
      case 'pillar':
        updatePillar(resolvedId, editData);
        break;
      case 'pipeline':
        updateEngagementStep(resolvedId, editData);
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
      // Store as a data URL string that can be used directly in img src
      handleEditChange('image', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleEventImagesText = (text) => {
    const images = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    handleEditChange('images', images);
  };

  const handleEventGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is over 2MB and was skipped`);
        return false;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(`${file.name} is not a supported image type and was skipped`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result || null);
            reader.readAsDataURL(file);
          })
      )
    ).then((uploaded) => {
      const newImages = uploaded.filter(Boolean);
      setEditData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    });

    e.target.value = '';
  };

  const removeEventImage = (index) => {
    setEditData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
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
                <h1 className="text-xl font-bold text-gold-500">Beta Tech Labs Admin</h1>
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
              { id: 'mission', label: 'Mission', icon: Target },
              { id: 'values', label: 'Values', icon: Gem },
              { id: 'pillars', label: 'Pillars', icon: Layers3 },
              { id: 'services', label: 'Services', icon: BookOpen },
              { id: 'projects', label: 'Projects', icon: Projector },
              { id: 'feedback', label: 'Feedback', icon: MessageSquare },
              { id: 'newsletter', label: 'Newsletter', icon: Mail },
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
                      <input
                        type="text"
                        value={editData.category || ''}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Category (Workshop, Bootcamp, Meetup)"
                      />
                      <input
                        type="text"
                        value={editData.registrationLink || ''}
                        onChange={(e) => handleEditChange('registrationLink', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Registration link (optional)"
                      />
                      <div className="rounded-lg border border-gold-500/20 bg-gold-500/5 p-4 space-y-3">
                        <p className="text-sm font-semibold text-gold-400">
                          Event photo gallery (public on website)
                        </p>
                        <p className="text-xs text-gray-400 leading-snug">
                          Upload photos after the event. Attendees can open the event on /events,
                          view the gallery, and download images. Use URLs or upload files below.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Image URLs, one per line (e.g. /images/events/photo.jpg)
                        </label>
                        <textarea
                          value={(editData.images || []).join('\n')}
                          onChange={(e) => handleEventImagesText(e.target.value)}
                          className="form-input text-sm font-mono"
                          rows="4"
                          placeholder="/images/events/workshop-1.jpg&#10;https://example.com/photo.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Or upload photos (JPEG, PNG, WebP, max 2MB each)
                        </label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={handleEventGalleryUpload}
                          className="form-input text-sm"
                        />
                      </div>
                      {(editData.images || []).length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {(editData.images || []).map((src, index) => (
                            <div key={`${index}-${src.slice(0, 24)}`} className="relative group">
                              <img
                                src={src}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-16 object-cover rounded-lg border border-gray-700"
                              />
                              <button
                                type="button"
                                onClick={() => removeEventImage(index)}
                                className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
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
                      {(event.images || []).length > 0 && (
                        <p className="text-green-400/90 text-xs mt-1 flex items-center gap-1">
                          <ImageIcon size={12} />
                          Gallery live: {(event.images || []).length} photo(s) on /events
                        </p>
                      )}
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
                        <label className="block">
                          <span className="text-xs font-medium text-gray-400 mb-2 block">Image (Upload or URL)</span>
                          <div className="flex items-center space-x-3">
                            <label className="flex-1">
                              <div className="flex items-center space-x-2 bg-dark-100 border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-gold-500/50 transition">
                                <Upload size={16} className="text-gold-500" />
                                <span className="text-sm text-gray-300">Click to upload</span>
                              </div>
                              <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </label>
                        <div className="text-center text-xs text-gray-500">OR</div>
                        <input
                          type="text"
                          value={typeof editData.image === 'string' && editData.image.startsWith('http') ? editData.image : ''}
                          onChange={(e) => {
                            const url = e.target.value;
                            setImagePreview(url || null);
                            handleEditChange('image', url);
                          }}
                          className="form-input text-sm"
                          placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
                        />
                        {(imagePreview || editData.image) && (
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gold-500/30 bg-dark-100 flex items-center justify-center">
                              <img 
                                src={imagePreview || editData.image} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const parent = e.target.parentElement;
                                  if (parent) {
                                    const errorSpan = document.createElement('span');
                                    errorSpan.className = 'text-xs text-red-400';
                                    errorSpan.textContent = 'Invalid';
                                    parent.appendChild(errorSpan);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-400">
                                {typeof editData.image === 'string' && editData.image.startsWith('data:') ? 'Base64 Image ✓' : 'Image URL ✓'}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  handleEditChange('image', '');
                                  setImagePreview(null);
                                }}
                                className="text-xs text-red-400 hover:text-red-300 mt-1"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
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

        {activeTab === 'mission' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Mission & Philosophy</h2>
              <p className="text-sm text-gray-400 mt-1">
                Updates the Who We Are section on the home page.
              </p>
            </div>

            <div className="card p-6 space-y-4">
              <input
                type="text"
                value={siteContent.mission.sectionEyebrow || ''}
                onChange={(e) => handleMissionChange('sectionEyebrow', e.target.value)}
                className="form-input text-sm"
                placeholder="Section eyebrow"
              />
              <input
                type="text"
                value={siteContent.mission.sectionTitle || ''}
                onChange={(e) => handleMissionChange('sectionTitle', e.target.value)}
                className="form-input text-sm"
                placeholder="Section title"
              />
              <textarea
                value={siteContent.mission.positioningStatement || ''}
                onChange={(e) => handleMissionChange('positioningStatement', e.target.value)}
                className="form-input text-sm"
                rows="3"
                placeholder="Positioning statement"
              />
              <textarea
                value={siteContent.mission.purpose || ''}
                onChange={(e) => handleMissionChange('purpose', e.target.value)}
                className="form-input text-sm"
                rows="3"
                placeholder="Purpose"
              />
              <textarea
                value={siteContent.mission.vision || ''}
                onChange={(e) => handleMissionChange('vision', e.target.value)}
                className="form-input text-sm"
                rows="3"
                placeholder="Vision"
              />
              <textarea
                value={siteContent.mission.mission || ''}
                onChange={(e) => handleMissionChange('mission', e.target.value)}
                className="form-input text-sm"
                rows="3"
                placeholder="Mission"
              />
              <input
                type="text"
                value={siteContent.mission.philosophy || ''}
                onChange={(e) => handleMissionChange('philosophy', e.target.value)}
                className="form-input text-sm"
                placeholder="Philosophy headline"
              />
              <textarea
                value={siteContent.mission.philosophyPractice || ''}
                onChange={(e) => handleMissionChange('philosophyPractice', e.target.value)}
                className="form-input text-sm"
                rows="3"
                placeholder="Philosophy practice"
              />
              <button onClick={saveMission} className="btn-primary">
                <Save className="mr-2 inline" size={16} />
                Save Mission
              </button>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gold-500">Core Values</h2>
                <p className="text-sm text-gray-400 mt-1">Shown on the home page values section.</p>
              </div>
              <button onClick={addCoreValue} className="btn-primary flex items-center">
                <Plus className="mr-2" size={16} />
                Add Value
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {siteContent.coreValues.map((value) => (
                <div key={value.id} className="card p-6">
                  {isEditing === `value-${value.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={editData.motto || ''}
                        onChange={(e) => handleEditChange('motto', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Motto"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="4"
                        placeholder="Description"
                      />
                      <div className="flex space-x-2">
                        <button onClick={saveEdit} className="btn-primary flex-1 flex items-center justify-center text-sm">
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button onClick={stopEditing} className="btn-secondary flex-1 flex items-center justify-center text-sm">
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-white mb-1">{value.title}</h3>
                      <p className="text-sm text-gold-500 mb-2">{value.motto}</p>
                      <p className="text-sm text-gray-400 mb-4">{value.description}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing('value', value.id, value)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCoreValue(value.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-3 rounded-lg text-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pillars' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gold-500">Strategic Pillars</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Shown on the home page ecosystem section and the services page pillars.
                </p>
              </div>
              <button onClick={addPillar} className="btn-primary flex items-center">
                <Plus className="mr-2" size={16} />
                Add Pillar
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {siteContent.strategicPillars.map((pillar) => (
                <div key={pillar.id} className="card p-6">
                  {isEditing === `pillar-${pillar.id}` ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.label || ''}
                        onChange={(e) => handleEditChange('label', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Title"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="3"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={editData.listTitle || ''}
                        onChange={(e) => handleEditChange('listTitle', e.target.value)}
                        className="form-input text-sm"
                        placeholder="List title"
                      />
                      <div className="space-y-2">
                        <label className="form-label text-sm">List items</label>
                        {(editData.items || []).map((item, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handlePillarItemChange(index, e.target.value)}
                              className="form-input text-sm flex-1"
                            />
                            <button
                              onClick={() => removePillarItem(index)}
                              className="bg-red-500/20 text-red-400 px-3 rounded-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button onClick={addPillarItem} className="btn-secondary w-full text-sm">
                          <Plus className="mr-1" size={14} />
                          Add Item
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={saveEdit} className="btn-primary flex-1 flex items-center justify-center text-sm">
                          <Save className="mr-1" size={14} />
                          Save
                        </button>
                        <button onClick={stopEditing} className="btn-secondary flex-1 flex items-center justify-center text-sm">
                          <X className="mr-1" size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">{pillar.label}</p>
                      <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{pillar.description}</p>
                      <ul className="text-sm text-gray-500 mb-4 space-y-1">
                        {pillar.items?.map((item) => (
                          <li key={item}>· {item}</li>
                        ))}
                      </ul>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing('pillar', pillar.id, pillar)}
                          className="btn-secondary flex-1 flex items-center justify-center text-sm"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deletePillar(pillar.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-3 rounded-lg text-sm"
                        >
                          <Trash2 size={14} />
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
              <div>
                <h2 className="text-2xl font-bold text-gold-500">Services Management</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Service cards appear on the Technologies section at /services. Edit pillars under the Pillars tab.
                </p>
              </div>
              <button
                onClick={addService}
                className="btn-primary flex items-center"
              >
                <Plus className="mr-2" size={16} />
                Add Service
              </button>
            </div>

            <div className="card p-6 mb-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Services Page Copy</h3>
              <textarea
                value={siteContent.servicesPage.pillarsSubtitle || ''}
                onChange={(e) => handleServicesPageChange('pillarsSubtitle', e.target.value)}
                className="form-input text-sm"
                rows="2"
                placeholder="Pillars section subtitle"
              />
              <textarea
                value={siteContent.servicesPage.techSectionSubtitle || ''}
                onChange={(e) => handleServicesPageChange('techSectionSubtitle', e.target.value)}
                className="form-input text-sm"
                rows="2"
                placeholder="Technologies section subtitle"
              />
              <button onClick={saveServicesPage} className="btn-primary text-sm">
                <Save className="mr-2 inline" size={14} />
                Save Page Copy
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-4">Technology & Service Cards</h3>
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

            <div className="mt-10">
              <h3 className="text-lg font-bold text-white mb-4">Innovation Pipeline Steps</h3>
              <p className="text-sm text-gray-400 mb-4">Shown on the services page pipeline section.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteContent.servicesPage.engagementSteps.map((step) => (
                  <div key={step.step} className="card p-5">
                    {isEditing === `pipeline-${step.step}` ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleEditChange('title', e.target.value)}
                          className="form-input text-sm"
                          placeholder="Title"
                        />
                        <textarea
                          value={editData.text || ''}
                          onChange={(e) => handleEditChange('text', e.target.value)}
                          className="form-input text-sm"
                          rows="3"
                          placeholder="Description"
                        />
                        <div className="flex space-x-2">
                          <button onClick={saveEdit} className="btn-primary flex-1 text-sm">
                            Save
                          </button>
                          <button onClick={stopEditing} className="btn-secondary flex-1 text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs text-gold-500 font-bold">{step.step}</span>
                        <h4 className="text-white font-semibold mt-1 mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-400 mb-3">{step.text}</p>
                        <button
                          onClick={() => startEditing('pipeline', step.step, step)}
                          className="btn-secondary w-full text-sm flex items-center justify-center"
                        >
                          <Edit className="mr-1" size={14} />
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
                        placeholder="Project Name"
                      />
                      <textarea
                        value={editData.description || ''}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className="form-input text-sm"
                        rows="3"
                        placeholder="Overview"
                      />
                      <input
                        type="url"
                        value={editData.githubRepo || ''}
                        onChange={(e) => handleEditChange('githubRepo', e.target.value)}
                        className="form-input text-sm"
                        placeholder="GitHub Repository URL"
                      />
                      <input
                        type="url"
                        value={editData.liveUrl || ''}
                        onChange={(e) => handleEditChange('liveUrl', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Live Site URL (optional)"
                      />
                      <div className="space-y-2">
                        <label className="form-label text-sm">Live Link Status</label>
                        <select
                          value={editData.liveUrlStatus || 'available'}
                          onChange={(e) => handleEditChange('liveUrlStatus', e.target.value)}
                          className="form-input text-sm"
                        >
                          <option value="available">Available</option>
                          <option value="coming-soon">Coming Soon</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="liveUrlPrivate"
                          checked={editData.liveUrlPrivate || false}
                          onChange={(e) => handleEditChange('liveUrlPrivate', e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="liveUrlPrivate" className="form-label text-sm">
                          Keep Live Site Link Private
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="githubRepoPrivate"
                          checked={editData.githubRepoPrivate || false}
                          onChange={(e) => handleEditChange('githubRepoPrivate', e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="githubRepoPrivate" className="form-label text-sm">
                          Keep GitHub Repository Private
                        </label>
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
                      {(project.liveUrl || project.githubRepo) && (
                        <div className="mb-3 flex gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold-400 text-xs hover:text-gold-300 hover:underline"
                            >
                              Live Site
                            </a>
                          )}
                          {project.githubRepo && (
                            <a
                              href={project.githubRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 text-xs hover:text-gray-300 hover:underline"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
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

        {activeTab === 'feedback' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gold-500">Client Feedback</h2>
              <p className="text-sm text-gray-400 mt-1">
                Feedback submitted by visitors on the home page. Edit or remove entries as needed.
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="card p-8 text-center text-gray-400">No client feedback submitted yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                  <div key={item.id} className="card p-6">
                    {isEditing === `feedback-${item.id}` ? (
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
                        <input
                          type="text"
                          value={editData.organization || ''}
                          onChange={(e) => handleEditChange('organization', e.target.value)}
                          className="form-input text-sm"
                          placeholder="Organization"
                        />
                        <input
                          type="text"
                          value={editData.location || ''}
                          onChange={(e) => handleEditChange('location', e.target.value)}
                          className="form-input text-sm"
                          placeholder="Location"
                        />
                        <textarea
                          value={editData.quote || ''}
                          onChange={(e) => handleEditChange('quote', e.target.value)}
                          className="form-input text-sm"
                          rows="4"
                          placeholder="Feedback"
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
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
                        <p className="text-gold-500 font-semibold text-sm">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.role}</p>
                        <p className="text-gray-500 text-sm mb-4">
                          {item.organization}
                          {item.location ? ` · ${item.location}` : ''}
                        </p>
                        {item.createdAt && (
                          <p className="text-xs text-gray-600 mb-4">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        )}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing('feedback', item.id, item)}
                            className="btn-secondary flex-1 flex items-center justify-center text-sm"
                          >
                            <Edit className="mr-1" size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => removeTestimonial(item.id)}
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
            )}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subscribers */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gold-500">Subscribers</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {subscribers.length} {subscribers.length === 1 ? 'person has' : 'people have'}{' '}
                    subscribed from the site footer.
                  </p>
                </div>
                <button
                  onClick={exportSubscribersCsv}
                  disabled={subscribers.length === 0}
                  className="btn-secondary flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="mr-2" size={16} />
                  Export CSV
                </button>
              </div>

              {subscribers.length === 0 ? (
                <div className="card p-8 text-center text-gray-400">
                  No subscribers yet. Emails appear here when visitors subscribe in the footer.
                </div>
              ) : (
                <div className="card divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                  {subscribers.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between px-4 py-3">
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{sub.email}</p>
                        {sub.subscribedAt && (
                          <p className="text-xs text-gray-500">
                            {new Date(sub.subscribedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeSubscriber(sub.id)}
                        className="text-red-400 hover:text-red-300 p-2 flex-shrink-0"
                        aria-label="Remove subscriber"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compose broadcast */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gold-500">Send a Newsletter</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Email every subscriber, for example when you add a new event or feature.
                </p>
              </div>

              <div className="card p-6 space-y-4">
                <div>
                  <label className="form-label text-sm">Subject line *</label>
                  <input
                    type="text"
                    value={broadcast.subject}
                    onChange={(e) => handleBroadcastChange('subject', e.target.value)}
                    className="form-input text-sm"
                    placeholder="New event: React & Modern Frontend Workshop"
                  />
                </div>
                <div>
                  <label className="form-label text-sm">Heading (optional)</label>
                  <input
                    type="text"
                    value={broadcast.title}
                    onChange={(e) => handleBroadcastChange('title', e.target.value)}
                    className="form-input text-sm"
                    placeholder="Defaults to the subject line"
                  />
                </div>
                <div>
                  <label className="form-label text-sm">Message *</label>
                  <textarea
                    value={broadcast.message}
                    onChange={(e) => handleBroadcastChange('message', e.target.value)}
                    className="form-input text-sm"
                    rows="6"
                    placeholder="Write your update here. Each new line becomes a paragraph."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label text-sm">Button text (optional)</label>
                    <input
                      type="text"
                      value={broadcast.ctaLabel}
                      onChange={(e) => handleBroadcastChange('ctaLabel', e.target.value)}
                      className="form-input text-sm"
                      placeholder="Register now"
                    />
                  </div>
                  <div>
                    <label className="form-label text-sm">Button link (optional)</label>
                    <input
                      type="url"
                      value={broadcast.ctaUrl}
                      onChange={(e) => handleBroadcastChange('ctaUrl', e.target.value)}
                      className="form-input text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label text-sm">Send passphrase *</label>
                  <input
                    type="password"
                    value={broadcast.passphrase}
                    onChange={(e) => handleBroadcastChange('passphrase', e.target.value)}
                    className="form-input text-sm"
                    placeholder="Your NEWSLETTER_ADMIN_KEY"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This must match the NEWSLETTER_ADMIN_KEY you set on Vercel. It is never stored in
                    the website code.
                  </p>
                </div>

                <button
                  onClick={sendBroadcast}
                  disabled={broadcastStatus === 'loading'}
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {broadcastStatus === 'loading' ? (
                    <>
                      <Loader className="mr-2 animate-spin" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={16} />
                      Send to {subscribers.length} subscriber{subscribers.length === 1 ? '' : 's'}
                    </>
                  )}
                </button>

                {broadcastStatus === 'success' && (
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 flex items-start gap-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-green-300/90 text-sm leading-snug">{broadcastMessage}</p>
                  </div>
                )}
                {broadcastStatus === 'error' && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2">
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-red-300/90 text-sm leading-snug">{broadcastMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;