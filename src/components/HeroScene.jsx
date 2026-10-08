import React from 'react';
import robot from '../assets/hero-robot.webp';
import chalk from '../assets/hero-chalk-plain.webp';

const PLATE_DUST = [
  { x: '46%', y: '42%', s: '2px', d: '0s' },
  { x: '54%', y: '48%', s: '3px', d: '1.6s' },
  { x: '40%', y: '56%', s: '2px', d: '3.1s' },
  { x: '58%', y: '38%', s: '2px', d: '4.4s' },
];

const ChalkPlate = ({ delay = '0s', lead = false }) => (
  <div
    className={`hero-chalk-plate${lead ? ' hero-chalk-plate--lead' : ''}`}
    style={{ '--plate-delay': delay }}
  >
    <img src={chalk} alt="" className="hero-chalk-img" decoding="async" />
    <div className="hero-chalk-dust">
      {PLATE_DUST.map((speck, index) => (
        <span
          key={index}
          className="hero-speck"
          style={{
            left: speck.x,
            top: speck.y,
            width: speck.s,
            height: speck.s,
            animationDelay: `calc(${speck.d} + ${delay})`,
          }}
        />
      ))}
    </div>
  </div>
);

/**
 * Hero stage as a title sequence: the classroom is the world, drifting and
 * slowly looking in on the figures. The robot is the product, arriving on a
 * cable. Stills plus CSS, so the first paint stays cheap.
 */
const HeroScene = () => (
  <div className="hero-scene" aria-hidden="true">
    <div className="hero-chalk">
      <div className="hero-chalk-track">
        <ChalkPlate lead />
        <ChalkPlate delay="-4s" />
      </div>
    </div>

    <div className="hero-robot-rig">
      <img src={robot} alt="" className="hero-robot" decoding="async" fetchPriority="high" />
    </div>

    <svg className="hero-cursor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 2.2 L3 18.4 L8.1 13.8 L12.4 22.2 L15.4 20.7 L11 12.1 L18.2 12.1 Z"
        fill="#f2f2f2"
        stroke="#111"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default HeroScene;
