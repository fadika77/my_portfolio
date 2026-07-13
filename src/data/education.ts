import type { EducationEntry, LanguageEntry } from '@/types';

export const education: EducationEntry[] = [
  {
    institution: 'Shamoon College of Engineering (SCE)',
    degree: 'B.Sc. in Software Engineering',
    startYear: 2022,
    endYear: 2026,
    gpa: '85.5 / 100',
    description:
      'Completed a Software Engineering degree with practical experience across software development, databases, web systems, application architecture, algorithms, and team-based academic projects.',
  },
];

export const languages: LanguageEntry[] = [
  { name: 'Arabic', level: 'Native', code: 'AR' },
  { name: 'Hebrew', level: 'Fluent', code: 'HE' },
  { name: 'English', level: 'Fluent', code: 'EN' },
];
