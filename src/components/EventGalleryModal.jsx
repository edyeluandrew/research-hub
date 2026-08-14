import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString(undefined, {
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
  const [index, setIndex] = useState(startIndex);
  const images = event?.images || [];

  useEffect(() => {
    setIndex(startIndex);
  }, [event, startIndex]);

  useEffect(() => {
    if (!event) return undefined;

    const onKey = (keyEvent) => {
      if (keyEvent.key === 'Escape') onClose();
      if (keyEvent.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (keyEvent.key === 'ArrowLeft') setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [event, onClose, images.length]);

  if (!event || images.length === 0) return null;

  return (
    <div
      className="ev-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      <div className="ev-modal-head">
        <div style={{ minWidth: 0 }}>
          <h2 id="gallery-title" className="ev-modal-title">
            {event.title}
          </h2>
          <p className="ev-modal-count">
            {formatDate(event.date)} · {index + 1} of {images.length}
          </p>
        </div>

        <div className="btn-row">
          <button
            type="button"
            className="btn btn--sm btn--ghost-ink"
            onClick={() =>
              downloadImage(images[index], `${slugify(event.title)}-${index + 1}.jpg`)
            }
          >
            <Download size={15} />
            Download
          </button>
          <button
            type="button"
            className="ev-modal-close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="ev-modal-stage">
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="ev-modal-nav ev-modal-nav--prev"
              onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="ev-modal-nav ev-modal-nav--next"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <img src={images[index]} alt={`${event.title}, photo ${index + 1}`} />
      </div>

      {images.length > 1 && (
        <div className="ev-modal-strip">
          {images.map((url, thumbIndex) => (
            <button
              key={`${event.id}-thumb-${thumbIndex}`}
              type="button"
              className={`ev-modal-thumb${thumbIndex === index ? ' ev-modal-thumb--active' : ''}`}
              onClick={() => setIndex(thumbIndex)}
              aria-label={`View photo ${thumbIndex + 1}`}
            >
              <img src={url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGalleryModal;
