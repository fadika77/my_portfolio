export interface Project {
  slug: string;
  name: string;
  year: number;
  category: string;
  shortDescription: string;
  longDescription: string[];
  role: string;
  projectType: string;
  technologies: string[];
  features: string[];
  highlightFeature: string;
  problem: string;
  solution: string;
  userFlow: string[];
  architecture: string[];
  technicalDecisions: string[];
  lessonsLearned: string;
  nextImprovements: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage: string;
  screenshots: string[];
  featured: boolean;
  accent: 'blue' | 'cyan' | 'purple' | 'green';
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface BuildStep {
  step: number;
  title: string;
  description: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  startYear: number;
  endYear: number;
  gpa: string;
  description: string;
}

export interface LanguageEntry {
  name: string;
  level: 'Native' | 'Fluent';
  code: string;
}

export interface WorkingStyleTrait {
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isNext?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone';
}

export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export type InquiryType = 'opportunity' | 'project';

export interface ContactFormData {
  inquiryType: InquiryType;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  /** Only used when inquiryType === 'project'. */
  projectType: string;
  /** Only used when inquiryType === 'project'. Optional even then. */
  budget: string;
  /** Only used when inquiryType === 'project'. Optional even then. */
  timeline: string;
  honeypot: string;
}

export type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export interface ConsoleCommandResult {
  output: string[];
  action?: 'navigate' | 'clear';
  payload?: string;
}