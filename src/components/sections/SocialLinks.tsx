import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import { cn } from '@/utils/cn';

const ICONS = { github: Github, linkedin: Linkedin, email: Mail, phone: Phone };

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {socialLinks.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-2 text-sm text-text-main transition-colors hover:border-accent/50 hover:text-accent-cyan"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
