import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEventsData } from '../data/dataStore';
import { SITE, SOCIAL, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import Reveal from '../components/Reveal';
import EventGalleryModal from '../components/EventGalleryModal';
import NewsletterForm from '../components/NewsletterForm';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Image as ImageIcon,
  ArrowRight,
  Send,
  Sparkles,
  Mic2,
  Code2,
  GraduationCap,
  Zap,
  ExternalLink,
  Mail,
} from 'lucide-react';

const WHY_ATTEND = [
  {
    icon: Code2,
    title: 'Build, Don\'t Just Watch',
    text: 'Every session is hands-on. You leave with code written, problems solved, and something you can show, not just slides saved.',
  },
  {
    icon: GraduationCap,
    title: 'Mentors Who Ship',
    text: 'Led by engineers and researchers actively building AI, blockchain, and software products, not career lecturers reading from a syllabus.',
  },
  {
    icon: Sparkles,
    title: 'Real-World Context',
    text: 'Workshops shaped around African markets, local infrastructure, and problems our community actually faces, grounded in field research.',
  },
  {
    icon: Mic2,
    title: 'A Growing Network',
    text: 'Meet founders, students, and builders across Kabale and East Africa. Past attendees have landed internships, collaborators, and startup co-founders.',
  },
];

const EVENT_FORMATS = [
  { label: 'Workshops', detail: 'Focused half-day or full-day skill sessions' },
  { label: 'Bootcamps', detail: 'Intensive deep-dives with capstone builds' },
  { label: 'Meetups', detail: 'Talks, demos, and open networking evenings' },
  { label: 'Hackathons', detail: 'Team sprints on real challenges, coming soon' },
];

const CATEGORY_GRADIENTS = {
  Bootcamp: 'from-purple-900/60 via-dark-200 to-gold-900/30',
  Workshop: 'from-blue-900/50 via-dark-200 to-gold-900/20',
  Meetup: 'from-emerald-900/40 via-dark-200 to-gold-900/20',
  Hackathon: 'from-orange-900/50 via-dark-200 to-gold-900/30',
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateParts = (dateString) => {
  const d = new Date(dateString);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
  };
};

const getDaysUntilEvent = (eventDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  return Math.ceil((event - today) / (1000 * 60 * 60 * 24));
};

