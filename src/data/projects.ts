import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'mendly',
    name: 'Mendly',
    year: 2026,
    category: 'Cross-Platform Wellbeing Application',
    shortDescription:
      'A cross-platform wellbeing application that combines mood tracking, AI-assisted conversations, psychologist appointment booking, voice-based emotion analysis, and secure account management.',
    longDescription: [
      'Mendly is the most complete application I have built to date. It brings together several moving parts — daily mood check-ins, an AI-assisted chat experience, psychologist appointment booking, and voice-based emotion analysis — behind a single authenticated account system.',
      'The goal was to explore what a real wellbeing product needs beyond a single screen: persistent user state, a backend that can be trusted with personal data, and an interface calm enough to actually want to open every day.',
    ],
    role: 'Full-stack developer (frontend, backend, database, and mobile experience)',
    projectType: 'Academic / personal project',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Azure SQL',
      'REST APIs',
      'JWT',
      'AI Integration',
      'Mobile Development',
    ],
    features: [
      'Daily mood check-ins',
      'Mood history and progress visualization',
      'AI-powered chat',
      'Psychologist appointment booking',
      'Voice-based emotion analysis',
      'Secure JWT authentication',
      'REST API integration',
      'User and psychologist workflows',
      'Cross-platform mobile experience',
      'Database-backed account and mood management',
    ],
    highlightFeature: 'AI-assisted chat paired with voice-based emotion analysis.',
    problem:
      'People who want to track how they are feeling and get support often have to juggle separate tools — a notes app for mood, a search engine for coping resources, and a completely separate process to book time with a professional. Add a short explanation of the specific gap you set out to close here.',
    solution:
      'Mendly puts mood tracking, an AI-assisted conversation surface, and psychologist booking in one authenticated application, backed by a relational database and a FastAPI service layer, with an early exploration of voice-based emotion analysis.',
    userFlow: [
      'User creates an account and signs in via JWT-secured authentication.',
      'User completes a daily mood check-in and sees it reflected in their history.',
      'User can start an AI-assisted chat conversation for support.',
      'User can browse and book an appointment with a psychologist.',
      'User can use the voice-based emotion analysis feature as an additional input.',
    ],
    architecture: [
      'React / Mobile UI',
      'REST API',
      'FastAPI Backend',
      'Azure SQL',
      'AI and analysis services',
    ],
    technicalDecisions: [
      'Chose FastAPI for the backend for its speed of development and native async support when calling external AI services.',
      'Used Azure SQL as a relational store since mood entries, users, and appointments are naturally structured, related records.',
      'Used JWT for authentication so the API could stay stateless across the web and mobile clients.',
    ],
    lessonsLearned:
      'Building Mendly pushed me to think about a backend as a set of contracts multiple clients depend on, not just an appendage to one frontend. It also taught me a lot about structuring authenticated, multi-feature applications instead of single-purpose ones.',
    nextImprovements: [
      'Expand the AI chat with more structured conversation flows.',
      'Add richer analytics on mood history trends.',
      'Refine the psychologist booking flow with calendar sync.',
    ],
    githubUrl: 'https://github.com/fadika77',
    coverImage: '/images/projects/mendly/cover.jpg',
    screenshots: [
      '/images/projects/mendly/screenshot-1.jpg',
      '/images/projects/mendly/screenshot-2.jpg',
      '/images/projects/mendly/screenshot-3.jpg',
    ],
    featured: true,
    accent: 'purple',
  },
  {
    slug: 'library-of-books',
    name: 'LibraryOfBooks',
    year: 2025,
    category: 'Online Library Management System',
    shortDescription:
      'An online library system where users can browse, borrow, and purchase e-books while administrators manage books, inventory, accounts, and email reminders.',
    longDescription: [
      'LibraryOfBooks is a full ASP.NET MVC application built around two workflows: a reader-facing experience for browsing, borrowing, and purchasing e-books, and an administrator experience for managing the catalog, inventory, and accounts.',
      'It was my first project working with a relational database at this scale and with a server-rendered MVC architecture, which shaped a lot of how I think about backend structure today.',
    ],
    role: 'Full-stack developer (application logic, database design, and UI)',
    projectType: 'Academic / personal project',
    technologies: ['C#', 'ASP.NET MVC', 'MS SQL', 'HTML', 'CSS', 'JavaScript', 'Email Integration'],
    features: [
      'Browse available books',
      'Search and filter books',
      'Borrow books',
      'Purchase e-books',
      'User account management',
      'Admin dashboard',
      'Book and inventory management',
      'Email reminder system',
      'SQL Server database integration',
    ],
    highlightFeature: 'Admin dashboard with inventory management and automated email reminders.',
    problem:
      'A library needs more than a catalog listing — it needs to track who has borrowed what, manage limited inventory of physical and digital copies, and remind users before items are due. Add a short explanation of the specific scenario that motivated this project here.',
    solution:
      'LibraryOfBooks separates the reader experience from an administrator dashboard, backed by a normalized SQL Server schema, with an email reminder system to notify users about borrowed items.',
    userFlow: [
      'Visitor browses and searches the book catalog.',
      'User creates an account and signs in.',
      'User borrows or purchases an e-book.',
      'Administrator manages books, inventory, and user accounts from a dashboard.',
      'System sends email reminders related to borrowed items.',
    ],
    architecture: ['Browser UI', 'ASP.NET MVC Controllers', 'Business Logic Layer', 'MS SQL Database', 'Email Service'],
    technicalDecisions: [
      'Used ASP.NET MVC to keep a clear separation between controllers, views, and models.',
      'Designed a normalized SQL Server schema for books, users, borrow records, and inventory.',
      'Added a dedicated email integration layer for reminders rather than mixing it into controller logic.',
    ],
    lessonsLearned:
      'This project gave me a solid foundation in relational database design and in structuring a server-rendered application with a clear separation of concerns between the admin and user-facing sides.',
    nextImprovements: [
      'Add a review and rating system for books.',
      'Introduce role-based permissions for staff accounts.',
      'Modernize the frontend with a component-based approach.',
    ],
    githubUrl: 'https://github.com/fadika77',
    coverImage: '/images/projects/library-of-books/cover.jpg',
    screenshots: [
      '/images/projects/library-of-books/screenshot-1.jpg',
      '/images/projects/library-of-books/screenshot-2.jpg',
    ],
    featured: true,
    accent: 'blue',
  },
  {
    slug: 'housefix',
    name: 'HouseFix',
    year: 2025,
    category: 'Home-Repair Request Management Platform',
    shortDescription:
      'A home-repair call-center platform for creating repair requests, assigning and tracking worker jobs, updating statuses, and viewing requests on a map.',
    longDescription: [
      'HouseFix models a home-repair call center: customers submit repair requests, dispatchers assign them to workers, and both sides track progress through status updates and a map view of active jobs.',
      'The project focuses on workflow and state management — a request moves through a clear lifecycle, and the interface needed to make that lifecycle obvious to everyone using it.',
    ],
    role: 'Full-stack developer (frontend, API, and database)',
    projectType: 'Academic / personal project',
    technologies: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'REST APIs', 'Map Integration'],
    features: [
      'Create repair requests',
      'Worker assignment',
      'Job tracking',
      'Status updates',
      'Map view',
      'Customer and worker workflows',
      'Request management',
      'MongoDB data storage',
      'REST API integration',
    ],
    highlightFeature: 'Map view for visualizing active repair requests and worker assignments.',
    problem:
      'Coordinating home-repair requests by phone or spreadsheet makes it hard to see which jobs are open, who is assigned, and where they are. Add a short explanation of the specific coordination problem this addressed here.',
    solution:
      'HouseFix gives dispatchers and workers a shared system: requests are created, assigned, tracked through status changes, and displayed on a map so the state of every job is visible at a glance.',
    userFlow: [
      'Customer or dispatcher creates a repair request.',
      'Dispatcher assigns the request to an available worker.',
      'Worker updates the job status as work progresses.',
      'Dispatcher and customer track the request on a map and status view.',
    ],
    architecture: ['React UI', 'REST API', 'Node.js Backend', 'MongoDB', 'Map Service'],
    technicalDecisions: [
      'Chose MongoDB for flexible, evolving request and job documents rather than a rigid relational schema.',
      'Built a Node.js REST API to keep the frontend and backend cleanly separated.',
      'Integrated a map view to make request locations and assignments easier to reason about at a glance.',
    ],
    lessonsLearned:
      'HouseFix taught me how much a clear state machine (request created → assigned → in progress → completed) simplifies both backend logic and frontend UI decisions.',
    nextImprovements: [
      'Add real-time status updates via WebSockets.',
      'Introduce worker availability and scheduling logic.',
      'Expand the map view with route optimization.',
    ],
    githubUrl: 'https://github.com/fadika77',
    coverImage: '/images/projects/housefix/cover.jpg',
    screenshots: [
      '/images/projects/housefix/screenshot-1.jpg',
      '/images/projects/housefix/screenshot-2.jpg',
    ],
    featured: true,
    accent: 'cyan',
  },
  {
    slug: 'green-points',
    name: 'Green Points',
    year: 2024,
    category: 'Community Environmental Events Platform',
    shortDescription:
      'A community platform where users can publish, discover, RSVP to, and join local environmental events.',
    longDescription: [
      'Green Points was my first full-stack project working with Node.js and MongoDB. It lets community members publish environmental events — cleanups, tree plantings, awareness days — and lets others discover and RSVP to them.',
      'It is intentionally simpler than my later projects, and it is where I first put together a frontend, a backend, and a database as one working system.',
    ],
    role: 'Full-stack developer',
    projectType: 'Academic / personal project',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
    features: [
      'Publish events',
      'Browse environmental activities',
      'RSVP to events',
      'Join community events',
      'Event details',
      'User participation',
      'MongoDB integration',
      'Responsive web interface',
    ],
    highlightFeature: 'Community-driven event publishing with RSVP tracking.',
    problem:
      'Local environmental initiatives often struggle to reach participants without a shared, easy-to-use place to post and discover events. Add a short explanation of the specific community need this addressed here.',
    solution:
      'Green Points gives community members a simple platform to publish events and for others to browse, discover, and RSVP, with all event and participation data stored in MongoDB.',
    userFlow: [
      'User browses upcoming environmental events.',
      'User views event details.',
      'User RSVPs to join an event.',
      'Organizer publishes a new event with details and location.',
    ],
    architecture: ['HTML/CSS/JS Frontend', 'Node.js Server', 'MongoDB'],
    technicalDecisions: [
      'Kept the frontend framework-free to focus on core JavaScript and DOM fundamentals.',
      'Used MongoDB for flexible event documents with varying details.',
      'Structured the Node.js backend around simple, clear REST-style routes.',
    ],
    lessonsLearned:
      'Green Points was where the fundamentals clicked — connecting a frontend to a backend to a database as one working system for the first time.',
    nextImprovements: [
      'Add user accounts and authentication.',
      'Introduce event categories and filtering.',
      'Rebuild the frontend as a React application.',
    ],
    githubUrl: 'https://github.com/fadika77',
    coverImage: '/images/projects/green-points/cover.jpg',
    screenshots: [
      '/images/projects/green-points/screenshot-1.jpg',
      '/images/projects/green-points/screenshot-2.jpg',
    ],
    featured: true,
    accent: 'green',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { previous?: Project; next?: Project } {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}