import { Helmet } from 'react-helmet-async';
import { SITE, CONTACT, SOCIAL, COMPANY } from '../config/site';

const StructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icons/icon-192x192.png`,
    description: COMPANY.positioningStatement,
    foundingDate: SITE.foundedYear,
    slogan: SITE.tagline,
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
      'Community Research',
      'Research and Innovation',
      'Product Innovation',
      'Solution Engineering',
      'Artificial Intelligence',
      'Software Development',
      'Talent Development',
      'IoT and Embedded Systems',
    ],
    sameAs: [SOCIAL.x, SOCIAL.linkedin, SOCIAL.github],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.brandPromise,
    publisher: { '@type': 'Organization', name: SITE.legalName },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.legalName,
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
