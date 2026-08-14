import React from 'react';
import { SITE } from '../config/site';

/**
 * The oversized outlined signature that closes the page.
 */
const Wordmark = () => (
  <section className="wm" aria-label={`${SITE.name} signature`}>
    <div className="wm-inner">
      <span className="wm-text" aria-hidden="true">
        {SITE.name}
      </span>
    </div>
    <span className="visually-hidden">{SITE.name}</span>
  </section>
);

export default Wordmark;
