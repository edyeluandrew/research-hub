import React, { useState, useEffect } from 'react';
import { Quote, Send, CheckCircle, AlertCircle, Loader, User, X, MessageSquarePlus } from 'lucide-react';
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

const getInitials = (name) =>
  name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ item }) => (
  <article className="group interactive-card-light flex flex-col h-full rounded-xl p-4 md:p-5">
    <Quote className="text-gold-500/60 mb-2 flex-shrink-0 transition-all duration-300 group-hover:text-gold-500 group-hover:scale-110" size={22} />
    <p className="text-sm text-gray-300 leading-snug flex-1 mb-4 transition-colors duration-300 group-hover:text-gray-200">&ldquo;{item.quote}&rdquo;</p>

    <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
      <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-gold-500">{getInitials(item.name)}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white leading-snug truncate">{item.name}</p>
        <p className="text-xs text-gold-500/90 leading-snug">{item.role}</p>
        <p className="text-xs text-gray-500 leading-snug truncate">
          {item.organization}
          {item.location ? ` · ${item.location}` : ''}
        </p>
      </div>
    </div>
  </article>
);

const FeedbackModal = ({ open, onClose, formData, onChange, onSubmit, submitting, status }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 bg-dark-100 p-5 md:p-6 shadow-xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gold-500 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h3 id="feedback-modal-title" className="text-lg font-bold text-white mb-1 pr-8">
          Share your feedback
        </h3>
        <p className="text-sm text-gray-500 mb-4 leading-snug">
          Worked with us on a project, workshop, or partnership? Tell others about your experience.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor="feedback-name" className="form-label">
                Full name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/70" size={16} />
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="form-input pl-10 py-3"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="feedback-role" className="form-label">
                Role / title *
              </label>
              <input
                type="text"
                id="feedback-role"
                name="role"
                value={formData.role}
                onChange={onChange}
                required
                className="form-input py-3"
                placeholder="e.g. Founder, Product Manager"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor="feedback-org" className="form-label">
                Organization *
              </label>
              <input
                type="text"
                id="feedback-org"
                name="organization"
                value={formData.organization}
                onChange={onChange}
                required
                className="form-input py-3"
                placeholder="Company or institution"
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="feedback-location"
                name="location"
                value={formData.location}
                onChange={onChange}
                className="form-input py-3"
                placeholder="e.g. Kampala, Uganda"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback-quote" className="form-label">
              Your feedback *
            </label>
            <textarea
              id="feedback-quote"
              name="quote"
              value={formData.quote}
              onChange={onChange}
              required
              minLength={20}
              rows={4}
              className="form-input py-3 resize-none"
              placeholder="Share your experience working with Beta-Tech Labs..."
            />
          </div>

          {status === 'success' && (
            <p className="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle size={16} />
              Thank you. Your feedback is now live on this page.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              Could not submit. Check your connection and try again.
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary text-sm flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary inline-flex items-center justify-center text-sm flex-1 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader className="mr-2 animate-spin" size={16} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Submit Feedback
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
  const [loading, setLoading] = useState(true);
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
    const handleUpdate = () => loadVisitorFeedback();
    window.addEventListener('testimonialsDataUpdated', handleUpdate);
    return () => window.removeEventListener('testimonialsDataUpdated', handleUpdate);
  }, []);

  const openModal = () => {
    setStatus(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    setStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <section id="testimonials" className="py-8 md:py-10 bg-dark-200 relative overflow-hidden border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-6 md:mb-8 group">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1.5 section-eyebrow">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2 leading-tight">
            What Partners Say About Us
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-snug">
            Founders, educators, and product teams across Uganda who have worked with us on
            research, engineering, and delivery.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={`featured-${index}`} delay={index * 80}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>

        {!loading && visitorFeedback.length > 0 && (
          <div className="mt-8 md:mt-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-4 text-center section-eyebrow">
              From our community
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {visitorFeedback.map((item, index) => (
                <Reveal key={item.id} delay={index * 60}>
                  <TestimonialCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={150} className="text-center mt-8 md:mt-10">
          <button
            type="button"
            onClick={openModal}
            className="btn-primary inline-flex items-center justify-center text-sm"
          >
            <MessageSquarePlus className="mr-2" size={16} />
            Give Feedback
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
