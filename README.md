# Fadi Kanaani — Portfolio

A production-ready personal portfolio for Fadi Kanaani, Junior Software Engineer. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Overview

This is a multi-page portfolio with dedicated project case-study pages, a developer console easter egg, a recruiter quick-view modal, and a contact form ready to wire up to EmailJS or your own API. All personal content (bio, projects, skills, education, social links) lives in a handful of editable data files under `src/data/`, so updating the site never requires touching component code.

## Main features

- Animated hero with a rotating role line and an interactive "developer workspace" visual (terminal, architecture flow, mood chart)
- Full case-study pages for all four projects, each with problem/solution, user flow, architecture diagram, technical decisions, challenges, lessons learned, and a screenshot gallery
- Categorized, animated skills section ("How I Build" process flow instead of boring progress bars)
- Animated career timeline with a glowing "Next" milestone
- Recruiter Quick View modal summarizing the highlights for a busy hiring manager
- Interactive developer console (`help`, `about`, `skills`, `projects`, `contact`, `resume`, `clear`, and the `hire-fadi` easter egg)
- Optional keyboard shortcuts: `P` Projects, `A` About, `C` Contact, `R` Resume, `Esc` closes menus/modals
- Contact form with two intake paths — "Job Opportunity" and "Project Idea" — validation, loading/success/error states, and a honeypot spam trap, pluggable into EmailJS or your own backend
- Full SEO setup: per-page metadata, Open Graph/Twitter cards, JSON-LD structured data, sitemap, robots.txt
- Accessibility: skip-to-content link, semantic landmarks, visible focus states, `prefers-reduced-motion` support, keyboard-navigable menus
- Responsive from large desktop down to small mobile, with pointer-heavy effects (custom cursor, tilt, magnetic buttons) automatically disabled on touch devices

## Technology stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router · Lucide React · React Helmet Async · Vitest + React Testing Library

## Folder structure

```
public/
  Fadi_Kanaani_Resume.pdf
  favicon.svg
  robots.txt
  sitemap.xml
  images/
    profile/
    projects/
      mendly/
      library-of-books/
      housefix/
      green-points/
    social/
src/
  components/
    animations/     — motion variants + scroll-reveal wrapper
    common/          — SEO, cursor, spotlight card, magnetic button, back-to-top, etc.
    layout/          — page Layout, Footer, PageTransition
    navigation/      — Navbar, MobileMenu
    projects/        — ProjectCard, ProjectMockup, ProjectGallery, ArchitectureDiagram, ProjectDetailLayout
    sections/        — Hero, About, Skills, Education, Contact, Developer Console, etc.
    ui/               — Button, Container, Badge
  data/               — profile.ts, projects.ts, skills.ts, education.ts, socialLinks.ts, config.ts, navigation.ts
  hooks/              — reusable hooks (active section, reduced motion, media query, scroll lock/progress)
  pages/              — route-level components (Home, Projects, ProjectDetail, About, Contact, NotFound)
  providers/          — ReducedMotionProvider (motion + cursor preference context)
  types/              — shared TypeScript interfaces
  utils/              — cn, validation, email/contact submission, structured data, console command parser
  test/               — Vitest setup + test render helpers
```

## Installation

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Development commands

| Command              | What it does                                   |
| -------------------- | ----------------------------------------------- |
| `npm run dev`         | Start the Vite dev server                       |
| `npm run build`       | Type-check and build for production (`dist/`)   |
| `npm run preview`      | Preview the production build locally            |
| `npm run lint`         | Run ESLint                                       |
| `npm run test`         | Run the Vitest test suite once                   |
| `npm run test:watch`   | Run tests in watch mode                          |
| `npm run typecheck`    | Run TypeScript with no output                    |
| `npm run format`       | Format the codebase with Prettier                |

## Production build

```bash
npm run build
npm run preview
```

`npm run build` runs a full TypeScript project build (`tsc -b`) before bundling with Vite, so type errors will fail the build early.

## Editing personal information

Almost everything on the site is driven by data files — you should rarely need to touch a component.

- **Bio, hero copy, about paragraphs, working style, career timeline, recruiter quick view:** `src/data/profile.ts`
- **Contact details, GitHub/LinkedIn URLs:** `src/data/socialLinks.ts` and `profile.ts` (email/phone/location)
- **Site URL, resume path, "open to opportunities" flag:** `src/data/config.ts`
- **Navigation items:** `src/data/navigation.ts`

## Editing projects

All four case studies live in `src/data/projects.ts`, typed by the `Project` interface in `src/types/index.ts`. To add a new project:

1. Add a new object to the `projects` array with a unique `slug` — this becomes the route `/projects/<slug>`.
2. Fill in every field. A few fields (`problem`, `challenges`) are intentionally written as honest, editable placeholders where the original brief didn't specify exact details — replace them with your own words.
3. The project automatically appears on the homepage (if `featured: true`), on `/projects`, and gets its own detail page with previous/next navigation.

## Adding screenshots

Each project has a `screenshots` array pointing at paths like `public/images/projects/mendly/screenshot-1.jpg`. Until you add real files there, the gallery renders a clean placeholder tile telling you exactly which path to fill in. To add real screenshots:

1. Export images from your project (ideally 16:9, optimized/compressed).
2. Place them at the exact paths referenced in `src/data/projects.ts` under `public/images/projects/<slug>/`.
3. No code changes needed — the gallery picks them up automatically once the files exist.

