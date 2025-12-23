import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "name": "Beta Tech Labs",
    "alternateName": "Beta Tech Hub",
    "url": "https://www.beta-techlabs.com",
    "logo": "https://www.beta-techlabs.com/images/logo.png",
    "description": "Uganda's premier AI and Blockchain research hub. We conduct cutting-edge research, develop innovative solutions, and offer tech education programs.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kabale",
      "addressLocality": "Kabale",
      "addressRegion": "Western Region",
      "addressCountry": "UG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+256-791-018086",
      "contactType": "customer service",
      "email": "betatechlabs10@gmail.com",
      "availableLanguage": ["English"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uganda"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Blockchain Technology",
      "Smart Contracts",
      "Web3 Development",
      "Software Development"
    ],
    "sameAs": [
      "https://x.com/betatechlabs",
      "https://www.linkedin.com/in/betatech-labs-06398039b",
      "https://github.com/beta-techlabs"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Beta Tech Labs",
    "url": "https://www.beta-techlabs.com",
    "description": "AI & Blockchain Research Hub in Uganda",
    "publisher": {
      "@type": "Organization",
      "name": "Beta Tech Labs"
    }
  };

  // LocalBusiness Schema for local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Beta Tech Labs",
    "image": "https://www.beta-techlabs.com/images/logo.png",
    "url": "https://www.beta-techlabs.com",
    "telephone": "+256-791-018086",
    "email": "betatechlabs10@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kabale",
      "addressRegion": "Western Region",
      "addressCountry": "UG"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;