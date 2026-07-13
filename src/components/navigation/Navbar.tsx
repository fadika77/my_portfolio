import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileDown, Menu } from 'lucide-react';
import { navItems, homeSectionIds } from '@/data/navigation';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/socialLinks';
import { siteConfig } from '@/data/config';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(homeSectionIds);

  const githubUrl = socialLinks.find((link) => link.icon === 'github')?.url ?? '#';
  const linkedinUrl = socialLinks.find((link) => link.icon === 'linkedin')?.url ?? '#';

  useEffect(() => {
    // rAF-throttled: without this, the scroll listener runs (and calls
    // setState) on every native scroll tick, which can fire far more
    // often than the screen repaints.
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('/#')) {
      event.preventDefault();
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(`/#${id}`);
      }
    }
  };

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.href === '/') return location.pathname === '/' && activeSection === 'home';
    if (item.href.startsWith('/#')) return location.pathname === '/' && activeSection === item.sectionId;
    return location.pathname.startsWith(item.href);
  };

  return (
    <>
      <header
        className={cn(
          // Only `padding` actually changes here on scroll, so only
          // `padding` needs to transition — `transition-all` was making the
          // browser watch every property on this fixed, always-on-screen
          // element for changes on every scroll-driven re-render.
          'fixed inset-x-0 top-0 z-50 transition-[padding] duration-300',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            // backdrop-blur-xl stays applied at all times on purpose: toggling
            // a backdrop-filter on/off forces the browser to create and tear
            // down a whole GPU compositor layer, which is exactly what was
            // causing stutter when scrolling back and forth near the top of
            // the page (right around the 24px threshold below). Only the
            // cheap, layer-free properties (background opacity, border,
            // shadow, padding) change with scroll state.
            'section-container flex items-center justify-between rounded-full border backdrop-blur-xl transition-[background-color,border-color,box-shadow,padding] duration-300',
            scrolled
              ? 'border-border-strong bg-bg-secondary/85 py-2 shadow-card'
              : 'border-transparent bg-transparent py-3',
          )}
        >
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-white/5 font-heading text-sm font-bold text-text-main transition-colors hover:border-accent/60"
            aria-label="Fadi Kanaani — go to homepage"
          >
            {profile.initials}
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                <Link
                  to={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive(item) ? 'text-text-main' : 'text-text-muted hover:text-text-main',
                  )}
                >
                  {isActive(item) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 lg:flex">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Fadi Kanaani on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white/5 hover:text-text-main"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Fadi Kanaani on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white/5 hover:text-text-main"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-purple px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-main lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} activeSection={activeSection} />
    </>
  );
}
