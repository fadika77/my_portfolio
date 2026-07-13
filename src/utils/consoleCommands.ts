import type { ConsoleCommandResult } from '@/types';
import { profile } from '@/data/profile';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';

const HELP_LINES = [
  'Available commands:',
  '  help      - list available commands',
  '  about     - short summary about Fadi',
  '  skills    - list core skill categories',
  '  projects  - list featured projects',
  '  contact   - show contact info',
  '  resume    - open the resume PDF',
  '  clear     - clear the console',
];

/**
 * Parses a developer-console command into output lines and an optional
 * navigation action. Pure function on purpose — it does not touch the DOM
 * or the router, which keeps it easy to unit test.
 */
export function parseCommand(rawInput: string): ConsoleCommandResult {
  const command = rawInput.trim().toLowerCase();

  if (command === '') {
    return { output: [] };
  }

  switch (command) {
    case 'help':
      return { output: HELP_LINES };

    case 'about':
      return {
        output: [
          `${profile.name} — ${profile.role}`,
          profile.professionalSummary,
          "Type 'projects' to see featured work, or 'contact' to get in touch.",
        ],
        action: 'navigate',
        payload: '/#about',
      };

    case 'skills':
      return {
        output: skillCategories.map(
          (category) => `${category.title}: ${category.skills.join(', ')}`,
        ),
        action: 'navigate',
        payload: '/#skills',
      };

    case 'projects':
      return {
        output: projects.map((project) => `${project.name} (${project.year}) — ${project.category}`),
        action: 'navigate',
        payload: '/projects',
      };

    case 'contact':
      return {
        output: [
          `Email: ${profile.email}`,
          `Phone: ${profile.phone}`,
          `Location: ${profile.location}`,
          "Opening the contact page...",
        ],
        action: 'navigate',
        payload: '/contact',
      };

    case 'resume':
      return {
        output: ['Opening resume...'],
        action: 'navigate',
        payload: 'resume',
      };

    case 'clear':
      return { output: [], action: 'clear' };

    case 'hire-fadi':
      return {
        output: ['Great choice. Opening the contact section...'],
        action: 'navigate',
        payload: '/contact',
      };

    default:
      return {
        output: [`Command not found: "${command}". Type 'help' to see available commands.`],
      };
  }
}
