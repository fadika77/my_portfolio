/**
 * Central site configuration.
 * Update SITE_URL once you have a real domain — it feeds SEO tags,
 * the sitemap, and structured data.
 */
export const siteConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://your-domain.com',
  siteName: 'Fadi Kanaani | Junior Software Engineer',
  defaultTitle: 'Fadi Kanaani | Junior Software Engineer',
  defaultDescription:
    'Portfolio of Fadi Kanaani, a Junior Software Engineer building modern web and mobile applications with React, FastAPI, C#, Node.js, SQL Server, MongoDB, and AI integration.',
  ogImage: '/images/social/og-image.jpg',
  resumePath: '/Fadi_Kanaani_Resume.pdf',
  // Flip this to true once you are actively looking — keeps the
  // availability label in the hero honest and easy to update.
  openToOpportunities: true,
} as const;
