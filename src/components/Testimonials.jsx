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
  <article className="ts-card">
    <Quote className="ts-quote-icon" size={24} />
    <p className="ts-quote">&ldquo;{item.quote}&rdquo;</p>

    <div className="ts-author">
      <div className="ts-avatar">
        <span>{getInitials(item.name)}</span>
      </div>
      <div className="min-w-0">
        <p className="ts-name">{item.name}</p>
        <p className="ts-role">{item.role}</p>
        <p className="ts-org">
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[#C2C1BF] bg-[#FCFCFB] p-5 md:p-6 shadow-xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2A2925] hover:text-[#2563EB] transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h3 id="feedback-modal-title" className="text-xl font-medium text-[#020201] mb-1 pr-8" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
          Share your feedback
        </h3>
        <p className="text-sm text-[#2A2925] mb-4 leading-snug">
          Worked with us on a project, workshop, or partnership? Tell others about your experience.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor="feedback-name" className="block text-sm font-semibold text-[#020201] mb-1">
                Full name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2A2925]" size={16} />
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full pl-10 pr-3 py-3 text-sm bg-[#FDF9ED] border border-[#C2C1BF] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#020201] placeholder:text-[#85867E]"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="feedback-role" className="block text-sm font-semibold text-[#020201] mb-1">
                Role / title *
              </label>
              <input
                type="text"
                id="feedback-role"
                name="role"
                value={formData.role}
                onChange={onChange}
                required
                className="w-full px-3 py-3 text-sm bg-[#FDF9ED] border border-[#C2C1BF] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#020201] placeholder:text-[#85867E]"
                placeholder="e.g. Founder, Product Manager"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor="feedback-org" className="block text-sm font-semibold text-[#020201] mb-1">
                Organization *
              </label>
              <input
                type="text"
                id="feedback-org"
                name="organization"
                value={formData.organization}
                onChange={onChange}
                required
                className="w-full px-3 py-3 text-sm bg-[#FDF9ED] border border-[#C2C1BF] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#020201] placeholder:text-[#85867E]"
                placeholder="Company or institution"
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-location" className="block text-sm font-semibold text-[#020201] mb-1">
                Location
              </label>
              <input
                type="text"
                id="feedback-location"
                name="location"
                value={formData.location}
                onChange={onChange}
                className="w-full px-3 py-3 text-sm bg-[#FDF9ED] border border-[#C2C1BF] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#020201] placeholder:text-[#85867E]"
                placeholder="e.g. Kampala, Uganda"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback-quote" className="block text-sm font-semibold text-[#020201] mb-1">
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
              className="w-full px-3 py-3 text-sm bg-[#FDF9ED] border border-[#C2C1BF] rounded-lg focus:outline-none focus:border-[#2563EB] text-[#020201] placeholder:text-[#85867E] resize-none"
              placeholder="Share your experience working with Beta-Tech Labs..."
            />
          </div>

          {status === 'success' && (
            <p className="text-green-700 text-sm flex items-center gap-2">
              <CheckCircle size={16} />
              Thank you. Your feedback is now live on this page.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              Could not submit. Check your connection and try again.
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg border border-[#C2C1BF] text-[#020201] font-semibold text-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-lg bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#020201] transition-colors disabled:opacity-60"
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
    <section id="testimonials" className="ts-section">
      <div className="ts-inner">
        <Reveal className="ts-header">
          <p className="ts-eyebrow">Client Feedback</p>
          <h2 className="ts-heading">What Partners Say About Us</h2>
          <p className="ts-intro">
            Founders, educators, and product teams across Uganda who have worked with us on
            research, engineering, and delivery.
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

        <Reveal delay={150} className="ts-cta">
          <button type="button" onClick={openModal} className="ts-feedback-btn">
            <MessageSquarePlus size={18} />
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
