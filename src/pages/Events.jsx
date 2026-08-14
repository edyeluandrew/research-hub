import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Code2,
  ExternalLink,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  Mic2,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wordmark from '../components/Wordmark';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import EventGalleryModal from '../components/EventGalleryModal';
import NewsletterForm from '../components/NewsletterForm';
import { getEventsData } from '../data/dataStore';
import { SITE, SOCIAL, STATS } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';

const FORMATS = ['Workshops', 'Bootcamps', 'Meetups', 'Hackathons'];

const WHY_ATTEND = [
  {
    icon: Code2,
    title: 'Build, do not just watch',
    text: 'Every session is hands-on. You leave with code written and something you can show.',
  },
  {
    icon: GraduationCap,
    title: 'Mentors who ship',
    text: 'Led by engineers actively building AI, blockchain, and software products.',
  },
  {
    icon: Sparkles,
    title: 'Real-world context',
    text: 'Shaped around African markets, local infrastructure, and problems our community faces.',
  },
  {
    icon: Mic2,
    title: 'A growing network',
    text: 'Meet founders, students, and builders across Kabale and East Africa.',
  },
];

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const dateParts = (value) => {
  const date = new Date(value);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
  };
};

const daysUntil = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(value);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

const countdownLabel = (days) => {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `${days} days away`;
  return `In ${days} days`;
};

