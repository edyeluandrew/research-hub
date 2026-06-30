import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SITE } from '../config/site';

const ContactPage = () => (
  <>
    <SEO
      title="Contact Us"
      description={`Get in touch with ${SITE.name} for research collaboration, software development, internships, and tech consulting in ${SITE.location}.`}
      keywords="contact Beta Tech Labs, tech consulting Uganda, AI development Kabale, internship application"
      ogUrl={`${SITE.url}/contact`}
      ogImage={`${SITE.url}/images/og-image.svg`}
    />
    <div className="min-h-screen bg-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  </>
);

export default ContactPage;
