import React from 'react';
import robot from '../assets/hero-robot.webp';
import chalk from '../assets/hero-chalk.webp';

const DUST = [
  { x: '62%', y: '68%', s: '3px', d: '0s' },
  { x: '70%', y: '74%', s: '2px', d: '1.2s' },
  { x: '78%', y: '71%', s: '4px', d: '0.4s' },
  { x: '84%', y: '80%', s: '2px', d: '2.1s' },
  { x: '58%', y: '82%', s: '3px', d: '1.6s' },
  { x: '90%', y: '76%', s: '2px', d: '0.8s' },
  { x: '74%', y: '86%', s: '3px', d: '2.6s' },
  { x: '66%', y: '78%', s: '2px', d: '3.1s' },
];

/**
 * Hero stage: the chalk classroom loops right-to-left as a marquee; the robot
 * swings in on a cable toward a cursor. Both plates are stills; motion is CSS
 * so the first paint stays cheap.
 */
const HeroScene = () => (
  <div className="hero-scene" aria-hidden="true">
    <div className="hero-chalk">
      <div className="hero-chalk-track">
        <img src={chalk} alt="" className="hero-chalk-img" decoding="async" />
        <img src={chalk} alt="" className="hero-chalk-img" decoding="async" />
      </div>
    </div>

    <div className="hero-dust">
      {DUST.map((speck, index) => (
        <span
          key={index}
          className="hero-speck"
          style={{
            left: speck.x,
            top: speck.y,
            width: speck.s,
            height: speck.s,
            animationDelay: speck.d,
          }}
        />
      ))}
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
