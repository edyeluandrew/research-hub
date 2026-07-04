import { firebaseSet, firebaseGet } from '../firebase/config';
import { COMPANY, CORE_VALUES, STRATEGIC_PILLARS, SITE } from '../config/site';

// Default minimal data
const defaultTeamData = {
  ceo: { 
    id: 'ceo-1', 
    name: 'Edyelu Andrew', 
    role: 'Co-Founder & Technical Lead', 
    image: '/images/team/edyelu-andrew.jpg', 
    description: 'Full-stack engineer building scalable web platforms and blockchain products.',
    handles: { x: 'https://x.com/edyeluandrew1', linkedin: 'https://linkedin.com/in/edyelu', github: 'https://github.com/edyeluandrew' }
  },
  topRow: [
    { 
      id: 'member-1', 
      name: 'Ahmed Umar Khemis', 
      role: 'Co-Founder & Edge AI Engineer', 
      image: '/images/team/ahmed-umar-khemis.jpg',
      description: 'Specializes in edge AI, embedded systems, and production-grade backend architecture.',
      handles: { x: 'https://x.com/ahmed', linkedin: 'https://linkedin.com/in/ahmed', github: 'https://github.com/ahmed' }
    },
    { 
      id: 'member-2', 
      name: 'Aliho Gilbert', 
      role: 'Co-Founder & ML Engineer', 
      image: '/images/team/aliho-gilbert.jpg',
      description: 'Backend engineer focused on applied machine learning and intelligent systems.',
      handles: { x: 'https://x.com/aliho', linkedin: 'https://linkedin.com/in/aliho', github: 'https://github.com/aliho' }
    }
  ],
  bottomRow: [
    { 
      id: 'member-3', 
      name: 'Muhereza Alouzious', 
      role: 'Co-Founder & Full-Stack Engineer', 
      image: '/images/team/muhereza-alouzious.jpg',
      description: 'Delivers end-to-end Web3 platforms and modern full-stack web applications.',
      handles: { x: 'https://x.com/muhereza', linkedin: 'https://linkedin.com/in/muhereza', github: 'https://github.com/muhereza' }
    },
    { 
      id: 'member-4', 
      name: 'Kyomugisha Evelyne', 
      role: 'Business Analyst & IT Strategist', 
      image: '/images/team/kyomugisha-evelyn.jpg',
      description: 'Aligns business goals with technical delivery, systems analysis, and product strategy.',
      handles: { x: 'https://x.com/kyomugisha', linkedin: 'https://linkedin.com/in/kyomugisha' }
    }
  ]
};

