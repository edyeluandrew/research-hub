import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  Send,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { SITE } from '../config/site';
import { navigateToHomeSection } from '../utils/homeNavigation';
import Reveal from '../components/Reveal';
import useSiteContent from '../hooks/useSiteContent';
import { getServicesData, defaultSiteContent } from '../data/dataStore';
import { getPillarIcon, getServiceIcon } from '../utils/serviceIcons';

const ServiceCard = ({ pillar }) => {
  const Icon = pillar.icon;
  return (
    <article className="group interactive-card rounded-xl overflow-hidden flex flex-col h-full">
      <div className="h-1 bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-70" />
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="icon-box w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
          <Icon className="text-gold-500 transition-transform duration-300" size={20} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1 leading-snug">
          {pillar.label}
        </p>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-gold-50">
          {pillar.title}
        </h3>
        <p className="text-sm text-gray-400 leading-snug mb-4 transition-colors duration-300 group-hover:text-gray-300">
          {pillar.description}
        </p>
        <ul className="space-y-2 mt-auto pt-4 border-t border-gray-800">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-300 leading-snug">
              <Check className="text-gold-500 flex-shrink-0 mt-0.5" size={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToContact = () => navigateToHomeSection(navigate, location, 'contact');
  const { content } = useSiteContent();
  const [serviceAreas, setServiceAreas] = useState([]);

  const strategicPillars = content?.strategicPillars || defaultSiteContent.strategicPillars;
  const servicesPage = content?.servicesPage || defaultSiteContent.servicesPage;

  const servicePillars = strategicPillars.map((pillar) => ({
    icon: getPillarIcon(pillar.id),
    label: pillar.label,
    title: pillar.title,
    description: pillar.description,
    items: pillar.items,
  }));

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServicesData();
        const areas = [
          ...(data?.core || []).map((service) => ({ ...service, isCore: true })),
          ...(data?.additional || []).map((service) => ({ ...service, isCore: false })),
        ];
        setServiceAreas(areas);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    loadServices();
    const handleUpdate = () => loadServices();
    window.addEventListener('servicesDataUpdated', handleUpdate);
    return () => window.removeEventListener('servicesDataUpdated', handleUpdate);
  }, []);

  return (
    <>
      <SEO
        title="Our Services - Research, Product Innovation & Engineering"
        description={`${SITE.legalName}: ${SITE.brandPromise} Research, product innovation, solution engineering, and talent development from ${SITE.location}.`}
        keywords="AI services Uganda, blockchain development Kabale, IoT solutions Uganda, software engineering East Africa, product development, research collaboration, tech consulting Uganda"
        ogUrl={`${SITE.url}/services`}
        ogImage={`${SITE.url}/images/og-services.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="pt-20 pb-8 md:pb-10 bg-gold-gradient border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
                The Beta-Tech Way
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-3 max-w-3xl">
                {SITE.brandPromise}
              </h1>
              <p className="text-sm md:text-base text-gray-400 leading-snug max-w-2xl">
                {SITE.positioning}. We conduct research, develop products, engineer solutions, and
                develop talent through a disciplined approach that starts with understanding, not
                assumption.
              </p>
            </div>
          </section>

          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 md:mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Strategic Pillars
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  {servicesPage.pillarsSubtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {servicePillars.map((pillar, index) => (
                  <Reveal key={pillar.label} delay={index * 80}>
                    <ServiceCard pillar={pillar} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 md:py-10 bg-dark-200 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 md:mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Technologies We Work With
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  {servicesPage.techSectionSubtitle}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {serviceAreas.map((tech, index) => {
                  const Icon = getServiceIcon(tech.icon);
                  return (
                    <Reveal key={tech.id || tech.title} delay={index * 50}>
                      <div className="group interactive-card-light rounded-xl p-4 h-full">
                        <div className="icon-box w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-2.5">
                          <Icon className="text-gold-500 transition-transform duration-300" size={16} />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1 leading-snug transition-colors duration-300 group-hover:text-gold-50">
                          {tech.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-snug transition-colors duration-300 group-hover:text-gray-400">
                          {tech.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  The Beta-Tech Innovation Pipeline
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  How validated research becomes products, solutions, and measurable impact.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                {servicesPage.engagementSteps.map((item, index) => (
                  <Reveal key={item.step} delay={index * 60}>
                    <div className="group pipeline-step h-full">
                      <span className="step-number">{item.step}</span>
                      <h3 className="text-base font-bold text-white mt-1 mb-1 leading-snug transition-colors duration-300 group-hover:text-gold-50">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-snug transition-colors duration-300 group-hover:text-gray-300">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 md:py-10 bg-dark-200">
            <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                Ready to Start?
              </h2>
              <p className="text-sm text-gray-400 leading-snug mb-5">
                Tell us about your project, research idea, or engineering challenge. We respond
                within one business day and scope work honestly, no inflated promises.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={goToContact}
                  className="btn-primary inline-flex items-center justify-center text-sm"
                >
                  <Send className="mr-2" size={16} />
                  Contact Us
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="btn-secondary inline-flex items-center justify-center text-sm"
                >
                  View Our Work
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
