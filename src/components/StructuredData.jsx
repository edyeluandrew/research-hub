import { Helmet } from 'react-helmet-async';
import { SITE, CONTACT, SOCIAL } from '../config/site';

const StructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}/icons/icon-192x192.png`,
    description: `Uganda's premier AI and Blockchain research hub based in ${SITE.location}.`,
    foundingDate: SITE.foundedYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.headline,
      addressLocality: 'Kabale',
      addressRegion: 'Western Region',
      addressCountry: 'UG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneTel,
      contactType: 'customer service',
      email: CONTACT.email,
      availableLanguage: ['English'],
    },
    areaServed: { '@type': 'Country', name: 'Uganda' },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Blockchain Technology',
      'Smart Contracts',
      'Web3 Development',
      'Software Development',
    ],
    sameAs: [SOCIAL.x, SOCIAL.linkedin, SOCIAL.github],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    publisher: { '@type': 'Organization', name: SITE.name },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    image: `${SITE.url}/icons/icon-192x192.png`,
    url: SITE.url,
    telephone: CONTACT.phoneTel,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.headline,
      addressLocality: 'Kabale',
      addressRegion: 'Western Region',
      addressCountry: 'UG',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    </Helmet>
  );
};

export default StructuredData;
