import { profile } from '@/data/profile';
import { siteConfig } from '@/data/config';
import { socialLinks } from '@/data/socialLinks';
import type { Project } from '@/types';

export function getPersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profile.institution,
    },
    url: siteConfig.siteUrl,
    sameAs: socialLinks
      .filter((link) => link.icon === 'github' || link.icon === 'linkedin')
      .map((link) => link.url),
    knowsLanguage: ['Arabic', 'Hebrew', 'English'],
  };
}

export function getProjectStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.shortDescription,
    dateCreated: String(project.year),
    creator: {
      '@type': 'Person',
      name: profile.name,
    },
    keywords: project.technologies.join(', '),
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
  };
}
