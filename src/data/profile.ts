export const profile = {
  name: 'Fadi Kanaani',
  initials: 'FK',
  role: 'Junior Software Engineer',
  location: 'Kfar Qara, Israel',
  email: 'fadikanane@gmail.com',
  phone: '+972 53 229 4933',
  degree: 'B.Sc. in Software Engineering',
  institution: 'Shamoon College of Engineering (SCE)',
  graduationYear: 2026,
  gpa: '85.5 / 100',
  heroHeadline: 'Building thoughtful software from idea to experience.',
  heroSubheadline:
    'Software Engineering graduate with hands-on experience building web and mobile applications using modern frontend, backend, database, API, and AI technologies.',
  availabilityLabel: 'Open to Junior Software Engineering Opportunities',
  rotatingRoles: [
    'Full-Stack Developer',
    'React Developer',
    'FastAPI Developer',
    'Mobile App Builder',
    'Software Engineering Graduate',
    'Problem Solver',
  ],
  professionalSummary:
    'Motivated Software Engineering graduate with hands-on experience building web and mobile applications. A quick learner and collaborative problem-solver, eager to contribute, learn, and grow as a Junior Software Engineer.',
  aboutParagraphs: [
    'I enjoy taking an idea and turning it into a working application — from the first sketch of the data model to the last bit of interface polish. Over the course of my Software Engineering degree and a handful of self-directed projects, I have built full applications across the stack: interfaces in React and TypeScript, APIs in FastAPI, Node.js and ASP.NET, and the databases and authentication that hold them together.',
    'I am comfortable moving between the frontend and backend of a product because I care about how the pieces connect — how a form on screen turns into a validated request, how that request is authenticated and processed, and how the result is stored and returned. That end-to-end view is what I bring to a team: not just writing code, but understanding why it exists.',
    'I am still early in my career, and I say that plainly — my experience comes mainly from academic and personal projects rather than a professional employer. But those projects were built the way real products are: with requirements, architecture decisions, trade-offs, and a lot of debugging. I am looking for a team where I can keep building that way, learn from people more experienced than me, and contribute from day one.',
  ],
  whatIBring: [
    {
      title: 'Full-Stack Thinking',
      description:
        'I understand how interfaces, APIs, backend logic, authentication, and databases work together.',
    },
    {
      title: 'Product Mindset',
      description:
        'I focus on creating features that solve real user needs rather than only writing code.',
    },
    {
      title: 'Fast Learning',
      description: 'I am comfortable learning new tools, technologies, and project structures.',
    },
    {
      title: 'Collaboration',
      description:
        'I value communication, feedback, clear responsibilities, and working toward shared goals.',
    },
  ],
  workingStyleTraits: [
    { title: 'Curious Learner', description: 'I like understanding how and why something works, not just that it does.' },
    { title: 'Collaborative Teammate', description: 'I work well with others and value clear communication over solo heroics.' },
    { title: 'Practical Problem-Solver', description: 'I look for the solution that actually fits the problem, not the fanciest one.' },
    { title: 'Detail-Oriented Developer', description: 'I care about the small things — naming, edge cases, consistent UI states.' },
    { title: 'Open to Feedback', description: 'I would rather hear it early and fix it than find out later.' },
    { title: 'Focused on Continuous Improvement', description: 'I revisit old code and decisions and improve them as I learn more.' },
  ],
  currentlyExploring: [
    'Advanced React patterns',
    'Scalable backend architecture',
    'Cloud deployment',
    'AI-powered application features',
    'Mobile application development',
  ],
  terminalLines: [
    { command: 'whoami', output: 'Fadi Kanaani' },
    { command: 'role', output: 'Junior Software Engineer' },
    { command: 'focus', output: 'Building useful, reliable, and user-friendly software' },
  ],
  careerTimeline: [
    { year: '2022', title: 'Started Software Engineering Degree', description: 'Began my B.Sc. in Software Engineering at Shamoon College of Engineering.', isNext: false },
    { year: '2024', title: 'Built Green Points', description: 'Designed and built a community environmental events platform.', isNext: false },
    { year: '2025', title: 'Built LibraryOfBooks & HouseFix', description: 'Shipped an online library management system and a home-repair request platform.', isNext: false },
    { year: '2026', title: 'Built Mendly & Completed the Degree', description: 'Built a cross-platform wellbeing app with AI features and finished my degree.', isNext: false },
    { year: 'Next', title: 'Junior Software Engineer Opportunity', description: 'Looking to join a team where I can contribute, learn, and grow.', isNext: true },
  ],
  recruiterQuickView: {
    heading: 'Recruiter Quick View',
    points: [
      'B.Sc. in Software Engineering, graduating 2026',
      'GPA: 85.5 / 100',
      'Full-stack project experience across four shipped applications',
      'React, FastAPI, C#, ASP.NET, Node.js',
      'SQL Server and MongoDB',
      'Hands-on AI integration experience',
      'Arabic (native), Hebrew (fluent), English (fluent)',
    ],
  },
} as const;
