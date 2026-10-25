import type { Metadata } from 'next';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { Reach, Contact } from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with TALAL·AT. Email, WhatsApp or the brief form.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <SitePage path="/contact">
      <PageHero
        crumb="Contact"
        title={<>Let&apos;s <em>talk.</em></>}
        intro="Tell me about the brand, the launch or the feed. English or Arabic, both welcome."
        meta={[['Dubai', 'Business Bay'], ['UAE', '& GCC'], ['EN · AR', 'Languages']]}
      />
      <Reach />
      <Contact />
    </SitePage>
  );
}
