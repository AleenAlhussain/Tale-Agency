import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { Services, Brief, SocialMedia, GridDesign, Moodboards } from '@/components/sections/services';
import { Lightbox } from '@/components/sections/lightbox';
import { DivisionsIndex } from '@/components/sections/divisions';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Services',
  description: 'Software and digital platforms, AI and automation, brand identity, social media management, grid design, launches, print, motion and web.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const c = await getSiteContent();
  return (
    <SitePage path="/services" data={{ projects: c.projects }} extra={<Lightbox />}>
      <PageHero
        crumb="Services"
        title={<>Our <em>services</em></>}
        intro="From the first mark to the last billboard, and every post in between. One studio for the identity, the system, the launch and the feed."
        meta={[['10', 'Services'], ['1', 'Studio'], ['A–Z', 'In-house']]}
      />
      <DivisionsIndex />
      <Services />
      <Brief />
      <SocialMedia />
      <GridDesign />
      <Moodboards />
      <CtaBand />
    </SitePage>
  );
}
