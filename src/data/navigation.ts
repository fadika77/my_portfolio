import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { label: 'Education', href: '/#education', sectionId: 'education' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

/** Section ids present on the Home page, used for scrollspy highlighting. */
export const homeSectionIds = [
  'home',
  'about',
  'projects',
  'skills',
  'education',
  'contact',
];
