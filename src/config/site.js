export const SITE = {
  name: 'Beta Tech Labs',
  shortName: 'BetaTech',
  tagline: 'AI & Blockchain Research Hub',
  url: 'https://www.beta-techlabs.com',
  location: 'Kabale Main Town, Uganda',
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
  address: {
    headline: 'Behind Kabale Central Police Station',
    area: 'Kabale Main Town, Uganda',
    road: 'Kabale-Kisoro Road',
    landmark: 'Opposite Numba Cafe · Near All Saints Church',
    directions:
      'On Kabale-Kisoro Road in main town. Numba Cafe sits opposite the police station, next to All Saints Church. Beta-Tech Labs is in the building behind the station.',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Kabale+Central+Police+Station,+Kabale-Kisoro+Road,+Kabale,+Uganda&z=18&output=embed',
  mapLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=Kabale+Central+Police+Station,+Kabale,+Uganda',
};

export const SOCIAL = {
  x: 'https://x.com/betatechlabs',
  linkedin: 'https://www.linkedin.com/in/betatech-labs-06398039b',
  github: 'https://github.com/beta-techlabs',
  discord: 'https://discord.gg/betatechlabs',
  youtube: 'https://www.youtube.com/@betatechlabs',
};

export const STATS = {
  projects: '6+',
  studentsTrained: '33+',
  researchPapers: '3+',
  teamMembers: 5,
  workshops: '10+',
};

export const TESTIMONIALS = [
  {
    quote:
      'We had an agri-tech idea but no clear technical path. Beta-Tech Labs spent time understanding our farmers first, then built a crop-monitoring prototype that ran on the devices we already had. That research-first discipline saved us from building the wrong product.',
    name: 'Nakamatte Patricia',
    role: 'Founder',
    organization: 'GreenHarvest Solutions',
    location: 'Kampala, Uganda',
  },
  {
    quote:
      'Our students needed exposure to how software is actually built and shipped. The collaboration with Beta-Tech Labs gave them structured mentorship, real deliverables, and a standard we now expect in every project cycle.',
    name: 'Dr. Okello Emmanuel',
    role: 'Senior Lecturer, Computer Science',
    organization: 'Kabale University',
    location: 'Kabale, Uganda',
  },
  {
    quote:
      'We approached them for blockchain consulting and expected the usual hype. Instead, they challenged our assumptions, scoped an honest proof of concept, and delivered working code with clear documentation, on the timeline we agreed.',
    name: 'Mugisha Brian',
    role: 'Product Manager',
    organization: 'SwiftPay Africa',
    location: 'Mbarara, Uganda',
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
    description: 'Research-backed prototype in AI, Web, or Blockchain, ready to demo.',
    features: ['2-4 week sprint', 'Weekly demos', 'Source code handoff'],
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
