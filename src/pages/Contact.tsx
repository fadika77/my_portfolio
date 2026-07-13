import { SEO } from '@/components/common/SEO';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        path="/contact"
        description="Get in touch with Fadi Kanaani about Junior Software Engineer opportunities, development teams, and collaborations."
      />
      <div className="pt-16">
        <ContactSection />
      </div>
    </>
  );
}
