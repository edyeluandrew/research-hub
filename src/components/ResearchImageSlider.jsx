import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RESEARCH_SLIDES = [
  {
    src: '/images/research.jpg',
    title: 'Collaborative Research',
    caption: 'Exploring problems together before choosing the right technology',
  },
  {
    src: '/images/reseach.jpg',
    title: 'Research & Investigation',
    caption: 'Studying challenges, gathering evidence, and documenting insights',
  },
  {
    src: '/images/rrr.jpg',
    title: 'Knowledge Generation',
    caption: 'From field notes and literature to ideas ready for innovation',
  },
];

const ResearchImageSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % RESEARCH_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i === 0 ? RESEARCH_SLIDES.length - 1 : i - 1));
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = RESEARCH_SLIDES[active];

  return (
    <div
      className="research-slider my-6 lg:my-8 flex-1 min-h-[220px] lg:min-h-[300px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="research-slider-frame group relative h-full min-h-[220px] lg:min-h-[300px] rounded-xl overflow-hidden border border-gray-800">
        {RESEARCH_SLIDES.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.title}
            className={`research-slider-image absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              index === active
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            } group-hover:scale-[1.03]`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-dark-200/95 via-dark-200/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-dark-200/90" />

        <button
          type="button"
          onClick={prev}
          className="research-slider-nav left-3 opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          className="research-slider-nav right-3 opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-0 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
            {slide.title}
          </p>
          <p className="text-sm md:text-base text-white font-medium leading-snug">{slide.caption}</p>
          <div className="flex gap-1.5 mt-3">
            {RESEARCH_SLIDES.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? 'w-6 bg-gold-500' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchImageSlider;