const defaultEventsData = [
  {
    id: 101,
    title: 'Web3 & Smart Contracts Bootcamp',
    date: '2026-03-20',
    time: '2:00 PM - 6:00 PM',
    location: 'Beta Tech Labs, Kabale Main Town',
    venue: 'Beta Tech Labs HQ',
    category: 'Bootcamp',
    description:
      'A hands-on afternoon building on-chain, from Solidity fundamentals to deploying your first smart contract. Participants left with a working dApp prototype and a clear mental model of Web3 security pitfalls.',
    attendees: 42,
    images: [],
    highlights: ['Solidity', 'Web3.js', 'Smart Contract Security'],
    registrationLink: '',
  },
  {
    id: 105,
    title: 'Stellar & Soroban Developer Day',
    date: '2026-02-08',
    time: '10:00 AM - 4:00 PM',
    location: 'Kabale University, Computer Science Lab',
    venue: 'Kabale University',
    category: 'Workshop',
    description:
      'East Africa\'s growing Stellar ecosystem came to Kabale. Students and developers built Soroban smart contracts, connected Freighter wallets, and explored real use cases for cross-border payments and tokenized assets.',
    attendees: 38,
    images: [],
    highlights: ['Stellar', 'Soroban', 'Freighter Wallet'],
    registrationLink: '',
  },
  {
    id: 106,
    title: 'AI Fundamentals for Builders',
    date: '2025-11-22',
    time: '9:00 AM - 3:00 PM',
    location: 'Beta Tech Labs, Kabale Main Town',
    venue: 'Beta Tech Labs HQ',
    category: 'Workshop',
    description:
      'A full-day introduction to machine learning for students and early-career developers. Covered data pipelines, model training, and deploying a simple computer-vision demo, no PhD required, just curiosity and a laptop.',
    attendees: 55,
    images: [],
    highlights: ['Machine Learning', 'Computer Vision', 'Python'],
    registrationLink: '',
  },
  {
    id: 107,
    title: 'Kabale Tech Innovation Meetup',
    date: '2026-01-18',
    time: '3:00 PM - 6:00 PM',
    location: 'Numba Cafe, Kabale Main Town',
    venue: 'Numba Cafe',
    category: 'Meetup',
    description:
      'An open evening for founders, students, and engineers to share what they are building. Lightning talks on AI products, blockchain pilots, and student startup ideas, followed by networking over coffee.',
    attendees: 60,
    images: [],
    highlights: ['Networking', 'Lightning Talks', 'Startups'],
    registrationLink: '',
  },
  {
    id: 103,
    title: 'React & Modern Frontend Workshop',
    date: '2026-07-05',
    time: '10:00 AM - 3:00 PM',
    location: 'Beta Tech Labs, Kabale Main Town',
    venue: 'Beta Tech Labs HQ',
    category: 'Workshop',
    description:
      'Ship interfaces that feel production-ready. This workshop covers React component architecture, state management patterns, API integration, and performance basics, with a capstone mini-app you build and deploy the same day.',
    attendees: 35,
    images: [],
    highlights: ['React.js', 'State Management', 'UI Engineering'],
    registrationLink: 'https://forms.gle/placeholder-register',
  },
  {
    id: 104,
    title: 'Advanced AI & Deep Learning',
    date: '2026-08-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Beta Tech Labs, Kabale Main Town',
    venue: 'Beta Tech Labs HQ',
    category: 'Bootcamp',
    description:
      'Go beyond tutorials. Neural network architectures, transfer learning, NLP pipelines, and computer-vision workflows, taught through live coding sessions and a team challenge you present at the end of the day.',
    attendees: 30,
    images: [],
    highlights: ['Deep Learning', 'Computer Vision', 'NLP'],
    registrationLink: 'https://forms.gle/placeholder-register',
  },
  {
    id: 102,
    title: 'Rust & Solana Development',
    date: '2026-09-10',
    time: '10:00 AM - 5:00 PM',
    location: 'Kabale University, Tech Lab',
    venue: 'Kabale University',
    category: 'Bootcamp',
    description:
      'High-performance blockchain development from the ground up. Learn Rust syntax and patterns, then apply them to Solana programs, building, testing, and deploying on devnet with mentor support throughout.',
    attendees: 25,
    images: [],
    highlights: ['Rust', 'Solana', 'On-Chain Programs'],
    registrationLink: 'https://forms.gle/placeholder-register',
  },
];
const mergeEventsWithDefaults = (stored) => {
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return defaultEventsData;
  }

  const merged = defaultEventsData.map((def) => {
    const match = stored.find(
      (e) => e.id === def.id || e.title?.toLowerCase() === def.title?.toLowerCase()
    );
    return match
      ? {
          ...def,
          ...match,
          title: def.title,
          images: match.images?.length ? match.images : def.images || [],
        }
      : def;
  });

  stored.forEach((event) => {
    const known = defaultEventsData.some(
      (d) => d.id === event.id || d.title?.toLowerCase() === event.title?.toLowerCase()
    );
    if (!known) merged.push(event);
  });

  return merged;
};

