import { firebaseSet, firebaseGet } from '../firebase/config';

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
    title: 'Advanced AI & Deep Learning',
    date: '2026-08-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Deep dive into neural networks, computer vision, and natural language processing. Build advanced AI models.',
    attendees: 30,
    images: [],
    highlights: ['Deep Learning', 'Computer Vision', 'NLP'],
    registrationLink: 'https://forms.gle/placeholder-register'
  },
  {
    id: 102,
    title: 'Rust & Solana Development',
    date: '2026-09-10',
    time: '10:00 AM - 5:00 PM',
    location: 'Kabale University, Tech Lab',
    venue: 'Kabale University',
    description: 'Learn Rust and build high-performance applications on Solana blockchain.',
    attendees: 25,
    images: [],
    highlights: ['Rust Programming', 'Solana Blockchain', 'DeFi'],
    registrationLink: 'https://forms.gle/placeholder-register'
  },
  {
    id: 103,
    title: 'Web3 & Smart Contracts Bootcamp',
    date: '2026-03-20',
    time: '2:00 PM - 6:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Hands-on bootcamp for learning smart contracts and Web3 development.',
    attendees: 40,
    images: [],
    highlights: ['Solidity', 'Web3.js', 'Security'],
    registrationLink: 'https://forms.gle/placeholder-register'
  },
  {
    id: 104,
    title: 'React & Frontend Development Workshop',
    date: '2026-07-05',
    time: '10:00 AM - 3:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Master React, state management, and modern frontend practices.',
    attendees: 35,
    images: [],
    highlights: ['React.js', 'State Management', 'UI/UX'],
    registrationLink: 'https://forms.gle/placeholder-register'
  }
];
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
      title: 'Product Development',
      description: 'Research-backed products — from AI platforms to IoT dashboards.',
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
      'African language AI, one API away. Translate, transcribe, and synthesise speech across 19+ African languages. Sunbird AI, Khaya AI, and HuggingFace — unified behind a single, consistent interface.',
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
      'Discover culture through real experiences, not just stories. Explore cultural destinations, watch real experiences, and connect with local providers. Everything is designed to help you understand a place before you visit it — or even from wherever you are.',
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
      'StellarIDE is a browser-native IDE for Soroban smart contract development on Stellar. Write, compile, test, and deploy directly from your browser with zero local setup — powered by Monaco Editor, built-in Stellar CLI, and wallet integration for Testnet and Mainnet.',
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
      'Rowan is a peer-to-peer crypto-to-fiat liquidity bridge on Stellar — converting XLM to local currency through mobile money networks across East Africa. Built with escrow-backed trades, real-time DEX pricing, trader verification, and a mobile-first experience for UGX, KES, and TZS.',
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
      'A digital platform that uses AI to assist with eye disease screening and detection — developed to improve access to timely eye diagnostics in Uganda.',
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

    await firebaseSet('betaTechLabs/projects', defaultProjectsData);
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
    return data || defaultEventsData;
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

export { defaultTeamData, defaultEventsData, defaultServicesData, defaultProjectsData };
