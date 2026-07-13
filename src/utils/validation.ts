import type { ContactFormData } from '@/types';

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  const isProjectIdea = data.inquiryType === 'project';

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (isProjectIdea) {
    if (!data.projectType.trim()) {
      errors.projectType = "Please choose what you'd like built.";
    }
  } else if (!data.subject.trim()) {
    errors.subject = 'Please add a subject.';
  }

  if (!data.message.trim()) {
    errors.message = isProjectIdea
      ? 'Please describe your project idea.'
      : 'Please write a short message.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please add a few more details (at least 10 characters).';
  }

  return errors;
}
