export const SITE = {
  name: 'Beta Tech Labs',
  shortName: 'BetaTech',
  tagline: 'AI & Blockchain Research Hub',
  url: 'https://www.beta-techlabs.com',
  location: 'Kabale, Uganda',
  foundedYear: '2024',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DQ38RGHM64',
};

export const CONTACT = {
  email: 'betatechlabs10@gmail.com',
  phone: '+256 764 331 334',
  phoneTel: '+256764331334',
  officePhone: '+256 791 018 086',
  officePhoneTel: '+256791018086',
  whatsapp: '256764331334',
  hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Kabale%2C%20Uganda&z=13&output=embed',
};

export const SOCIAL = {
  x: 'https://x.com/betatechlabs',
  linkedin: 'https://www.linkedin.com/in/betatech-labs-06398039b',
  github: 'https://github.com/beta-techlabs',
  discord: 'https://discord.gg/betatechlabs',
  youtube: 'https://www.youtube.com/@betatechlabs',
};

export const STATS = {
  projects: '5+',
  studentsTrained: '33+',
  researchPapers: '3+',
  teamMembers: 5,
  workshops: '10+',
};

export const TESTIMONIALS = [
  {
    quote:
      'Beta Tech Labs delivered a solid AI prototype for our agri-tech pilot. Their research-first approach gave us confidence before we invested further.',
    name: 'Sarah N.',
    role: 'Startup Founder, Kampala',
  },
  {
    quote:
      'The internship program transformed how our students approach real-world software projects. Practical, rigorous, and locally grounded.',
    name: 'Dr. James M.',
    role: 'Faculty Advisor, Kabale',
  },
  {
    quote:
      'We needed blockchain consulting without the hype. They mapped our use case honestly and built a working proof of concept on schedule.',
    name: 'Daniel K.',
    role: 'Product Lead',
  },
];

export const SERVICE_PACKAGES = [
  {
    title: 'Discovery Call',
    price: 'Free',
    description: '30-minute consultation to understand your goals and explore fit.',
    features: ['Needs assessment', 'Tech stack advice', 'Clear next steps'],
    cta: 'Book a Call',
  },
  {
    title: 'MVP Build',
    price: 'From $2,500',
    description: 'Research-backed prototype in AI, Web, or Blockchain — ready to demo.',
    features: ['2–4 week sprint', 'Weekly demos', 'Source code handoff'],
    cta: 'Start a Project',
    highlighted: true,
  },
  {
    title: 'Research Partnership',
    price: 'Custom',
    description: 'Collaborate on applied AI or blockchain research with our student-led team.',
    features: ['Joint publications', 'Pilot deployments', 'Mentorship included'],
    cta: 'Partner With Us',
  },
];

export const PARTNERS = [
  'Kabale University',
  'Local Tech Community',
  'Student Innovators',
  'East Africa Startups',
];
