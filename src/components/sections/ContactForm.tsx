import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Briefcase,
  Lightbulb,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import type { ContactFormData, InquiryType, SubmissionState } from '@/types';
import { validateContactForm, type FormErrors } from '@/utils/validation';
import { submitContactForm, ContactSubmissionError } from '@/utils/email';
import { projectTypeOptions, budgetOptions } from '@/data/projectInquiry';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

function createEmptyForm(inquiryType: InquiryType): ContactFormData {
  return {
    inquiryType,
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    honeypot: '',
  };
}

const fieldClasses =
  'w-full rounded-xl border border-border-strong bg-white/[0.03] px-4 py-3 text-sm text-text-main placeholder:text-text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

const selectClasses = cn(fieldClasses, 'appearance-none pr-10');

const INQUIRY_TABS: { type: InquiryType; label: string; icon: LucideIcon }[] = [
  { type: 'opportunity', label: 'Job Opportunity', icon: Briefcase },
  { type: 'project', label: 'Project Idea', icon: Lightbulb },
];

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const initialType: InquiryType = searchParams.get('type') === 'project' ? 'project' : 'opportunity';

  const [form, setForm] = useState<ContactFormData>(() => createEmptyForm(initialType));
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { reduceMotion } = useMotionPreference();

  const isProjectIdea = form.inquiryType === 'project';

  const handleChange = (field: keyof ContactFormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (type: InquiryType) => {
    if (type === form.inquiryType) return;
    setForm((prev) => ({ ...prev, inquiryType: type }));
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setState('loading');
    setErrorMessage('');
    try {
      await submitContactForm(form);
      setState('success');
      setForm(createEmptyForm(form.inquiryType));
    } catch (error) {
      setState('error');
      setErrorMessage(
        error instanceof ContactSubmissionError
          ? error.message
          : 'Something went wrong sending your message. Please try again or email me directly.',
      );
    }
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel flex flex-col items-center gap-3 border-success/30 p-10 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-text-main">
          {isProjectIdea ? 'Project idea sent' : 'Message sent'}
        </h3>
        <p className="max-w-sm text-sm text-text-muted">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-6 sm:p-8" noValidate>
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={handleChange('honeypot')}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-text-main">What brings you here?</p>
        <div
          role="group"
          aria-label="Inquiry type"
          className="inline-flex flex-wrap gap-1 rounded-full border border-border-strong bg-white/[0.03] p-1"
        >
          {INQUIRY_TABS.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              aria-pressed={form.inquiryType === type}
              onClick={() => handleTypeChange(type)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                form.inquiryType === type
                  ? 'bg-white/[0.09] text-text-main'
                  : 'text-text-muted hover:text-text-main',
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-main">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={fieldClasses}
            value={form.name}
            onChange={handleChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-main">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={fieldClasses}
            value={form.email}
            onChange={handleChange('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-text-main">
          {isProjectIdea ? 'Company / Organization' : 'Company'}{' '}
          <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          className={fieldClasses}
          value={form.company}
          onChange={handleChange('company')}
          placeholder={isProjectIdea ? 'If this is for a business' : 'Where you work'}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={form.inquiryType}
          initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {isProjectIdea ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-text-main">
                  What do you want built?
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    className={selectClasses}
                    value={form.projectType}
                    onChange={handleChange('projectType')}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  >
                    <option value="">Select a project type</option>
                    {projectTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                    aria-hidden="true"
                  />
                </div>
                {errors.projectType && (
                  <p id="projectType-error" className="mt-1.5 text-xs text-danger">
                    {errors.projectType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-text-main">
                  Budget <span className="text-text-muted">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    className={selectClasses}
                    value={form.budget}
                    onChange={handleChange('budget')}
                  >
                    <option value="">Prefer not to say</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-text-main">
                  Timeline <span className="text-text-muted">(optional)</span>
                </label>
                <input
                  id="timeline"
                  type="text"
                  className={fieldClasses}
                  value={form.timeline}
                  onChange={handleChange('timeline')}
                  placeholder="e.g. 2–3 months, or flexible"
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text-main">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={fieldClasses}
                value={form.subject}
                onChange={handleChange('subject')}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                placeholder="Junior Software Engineer opportunity"
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-danger">
                  {errors.subject}
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-main">
              {isProjectIdea ? 'Project Description' : 'Message'}
            </label>
            <textarea
              id="message"
              rows={5}
              className={cn(fieldClasses, 'resize-none')}
              value={form.message}
              onChange={handleChange('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              placeholder={
                isProjectIdea
                  ? "What are you trying to build? Key features, who it's for, and anything else that helps me understand the idea."
                  : 'Tell me a bit about the role or project...'
              }
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-danger">
                {errors.message}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {state === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={state === 'loading'}>
        {state === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {isProjectIdea ? 'Send Project Idea' : 'Send Message'}
          </>
        )}
      </Button>
    </form>
  );
}
