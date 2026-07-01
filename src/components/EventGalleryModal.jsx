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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div className="flex items-start justify-between gap-4 p-4 md:p-5 border-b border-gray-800 shrink-0">
        <div className="min-w-0">
          <h2 id="gallery-modal-title" className="text-lg md:text-xl font-bold text-gold-500 leading-snug">
            {event.title}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {formatDate(event.date)}
            {event.venue || event.location ? ` · ${event.venue || event.location}` : ''}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {images.length} photo{images.length !== 1 ? 's' : ''} · Tap an image to enlarge, or download any photo
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {view === 'lightbox' && (
            <>
              <button
                type="button"
                onClick={() => setView('grid')}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-gold-400 border border-gray-700 rounded-lg px-3 py-2 transition-colors"
              >
                <Grid3x3 size={16} />
                All photos
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 text-sm text-dark-200 bg-gold-500 hover:bg-gold-600 rounded-lg px-3 py-2 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
            {images.map((url, index) => (
              <button
                key={`${event.id}-gallery-${index}`}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 bg-dark-200 text-left hover:border-gold-500/40 transition-colors"
              >
                <img
                  src={url}
                  alt={`${event.title}, photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Maximize2
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    size={28}
                  />
                </div>
                <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 relative flex items-center justify-center p-4 min-h-0">
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 bg-black/50 p-2 rounded-full z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 bg-black/50 p-2 rounded-full z-10"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <img
            src={images[currentIndex]}
            alt={`${event.title}, photo ${currentIndex + 1}`}
            className="max-w-full max-h-[calc(100vh-10rem)] object-contain rounded-lg"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGalleryModal;
