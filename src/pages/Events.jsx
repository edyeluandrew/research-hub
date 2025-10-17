import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: 'Stellar Meetup workshop',
      date: '2025-11-08',
      time: '09:00 AM - 5:00 PM',
      location: 'Kabale University, Kabale',
      description: 'Deep dive into the stellar technologies with hands-on and networking wit industry experts.',
      attendees: ~50-75,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'The python series',
      date: '2025-10-18',
      time: '11:00 AM - 3:00 PM',
      location: 'Beta Tech Hub, Kabale',
      description: 'Understanding the basic aspects of python programming.',
      attendees: ~30,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Tech Talk show',
      date: '2025-10-25',
      time: '2:00 PM - 4:00 PM',
      location: 'Online',
      description: 'What do you need to position in tech?.',
      attendees: ~25,
      status: 'upcoming'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Foclis Hackathon , 2025',
      date: '2025-10-08',
      time: '09:00 AM - 05:00 PM',
      location: 'Kabale University, Kabale',
      description: 'We hosted the first ever hackathon in kabale university under the faculty of computing.',
      attendees: 123,
      status: 'completed'
    },
    {
      id: 5,
      title: 'Introduction to Stellar Blockchain and web3',
      date: '2025-09-08',
      time: '8:00 AM - 11:00 AM',
      location: 'Beta Tech Hub, Kabale',
      description: 'Data analysis and visualization using Python libraries.',
      attendees: 18,
      status: 'completed'
    },
    {
      id: 6,
      title: 'Smart Contracts With Rust',
      date: '2025-09-29',
      time: '1:00 PM - 5:00 PM',
      location: 'Online',
      description: 'Automating functions for dApps .',
      attendees: 22,
      status: 'completed'
    }
  ];

  const handleBackToServices = () => {
    navigate('/services');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gold-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={handleBackToServices}
              className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={18} />
              Back to Services
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tech <span className="gold-gradient-text">Workshops & Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our upcoming workshops and browse through our past events. Join us to learn, 
              network, and grow together in the tech community.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4 flex items-center justify-center">
              <Calendar className="mr-3" size={32} />
              Upcoming Events
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join our upcoming workshops and training sessions. Don't miss out on these learning opportunities!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card p-6 border-2 border-gold-500/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center">
                    <CheckCircle className="mr-1" size={12} />
                    Upcoming
                  </span>
                  <span className="text-gold-500 text-sm font-medium flex items-center">
                    <Users className="mr-1" size={14} />
                    {event.attendees} spots
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gold-500 mb-3">
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

                <button className="w-full btn-primary">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">
              Past Events
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Take a look at the workshops and events we've conducted in the past.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="card p-6 border-2 border-gray-600/30">
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

                <h3 className="text-xl font-bold text-gold-500 mb-3">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;