const splitEvents = (events) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];

  (events || []).forEach((event) => {
    const date = new Date(event.date);
    date.setHours(0, 0, 0, 0);
    if (date >= today) upcoming.push(event);
    else past.push(event);
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  past.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { upcoming, past };
};

const EventCard = ({ event, isPast, onOpenGallery, onRequestSeat }) => {
  const parts = dateParts(event.date);
  const days = isPast ? null : daysUntil(event.date);
  const hasImages = event.images?.length > 0;

  return (
    <article className="ev-card">
      <div className="ev-card-media">
        {hasImages ? (
          <img src={event.images[0]} alt={event.title} loading="lazy" />
        ) : (
          <span className="ev-card-fallback">
            <Calendar size={26} strokeWidth={1.5} />
          </span>
        )}

        <div className="ev-card-badges">
          <span className="ev-date">
            <span className="ev-date-day">{parts.day}</span>
            <span className="ev-date-month">{parts.month}</span>
          </span>

          {isPast ? (
            <span className="status-pill ev-badge ev-badge--completed">Completed</span>
          ) : (
            <span
              className={`status-pill ev-badge ${days <= 7 ? 'ev-badge--soon' : 'ev-badge--open'}`}
            >
              {countdownLabel(days)}
            </span>
          )}
        </div>
      </div>

      <div className="ev-card-body">
        {event.category && <p className="ev-card-category">{event.category}</p>}
        <h3 className="ev-card-title">{event.title}</h3>
        {event.description && <p className="ev-card-desc">{event.description}</p>}

        <div className="ev-meta">
          <p className="ev-meta-row">
            <Calendar size={14} strokeWidth={1.9} />
            {formatDate(event.date)}
          </p>
          {event.time && (
            <p className="ev-meta-row">
              <Clock size={14} strokeWidth={1.9} />
              {event.time}
            </p>
          )}
          {event.location && (
            <p className="ev-meta-row">
              <MapPin size={14} strokeWidth={1.9} />
              {event.location}
            </p>
          )}
          {event.attendees ? (
            <p className="ev-meta-row">
              <Users size={14} strokeWidth={1.9} />
              {isPast ? `${event.attendees} attended` : `${event.attendees} seats`}
            </p>
          ) : null}
        </div>

        <div className="ev-card-actions">
          {!isPast && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--sm btn--primary"
            >
              Register
              <ExternalLink size={14} />
            </a>
          )}
          {!isPast && !event.registrationLink && (
            <button type="button" onClick={onRequestSeat} className="btn btn--sm btn--primary">
              <Send size={14} />
              Request a seat
            </button>
          )}
          {hasImages && (
            <button
              type="button"
              onClick={() => onOpenGallery(event)}
              className="btn btn--sm btn--outline"
            >
              <ImageIcon size={14} />
              Gallery ({event.images.length})
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const FeaturedEvent = ({ event, onOpenGallery, onRequestSeat }) => {
  const days = daysUntil(event.date);
  const hasImages = event.images?.length > 0;

  return (
    <article className="ev-featured">
      <div className="ev-featured-media">
        {hasImages ? (
          <img src={event.images[0]} alt={event.title} loading="lazy" />
        ) : (
          <span className="ev-featured-fallback">
            <Calendar size={34} strokeWidth={1.25} />
          </span>
        )}
      </div>

      <div className="ev-featured-body">
        <div className="chip-row">
          <span className="chip chip--accent">Next up</span>
          {event.category && <span className="chip">{event.category}</span>}
          <span className="chip">{countdownLabel(days)}</span>
        </div>

        <h3 className="ev-featured-title">{event.title}</h3>
        {event.description && <p className="ev-featured-desc">{event.description}</p>}

        <div className="ev-meta">
          <p className="ev-meta-row">
            <Calendar size={14} strokeWidth={1.9} />
            {formatDate(event.date)}
            {event.time ? ` · ${event.time}` : ''}
          </p>
          {event.location && (
            <p className="ev-meta-row">
              <MapPin size={14} strokeWidth={1.9} />
              {event.location}
            </p>
          )}
        </div>

        <div className="btn-row" style={{ marginTop: '0.5rem' }}>
          {event.registrationLink ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Reserve your spot
              <ArrowRight size={16} />
            </a>
          ) : (
            <button type="button" onClick={onRequestSeat} className="btn btn--primary">
              <Send size={16} />
              Request a seat
            </button>
          )}
          {hasImages && (
            <button
              type="button"
              onClick={() => onOpenGallery(event)}
              className="btn btn--outline"
            >
              <ImageIcon size={16} />
              Preview
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEventsData();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    load();
    const onUpdate = () => load();
    window.addEventListener('eventsDataUpdated', onUpdate);
    return () => window.removeEventListener('eventsDataUpdated', onUpdate);
  }, []);

  const { upcoming, past } = useMemo(() => splitEvents(events), [events]);
  const featured = upcoming[0] || null;
  const totalAttendees = useMemo(
    () => events.reduce((sum, event) => sum + (event.attendees || 0), 0),
    [events]
  );

  const galleries = useMemo(
    () =>
      [...upcoming, ...past]
        .filter((event) => event.images?.length > 0)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [upcoming, past]
  );

  const openGallery = (event, index = 0) => {
    if (event.images?.length > 0) {
      setSelectedEvent(event);
      setImageIndex(index);
    }
  };

  const list = activeTab === 'upcoming' ? (featured ? upcoming.slice(1) : upcoming) : past;

  return (
    <>
      <SEO
        title="Workshops & Events - AI, Blockchain & Engineering"
        description={`Join ${SITE.name} workshops, bootcamps, and meetups in ${SITE.location}. Hands-on sessions in AI, blockchain, and software engineering.`}
        keywords="tech workshops Uganda, AI workshop Kabale, blockchain bootcamp East Africa, developer events Uganda, Beta Tech Labs events"
        ogUrl={`${SITE.url}/events`}
        ogImage={`${SITE.url}/images/og-events.svg`}
      />

      <div className="page">
        <Header />

        <main className="page-main">
          <PageHero
            eyebrow="Events"
            title={
              <>
                Where Kabale&apos;s <em>builders show up</em>
              </>
            }
            lead="Workshops, bootcamps, and meetups led by engineers who ship real products. This is where research meets hands-on practice."
            stats={
              loading
                ? undefined
                : [
                    { value: events.length, label: 'Events hosted' },
                    { value: upcoming.length, label: 'Upcoming', accent: true },
                    { value: `${totalAttendees}+`, label: 'Total attendees' },
                    { value: STATS.studentsTrained, label: 'Builders trained' },
                  ]
            }
          />

          <section className="section">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">The calendar</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    {activeTab === 'upcoming' ? 'Upcoming sessions.' : 'Past events.'}
                  </h2>
                </div>
                <p className="lead">
                  {activeTab === 'upcoming'
                    ? 'Register early. Seats are limited and workshops fill fast.'
                    : 'A record of what we have run, with photos from each session.'}
                </p>
              </Reveal>

              <div className="ev-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'upcoming'}
                  onClick={() => setActiveTab('upcoming')}
                  className={`ev-tab${activeTab === 'upcoming' ? ' ev-tab--active' : ''}`}
                >
                  Upcoming
                  <span className="ev-tab-count">{upcoming.length}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'past'}
                  onClick={() => setActiveTab('past')}
                  className={`ev-tab${activeTab === 'past' ? ' ev-tab--active' : ''}`}
                >
                  Past
                  <span className="ev-tab-count">{past.length}</span>
                </button>
              </div>

              {loading ? (
                <p className="pj-loading">Loading events...</p>
              ) : (
                <>
                  {activeTab === 'upcoming' && featured && (
                    <Reveal>
                      <FeaturedEvent
                        event={featured}
                        onOpenGallery={openGallery}
                        onRequestSeat={goToContact}
                      />
                    </Reveal>
                  )}

                  {list.length > 0 ? (
                    <div className="ev-grid">
                      {list.map((event, index) => (
                        <Reveal key={event.id} delay={(index % 3) * 70}>
                          <EventCard
                            event={event}
                            isPast={activeTab === 'past'}
                            onOpenGallery={openGallery}
                            onRequestSeat={goToContact}
                          />
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    !featured && (
                      <div className="ev-empty">
                        <span className="ev-empty-icon" aria-hidden="true">
                          {activeTab === 'upcoming' ? (
                            <Calendar size={26} strokeWidth={1.75} />
                          ) : (
                            <CheckCircle size={26} strokeWidth={1.75} />
                          )}
                        </span>
                        <p className="lead">
                          {activeTab === 'upcoming'
                            ? 'No upcoming events scheduled right now.'
                            : 'Past events will appear here after they run.'}
                        </p>
                        {activeTab === 'upcoming' && (
                          <a
                            href={SOCIAL.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary"
                          >
                            Follow for announcements
                          </a>
                        )}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </section>

          {!loading && galleries.length > 0 && (
            <section id="event-galleries" className="section section--muted">
              <div className="shell">
                <Reveal className="sec-head sec-head--split">
                  <div>
                    <p className="eyebrow">Galleries</p>
                    <h2 className="display-2" style={{ marginTop: '1rem' }}>
                      Photos from our events.
                    </h2>
                  </div>
                  <p className="lead">
                    Attended a workshop or meetup? Open any event to browse and download the photos.
                  </p>
                </Reveal>

                <div className="ev-grid">
                  {galleries.map((event, index) => (
                    <Reveal key={event.id} delay={(index % 3) * 60}>
                      <button
                        type="button"
                        onClick={() => openGallery(event)}
                        className="ev-card"
                        style={{ textAlign: 'left', width: '100%' }}
                      >
                        <div className="ev-card-media">
                          <img src={event.images[0]} alt={event.title} loading="lazy" />
                          <div className="ev-card-badges">
                            <span className="status-pill ev-badge">
                              <ImageIcon size={11} />
                              {event.images.length} photo{event.images.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        <div className="ev-card-body">
                          <p className="ev-card-category">{event.category || 'Event'}</p>
                          <h3 className="ev-card-title">{event.title}</h3>
                          <p className="ev-card-desc">{formatDate(event.date)}</p>
                          <span className="btn-text" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                            Open gallery
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="section">
            <div className="shell">
              <Reveal className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Why people come back</p>
                  <h2 className="display-2" style={{ marginTop: '1rem' }}>
                    Rooms where you build.
                  </h2>
                </div>
                <div>
                  <p className="lead">
                    Not lecture halls. You write code, ask hard questions, and leave closer to
                    shipping something real.
                  </p>
                  <div className="chip-row" style={{ marginTop: '1.25rem' }}>
                    {FORMATS.map((format) => (
                      <span key={format} className="chip">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="grid-4">
                {WHY_ATTEND.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 70}>
                      <article className="panel panel--interactive panel--accent">
                        <span className="panel-icon">
                          <Icon size={19} strokeWidth={1.9} />
                        </span>
                        <h3 className="panel-title">{item.title}</h3>
                        <p className="panel-text">{item.text}</p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="cta-band" id="newsletter">
            <div className="shell">
              <h2 className="cta-heading">Never miss a session.</h2>
              <p className="cta-lead">
                Get an email when new workshops and bootcamps open for registration. Universities and
                teams can also partner with us to co-host.
              </p>

              <div style={{ maxWidth: '30rem', margin: '2rem auto 0', textAlign: 'left' }}>
                <div className="nl-form-card">
                  <NewsletterForm layout="inline" buttonLabel="Notify me" theme="dark" />
                </div>
              </div>

              <div className="cta-actions">
                <button type="button" className="btn btn--ghost-ink" onClick={goToContact}>
                  <Send size={16} />
                  Partner with us
                </button>
                <button
                  type="button"
                  className="btn btn--ghost-ink"
                  onClick={() => navigate('/services')}
                >
                  What we do
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Wordmark />
        <Footer />
      </div>

      <EventGalleryModal
        event={selectedEvent}
        startIndex={imageIndex}
        onClose={() => {
          setSelectedEvent(null);
          setImageIndex(0);
        }}
      />
    </>
  );
};

export default Events;
