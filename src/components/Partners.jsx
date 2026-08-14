import React from 'react';
import { Building2 } from 'lucide-react';
import { PARTNERS } from '../config/site';

// The marquee loops by translating the track -50%, so the second half of the
// list must mirror the first half exactly.
const half = [...PARTNERS, ...PARTNERS];
const track = [...half, ...half];

const Partners = () => (
  <div className="trust">
    <div className="shell shell--wide">
      <div className="trust-inner">
        <p className="trust-label">Research &amp; delivery partners</p>

        <div className="marquee trust-marquee">
          <div className="marquee-track">
            {track.map((name, index) => (
              <span key={`${name}-${index}`} className="marquee-item">
                <Building2 size={15} strokeWidth={1.75} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;
