import { describe, it, expect } from 'vitest';
import { parseCommand } from '@/utils/consoleCommands';

describe('parseCommand', () => {
  it('returns the help list for "help"', () => {
    const result = parseCommand('help');
    expect(result.output.some((line) => line.includes('Available commands'))).toBe(true);
  });

  it('is case-insensitive and trims whitespace', () => {
    const result = parseCommand('  HELP  ');
    expect(result.output.some((line) => line.includes('Available commands'))).toBe(true);
  });

  it('navigates to the contact page for "contact"', () => {
    const result = parseCommand('contact');
    expect(result.action).toBe('navigate');
    expect(result.payload).toBe('/contact');
  });

  it('triggers a clear action for "clear"', () => {
    const result = parseCommand('clear');
    expect(result.action).toBe('clear');
  });

  it('returns the professional easter egg for "hire-fadi"', () => {
    const result = parseCommand('hire-fadi');
    expect(result.output[0]).toMatch(/great choice/i);
    expect(result.action).toBe('navigate');
    expect(result.payload).toBe('/contact');
  });

  it('returns a helpful message for an unknown command', () => {
    const result = parseCommand('do-a-barrel-roll');
    expect(result.output[0]).toMatch(/command not found/i);
    expect(result.action).toBeUndefined();
  });

  it('returns no output for an empty command', () => {
    const result = parseCommand('   ');
    expect(result.output).toEqual([]);
  });
});
