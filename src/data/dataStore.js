import { firebaseSet, firebaseGet } from '../firebase/config';

// Default minimal data
const defaultTeamData = {
  ceo: { 
    id: 'ceo-1', 
    name: 'Edyelu Andrew', 
    role: 'Co-Founder', 
    image: '/images/team/edyelu-andrew.jpg', 
    // skills: ['Rust', 'React', 'Solana', 'Node.js'],
    description: 'Full-stack Developer',
    handles: { x: 'https://x.com/edyeluandrew1', linkedin: 'https://linkedin.com/in/edyelu', github: 'https://github.com/edyeluandrew' }
  },
  topRow: [
    { 
      id: 'member-1', 
      name: 'Ahmed Umar Khemis', 
      role: 'Co-Founder', 
      image: '/images/team/ahmed-umar-khemis.jpg',
      // skills: ['Python', 'TensorFlow', 'Django'],
      description: 'Edge AI Engineer | Embedded Systems Developer | Backend Developer.',
      handles: { x: 'https://x.com/ahmed', linkedin: 'https://linkedin.com/in/ahmed', github: 'https://github.com/ahmed' }
    },
    { 
      id: 'member-2', 
      name: 'Aliho Gilbert', 
      role: 'Co-Founder', 
      image: '/images/team/aliho-gilbert.jpg',
      // skills: ['Python', 'React', 'Backend'],
      description: 'Backend Egineer | AI & Machine Learning Practitioner.',
      handles: { x: 'https://x.com/aliho', linkedin: 'https://linkedin.com/in/aliho', github: 'https://github.com/aliho' }
    }
  ],
  bottomRow: [
    { 
      id: 'member-3', 
      name: 'Muhereza Alouzious', 
      role: 'Co-Founder', 
      image: '/images/team/muhereza-alouzious.jpg',
      // skills: ['React', 'Node.js', 'Web3'],
      description: 'Fullstack Web3 Developer',
      handles: { x: 'https://x.com/muhereza', linkedin: 'https://linkedin.com/in/muhereza', github: 'https://github.com/muhereza' }
    },
    { 
      id: 'member-4', 
      name: 'Kyomugisha Evelyne', 
      role: 'IT specialist and Business Analyst', 
      image: '/images/team/kyomugisha-evelyn.jpg',
      // skills: ['Docker', 'Kubernetes', 'AWS'],
      // description: 'Infrastructure and deployment specialist.',
      handles: { x: 'https://x.com/kyomugisha', linkedin: 'https://linkedin.com/in/kyomugisha'
        
       }
    }
  ]
};

const defaultEventsData = [
  {
    id: 101,
    title: 'Advanced AI & Deep Learning',
    date: '2025-05-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Deep dive into neural networks, computer vision, and natural language processing. Build advanced AI models.',
    attendees: 30,
    images: [],
    highlights: ['Deep Learning', 'Computer Vision', 'NLP'],
    registrationLink: '#'
  },
  {
    id: 102,
    title: 'Rust & Solana Development',
    date: '2025-06-10',
    time: '10:00 AM - 5:00 PM',
    location: 'Kabale University, Tech Lab',
    venue: 'Kabale University',
    description: 'Learn Rust and build high-performance applications on Solana blockchain.',
    attendees: 25,
    images: [],
    highlights: ['Rust Programming', 'Solana Blockchain', 'DeFi'],
    registrationLink: '#'
  },
  {
    id: 103,
    title: 'Web3 & Smart Contracts Bootcamp',
    date: '2025-04-20',
    time: '2:00 PM - 6:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Hands-on bootcamp for learning smart contracts and Web3 development.',
    attendees: 40,
    images: [],
    highlights: ['Solidity', 'Web3.js', 'Security'],
    registrationLink: '#'
  },
  {
    id: 104,
    title: 'React & Frontend Development Workshop',
    date: '2025-07-05',
    time: '10:00 AM - 3:00 PM',
    location: 'Beta Tech Hub, Kabale',
    venue: 'Beta Tech Hub',
    description: 'Master React, state management, and modern frontend practices.',
    attendees: 35,
    images: [],
    highlights: ['React.js', 'State Management', 'UI/UX'],
    registrationLink: '#'
  }
];
const defaultServicesData = { 
  core: [
    {
      id: 'service-1',
      icon: 'Search',
      title: 'Research & Development',
      description: 'Our primary focus. We conduct cutting-edge research in AI and Blockchain.',
      features: [
        'AI Model Research & Development',
        'Blockchain Protocol Studies',
        'Academic Research Publications',
        'Industry Problem Analysis'
      ]
    },
    {
      id: 'service-2',
      icon: 'Settings',
      title: 'Solution Engineering',
      description: 'Building practical solutions based on our research findings.',
      features: [
        'Research-Based Software Development',
        'Proof of Concept Implementation',
        'Prototype Development',
        'Solution Scaling & Deployment'
      ]
    }
  ], 
  additional: [
    {
      id: 'service-3',
      icon: 'Code',
      title: 'Software Engineering',
      description: 'End-to-end software development services.',
      features: [
        'Web Application Development',
        'Mobile App Development',
        'Desktop Software Solutions',
        'API & Backend Development'
      ]
    },
    {
      id: 'service-4',
      icon: 'GraduationCap',
      title: 'Student Internships',
      description: 'Hands-on programs for computing students.',
      features: [
        'Research Methodology Training',
        'Practical Tech Skill Development',
        'Project-Based Learning',
        'Career Mentorship'
      ]
    },
    {
      id: 'service-5',
      icon: 'Brain',
      title: 'AI Consulting',
      description: 'Expert AI implementation services.',
      features: [
        'AI Strategy Development',
        'Machine Learning Solutions',
        'Computer Vision Systems',
        'Natural Language Processing'
      ]
    },
    {
      id: 'service-6',
      icon: 'Link',
      title: 'Blockchain Solutions',
      description: 'Comprehensive blockchain development.',
      features: [
        'Smart Contract Development',
        'DeFi Protocol Design',
        'NFT Platform Development',
        'Web3 Integration'
      ]
    }
  ]
};

const defaultProjectsData = [];

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
    return data || defaultProjectsData;
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
