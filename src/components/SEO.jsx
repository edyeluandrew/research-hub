import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords,
  ogImage,
  ogUrl,
  canonicalUrl,
  type = 'website',
  article = null // For blog posts: { publishedTime, modifiedTime, author, section, tags }
}) => {
  const siteName = "Beta Tech Labs";
  const defaultDescription = "Uganda's premier AI and Blockchain research hub. We conduct cutting-edge research, develop innovative solutions, and offer tech education programs in Kabale.";
  const siteUrl = "https://www.beta-techlabs.com";
  const twitterHandle = "@betatechlabs";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || defaultDescription;
  const metaImage = ogImage || `${siteUrl}/images/og-image.svg`;
  const metaUrl = ogUrl || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl || metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={`${siteName} - ${title || 'AI & Blockchain Research Hub'}`} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={`${siteName} - ${title || 'AI & Blockchain Research Hub'}`} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content={siteName} />
      <meta name="geo.region" content="UG" />
      <meta name="geo.placename" content="Kabale, Uganda" />
    </Helmet>
  );
};

export default SEO;