import type { SkillCategory, BuildStep } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Building interfaces that are fast, accessible, and pleasant to use.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Responsive Web Development'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Designing APIs and application logic that hold up under real use.',
    skills: ['Python', 'FastAPI', 'C#', 'ASP.NET Core', 'Node.js', 'RESTful APIs'],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Modeling data and choosing the right storage for the job.',
    skills: ['SQL Server', 'Azure SQL', 'MongoDB', 'NoSQL Databases'],
  },
  {
    id: 'engineering',
    title: 'Application & Engineering',
    description: 'The connective tissue that turns separate pieces into a product.',
    skills: [
      'Web Development',
      'Application Development',
      'Mobile Application Development',
      'API Integration',
      'JWT Authentication',
      'AI Integration',
      'Git',
      'Jira',
    ],
  },
];

export const buildProcess: BuildStep[] = [
  { step: 1, title: 'Understand the problem', description: 'Clarify who this is for and what it actually needs to do.' },
  { step: 2, title: 'Plan the user experience', description: 'Sketch the flows before writing implementation code.' },
  { step: 3, title: 'Design the data and API structure', description: 'Model entities, relationships, and endpoints up front.' },
  { step: 4, title: 'Build the frontend and backend', description: 'Implement in parallel, keeping the contract between them clear.' },
  { step: 5, title: 'Test important workflows', description: 'Verify the paths that matter most actually work end to end.' },
  { step: 6, title: 'Improve performance and usability', description: 'Revisit rough edges once the core flow is solid.' },
  { step: 7, title: 'Deploy and continue learning', description: 'Ship it, then keep iterating based on what I learn.' },
];
