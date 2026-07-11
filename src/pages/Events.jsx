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
    tone: 'blue',
    title: 'Build, Don\'t Just Watch',
    text: 'Every session is hands-on. You leave with code written, problems solved, and something you can show, not just slides saved.',
  },
  {
    icon: GraduationCap,
    tone: 'green',
    title: 'Mentors Who Ship',
    text: 'Led by engineers and researchers actively building AI, blockchain, and software products, not career lecturers reading from a syllabus.',
  },
  {
    icon: Sparkles,
    tone: 'amber',
    title: 'Real-World Context',
    text: 'Workshops shaped around African markets, local infrastructure, and problems our community actually faces, grounded in field research.',
  },
  {
    icon: Mic2,
    tone: 'purple',
    title: 'A Growing Network',
    text: 'Meet founders, students, and builders across Kabale and East Africa. Past attendees have landed internships, collaborators, and startup co-founders.',
  },
];

const EVENT_FORMATS = [
  { label: 'Workshops', detail: 'Focused half-day or full-day skill sessions', icon: Code2, tone: 'blue' },
  { label: 'Bootcamps', detail: 'Intensive deep-dives with capstone builds', icon: GraduationCap, tone: 'purple' },
  { label: 'Meetups', detail: 'Talks, demos, and open networking evenings', icon: Mic2, tone: 'green' },
  { label: 'Hackathons', detail: 'Team sprints on real challenges, coming soon', icon: Zap, tone: 'amber' },
];

const CATEGORY_BANNER = {
  Bootcamp: 'ev-card-banner--bootcamp',
  Workshop: 'ev-card-banner--workshop',
  Meetup: 'ev-card-banner--meetup',
  Hackathon: 'ev-card-banner--hackathon',
};

const HERO_STATS = [
  { key: 'total', icon: Calendar, tone: 'blue', label: 'Events hosted' },
  { key: 'upcoming', icon: Sparkles, tone: 'amber', label: 'Upcoming', accent: true },
  { key: 'past', icon: CheckCircle, tone: 'green', label: 'Completed' },
  { key: 'attendees', icon: Users, tone: 'slate', label: 'Total attendees', suffix: '+' },
  { key: 'trained', icon: GraduationCap, tone: 'purple', label: 'Builders trained' },
];

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

const DateBadge = ({ date, large = false }) => {
  const parts = formatDateParts(date);
  return (
    <div className={`ev-date-badge${large ? ' ev-featured-date-badge' : ''}`}>
      <span className="ev-date-month">{parts.month}</span>
      <span className="ev-date-day">{parts.day}</span>
      <span className="ev-date-year">{parts.year}</span>
    </div>
  );
};