const defaultServicesData = {
  core: [
    {
      id: 'service-1',
      icon: 'Search',
      title: 'Research & Innovation',
      description: 'Problem-led research in AI, blockchain, IoT, and emerging technologies.',
      features: [
        'Problem Discovery & Needs Assessment',
        'User, Market & Field Research',
        'Applied AI & Machine Learning Research',
        'Blockchain & Distributed Systems R&D',
        'IoT & Edge Computing Exploration',
        'Technical Reports & Documentation',
      ],
    },
    {
      id: 'service-2',
      icon: 'Package',
      title: 'Product Innovation',
      description: 'Research-backed products, from AI platforms to IoT dashboards.',
      features: [
        'AI-Powered Products & Platforms',
        'Mobile Applications',
        'Web Platforms & Business Systems',
        'IoT Devices & Monitoring Dashboards',
        'Data & Analytics Platforms',
      ],
    },
    {
      id: 'service-3',
      icon: 'Settings',
      title: 'Solution Engineering',
      description: 'Custom engineering from proof of concept to production deployment.',
      features: [
        'Custom Software & Full-Stack Development',
        'AI Automation & Intelligent Workflows',
        'Blockchain & Web3 Applications',
        'API Design & System Integrations',
        'Cloud Deployment & Production Scaling',
      ],
    },
    {
      id: 'service-4',
      icon: 'GraduationCap',
      title: 'Talent Development',
      description: 'Internships, training, and mentorship through real project delivery.',
      features: [
        'Structured Internships & Research Training',
        'Industry Collaboration Projects',
        'Technical Workshops & Events',
        'Mentorship & Career Development',
      ],
    },
  ],
  additional: [
    {
      id: 'service-5',
      icon: 'Brain',
      title: 'AI & Machine Learning',
      description: 'ML models, NLP, computer vision, and predictive systems.',
      features: ['Model Development', 'Computer Vision', 'NLP Solutions', 'AI Strategy'],
    },
    {
      id: 'service-6',
      icon: 'Link',
      title: 'Blockchain & Web3',
      description: 'Smart contracts, DeFi, and on-chain integrations.',
      features: ['Smart Contracts', 'DeFi Protocols', 'Web3 Integration', 'NFT Platforms'],
    },
    {
      id: 'service-7',
      icon: 'Cpu',
      title: 'IoT & Edge Systems',
      description: 'Embedded devices, edge AI, and field monitoring tools.',
      features: ['Embedded Development', 'Edge AI', 'Sensor Integration', 'IoT Dashboards'],
    },
    {
      id: 'service-8',
      icon: 'Code',
      title: 'Software Engineering',
      description: 'Web, mobile, API, and business system development.',
      features: ['Web Applications', 'Mobile Apps', 'API & Backend', 'Business Systems'],
    },
  ],
};

const defaultEngagementSteps = [
  {
    step: '01',
    title: 'Research Insights',
    text: 'We begin with validated findings, user insights, and opportunities from our research framework.',
  },
  {
    step: '02',
    title: 'Idea Generation',
    text: 'We transform research into concepts through ideation, exploration, and opportunity analysis.',
  },
  {
    step: '03',
    title: 'Concept Validation',
    text: 'We test feasibility, prototype ideas, gather feedback, and assess risk before building.',
  },
  {
    step: '04',
    title: 'Engineering',
    text: 'Validated concepts become reliable products or client solutions through disciplined engineering.',
  },
  {
    step: '05',
    title: 'Deployment & Impact',
    text: 'We launch, monitor, gather feedback, and continuously improve for lasting value.',
  },
];

export const defaultSiteContent = {
  mission: {
    sectionEyebrow: 'Who We Are',
    sectionTitle: 'A Research-Driven Technology Company',
    purpose: COMPANY.purpose,
    vision: COMPANY.vision,
    mission: COMPANY.mission,
    positioningStatement: COMPANY.positioningStatement,
    philosophy: SITE.philosophy,
    philosophyPractice: SITE.philosophyPractice,
  },
  coreValues: CORE_VALUES.map((value, index) => ({
    id: `value-${index + 1}`,
    ...value,
  })),
  strategicPillars: STRATEGIC_PILLARS,
  servicesPage: {
    pillarsSubtitle:
      "Four interconnected capabilities that define how Beta-Tech Labs creates value for partners, communities, and Africa's digital future.",
    techSectionSubtitle:
      'We combine modern stacks with practical engineering, including IoT tooling, edge systems, and field-ready deployments across Uganda and East Africa.',
    engagementSteps: defaultEngagementSteps,
  },
};

const mergeSiteContent = (stored) => {
  if (!stored || typeof stored !== 'object') return defaultSiteContent;

  return {
    mission: { ...defaultSiteContent.mission, ...(stored.mission || {}) },
    coreValues:
      Array.isArray(stored.coreValues) && stored.coreValues.length > 0
        ? stored.coreValues
        : defaultSiteContent.coreValues,
    strategicPillars:
      Array.isArray(stored.strategicPillars) && stored.strategicPillars.length > 0
        ? stored.strategicPillars
        : defaultSiteContent.strategicPillars,
    servicesPage: {
      ...defaultSiteContent.servicesPage,
      ...(stored.servicesPage || {}),
      engagementSteps:
        stored.servicesPage?.engagementSteps?.length > 0
          ? stored.servicesPage.engagementSteps
          : defaultSiteContent.servicesPage.engagementSteps,
    },
  };
};

