import type { ReactNode } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { BackToTop } from '@/components/common/BackToTop';
import { CustomCursor } from '@/components/common/CustomCursor';
import { SkipToContent } from '@/components/common/SkipToContent';
import { DeveloperConsole } from '@/components/sections/DeveloperConsole';
import { useHashScroll } from '@/hooks/useHashScroll';

export function Layout({ children }: { children: ReactNode }) {
  useHashScroll();

  return (
    <div className="relative min-h-screen">
      <SkipToContent />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <DeveloperConsole />
    </div>
  );
}
