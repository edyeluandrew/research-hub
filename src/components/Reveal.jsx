import React, { useLayoutEffect, useRef, useState } from 'react';

const Reveal = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  variant,
  rootMargin = '80px 0px',
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(true);
      return undefined;
    }

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight + 80 && rect.bottom > -40;
    if (alreadyInView) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const variantClass = variant ? `reveal-${variant}` : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