// Project logos in /public/images
export const PROJECT_LOGOS = {
  stellaride: '/images/Stellarlogo.png',
  stellar: '/images/Stellarlogo.png',
  fasiri: '/images/fasiri-icon.png',
  'cultural hub': '/images/logo_cultural_hub-bg.png',
};

const enrichProject = (project) => {
  const titleKey = project.title?.toLowerCase().trim();
  const defaults = defaultProjectsData.find((d) => d.title.toLowerCase() === titleKey);
  if (!defaults) return project;

  return {
    ...defaults,
    image: defaults.image || PROJECT_LOGOS[titleKey] || project.image || '',
    githubRepo: project.githubRepo || defaults.githubRepo,
    githubRepoPrivate: project.githubRepoPrivate ?? defaults.githubRepoPrivate,
    liveUrlPrivate: project.liveUrlPrivate ?? defaults.liveUrlPrivate,
  };
};

const mergeProjectsWithDefaults = (stored) => {
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return defaultProjectsData;
  }

  return defaultProjectsData.map((def) => {
    const match = stored.find(
      (p) =>
        p.id === def.id ||
        p.title?.toLowerCase() === def.title.toLowerCase() ||
        (def.title === 'StellarIDE' && p.title?.toLowerCase() === 'stellar') ||
        (def.title === 'Numba' && p.title?.toLowerCase() === 'nuba')
    );
    return enrichProject(match ? { ...match, title: def.title } : def);
  });
};

const defaultProjectsData = [
  {
    id: 1,
    title: 'Fasiri',
    description:
      'African language AI, one API away. Translate, transcribe, and synthesise speech across 19+ African languages. Sunbird AI, Khaya AI, and HuggingFace, unified behind a single, consistent interface.',
    status: 'Launched',
    category: 'African Language API',
    image: '/images/fasiri-icon.png',
    liveUrl: 'https://www.fasiri-ai.com/',
    liveUrlStatus: 'available',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/beta-techlabs',
    githubRepoPrivate: false,
  },
  {
    id: 2,
    title: 'Cultural Hub',
    description:
      'Discover culture through real experiences, not just stories. Explore cultural destinations, watch real experiences, and connect with local providers. Everything is designed to help you understand a place before you visit it, or even from wherever you are.',
    status: 'Launched',
    category: 'Cultural Community Platform',
    image: '/images/logo_cultural_hub-bg.png',
    liveUrl: 'http://cultural-hub-psi.vercel.app/',
    liveUrlStatus: 'available',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/beta-techlabs',
    githubRepoPrivate: false,
  },
  {
    id: 3,
    title: 'StellarIDE',
    description:
      'StellarIDE is a browser-native IDE for Soroban smart contract development on Stellar. Write, compile, test, and deploy directly from your browser with zero local setup, powered by Monaco Editor, built-in Stellar CLI, and wallet integration for Testnet and Mainnet.',
    status: 'Launched',
    category: 'Blockchain / Developer Tools',
    image: '/images/Stellarlogo.png',
    liveUrl: 'http://stellaride.dev/',
    liveUrlStatus: 'available',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/beta-techlabs',
    githubRepoPrivate: false,
  },
  {
    id: 4,
    title: 'Rowan',
    description:
      'Rowan is a peer-to-peer crypto-to-fiat liquidity bridge on Stellar, converting XLM to local currency through mobile money networks across East Africa. Built with escrow-backed trades, real-time DEX pricing, trader verification, and a mobile-first experience for UGX, KES, and TZS.',
    status: 'In Development',
    category: 'FinTech / Blockchain',
    liveUrl: '',
    liveUrlStatus: 'coming-soon',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/edyeluandrew/rowan',
    githubRepoPrivate: false,
  },
  {
    id: 5,
    title: 'RetiSight',
    description:
      'A digital platform that uses AI to assist with eye disease screening and detection, developed to improve access to timely eye diagnostics in Uganda.',
    status: 'In Development',
    category: 'AI / Healthcare',
    liveUrl: '',
    liveUrlStatus: 'coming-soon',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/beta-techlabs',
    githubRepoPrivate: false,
  },
  {
    id: 6,
    title: 'Numba',
    description:
      'A system that allows customers to scan the QR code and are redirected to the menu where they can make orders and checkout.',
    status: 'In Development',
    category: 'Web Platform / Hospitality',
    liveUrl: '',
    liveUrlStatus: 'coming-soon',
    liveUrlPrivate: false,
    githubRepo: 'https://github.com/edyeluandrew/numba',
    githubRepoPrivate: false,
  },
];

