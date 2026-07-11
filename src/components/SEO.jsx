import { Helmet } from 'react-helmet-async';
import { SITE, CONTACT } from '../config/site';

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  canonicalUrl,
  type = 'website',
  article = null,
}) => {
  const defaultDescription = `${SITE.brandPromise} Based in ${SITE.location}.`;
  const twitterHandle = '@betatechlabs';

  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  const metaDescription = description || defaultDescription;
  const metaImage = ogImage || `${SITE.url}/images/og-image.svg`;
  const metaUrl = ogUrl || SITE.url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl || metaUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={`${SITE.name} - ${title || SITE.tagline}`} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_US" />

      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={`${SITE.name} - ${title || SITE.tagline}`} />

      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="author" content={SITE.name} />
      <meta name="geo.region" content="UG-W" />
      <meta name="geo.placename" content="Kabale, Southern Division, Uganda" />
      <meta
        name="geo.position"
        content={`${CONTACT.coordinates.latitude};${CONTACT.coordinates.longitude}`}
      />
      <meta name="ICBM" content={`${CONTACT.coordinates.latitude}, ${CONTACT.coordinates.longitude}`} />
    </Helmet>
  );
};

export default SEO;
