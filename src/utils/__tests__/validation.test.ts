import { describe, it, expect } from 'vitest';
import { validateContactForm } from '@/utils/validation';
import type { ContactFormData } from '@/types';

const validOpportunityForm: ContactFormData = {
  inquiryType: 'opportunity',
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  company: 'Example Co',
  subject: 'Junior role',
  message: 'We would love to chat about an opening on our team.',
  projectType: '',
  budget: '',
  timeline: '',
  honeypot: '',
};

const validProjectForm: ContactFormData = {
  inquiryType: 'project',
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  company: '',
  subject: '',
  message: 'We need a small marketing website with a contact form and a blog.',
  projectType: 'Website',
  budget: 'Not sure yet',
  timeline: '2-3 months',
  honeypot: '',
};

describe('validateContactForm', () => {
  it('returns no errors for a fully valid job-opportunity submission', () => {
    expect(validateContactForm(validOpportunityForm)).toEqual({});
  });

  it('flags a missing name', () => {
    const errors = validateContactForm({ ...validOpportunityForm, name: '' });
    expect(errors.name).toBeDefined();
  });

  it('flags an invalid email address', () => {
    const errors = validateContactForm({ ...validOpportunityForm, email: 'not-an-email' });
    expect(errors.email).toBeDefined();
  });

  it('flags a missing subject on the job-opportunity path', () => {
    const errors = validateContactForm({ ...validOpportunityForm, subject: '  ' });
    expect(errors.subject).toBeDefined();
  });

  it('flags a message that is too short', () => {
    const errors = validateContactForm({ ...validOpportunityForm, message: 'hi' });
    expect(errors.message).toBeDefined();
  });

  it('returns no errors for a fully valid project-idea submission', () => {
    expect(validateContactForm(validProjectForm)).toEqual({});
  });

  it('does not require a subject on the project-idea path', () => {
    const errors = validateContactForm(validProjectForm);
    expect(errors.subject).toBeUndefined();
  });

  it('flags a missing project type on the project-idea path', () => {
    const errors = validateContactForm({ ...validProjectForm, projectType: '' });
    expect(errors.projectType).toBeDefined();
  });
});
