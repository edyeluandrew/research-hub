import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Package,
  Settings,
  GraduationCap,
  Check,
  ArrowRight,
  Brain,
  Link as LinkIcon,
  Cpu,
  Smartphone,
  Globe,
  Database,
  Radio,
  BarChart3,
  Send,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { SITE } from '../config/site';

const SERVICE_PILLARS = [
  {
    icon: Search,
    label: 'Research & Innovation',
    title: 'Research That Drives Every Build',
    description:
      'We start with the problem — not the technology. Our team investigates real challenges, studies users and environments, and applies rigorous research before a single line of production code is written.',
    items: [
      'Problem discovery & needs assessment',
      'User, market & field research',
      'Applied AI & machine learning research',
      'Blockchain & distributed systems R&D',
      'IoT, edge computing & embedded exploration',
      'Technical reports & research documentation',
    ],
  },
  {
    icon: Package,
    label: 'Product Development',
    title: 'Products Built on Evidence',
    description:
      'We turn research into products people actually use — from AI platforms and mobile apps to IoT dashboards and business systems designed for African markets and beyond.',
    items: [
      'AI-powered products & intelligent platforms',
      'Mobile applications (iOS & Android)',
      'Web platforms, portals & SaaS products',
      'Business & operations management systems',
      'IoT devices, sensors & monitoring dashboards',
      'Data & analytics platforms',
    ],
  },
  {
    icon: Settings,
    label: 'Solution Engineering',
    title: 'Engineering That Delivers Results',
    description:
      'Organizations come to us with ideas, constraints, and deadlines. We collaborate closely, engineer with discipline, and ship solutions that are maintainable, scalable, and measurable.',
    items: [
      'Custom software & full-stack development',
      'AI automation & intelligent workflows',
      'Blockchain, Web3 & smart contract systems',
      'API design, integrations & legacy modernization',
      'Cloud deployment & production infrastructure',
      'Proof of concept through production scaling',
    ],
  },
  {
    icon: GraduationCap,
    label: 'Talent Development',
    title: 'Growing Capable Builders',
    description:
      'We develop engineers and innovators through real projects — not classroom theory alone. Our programs combine mentorship, research exposure, and hands-on delivery on live work.',
    items: [
      'Structured internships & research training',
      'Practical product development experience',
      'Industry collaboration projects',
      'Technical workshops & innovation events',
      'Mentorship & career development',
    ],
  },
];

const TECHNOLOGY_AREAS = [
  { icon: Brain, title: 'Artificial Intelligence', detail: 'ML models, NLP, computer vision, predictive systems' },
  { icon: LinkIcon, title: 'Blockchain & Web3', detail: 'Smart contracts, DeFi, NFT platforms, on-chain integrations' },
  { icon: Radio, title: 'IoT & Edge Systems', detail: 'Embedded devices, edge AI, sensors, field monitoring tools' },
  { icon: Smartphone, title: 'Mobile Engineering', detail: 'Native and cross-platform apps for real-world users' },
  { icon: Globe, title: 'Web Platforms', detail: 'Portals, dashboards, e-commerce, and internal business tools' },
  { icon: Database, title: 'Data & Analytics', detail: 'Pipelines, dashboards, reporting, and decision intelligence' },
  { icon: Cpu, title: 'Business Systems', detail: 'ERP-style tools, workflows, CRM, and operations software' },
  { icon: BarChart3, title: 'Agri-Tech & Field Solutions', detail: 'Crop monitoring, supply chain, and rural-ready technology' },
];

const ENGAGEMENT_STEPS = [
  { step: '01', title: 'Discover', text: 'We listen, research, and define the real problem worth solving.' },
  { step: '02', title: 'Design', text: 'We shape the solution architecture, scope, and delivery plan.' },
  { step: '03', title: 'Build', text: 'We engineer, test, and iterate with transparent progress updates.' },
  { step: '04', title: 'Deliver', text: 'We deploy, hand over, and support what ships into production.' },
];

const ServiceCard = ({ pillar }) => {
  const Icon = pillar.icon;
  return (
    <article className="rounded-xl border border-gray-800 bg-dark-200 overflow-hidden flex flex-col h-full">
      <div className="h-1 bg-gradient-to-r from-gold-500/30 via-gold-500/50 to-transparent" />
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
          <Icon className="text-gold-500" size={20} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1 leading-snug">
          {pillar.label}
        </p>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">{pillar.title}</h3>
        <p className="text-sm text-gray-400 leading-snug mb-4">{pillar.description}</p>
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

  return (
    <>
      <SEO
        title="Our Services - Research, Engineering & Product Development"
        description={`${SITE.name} delivers research-led AI, blockchain, IoT, and software engineering services from ${SITE.location}. Product development, solution engineering, and talent programs for serious teams.`}
        keywords="AI services Uganda, blockchain development Kabale, IoT solutions Uganda, software engineering East Africa, product development, research collaboration, tech consulting Uganda"
        ogUrl={`${SITE.url}/services`}
        ogImage={`${SITE.url}/images/og-services.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="pt-20 pb-8 md:pb-10 bg-gold-gradient border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
                What We Deliver
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-3 max-w-3xl">
                Research-Led Services for{' '}
                <span className="text-gold-500">Serious Technology</span>
              </h1>
              <p className="text-sm md:text-base text-gray-400 leading-snug max-w-2xl">
                Beta-Tech Labs helps organizations build AI, blockchain, IoT, and software products
                grounded in real research — not hype. From discovery to deployment, we engineer
                solutions that work in the field, scale with your growth, and earn trust from the
                people who use them.
              </p>
            </div>
          </section>

          {/* Four pillars */}
          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 md:mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Our Core Service Areas
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  Four interconnected capabilities — the same foundation behind everything on our
                  home page — expanded for teams evaluating whether we are the right partner.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {SERVICE_PILLARS.map((pillar) => (
                  <ServiceCard key={pillar.label} pillar={pillar} />
                ))}
              </div>
            </div>
          </section>

          {/* Technology stack */}
          <section className="py-8 md:py-10 bg-dark-200 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 md:mb-8 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  Technologies We Work With
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  We combine modern stacks with practical engineering — including IoT tooling,
                  edge systems, and field-ready deployments across Uganda and East Africa.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {TECHNOLOGY_AREAS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.title}
                      className="rounded-xl border border-gray-800 bg-dark-100 p-4"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-2.5">
                        <Icon className="text-gold-500" size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1 leading-snug">{tech.title}</h3>
                      <p className="text-xs text-gray-500 leading-snug">{tech.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How we engage */}
          <section className="py-8 md:py-10 bg-dark-100 border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
              <div className="mb-6 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                  How We Work With Clients
                </h2>
                <p className="text-sm text-gray-400 leading-snug">
                  A clear, disciplined process — so you always know where we are and what comes next.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {ENGAGEMENT_STEPS.map((item) => (
                  <div key={item.step} className="rounded-xl border border-gray-800 bg-dark-200 p-4">
                    <span className="text-xs font-bold text-gold-500/40 tabular-nums">{item.step}</span>
                    <h3 className="text-base font-bold text-white mt-1 mb-1 leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-8 md:py-10 bg-dark-200">
            <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-5 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2 leading-tight">
                Ready to Start?
              </h2>
              <p className="text-sm text-gray-400 leading-snug mb-5">
                Tell us about your project, research idea, or engineering challenge. We respond
                within one business day and scope work honestly — no inflated promises.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/#contact')}
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
