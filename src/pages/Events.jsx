import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { getEventsData } from '../data/dataStore';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventsData, setEventsData] = useState(null);

  // Listen for updates from admin panel
  useEffect(() => {
    const loadData = async () => {
      const data = await getEventsData();
      setEventsData(data);
    };
    loadData();
  }, []);

  // Real-time listener for Firebase updates
  useEffect(() => {
    const handleUpdate = () => {
      getEventsData().then(data => setEventsData(data));
    };
    window.addEventListener('eventsDataUpdated', handleUpdate);
    return () => window.removeEventListener('eventsDataUpdated', handleUpdate);
  }, []);

  // ============================================================
  // AUTO-CATEGORIZE EVENTS BASED ON DATE
  // ============================================================
  const categorizeEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];

    (eventsData || []).forEach(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate >= today) {
        upcoming.push({ ...event, status: 'upcoming' });
      } else {
        past.push({ ...event, status: 'completed' });
      }
    });

    // Sort upcoming by nearest first
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Sort past by most recent first
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcoming, past };
  };

  const { upcoming, past } = categorizeEvents();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDaysUntilEvent = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const openGallery = (event, imageIndex = 0) => {
    if (event.images && event.images.length > 0) {
      setSelectedEvent(event);
      setCurrentImageIndex(imageIndex);
    }
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  // ============================================================
  // EVENT CARD COMPONENT
  // ============================================================
  const EventCard = ({ event, isPast = false }) => (
    <div className={`card p-6 group hover:border-gold-500/50 transition-all duration-300 ${
      isPast ? 'border-gray-600/30' : 'border-2 border-gold-500/30'
    }`}>
      {/* Event Images Preview */}
      {event.images && event.images.length > 0 && (
        <div 
          className="relative h-48 mb-4 rounded-lg overflow-hidden cursor-pointer group/image"
          onClick={() => openGallery(event)}
        >
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x200?text=Event+Photo';
            }}
          />
          {event.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <ImageIcon size={12} className="mr-1" />
              +{event.images.length - 1} more
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium">View Gallery</span>
          </div>
        </div>
      )}

      {/* No images placeholder for past events */}
      {isPast && (!event.images || event.images.length === 0) && (
        <div className="h-32 mb-4 rounded-lg bg-dark-200 flex items-center justify-center border border-gray-700">
          <div className="text-center">
            <ImageIcon size={32} className="text-gray-600 mx-auto mb-2" />
            <span className="text-gray-500 text-xs">No photos yet</span>
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        {isPast ? (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium flex items-center">
            <CheckCircle className="mr-1" size={12} />
            Completed
          </span>
        ) : (
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
            getDaysUntilEvent(event.date) <= 7 
              ? 'bg-orange-500/20 text-orange-400' 
              : 'bg-green-500/20 text-green-400'
          }`}>
            <CheckCircle className="mr-1" size={12} />
            {getDaysUntilEvent(event.date) === 0 ? 'Today' : 
             getDaysUntilEvent(event.date) === 1 ? 'Tomorrow' : 
             `In ${getDaysUntilEvent(event.date)} days`}
          </span>
        )}
        <span className="text-gray-400 text-sm font-medium flex items-center">
          <Users className="mr-1" size={14} />
          {isPast ? `${event.attendees} attended` : `${event.attendees} spots`}
        </span>
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-bold font-heading text-gold-500 mb-3 group-hover:text-gold-400 transition-colors duration-300">
        {event.title}
      </h3>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="mr-2 text-gold-500 flex-shrink-0" size={16} />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="mr-2 text-gold-500 flex-shrink-0" size={16} />
          {event.time}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="mr-2 text-gold-500 flex-shrink-0" size={16} />
          {event.location}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
        {event.description}
      </p>

      {/* Highlights */}
      {event.highlights && event.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {event.highlights.map((highlight, i) => (
            <span key={i} className="px-2 py-1 bg-gold-500/10 text-gold-400 rounded text-xs">
              {highlight}
            </span>
          ))}
        </div>
      )}

      {/* Action Button */}
      {!isPast && event.registrationLink && (
        <a 
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary text-center block"
        >
          Register Now
        </a>
      )}

      {isPast && event.images && event.images.length > 0 && (
        <button 
          onClick={() => openGallery(event)}
          className="w-full btn-secondary flex items-center justify-center"
        >
          <ImageIcon size={16} className="mr-2" />
          View Photos ({event.images.length})
        </button>
      )}
    </div>
  );

  return (
    <>
      <SEO 
        title="Tech Workshops & Events - AI, Blockchain & More"
        description="Join Beta Tech Hub's upcoming workshops and training events in Kabale, Uganda. Learn AI, machine learning, Blockchain, Web3, and software development."
        keywords="tech workshops Uganda, AI workshop Kabale, Blockchain bootcamp, Web3 training, tech events Uganda"
        ogUrl="https://www.beta-techlabs.com/events"
        ogImage="https://www.beta-techlabs.com/images/og-events.svg"
      />

      <div className="min-h-screen bg-dark-200">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gold-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <button 
              onClick={() => navigate('/services')}
              className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300 font-medium group mb-8"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
              Back to Services
            </button>

            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                Tech <span className="gold-gradient-text">Workshops & Events</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our upcoming workshops and browse through our past events. Join us to learn, 
                network, and grow together in the tech community.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-gold-500">{eventsData.length}</div>
                  <div className="text-gray-400 text-sm">Total Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-green-400">{upcoming.length}</div>
                  <div className="text-gray-400 text-sm">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-blue-400">{past.length}</div>
                  <div className="text-gray-400 text-sm">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-gold-500">
                    {eventsData.reduce((sum, event) => sum + event.attendees, 0)}+
                  </div>
                  <div className="text-gray-400 text-sm">Total Attendees</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="bg-dark-100 border-b border-gray-800 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-4 py-4">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'upcoming' 
                    ? 'bg-gold-500 text-dark-200' 
                    : 'bg-dark-200 text-gray-400 hover:text-gold-500'
                }`}
              >
                🚀 Upcoming Events ({upcoming.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'past' 
                    ? 'bg-gold-500 text-dark-200' 
                    : 'bg-dark-200 text-gray-400 hover:text-gold-500'
                }`}
              >
                📸 Past Events ({past.length})
              </button>
            </div>
          </div>
        </section>

        {/* Events Content */}
        <section className="py-20 bg-dark-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Upcoming Events */}
            {activeTab === 'upcoming' && (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-heading text-gold-500 mb-4">
                    Upcoming Events
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    {upcoming.length > 0 
                      ? "Register now and don't miss out on these learning opportunities!"
                      : "No upcoming events scheduled. Check back soon for new workshops!"
                    }
                  </p>
                </div>

                {upcoming.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcoming.map(event => (
                      <EventCard key={event.id} event={event} isPast={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Calendar className="mx-auto text-gold-500/30 mb-4" size={64} />
                    <p className="text-gray-400 text-lg">No upcoming events at the moment</p>
                    <p className="text-gray-500 mt-2">We're planning new workshops - stay tuned!</p>
                  </div>
                )}
              </>
            )}

            {/* Past Events */}
            {activeTab === 'past' && (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-heading text-gold-500 mb-4">
                    Past Events & Gallery
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Take a look at the workshops and events we've conducted. Click on any event to view photos!
                  </p>
                </div>

                {past.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {past.map(event => (
                      <EventCard key={event.id} event={event} isPast={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ImageIcon className="mx-auto text-gray-500/30 mb-4" size={64} />
                    <p className="text-gray-400 text-lg">No past events to display yet</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gold-500 mb-6">
              Want to Stay Updated?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Follow us on social media to get notified about upcoming events, workshops, 
              and the latest developments in AI and Blockchain.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://x.com/betatechlabs" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Follow on X
              </a>
              <a href="https://www.linkedin.com/in/betatech-labs-06398039b" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Image Gallery Modal */}
      {selectedEvent && selectedEvent.images && selectedEvent.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close Button */}
          <button 
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gold-500 transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Event Info */}
          <div className="absolute top-4 left-4 text-white z-10">
            <h3 className="text-xl font-bold font-heading text-gold-500">{selectedEvent.title}</h3>
            <p className="text-gray-400">{formatDate(selectedEvent.date)} • {selectedEvent.venue}</p>
          </div>

          {/* Navigation */}
          {selectedEvent.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 transition-colors bg-black/50 p-2 rounded-full"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 transition-colors bg-black/50 p-2 rounded-full"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image */}
          <img 
            src={selectedEvent.images[currentImageIndex]}
            alt={`${selectedEvent.title} - Photo ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Photo+Not+Found';
            }}
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {selectedEvent.images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
