import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MissionVision from '../components/MissionVision';
import About from '../components/About';
import OurFocus from '../components/OurFocus';
import CoreValues from '../components/CoreValues';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SITE } from '../config/site';
import { scrollToSection } from '../utils/homeNavigation';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const fromState = location.state?.scrollTo;
    const fromHash = (location.hash || window.location.hash || '').replace('#', '');
    const sectionId = fromState || fromHash;
    if (!sectionId) return;

    let tries = 0;
    const tryScroll = () => {
      if (scrollToSection(sectionId) || tries > 15) return;
      tries += 1;
      setTimeout(tryScroll, 50);
    };

    const timer = setTimeout(tryScroll, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.state, location.hash]);

  return (
    <>
      <SEO
        title="Home - Research-Driven Technology Company"
        description={`${SITE.legalName} transforms research into innovative products and technology solutions. ${SITE.brandPromise} Based in ${SITE.location}.`}
        keywords="research-driven technology Uganda, Beta-Tech Labs, AI products Africa, blockchain solutions Kabale, product innovation, solution engineering, talent development"
        ogUrl={`${SITE.url}/`}
        ogImage={`${SITE.url}/images/og-home.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <MissionVision />
          <About />
          <OurFocus />
          <CoreValues />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer className="footer-fix" />
      </div>
    </>
  );
};

export default Home;
