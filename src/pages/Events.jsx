import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [showAdminButton, setShowAdminButton] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('betaTechHubEvents');
    if (savedEvents) {
      setAllEvents(JSON.parse(savedEvents));
    } else {
      const initialEvents = [
        {
          id: 1,
          title: 'AI & Machine Learning Workshop',
          date: '2024-06-15',
          time: '10:00 AM - 4:00 PM',
          location: 'Beta Tech Hub, Kabale',
          description: 'Hands-on workshop covering machine learning fundamentals and practical applications.',
          attendees: 25,
        },
        {
          id: 2,
          title: 'Blockchain Development Bootcamp',
          date: '2024-06-22',
          time: '9:00 AM - 5:00 PM',
          location: 'Beta Tech Hub, Kabale',
          description: 'Comprehensive bootcamp on smart contracts and dApp development.',
          attendees: 30,
        },
        {
          id: 3,
          title: 'Web3 & NFT Masterclass',
          date: '2024-07-05',
          time: '2:00 PM - 6:00 PM',
          location: 'Online',
          description: 'Deep dive into Web3 technologies and NFT marketplace development.',
          attendees: 20,
        },
        {
          id: 4,
          title: 'Data Science with Python',
          date: '2024-02-10',
          time: '10:00 AM - 3:00 PM',
          location: 'Beta Tech Hub, Kabale',
          description: 'Introduction to data analysis and visualization using Python.',
          attendees: 18,
        },
        {
          id: 5,
          title: 'Git & GitHub Workshop',
          date: '2024-01-20',
          time: '9:00 AM - 4:00 PM',
          location: 'Beta Tech Hub, Kabale',
          description: 'Version control and collaboration using Git and GitHub.',
          attendees: 22,
        }
      ];
      setAllEvents(initialEvents);
      localStorage.setItem('betaTechHubEvents', JSON.stringify(initialEvents));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedEvents = localStorage.getItem('betaTechHubEvents');
      if (savedEvents) {
        setAllEvents(JSON.parse(savedEvents));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const categorizeEvents = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate >= today) {
        upcoming.push({ ...event, status: 'upcoming' });
      } else {
        past.push({ ...event, status: 'completed' });
      }
    });

    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcoming, past };
  };

  const { upcoming, past } = categorizeEvents(allEvents);

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleViewAdmin = () => {
    navigate('/labs');
  };

  const handleRegister = (eventId) => {
    alert(`Registration for event ${eventId} would open here!`);
  };

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

  useEffect(() => {
    let clickCount = 0;
    let clickTimer;

    const handleClick = () => {
      clickCount++;
      
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      
      clickTimer = setTimeout(() => {
        if (clickCount === 3) {
          setShowAdminButton(true);
          setTimeout(() => setShowAdminButton(false), 5000);
        }
        clickCount = 0;
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Generate event schemas for upcoming events
  const eventSchemas = upcoming.map(event => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.date,
    "description": event.description,
    "location": {
      "@type": "Place",
      "name": event.location
    },
    "organizer": {
      "@type": "Organization",
      "name": "Beta Tech Labs"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }));

  return (
    <>
      <SEO 
        title="Tech Workshops & Events - AI, Blockchain & More"
        description="Join Beta Tech Hub's upcoming workshops and training events in Kabale, Uganda. Learn AI, machine learning, Blockchain, Web3, and software development. Browse past workshops and register for upcoming tech events."
        keywords="tech workshops Uganda, AI workshop Kabale, Blockchain bootcamp, Web3 training, tech events Uganda, machine learning workshop, programming events, tech training Africa"
        ogUrl="https://www.beta-techlabs.com/events"
        ogImage="https://www.beta-techlabs.com/images/og-events.svg"
      />

      {/* Event Structured Data */}
      {eventSchemas.length > 0 && (
        <Helmet>
          {eventSchemas.map((schema, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
        </Helmet>
      )}

      <div className="min-h-screen bg-dark-200">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gold-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={handleBackToServices}
                className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300 font-medium group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
                Back to Services
              </button>

              {showAdminButton && (
                <button
                  onClick={handleViewAdmin}
                  className="btn-secondary flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                  title="Admin Panel"
                >
                  <Eye className="mr-2" size={16} />
                  Admin Access
                </button>
              )}
            </div>

            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tech <span className="gold-gradient-text">Workshops & Events</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our upcoming workshops and browse through our past events. Join us to learn, 
                network, and grow together in the tech community.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-500">{allEvents.length}</div>
                  <div className="text-gray-400 text-sm">Total Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{upcoming.length}</div>
                  <div className="text-gray-400 text-sm">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{past.length}</div>
                  <div className="text-gray-400 text-sm">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-500">
                    {allEvents.reduce((sum, event) => sum + event.attendees, 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Total Attendees</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-dark-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4 flex items-center justify-center">
                <Calendar className="mr-3" size={32} />
                Upcoming Events {upcoming.length > 0 && `(${upcoming.length})`}
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {upcoming.length > 0 
                  ? "Join our upcoming workshops and training sessions. Don't miss out on these learning opportunities!"
                  : "No upcoming events scheduled. Check back later for new workshops and events!"
                }
              </p>
            </div>

            {upcoming.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcoming.map((event) => {
                  const daysUntil = getDaysUntilEvent(event.date);
                  const isToday = daysUntil === 0;
                  const isTomorrow = daysUntil === 1;
                  
                  return (
                    <div key={event.id} className="card p-6 border-2 border-gold-500/30 group hover:border-gold-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          isToday 
                            ? 'bg-red-500/20 text-red-400' 
                            : isTomorrow
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          <CheckCircle className="mr-1" size={12} />
                          {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : `In ${daysUntil} days`}
                        </span>
                        <span className="text-gold-500 text-sm font-medium flex items-center">
                          <Users className="mr-1" size={14} />
                          {event.attendees} spots
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="mr-2 text-gold-500" size={16} />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="mr-2 text-gold-500" size={16} />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="mr-2 text-gold-500" size={16} />
                          {event.location}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <button 
                        onClick={() => handleRegister(event.id)}
                        className="w-full btn-primary transform group-hover:scale-105 transition-transform duration-300"
                      >
                        Register Now
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gold-500/50 mb-4" size={64} />
                <p className="text-gray-400 text-lg">No upcoming events at the moment</p>
                <p className="text-gray-500 text-sm mt-2">We're planning new workshops - stay tuned!</p>
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        <section className="py-20 bg-dark-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">
                Past Events {past.length > 0 && `(${past.length})`}
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Take a look at the workshops and events we've conducted in the past.
              </p>
            </div>

            {past.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {past.map((event) => (
                  <div key={event.id} className="card p-6 border-2 border-gray-600/30 group hover:border-gray-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium flex items-center">
                        <XCircle className="mr-1" size={12} />
                        Completed
                      </span>
                      <span className="text-gray-400 text-sm font-medium flex items-center">
                        <Users className="mr-1" size={14} />
                        {event.attendees} attended
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="mr-2 text-gold-500" size={16} />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="mr-2 text-gold-500" size={16} />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="mr-2 text-gold-500" size={16} />
                        {event.location}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <XCircle className="mx-auto text-gray-500/50 mb-4" size={64} />
                <p className="text-gray-400 text-lg">No past events to display</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-6">
              Want to Stay Updated?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get notified about upcoming events, workshops, 
              and the latest developments in AI and Blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg focus:outline-none focus:border-gold-500 text-white placeholder-gray-500"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Events;