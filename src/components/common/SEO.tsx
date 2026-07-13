import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/config';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({
  title,
  description = siteConfig.defaultDescription,
  path = '/',
  image = siteConfig.ogImage,
  type = 'website',
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | Fadi Kanaani` : siteConfig.defaultTitle;
  const canonicalUrl = `${siteConfig.siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;

  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Fadi Kanaani" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