const categorizeEvents = (eventsData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];

  (eventsData || []).forEach((event) => {
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

const EventBanner = ({ event, isPast, onOpenGallery }) => {
  const gradient = CATEGORY_GRADIENTS[event.category] || CATEGORY_GRADIENTS.Workshop;
  const hasImages = event.images && event.images.length > 0;

  if (hasImages) {
    return (
      <button
        type="button"
        onClick={() => onOpenGallery(event)}
        className="relative h-44 w-full overflow-hidden group/banner text-left"
      >
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/banner:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/40 to-transparent" />
        {event.images.length > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs text-white bg-black/60 px-2 py-1 rounded-full">
            <ImageIcon size={12} />
            +{event.images.length - 1}
          </span>
        )}
      </button>
    );
  }

  const parts = formatDateParts(event.date);

  return (
    <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-between px-6 border-b border-gray-800`}>
      <div>
        {event.category && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-500/80 mb-2">
            {event.category}
          </p>
        )}
        <p className="text-sm text-gray-400 max-w-[200px] leading-snug line-clamp-2">
          {isPast ? 'Completed session' : 'Open for registration'}
        </p>
      </div>
      <div className="text-center shrink-0">
        <div className="w-16 h-16 rounded-xl border border-gold-500/30 bg-dark-200/80 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-gold-500 tracking-wider">{parts.month}</span>
          <span className="text-2xl font-bold text-white leading-none">{parts.day}</span>
          <span className="text-[10px] text-gray-500">{parts.year}</span>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, isPast, onOpenGallery, onRequestSeat }) => {
  const daysUntil = !isPast ? getDaysUntilEvent(event.date) : null;

  const countdownLabel = () => {
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    if (daysUntil <= 7) return `${daysUntil} days away`;
    return `In ${daysUntil} days`;
  };

  return (
    <article className="group interactive-card-light rounded-xl overflow-hidden flex flex-col h-full">
      <EventBanner event={event} isPast={isPast} onOpenGallery={onOpenGallery} />

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          {isPast ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <CheckCircle size={12} />
              Completed
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                daysUntil <= 7
                  ? 'bg-orange-500/15 text-orange-400 border-orange-500/25'
                  : 'bg-green-500/15 text-green-400 border-green-500/25'
              }`}
            >
              <Zap size={12} />
              {countdownLabel()}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Users size={12} />
            {isPast ? `${event.attendees} attended` : `${event.attendees} seats`}
          </span>
        </div>

        {!event.images?.length && event.category && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1 leading-snug">
            {event.category}
          </p>
        )}

        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-gold-50">
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="text-gold-500 shrink-0" size={14} />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="text-gold-500 shrink-0" size={14} />
            {event.time}
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <MapPin className="text-gold-500 shrink-0 mt-0.5" size={14} />
            <span className="leading-snug">{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-snug mb-4 flex-1">{event.description}</p>

        {event.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-0.5 text-xs text-gold-400/90 bg-gold-500/10 border border-gold-500/15 rounded-md"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-800 space-y-2">
          {!isPast && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full inline-flex items-center justify-center text-sm"
            >
              Register Now
              <ExternalLink className="ml-2" size={14} />
            </a>
          )}
          {event.images?.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenGallery(event)}
              className={`w-full inline-flex items-center justify-center text-sm ${
                !isPast && event.registrationLink ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              <ImageIcon className="mr-2" size={14} />
              View Gallery ({event.images.length} photo{event.images.length !== 1 ? 's' : ''})
            </button>
          )}
          {!isPast && !event.registrationLink && (
            <button
              type="button"
              onClick={onRequestSeat}
              className="btn-secondary w-full inline-flex items-center justify-center text-sm"
            >
              <Send className="mr-2" size={14} />
              Request a Seat
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const FeaturedEvent = ({ event, onOpenGallery, onRequestSeat }) => {
  const daysUntil = getDaysUntilEvent(event.date);
  const parts = formatDateParts(event.date);

  return (
    <article className="group interactive-card-light rounded-xl overflow-hidden !border-gold-500/30 hover:!border-gold-500/50">
      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-2 relative min-h-[220px] bg-gradient-to-br from-gold-900/30 via-dark-200 to-purple-900/40 flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-gray-800">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500 mb-3">
              Next Up
            </p>
            <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 border-gold-500/40 bg-dark-200/90 mb-3 transition-all duration-500 group-hover:scale-105 group-hover:border-gold-500/60">
              <span className="text-xs font-bold text-gold-500">{parts.month}</span>
              <span className="text-4xl font-bold text-white leading-none">{parts.day}</span>
              <span className="text-xs text-gray-500">{parts.year}</span>
            </div>
            <p className="text-sm text-gray-400">{event.time}</p>
          </div>
        </div>

        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {event.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">
                {event.category}
              </span>
            )}
            <span className="text-xs text-gray-600">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-green-400">
              <Zap size={12} />
              {daysUntil === 0 ? 'Happening today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days to go`}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-3 leading-tight">
            {event.title}
          </h2>

          <p className="text-sm md:text-base text-gray-400 leading-snug mb-4 flex-1">
            {event.description}
          </p>

          <div className="flex items-start gap-2 text-sm text-gray-400 mb-4">
            <MapPin className="text-gold-500 shrink-0 mt-0.5" size={16} />
            <span>{event.location}</span>
          </div>

          {event.highlights?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {event.highlights.map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-1 text-xs text-gold-400 bg-gold-500/10 border border-gold-500/20 rounded-lg"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {event.registrationLink ? (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center text-sm"
              >
                Reserve Your Spot
                <ArrowRight className="ml-2" size={16} />
              </a>
            ) : (
              <button
                type="button"
                onClick={onRequestSeat}
                className="btn-primary inline-flex items-center justify-center text-sm"
              >
                <Send className="mr-2" size={16} />
                Request a Seat
              </button>
            )}
            {event.images?.length > 0 && (
              <button
                type="button"
                onClick={() => onOpenGallery(event)}
                className="btn-secondary inline-flex items-center justify-center text-sm"
              >
                <ImageIcon className="mr-2" size={16} />
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEventsData();
        setEventsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading events:', error);
        setEventsData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('eventsDataUpdated', handleUpdate);
    return () => window.removeEventListener('eventsDataUpdated', handleUpdate);
  }, []);

  const { upcoming, past } = useMemo(() => categorizeEvents(eventsData), [eventsData]);
  const totalAttendees = useMemo(
    () => eventsData.reduce((sum, e) => sum + (e.attendees || 0), 0),
    [eventsData]
  );
  const featuredEvent = upcoming[0] || null;

  const galleryEvents = useMemo(
    () =>
      [...upcoming, ...past]
        .filter((event) => event.images?.length > 0)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [upcoming, past]
  );

  const galleryItems = useMemo(
    () =>
      past.flatMap((event) =>
        (event.images || []).map((url, imageIndex) => ({
          url,
          event,
          imageIndex,
        }))
      ),
    [past]
  );

  const openGallery = (event, imageIndex = 0) => {
    if (event.images?.length > 0) {
      setSelectedEvent(event);
      setCurrentImageIndex(imageIndex);
    }
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  return (
    <>
      <SEO
        title="Workshops & Events - AI, Blockchain & Engineering"
        description={`Join ${SITE.name} workshops, bootcamps, and tech meetups in ${SITE.location}. Hands-on sessions in AI, blockchain, Web3, and software engineering, built for builders.`}
        keywords="tech workshops Uganda, AI workshop Kabale, blockchain bootcamp East Africa, Web3 training, developer events Uganda, Beta Tech Labs events"
        ogUrl={`${SITE.url}/events`}
        ogImage={`${SITE.url}/images/og-events.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="pt-20 pb-8 md:pb-10 bg-gold-gradient border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-3 whitespace-nowrap">
                Where Kabale&apos;s <span className="text-gold-500">Builders Show Up</span>
              </h1>
              <p className="text-sm md:text-base text-gray-400 leading-snug max-w-2xl">
                Workshops, bootcamps, and meetups led by engineers who ship real products.
                Whether you are learning AI, diving into blockchain, or levelling up your
                frontend skills, this is where research meets hands-on practice.
              </p>

              {!loading && (
                <div className="flex flex-wrap gap-6 mt-6 pt-5 border-t border-gray-800/80">
                  <div>
                    <p className="text-xl font-bold text-white">{eventsData.length}</p>
                    <p className="text-xs text-gray-500">Events hosted</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gold-500">{upcoming.length}</p>
                    <p className="text-xs text-gray-500">Upcoming</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{past.length}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{totalAttendees}+</p>
                    <p className="text-xs text-gray-500">Total attendees</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{STATS.studentsTrained}</p>
                    <p className="text-xs text-gray-500">Builders trained</p>
                  </div>
                </div>
              )}

              {!loading && galleryEvents.length > 0 && (
                <a
                  href="#event-galleries"
                  className="btn-secondary inline-flex items-center mt-5 text-sm"
                >
                  <ImageIcon className="mr-2" size={16} />
                  Browse event photo galleries
                </a>
              )}
            </div>
          </section>

          {/* Why attend */}
          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 md:mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Why People Come Back
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  We do not run lecture halls. We run rooms where you write code, ask hard
                  questions, and walk out closer to shipping something real.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {WHY_ATTEND.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 70}>
                    <div
                      className="group interactive-card rounded-xl p-4 md:p-5 h-full"
                    >
                      <div className="icon-box w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
                        <Icon className="text-gold-500 transition-transform duration-300" size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1.5 leading-snug transition-colors duration-300 group-hover:text-gold-50">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-snug transition-colors duration-300 group-hover:text-gray-400">
                        {item.text}
                      </p>
                    </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Event formats */}
          <section className="py-6 bg-dark-200 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {EVENT_FORMATS.map((fmt, index) => (
                  <Reveal key={fmt.label} delay={index * 50}>
                  <div
                    className="group interactive-card-light rounded-lg px-4 py-3 transition-all duration-300"
                  >
                    <p className="text-sm font-semibold text-gold-500 transition-colors duration-300 group-hover:text-gold-400">
                      {fmt.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug transition-colors duration-300 group-hover:text-gray-400">
                      {fmt.detail}
                    </p>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Featured upcoming */}
          {!loading && featuredEvent && (
            <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
                <FeaturedEvent event={featuredEvent} onOpenGallery={openGallery} onRequestSeat={goToContact} />
              </div>
            </section>
          )}

          {/* Company event photo galleries */}
          {!loading && galleryEvents.length > 0 && (
            <section id="event-galleries" className="py-8 md:py-10 bg-dark-200 border-b border-gray-800/50">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
                <Reveal className="mb-6 md:mb-8 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 section-eyebrow">
                    Event Galleries
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                    Photos From Our Events
                  </h2>
                  <p className="text-sm text-gray-400 leading-snug">
                    Attended a workshop or meetup? Browse and download photos from each event below.
                    Click any event to open its full gallery.
                  </p>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {galleryEvents.map((event, index) => (
                    <Reveal key={event.id} delay={index * 60}>
                      <button
                        type="button"
                        onClick={() => openGallery(event)}
                        className="group interactive-card-light rounded-xl overflow-hidden text-left w-full h-full flex flex-col"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={event.images[0]}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 via-transparent to-transparent" />
                          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-xs text-white bg-black/60 px-2.5 py-1 rounded-full">
                            <ImageIcon size={12} />
                            {event.images.length} photo{event.images.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="p-4 md:p-5 flex flex-col flex-1">
                          <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">
                            {event.category || 'Event'}
                          </p>
                          <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-gold-50 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3">{formatDate(event.date)}</p>
                          <span className="mt-auto text-sm font-medium text-gold-400 group-hover:text-gold-300 transition-colors">
                            Open gallery →
                          </span>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Tab + grid */}
          <section className="py-8 md:py-10 bg-dark-200">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-1 leading-tight">
                    {activeTab === 'upcoming' ? 'Upcoming Sessions' : 'Past Events'}
                  </h2>
                  <p className="text-sm text-gray-400 leading-snug max-w-xl">
                    {activeTab === 'upcoming'
                      ? 'Register early, seats are limited and workshops fill fast.'
                      : 'A record of what we have run. More galleries coming as we publish event photos.'}
                  </p>
                </div>
                <div className="inline-flex rounded-lg border border-gray-800 bg-dark-100 p-1 self-start">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'upcoming'
                        ? 'bg-gold-500 text-dark-200'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Upcoming ({upcoming.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'past'
                        ? 'bg-gold-500 text-dark-200'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Past ({past.length})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">Loading events...</p>
                </div>
              ) : activeTab === 'upcoming' ? (
                upcoming.length > 0 ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {(featuredEvent ? upcoming.slice(1) : upcoming).map((event, index) => (
                      <Reveal key={event.id} delay={index * 70}>
                        <EventCard
                          event={event}
                          isPast={false}
                          onOpenGallery={openGallery}
                          onRequestSeat={goToContact}
                        />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-xl border border-gray-800 bg-dark-100">
                    <Calendar className="mx-auto text-gold-500/30 mb-4" size={48} />
                    <p className="text-sm text-gray-400 mb-1">No upcoming events scheduled right now.</p>
                    <p className="text-xs text-gray-500 mb-5">Follow us, new workshops drop regularly.</p>
                    <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center">
                      Follow on X
                    </a>
                  </div>
                )
              ) : past.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {past.map((event, index) => (
                      <Reveal key={event.id} delay={index * 70}>
                        <EventCard
                          event={event}
                          isPast
                          onOpenGallery={openGallery}
                          onRequestSeat={goToContact}
                        />
                      </Reveal>
                    ))}
                  </div>

                  {galleryItems.length > 0 && (
                    <div className="mt-10 md:mt-12 pt-8 border-t border-gray-800">
                      <div className="mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white font-heading mb-1 leading-tight">
                          Event Gallery
                        </h3>
                        <p className="text-sm text-gray-400 leading-snug">
                          Photos from our past workshops and meetups. Click any image to view full size.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {galleryItems.map(({ url, event, imageIndex }) => (
                          <button
                            key={`${event.id}-${imageIndex}`}
                            type="button"
                            onClick={() => openGallery(event, imageIndex)}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden interactive-card-light text-left"
                          >
                            <img
                              src={url}
                              alt={`${event.title}, photo ${imageIndex + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform">
                              <p className="text-xs font-medium text-white leading-snug line-clamp-2">
                                {event.title}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 rounded-xl border border-gray-800 bg-dark-100">
                  <ImageIcon className="mx-auto text-gray-600 mb-4" size={48} />
                  <p className="text-sm text-gray-400">Past events will appear here after they run.</p>
                </div>
              )}
            </div>
          </section>

          {/* Host CTA */}
          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="rounded-xl border border-gray-800 bg-dark-200 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-2">
                    For Partners & Institutions
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading mb-2 leading-tight">
                    Want to Co-Host a Workshop?
                  </h2>
                  <p className="text-sm text-gray-400 leading-snug">
                    Universities, startups, and organizations partner with us to run tailored
                    sessions, AI literacy for students, blockchain pilots for teams, or
                    custom engineering intensives. We handle curriculum, mentors, and delivery.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
                  <button
                    type="button"
                    onClick={goToContact}
                    className="btn-primary inline-flex items-center justify-center text-sm"
                  >
                    <Send className="mr-2" size={16} />
                    Partner With Us
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="btn-secondary inline-flex items-center justify-center text-sm"
                  >
                    Our Services
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stay updated */}
          <section id="newsletter" className="py-8 md:py-10 bg-dark-200">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 mb-4">
                  <Mail className="text-gold-500" size={14} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 section-eyebrow">
                    Newsletter
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Never Miss a Session
                </h2>
                <p className="text-sm text-gray-400 leading-snug mb-5">
                  Subscribe and we will email you when new workshops, bootcamps, and meetups open for
                  registration, straight to your inbox.
                </p>

                <NewsletterForm
                  layout="inline"
                  buttonLabel="Notify me"
                  align="center"
                  className="max-w-md mx-auto text-left"
                />

                <p className="text-xs text-gray-500 mt-6 mb-3">Prefer social? Follow us there too.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={SOCIAL.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center text-sm"
                  >
                    Follow on X
                  </a>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center text-sm"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <EventGalleryModal
        event={selectedEvent}
        startIndex={currentImageIndex}
        onClose={closeGallery}
      />
    </>
  );
};

export default Events;