// Initialize Firebase
export const initializeFirebaseData = async () => {
  try {
    const team = await firebaseGet('betaTechLabs/team');
    if (!team) await firebaseSet('betaTechLabs/team', defaultTeamData);
    
    const events = await firebaseGet('betaTechLabs/events');
    if (!events) await firebaseSet('betaTechLabs/events', defaultEventsData);
    
    const services = await firebaseGet('betaTechLabs/services');
    if (!services) await firebaseSet('betaTechLabs/services', defaultServicesData);

    const projects = await firebaseGet('betaTechLabs/projects');
    if (!projects) await firebaseSet('betaTechLabs/projects', defaultProjectsData);

    const siteContent = await firebaseGet('betaTechLabs/siteContent');
    if (!siteContent) await firebaseSet('betaTechLabs/siteContent', defaultSiteContent);

    const testimonials = await firebaseGet('betaTechLabs/testimonials');
    if (!testimonials) await firebaseSet('betaTechLabs/testimonials', []);

    const subscribers = await firebaseGet('betaTechLabs/newsletterSubscribers');
    if (!subscribers) await firebaseSet('betaTechLabs/newsletterSubscribers', []);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

// Team Data
export const getTeamData = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/team');
    return data || defaultTeamData;
  } catch (e) {
    console.error('Error getting team data:', e);
    return defaultTeamData;
  }
};

export const saveTeamData = async (data) => {
  try {
    await firebaseSet('betaTechLabs/team', data);
    window.dispatchEvent(new Event('teamDataUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving team data:', e);
    return false;
  }
};

export const resetTeamData = async () => {
  try {
    await firebaseSet('betaTechLabs/team', defaultTeamData);
    window.dispatchEvent(new Event('teamDataUpdated'));
  } catch (e) {
    console.error('Error resetting team data:', e);
  }
};

// Events Data
export const getEventsData = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/events');
    return mergeEventsWithDefaults(data);
  } catch (e) {
    console.error('Error getting events data:', e);
    return defaultEventsData;
  }
};

export const saveEventsData = async (data) => {
  try {
    await firebaseSet('betaTechLabs/events', data);
    window.dispatchEvent(new Event('eventsDataUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving events data:', e);
    return false;
  }
};

export const resetEventsData = async () => {
  try {
    await firebaseSet('betaTechLabs/events', defaultEventsData);
    window.dispatchEvent(new Event('eventsDataUpdated'));
  } catch (e) {
    console.error('Error resetting events data:', e);
  }
};

// Services Data
export const getServicesData = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/services');
    return data || defaultServicesData;
  } catch (e) {
    console.error('Error getting services data:', e);
    return defaultServicesData;
  }
};

export const saveServicesData = async (data) => {
  try {
    await firebaseSet('betaTechLabs/services', data);
    window.dispatchEvent(new Event('servicesDataUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving services data:', e);
    return false;
  }
};

export const resetServicesData = async () => {
  try {
    await firebaseSet('betaTechLabs/services', defaultServicesData);
    window.dispatchEvent(new Event('servicesDataUpdated'));
  } catch (e) {
    console.error('Error resetting services data:', e);
  }
};

export const resetAllData = async () => {
  try {
    await resetTeamData();
    await resetEventsData();
    await resetServicesData();
    await resetProjectsData();
  } catch (e) {
    console.error('Error resetting all data:', e);
  }
};

// Projects Data
export const getProjectsData = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/projects');
    return mergeProjectsWithDefaults(data);
  } catch (e) {
    console.error('Error getting projects data:', e);
    return defaultProjectsData;
  }
};