The `coverImage` field is currently unused visually (case-study pages use the CSS-based `ProjectMockup` component instead of a raw image) — it's kept in the data model in case you want to swap the mockup for a real screenshot later.

## Adding a profile image

The design currently doesn't render a profile photo (it leans on the interactive developer visual instead). If you want to add one, place it at `public/images/profile/fadi-profile.webp` and reference it from `AboutSection.tsx` or `Hero.tsx`.

## Replacing the resume

Replace `public/Fadi_Kanaani_Resume.pdf` with your latest resume, keeping the same filename — every "Download Resume" button across the site (navbar, hero, about, contact CTA, recruiter quick view, and the `resume` console command) points at `src/data/config.ts`'s `resumePath`, so one file swap updates them all.

## Receiving project ideas

Besides general "I'm hiring" messages, the contact form has a second intake path for visitors who want to describe a website or app idea they'd like built. It lives in the same form so there's one inbox and one place to maintain, not a second page or a separate form component:

- **On `/contact`**, the form opens with a two-way toggle — "Job Opportunity" (default) and "Project Idea" — built into `ContactForm.tsx`. Switching tabs swaps the "Subject" field for "What do you want built?" (a project type dropdown), an optional "Budget" dropdown, and an optional "Timeline" field, and relabels the message box to "Project Description".
- **Linking straight to the Project Idea tab:** any link to `/contact?type=project` opens the form with that tab pre-selected — used by the "Have a Project Idea?" button in the homepage contact section (`ContactCTA.tsx`).
- **Editing the dropdown options:** project types and budget ranges live in `src/data/projectInquiry.ts` — plain string arrays, safe to edit or reorder.
- **Delivery:** both the EmailJS branch and the custom-API branch in `src/utils/email.ts` include `projectType`, `budget`, and `timeline` alongside the usual name/email/message fields whenever `inquiryType` is `'project'`, and auto-generate a subject line like "New project idea — Website" since that tab hides the raw subject input.

## Configuring EmailJS (or your own API)

The contact form never talks to a provider directly — everything goes through `src/utils/email.ts`, so swapping providers never touches `ContactForm.tsx`.

**Option A — EmailJS:**

1. `npm install @emailjs/browser`
2. Create a service + template at [emailjs.com](https://www.emailjs.com). Your template can reference `{{inquiry_type}}`, `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{subject}}`, `{{message}}`, `{{project_type}}`, `{{budget}}`, and `{{timeline}}` (the last three are blank for job-opportunity messages).
3. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
4. Uncomment/verify the EmailJS branch in `src/utils/email.ts`.

**Option B — your own backend:**

Set `VITE_CONTACT_API_ENDPOINT` in `.env` to a POST endpoint that accepts JSON with `{ inquiryType, name, email, company, subject, message }`, plus `{ projectType, budget, timeline }` when `inquiryType` is `'project'`. Return a non-2xx status on failure.

Until one of these is configured, the form runs its full validation and loading state, then surfaces an honest, clearly worded error — it never pretends to succeed.

## Updating social links

Edit `src/data/socialLinks.ts` for GitHub/LinkedIn/email/phone. These feed the navbar, footer, mobile menu, contact section, and recruiter quick-view modal automatically.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel detects this automatically).
4. Add your environment variables (from `.env.example`) in Project Settings → Environment Variables.
5. Deploy. Update `VITE_SITE_URL` and the URLs in `public/sitemap.xml` / `public/robots.txt` to your real domain afterward.

## Deploying to Netlify

1. Push this repository to GitHub.
2. New site from Git at [app.netlify.com](https://app.netlify.com).
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add a `public/_redirects` file with `/* /index.html 200` if you haven't already (needed for client-side routing on refresh) — or configure an equivalent redirect rule in the Netlify UI.
5. Add environment variables in Site Settings → Environment Variables, then deploy.

## Environment variables

See `.env.example` for the full list. Nothing in `.env` is ever committed — only `.env.example` is tracked, and no secrets are hard-coded in the frontend source.

## Accessibility notes

- Skip-to-content link is the first focusable element on every page.
- All animations respect `prefers-reduced-motion`; the custom cursor and pointer-tilt effects are automatically disabled on touch devices and can also be turned off manually via the "Disable custom cursor" control.
- Focus states are visible everywhere (`:focus-visible` outline) and keyboard navigation works throughout, including the mobile menu and developer console (`Esc` to close).
- All interactive elements are real `<button>` or `<a>` elements — nothing is a decorative `<div onClick>`.

## Performance notes

- Routes are code-split with `React.lazy` + `Suspense`.
- Framer Motion variants are defined once and reused rather than re-created per render.
- Reduced-motion and touch users automatically skip the more expensive pointer-driven effects (spotlight, tilt, magnetic buttons, custom cursor).
- Project screenshots are placeholders by design until you add real images — once added, keep them compressed and appropriately sized; consider adding explicit `width`/`height` or `aspect-ratio` styles (already applied via `aspect-video` on gallery tiles) to avoid layout shift.

## A note on placeholder assets

This project ships with **no stock photography and no fake data** — per the brief, nothing is invented. Where a real asset (screenshots, OG share image, profile photo) isn't available yet, you'll see a clearly labeled, functional CSS-based placeholder instead of a broken image, along with the exact file path to drop the real asset into. See "Adding screenshots" and "Adding a profile image" above.
