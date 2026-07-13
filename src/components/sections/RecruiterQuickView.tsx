import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, X, Github, Linkedin, FileDown, Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import { siteConfig } from '@/data/config';
import { socialLinks } from '@/data/socialLinks';

export function RecruiterQuickView() {
  const [open, setOpen] = useState(false);
  const githubUrl = socialLinks.find((l) => l.icon === 'github')?.url ?? '#';
  const linkedinUrl = socialLinks.find((l) => l.icon === 'linkedin')?.url ?? '#';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent-cyan transition-colors hover:bg-accent/15"
      >
        <Zap className="h-4 w-4" aria-hidden="true" />
        Recruiter Quick View
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={profile.recruiterQuickView.heading}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="glass-panel glass-panel-overlay w-full max-w-md border-accent/30 bg-bg-secondary/95 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-text-main">
                  {profile.recruiterQuickView.heading}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-text-muted hover:text-text-main"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="space-y-2">
                {profile.recruiterQuickView.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={siteConfig.resumePath}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-purple px-4 py-2 text-xs font-semibold text-white"
                >
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" /> Resume
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs text-text-main"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs text-text-main"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
                </a>
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs text-text-main"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Contact
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
