import React from 'react';

/** Shared building blocks for every diagram on the site. */

const CHAR_W = 4.6;
const PADDING = 18;

export const nodeWidth = (label) => Math.round(label.length * CHAR_W + PADDING);

export const Node = ({ x, y, label, tone = 'solid', w, h = 18, rx = 4 }) => {
  const width = w ?? nodeWidth(label);
  return (
    <g>
      <rect x={x} y={y} width={width} height={h} rx={rx} className={`dg-node dg-node--${tone}`} />
      <text
        x={x + width / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={`dg-label dg-label--${tone}`}
      >
        {label}
      </text>
    </g>
  );
};

export const Edge = ({ d, dotted = false, flow = false }) => (
  <path
    d={d}
    className={`dg-edge${dotted ? ' dg-edge--dotted' : ''}${flow ? ' dg-flow' : ''}`}
  />
);

export const Dot = ({ cx, cy }) => <circle cx={cx} cy={cy} r="1.6" className="dg-dot" />;

export const Arrow = ({ x, y, dir = 'right', size = 4 }) => {
  const paths = {
    right: `M${x - size} ${y - size * 0.75} L${x} ${y} L${x - size} ${y + size * 0.75} Z`,
    up: `M${x - size * 0.75} ${y + size} L${x} ${y} L${x + size * 0.75} ${y + size} Z`,
  };
  return <path d={paths[dir]} className="dg-arrow" />;
};

export const Frame = ({ children, caption, viewBox = '0 0 340 200' }) => (
  <div className="dg-frame">
    <svg viewBox={viewBox} role="img" aria-label={caption} className="dg-svg">
      {children}
    </svg>
    <p className="dg-caption">{caption}</p>
  </div>
);
