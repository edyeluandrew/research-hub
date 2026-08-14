import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Loader, MessageSquarePlus, Send, X } from 'lucide-react';
import { TESTIMONIALS } from '../config/site';
import { getTestimonialsData, addTestimonial } from '../data/dataStore';
import Reveal from './Reveal';

const EMPTY_FORM = {
  name: '',
  role: '',
  organization: '',
  location: '',
  quote: '',
};

const getInitials = (name = '') =>
  name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const TestimonialCard = ({ item }) => (
  <article className="ts-card">
    <span className="ts-mark" aria-hidden="true">
      &ldquo;
    </span>
    <p className="ts-quote">{item.quote}</p>

    <div className="ts-author">
      <span className="ts-avatar" aria-hidden="true">
        {getInitials(item.name)}
      </span>
      <div style={{ minWidth: 0 }}>
        <p className="ts-name">{item.name}</p>
        <p className="ts-role">
          {item.role}
          {item.organization ? `, ${item.organization}` : ''}
        </p>
      </div>
    </div>
  </article>
);

const FeedbackModal = ({ open, onClose, formData, onChange, onSubmit, submitting, status }) => {
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ts-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="ts-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} className="ts-modal-close" aria-label="Close">
          <X size={20} />
        </button>

        <h3 id="feedback-title" className="ts-modal-title">
          Share your feedback
        </h3>
        <p className="ts-modal-lead">
          Worked with us on a project, workshop, or partnership? Tell others about it.
        </p>

        <form onSubmit={onSubmit} className="ts-modal-form">
          <div className="ct-form-row">
            <div className="field">
              <label className="field-label" htmlFor="feedback-name">
                Full name
              </label>
              <input
                id="feedback-name"
                name="name"
                type="text"
                className="control"
                value={formData.name}
                onChange={onChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="feedback-role">
                Role
              </label>
              <input
                id="feedback-role"
                name="role"
                type="text"
                className="control"
                value={formData.role}
                onChange={onChange}
                placeholder="Founder, Lecturer..."
                required
              />
            </div>
          </div>

          <div className="ct-form-row">
            <div className="field">
              <label className="field-label" htmlFor="feedback-org">
                Organization
              </label>
              <input
                id="feedback-org"
                name="organization"
                type="text"
                className="control"
                value={formData.organization}
                onChange={onChange}
                placeholder="Company or institution"
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="feedback-location">
                Location
              </label>
              <input
                id="feedback-location"
                name="location"
                type="text"
                className="control"
                value={formData.location}
                onChange={onChange}
                placeholder="Kampala, Uganda"
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="feedback-quote">
              Your feedback
            </label>
            <textarea
              id="feedback-quote"
              name="quote"
              className="control"
              value={formData.quote}
              onChange={onChange}
              placeholder="What was it like working with us?"
              minLength={20}
              required
            />
            <p className="field-note">Minimum 20 characters.</p>
          </div>

          {status === 'success' && (
            <div className="alert alert--success">
              <CheckCircle size={16} />
              <p>Thank you. Your feedback has been submitted.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="alert alert--error">
              <AlertCircle size={16} />
              <p>Something went wrong. Please check your feedback and try again.</p>
            </div>
          )}

          <div className="ts-modal-actions">
            <button type="button" className="btn btn--outline" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [visitorFeedback, setVisitorFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const loadVisitorFeedback = async () => {
    try {
      const data = await getTestimonialsData();
      setVisitorFeedback(
        [...(Array.isArray(data) ? data : [])].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        )
      );
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setVisitorFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitorFeedback();
    const onUpdate = () => loadVisitorFeedback();
    window.addEventListener('testimonialsDataUpdated', onUpdate);
    return () => window.removeEventListener('testimonialsDataUpdated', onUpdate);
  }, []);

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    setStatus(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.quote.trim().length < 20) {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const ok = await addTestimonial(formData);
      if (ok) {
        setFormData(EMPTY_FORM);
        setStatus('success');
        await loadVisitorFeedback();
        setTimeout(() => {
          setModalOpen(false);
          setStatus(null);
        }, 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="section">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">Client feedback</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              What partners say.
            </h2>
          </div>
          <p className="lead">
            Founders, educators, and product teams who have worked with us on research, engineering,
            and delivery.
          </p>
        </Reveal>

        <div className="ts-grid">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={`featured-${index}`} delay={index * 80}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>

        {!loading && visitorFeedback.length > 0 && (
          <div className="ts-community">
            <p className="ts-community-label">From our community</p>
            <div className="ts-grid">
              {visitorFeedback.map((item, index) => (
                <Reveal key={item.id} delay={index * 60}>
                  <TestimonialCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={120} className="ts-cta">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => {
              setStatus(null);
              setModalOpen(true);
            }}
          >
            <MessageSquarePlus size={17} />
            Give feedback
          </button>
        </Reveal>
      </div>

      <FeedbackModal
        open={modalOpen}
        onClose={closeModal}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        status={status}
      />
    </section>
  );
};

export default Testimonials;
