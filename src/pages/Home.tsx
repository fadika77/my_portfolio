import { SEO } from '@/components/common/SEO';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationTimeline } from '@/components/sections/EducationTimeline';
import { WorkingStyle } from '@/components/sections/WorkingStyle';
import { CareerTimeline } from '@/components/sections/CareerTimeline';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { getPersonStructuredData } from '@/utils/structuredData';

export default function Home() {
  return (
    <>
      <SEO path="/" structuredData={getPersonStructuredData()} />
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <SkillsSection />
      <EducationTimeline />
      <WorkingStyle />
      <CareerTimeline />
      <ContactCTA />
    </>
  );
}