const EventBanner = ({ event, isPast, onOpenGallery }) => {
  const bannerClass = CATEGORY_BANNER[event.category] || CATEGORY_BANNER.Workshop;
  const hasImages = event.images && event.images.length > 0;

  if (hasImages) {
    return (
      <button
        type="button"
        onClick={() => onOpenGallery(event)}
        className="ev-card-banner ev-card-banner--image w-full text-left"
      >
        <img
          src={event.images[0]}
          alt={event.title}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="ev-banner-overlay" />
        {event.images.length > 1 && (
          <span className="ev-banner-photo-count">
            <ImageIcon size={12} />
            +{event.images.length - 1}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`ev-card-banner ${bannerClass}`}>
      <div className="ev-banner-fallback">
        <div>
          {event.category && <p className="ev-banner-category">{event.category}</p>}
          <p className="ev-banner-note">
            {isPast ? 'Completed session' : 'Open for registration'}
          </p>
        </div>
        <DateBadge date={event.date} />
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
    <article className="ev-card group">
      <EventBanner event={event} isPast={isPast} onOpenGallery={onOpenGallery} />

      <div className="ev-card-body">
        <div className="ev-card-top">
          {isPast ? (
            <span className="ev-badge ev-badge--completed">
              <CheckCircle size={12} />
              Completed
            </span>
          ) : (
            <span className={`ev-badge ${daysUntil <= 7 ? 'ev-badge--soon' : 'ev-badge--open'}`}>
              <Zap size={12} />
              {countdownLabel()}
            </span>
          )}
          <span className="ev-attendees">
            <Users size={13} />
            {isPast ? `${event.attendees} attended` : `${event.attendees} seats`}
          </span>
        </div>

        {!event.images?.length && event.category && (
          <p className="ev-card-category">{event.category}</p>
        )}

        <h3 className="ev-card-title">{event.title}</h3>

        <div className="ev-meta">
          <div className="ev-meta-row">
            <span className="ev-meta-icon ev-meta-icon--cal" aria-hidden="true">
              <Calendar size={12} strokeWidth={2.25} />
            </span>
            {formatDate(event.date)}
          </div>
          <div className="ev-meta-row">
            <span className="ev-meta-icon ev-meta-icon--clock" aria-hidden="true">
              <Clock size={12} strokeWidth={2.25} />
            </span>
            {event.time}
          </div>
          <div className="ev-meta-row">
            <span className="ev-meta-icon ev-meta-icon--pin" aria-hidden="true">
              <MapPin size={12} strokeWidth={2.25} />
            </span>
            <span>{event.location}</span>
          </div>
        </div>

        <p className="ev-card-desc">{event.description}</p>

        {event.highlights?.length > 0 && (
          <div className="ev-highlights">
            {event.highlights.map((highlight) => (
              <span key={highlight} className="ev-highlight">
                {highlight}
              </span>
            ))}
          </div>
        )}

        <div className="ev-card-actions">
          {!isPast && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-btn-primary w-full"
            >
              Register Now
              <ExternalLink size={14} />
            </a>
          )}
          {event.images?.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenGallery(event)}
              className={!isPast && event.registrationLink ? 'sv-btn-secondary w-full' : 'sv-btn-primary w-full'}
            >
              <ImageIcon size={14} />
              View Gallery ({event.images.length} photo{event.images.length !== 1 ? 's' : ''})
            </button>
          )}
          {!isPast && !event.registrationLink && (
            <button type="button" onClick={onRequestSeat} className="sv-btn-secondary w-full">
              <Send size={14} />
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

  return (
    <article className="ev-featured group">
      <span className="ev-featured-badge">
        <Sparkles size={12} />
        Featured
      </span>
      <div className="grid lg:grid-cols-5 gap-0">
        <div className="ev-featured-date-panel lg:col-span-2">
          <div>
            <p className="ev-featured-next">Next Up</p>
            <div className="flex justify-center">
              <DateBadge date={event.date} large />
            </div>
            <p className="ev-featured-time">{event.time}</p>
          </div>
        </div>

        <div className="ev-featured-body lg:col-span-3 flex flex-col">
          <div className="ev-featured-meta">
            {event.category && <span className="ev-card-category">{event.category}</span>}
            <span className="ev-badge ev-badge--open">
              <Zap size={12} />
              {daysUntil === 0 ? 'Happening today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days to go`}
            </span>
          </div>

          <h2 className="ev-featured-title">{event.title}</h2>
          <p className="ev-featured-desc">{event.description}</p>

          <div className="ev-meta-row mb-4">
            <span className="ev-meta-icon ev-meta-icon--pin" aria-hidden="true">
              <MapPin size={13} strokeWidth={2.25} />
            </span>
            <span>{event.location}</span>
          </div>

          {event.highlights?.length > 0 && (
            <div className="ev-highlights mb-5">
              {event.highlights.map((h) => (
                <span key={h} className="ev-highlight">{h}</span>
              ))}
            </div>
          )}

          <div className="ev-featured-actions mt-auto">
            {event.registrationLink ? (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sv-btn-primary"
              >
                Reserve Your Spot
                <ArrowRight size={16} />
              </a>
            ) : (
              <button type="button" onClick={onRequestSeat} className="sv-btn-primary">
                <Send size={16} />
                Request a Seat
              </button>
            )}
            {event.images?.length > 0 && (
              <button type="button" onClick={() => onOpenGallery(event)} className="sv-btn-secondary">
                <ImageIcon size={16} />
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

  const statValues = {
    total: eventsData.length,
    upcoming: upcoming.length,
    past: past.length,
    attendees: totalAttendees,
    trained: STATS.studentsTrained,
  };

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

      <div className="ev-page min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="ev-hero">
            <div className="ev-hero-glow ev-hero-glow--blue" aria-hidden="true" />
            <div className="ev-hero-glow ev-hero-glow--warm" aria-hidden="true" />
            <div className="ev-dot-grid" aria-hidden="true" />
            <div className="ev-inner">
              <p className="ev-eyebrow">Community Events</p>
              <h1 className="ev-heading">
                Where Kabale&apos;s <span className="ev-heading-accent">Builders Show Up</span>
              </h1>
              <p className="ev-lead">
                Workshops, bootcamps, and meetups led by engineers who ship real products.
                Whether you are learning AI, diving into blockchain, or levelling up your
                frontend skills, this is where research meets hands-on practice.
              </p>

              {!loading && (
                <div className="ev-stats">
                  {HERO_STATS.map(({ key, icon: Icon, tone, label, accent, suffix }) => (
                    <div key={key} className="ev-stat-item">
                      <span className={`ev-stat-icon ev-stat-icon--${tone}`} aria-hidden="true">
                        <Icon size={15} strokeWidth={2.15} />
                      </span>
                      <div className="ev-stat-content">
                        <p className={`ev-stat-value${accent ? ' ev-stat-value--accent' : ''}`}>
                          {statValues[key]}{suffix || ''}
                        </p>
                        <p className="ev-stat-label">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && galleryEvents.length > 0 && (
                <a href="#event-galleries" className="ev-btn-ghost">
                  <ImageIcon size={16} />
                  Browse event photo galleries
                </a>
              )}
            </div>
          </section>

          <section className="ev-section ev-section--sand">
            <div className="ev-inner">
              <div className="ev-section-header">
                <h2 className="ev-section-heading">Why People Come Back</h2>
                <p className="ev-section-intro">
                  We do not run lecture halls. We run rooms where you write code, ask hard
                  questions, and walk out closer to shipping something real.
                </p>
              </div>
              <div className="ev-why-grid">
                {WHY_ATTEND.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 70}>
                      <div className="ev-why-card">
                        <span className={`ev-why-icon ev-why-icon--${item.tone}`} aria-hidden="true">
                          <Icon size={18} strokeWidth={2.15} />
                        </span>
                        <h3 className="ev-why-title">{item.title}</h3>
                        <p className="ev-why-text">{item.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="ev-section ev-section--cream">
            <div className="ev-inner">
              <Reveal className="ev-section-header ev-section-header--center">
                <p className="ev-eyebrow">How We Gather</p>
                <h2 className="ev-section-heading">Every Format, One Mission</h2>
                <p className="ev-section-intro">
                  From quick workshops to multi-day bootcamps. Each format is designed for hands-on
                  learning and real builder energy.
                </p>
              </Reveal>
              <div className="ev-formats-grid">
                {EVENT_FORMATS.map((fmt, index) => {
                  const Icon = fmt.icon;
                  return (
                    <Reveal key={fmt.label} delay={index * 50}>
                      <div className="ev-format-card">
                        <span className={`ev-format-icon ev-format-icon--${fmt.tone}`} aria-hidden="true">
                          <Icon size={20} strokeWidth={2.1} />
                        </span>
                        <div className="ev-format-body">
                          <p className="ev-format-num">{String(index + 1).padStart(2, '0')}</p>
                          <p className="ev-format-label">{fmt.label}</p>
                          <p className="ev-format-detail">{fmt.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {!loading && featuredEvent && (
            <section className="ev-section ev-section--sand">
              <div className="ev-inner">
                <Reveal className="ev-section-header mb-8">
                  <p className="ev-eyebrow">Next On The Calendar</p>
                  <h2 className="ev-section-heading">Featured Upcoming Event</h2>
                </Reveal>
                <FeaturedEvent
                  event={featuredEvent}
                  onOpenGallery={openGallery}
                  onRequestSeat={goToContact}
                />
              </div>
            </section>
          )}

          {!loading && galleryEvents.length > 0 && (
            <section id="event-galleries" className="ev-section ev-section--cream">
              <div className="ev-inner">
                <Reveal className="ev-section-header ev-section-header--center">
                  <p className="ev-eyebrow">Event Galleries</p>
                  <h2 className="ev-section-heading">Photos From Our Events</h2>
                  <p className="ev-section-intro">
                    Attended a workshop or meetup? Browse and download photos from each event below.
                    Click any event to open its full gallery.
                  </p>
                </Reveal>

                <div className="ev-gallery-grid">
                  {galleryEvents.map((event, index) => (
                    <Reveal key={event.id} delay={index * 60}>
                      <button
                        type="button"
                        onClick={() => openGallery(event)}
                        className="ev-gallery-card"
                      >
                        <div className="ev-gallery-thumb">
                          <img src={event.images[0]} alt={event.title} />
                          <div className="ev-banner-overlay" />
                          <span className="ev-banner-photo-count">
                            <ImageIcon size={12} />
                            {event.images.length} photo{event.images.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="ev-gallery-body">
                          <p className="ev-card-category">{event.category || 'Event'}</p>
                          <h3 className="ev-card-title">{event.title}</h3>
                          <p className="ev-format-detail mb-3">{formatDate(event.date)}</p>
                          <span className="ev-gallery-link">Open gallery →</span>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="ev-section ev-section--sand">
            <div className="ev-inner">
              <div className="ev-tab-header">
                <div>
                  <h2 className="ev-section-heading">
                    {activeTab === 'upcoming' ? 'Upcoming Sessions' : 'Past Events'}
                  </h2>
                  <p className="ev-section-intro max-w-xl">
                    {activeTab === 'upcoming'
                      ? 'Register early, seats are limited and workshops fill fast.'
                      : 'A record of what we have run. More galleries coming as we publish event photos.'}
                  </p>
                </div>
                <div className="ev-tabs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upcoming')}
                    className={`ev-tab${activeTab === 'upcoming' ? ' ev-tab--active' : ''}`}
                  >
                    Upcoming ({upcoming.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('past')}
                    className={`ev-tab${activeTab === 'past' ? ' ev-tab--active' : ''}`}
                  >
                    Past ({past.length})
                  </button>
                </div>
              </div>

              {loading ? (
                <p className="ev-loading">Loading events...</p>
              ) : activeTab === 'upcoming' ? (
                upcoming.length > 0 ? (
                  <div className="ev-events-grid">
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
                  <div className="ev-empty">
                    <span className="ev-empty-icon" aria-hidden="true">
                      <Calendar size={28} strokeWidth={2} />
                    </span>
                    <p>No upcoming events scheduled right now.</p>
                    <p className="ev-empty-sub">Follow us. New workshops drop regularly.</p>
                    <a
                      href={SOCIAL.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sv-btn-primary"
                    >
                      Follow on X
                    </a>
                  </div>
                )
              ) : past.length > 0 ? (
                <>
                  <div className="ev-events-grid">
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
                    <div className="mt-10 md:mt-12 pt-8 border-t border-[#C2C1BF]/80">
                      <div className="ev-section-header">
                        <h3 className="ev-section-heading text-[clamp(24px,2.5vw,32px)]">Event Gallery</h3>
                        <p className="ev-section-intro">
                          Photos from our past workshops and meetups. Click any image to view full size.
                        </p>
                      </div>
                      <div className="ev-photo-grid">
                        {galleryItems.map(({ url, event, imageIndex }) => (
                          <button
                            key={`${event.id}-${imageIndex}`}
                            type="button"
                            onClick={() => openGallery(event, imageIndex)}
                            className="ev-photo-thumb"
                          >
                            <img
                              src={url}
                              alt={`${event.title}, photo ${imageIndex + 1}`}
                            />
                            <div className="ev-photo-overlay" />
                            <p className="ev-photo-caption">{event.title}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="ev-empty">
                  <span className="ev-empty-icon" aria-hidden="true">
                    <ImageIcon size={28} strokeWidth={2} />
                  </span>
                  <p>Past events will appear here after they run.</p>
                </div>
              )}
            </div>
          </section>

          <section className="ev-section ev-section--cream">
            <div className="ev-inner">
              <div className="ev-partner">
                <div>
                  <p className="ev-partner-eyebrow">For Partners & Institutions</p>
                  <h2 className="ev-partner-heading">Want to Co-Host a Workshop?</h2>
                  <p className="ev-partner-text">
                    Universities, startups, and organizations partner with us to run tailored
                    sessions, from AI literacy for students, blockchain pilots for teams, or
                    custom engineering intensives. We handle curriculum, mentors, and delivery.
                  </p>
                </div>
                <div className="ev-partner-actions">
                  <button type="button" onClick={goToContact} className="sv-btn-primary">
                    <Send size={16} />
                    Partner With Us
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="sv-btn-secondary"
                  >
                    Our Services
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="newsletter" className="ev-newsletter">
            <div className="ev-newsletter-inner">
              <Reveal>
                <div className="ev-newsletter-box">
                  <div className="ev-newsletter-badge">
                    <Mail size={14} />
                    Newsletter
                  </div>
                  <h2 className="ev-section-heading">Never Miss a Session</h2>
                  <p className="ev-section-intro mb-5">
                    Subscribe and we will email you when new workshops, bootcamps, and meetups open for
                    registration, straight to your inbox.
                  </p>

                  <NewsletterForm
                    layout="inline"
                    buttonLabel="Notify me"
                    align="center"
                    theme="light"
                    className="max-w-md mx-auto text-left"
                  />

                  <p className="ev-social-note">Prefer social? Follow us there too.</p>
                  <div className="ev-social-actions">
                    <a
                      href={SOCIAL.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sv-btn-secondary"
                    >
                      Follow on X
                    </a>
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sv-btn-secondary"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
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