export const saveProjectsData = async (data) => {
  try {
    await firebaseSet('betaTechLabs/projects', data);
    window.dispatchEvent(new Event('projectsDataUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving projects data:', e);
    return false;
  }
};

export const resetProjectsData = async () => {
  try {
    await firebaseSet('betaTechLabs/projects', defaultProjectsData);
    window.dispatchEvent(new Event('projectsDataUpdated'));
  } catch (e) {
    console.error('Error resetting projects data:', e);
  }
};

// Client feedback / testimonials
export const getTestimonialsData = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/testimonials');
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Error getting testimonials data:', e);
    return [];
  }
};

export const saveTestimonialsData = async (data) => {
  try {
    await firebaseSet('betaTechLabs/testimonials', data);
    window.dispatchEvent(new Event('testimonialsDataUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving testimonials data:', e);
    return false;
  }
};

export const addTestimonial = async (testimonial) => {
  try {
    const existing = await getTestimonialsData();
    const entry = {
      id: Date.now(),
      name: testimonial.name.trim(),
      role: testimonial.role.trim(),
      organization: testimonial.organization.trim(),
      location: testimonial.location?.trim() || '',
      quote: testimonial.quote.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [entry, ...existing];
    return saveTestimonialsData(updated);
  } catch (e) {
    console.error('Error adding testimonial:', e);
    return false;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const existing = await getTestimonialsData();
    const updated = existing.filter((item) => item.id !== id);
    return saveTestimonialsData(updated);
  } catch (e) {
    console.error('Error deleting testimonial:', e);
    return false;
  }
};

export const updateTestimonial = async (id, updates) => {
  try {
    const existing = await getTestimonialsData();
    const updated = existing.map((item) =>
      item.id === id
        ? {
            ...item,
            name: (updates.name ?? item.name).trim(),
            role: (updates.role ?? item.role).trim(),
            organization: (updates.organization ?? item.organization).trim(),
            location: (updates.location ?? item.location ?? '').trim(),
            quote: (updates.quote ?? item.quote).trim(),
          }
        : item
    );
    return saveTestimonialsData(updated);
  } catch (e) {
    console.error('Error updating testimonial:', e);
    return false;
  }
};

// Newsletter subscribers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getNewsletterSubscribers = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/newsletterSubscribers');
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Error getting newsletter subscribers:', e);
    return [];
  }
};

export const saveNewsletterSubscribers = async (data) => {
  try {
    await firebaseSet('betaTechLabs/newsletterSubscribers', data);
    window.dispatchEvent(new Event('newsletterSubscribersUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving newsletter subscribers:', e);
    return false;
  }
};

export const addNewsletterSubscriber = async (email) => {
  const clean = (email || '').trim().toLowerCase();
  if (!EMAIL_REGEX.test(clean)) {
    return { ok: false, reason: 'invalid' };
  }
  try {
    const existing = await getNewsletterSubscribers();
    if (existing.some((sub) => sub.email?.toLowerCase() === clean)) {
      return { ok: true, reason: 'exists' };
    }
    const entry = {
      id: Date.now(),
      email: clean,
      subscribedAt: new Date().toISOString(),
    };
    const saved = await saveNewsletterSubscribers([entry, ...existing]);
    return saved ? { ok: true, reason: 'added' } : { ok: false, reason: 'error' };
  } catch (e) {
    console.error('Error adding newsletter subscriber:', e);
    return { ok: false, reason: 'error' };
  }
};

export const deleteNewsletterSubscriber = async (id) => {
  try {
    const existing = await getNewsletterSubscribers();
    return saveNewsletterSubscribers(existing.filter((sub) => sub.id !== id));
  } catch (e) {
    console.error('Error deleting newsletter subscriber:', e);
    return false;
  }
};

// Mission, values, pillars, and services page copy
export const getSiteContent = async () => {
  try {
    const data = await firebaseGet('betaTechLabs/siteContent');
    return mergeSiteContent(data);
  } catch (e) {
    console.error('Error getting site content:', e);
    return defaultSiteContent;
  }
};

export const saveSiteContent = async (data) => {
  try {
    await firebaseSet('betaTechLabs/siteContent', data);
    window.dispatchEvent(new Event('siteContentUpdated'));
    return true;
  } catch (e) {
    console.error('Error saving site content:', e);
    return false;
  }
};

export {
  defaultTeamData,
  defaultEventsData,
  defaultServicesData,
  defaultProjectsData,
};
