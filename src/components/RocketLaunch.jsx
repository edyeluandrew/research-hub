import React from 'react';
import rocket from '../assets/rocket-bw.webp';

const PAD_X = 62;

/**
 * Two banks share the 14s launch cycle and differ only by delay, so they stay
 * locked to the vehicle. The pad cluster is the dense boil at the engines; the
 * ground bank is the wide, shallow sheet that rolls out along the deck.
 */
const padCluster = Array.from({ length: 24 }, (_, index) => {
  const t = index / 23;
  const offset = (t - 0.5) * 36;
  const x = PAD_X + offset;
  const dist = Math.abs(offset) / 18;

  return {
    x: `${x.toFixed(1)}%`,
    size: `${(18 - dist * 5).toFixed(1)}vmin`,
    delay: `${(dist * 0.55 + (index % 5) * 0.07).toFixed(2)}s`,
    rise: `${(-14 - (1 - dist) * 12).toFixed(0)}%`,
    peak: (0.98 - dist * 0.18).toFixed(2),
    kind: 'pad',
  };
});

const groundBank = Array.from({ length: 32 }, (_, index) => {
  const t = index / 31;
  const x = 0.5 + t * 99;
  const spread = Math.abs(x - PAD_X) / 100;

  return {
    x: `${x.toFixed(1)}%`,
    size: `${(46 - spread * 16).toFixed(1)}vmin`,
    delay: `${(spread * 2.1 + (index % 6) * 0.11).toFixed(2)}s`,
    rise: `${(-16 - (1 - spread) * 14).toFixed(0)}%`,
    peak: (0.88 - spread * 0.2).toFixed(2),
    kind: 'ground',
  };
});

const SMOKE = [...padCluster, ...groundBank];

const RocketLaunch = () => (
  <div className="hero-launch" aria-hidden="true">
    <div className="hero-ground" />

    <div className="hero-smoke">
      {SMOKE.map((puff, index) => (
        <span
          key={index}
          className={`hero-puff hero-puff--${puff.kind}`}
          style={{
            '--puff-x': puff.x,
            '--puff-size': puff.size,
            '--puff-delay': puff.delay,
            '--puff-rise': puff.rise,
            '--puff-peak': puff.peak,
          }}
        />
      ))}
    </div>

    <div className="hero-fog" />
    <div className="hero-cloudbank" />

    <div className="hero-column">
      <div className="hero-vehicle">
        <img src={rocket} alt="" className="hero-rocket" decoding="async" fetchPriority="high" />
        <div className="hero-flame">
          <span className="hero-flame-outer" />
          <span className="hero-flame-core" />
        </div>
        <span className="hero-trail" />
      </div>

      <div className="hero-blast" />

      <div className="hero-pad">
        <span className="hero-pad-deck" />
        <span className="hero-pad-glow" />
      </div>
    </div>
  </div>
);

export default RocketLaunch;
