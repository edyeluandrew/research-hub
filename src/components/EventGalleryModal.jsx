import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Grid3x3, Maximize2 } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const slugify = (text) =>
  (text || 'event-photo')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const downloadImage = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

const EventGalleryModal = ({ event, startIndex = 0, onClose }) => {
  const [view, setView] = useState('grid');
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const images = event?.images || [];

  useEffect(() => {
    setCurrentIndex(startIndex);
    setView('grid');
  }, [event, startIndex]);

  useEffect(() => {
    if (!event) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (view === 'lightbox' && e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % images.length);
      if (view === 'lightbox' && e.key === 'ArrowLeft') {
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [event, onClose, view, images.length]);

  if (!event || images.length === 0) return null;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setView('lightbox');
  };

  const handleDownload = () => {
    const url = images[currentIndex];
    const name = `${slugify(event.title)}-${currentIndex + 1}.jpg`;
    downloadImage(url, name);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="ev-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="ev-modal">
        <div className="ev-modal-header">
          <div className="min-w-0">
            <h2 id="gallery-modal-title" className="ev-modal-title">
              {event.title}
            </h2>
            <p className="ev-modal-meta">
              {formatDate(event.date)}
              {event.venue || event.location ? ` · ${event.venue || event.location}` : ''}
            </p>
            <p className="ev-modal-hint">
              {images.length} photo{images.length !== 1 ? 's' : ''} · Tap an image to enlarge, or download any photo
            </p>
          </div>
          <div className="ev-modal-actions">
            {view === 'lightbox' && (
              <>
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className="ev-modal-btn hidden sm:inline-flex"
                >
                  <Grid3x3 size={16} />
                  All photos
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="ev-modal-btn ev-modal-btn--primary"
                >
                  <Download size={16} />
                  Download
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ev-modal-close"
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="ev-modal-body">
            <div className="ev-modal-grid">
              {images.map((url, index) => (
                <button
                  key={`${event.id}-gallery-${index}`}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="ev-modal-thumb"
                >
                  <img
                    src={url}
                    alt={`${event.title}, photo ${index + 1}`}
                  />
                  <div className="ev-modal-thumb-overlay">
                    <Maximize2 size={26} strokeWidth={2} />
                  </div>
                  <span className="ev-modal-thumb-num">{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="ev-modal-lightbox">
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="ev-modal-nav ev-modal-nav--prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                  className="ev-modal-nav ev-modal-nav--next"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            <img
              src={images[currentIndex]}
              alt={`${event.title}, photo ${currentIndex + 1}`}
            />
            <div className="ev-modal-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGalleryModal;
