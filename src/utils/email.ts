import type { ContactFormData } from '@/types';

/**
 * Contact form submission layer.
 *
 * This file is the ONLY place that should know how the contact form is
 * actually delivered. It keeps EmailJS (or any future provider) fully
 * separated from the ContactForm component, which only calls
 * `submitContactForm` and handles the returned state.
 *
 * To enable EmailJS:
 *   1. npm install @emailjs/browser
 *   2. Fill in VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY in .env
 *   3. Uncomment the EmailJS branch below.
 *
 * Alternatively, set VITE_CONTACT_API_ENDPOINT to POST to your own backend.
 */

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const CONTACT_API_ENDPOINT = import.meta.env.VITE_CONTACT_API_ENDPOINT as string | undefined;

export class ContactSubmissionError extends Error {}

/**
 * Job-opportunity messages use the visible "subject" field as-is.
 * Project-idea messages don't show a subject field in the UI — this
 * derives a readable one from the project type so both delivery paths
 * (EmailJS template / your own API) always receive something sensible.
 */
function resolveSubject(data: ContactFormData): string {
  if (data.inquiryType === 'project') {
    return `New project idea — ${data.projectType || 'Not specified'}`;
  }
  return data.subject;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  // Honeypot: bots tend to fill every field, humans never see this one.
  if (data.honeypot) {
    throw new ContactSubmissionError('Submission rejected.');
  }

  const subject = resolveSubject(data);
  const isProjectIdea = data.inquiryType === 'project';

  if (CONTACT_API_ENDPOINT) {
    const response = await fetch(CONTACT_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inquiryType: data.inquiryType,
        name: data.name,
        email: data.email,
        company: data.company,
        subject,
        message: data.message,
        ...(isProjectIdea && {
          projectType: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
        }),
      }),
    });
    if (!response.ok) {
      throw new ContactSubmissionError('The server rejected the submission.');
    }
    return;
  }

  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    // This used to be imported through a variable specifier with
    // `/* @vite-ignore */` so the build could succeed even if the package
    // wasn't installed. That trick has a real cost, though: `@vite-ignore`
    // tells Rollup not to analyze or bundle this import at all, so in the
    // *production build* the browser is left trying to run a native
    // `import('@emailjs/browser')` — and browsers cannot resolve a bare
    // package name like that on their own without a bundler behind it.
    // The result: this silently failed on the live site (with no network
    // request ever reaching EmailJS) even once the package was installed,
    // while working fine in `npm run dev`, where Vite's dev server *does*
    // resolve bare specifiers on the fly — which is exactly why this only
    // showed up after deploying.
    //
    // Now that @emailjs/browser is an actual installed dependency, importing
    // it directly (a literal string, no @vite-ignore) lets Rollup bundle it
    // into a real, resolvable chunk at build time, the normal way.
    const emailjs = await import('@emailjs/browser');
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        inquiry_type: isProjectIdea ? 'Project idea' : 'Job opportunity',
        from_name: data.name,
        from_email: data.email,
        company: data.company,
        subject,
        message: data.message,
        project_type: isProjectIdea ? data.projectType : '',
        budget: isProjectIdea ? data.budget : '',
        timeline: isProjectIdea ? data.timeline : '',
      },
      { publicKey: EMAILJS_PUBLIC_KEY },
    );
    return;
  }

  // No provider configured — this is expected out of the box. Surface a
  // clear, honest error rather than silently pretending it worked.
  throw new ContactSubmissionError(
    'Contact form is not yet connected to an email provider. Configure EmailJS or VITE_CONTACT_API_ENDPOINT in .env — see .env.example.',
  );
}