import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { SitePage } from '@/components/chrome/SitePage';
import { CtaBand } from '@/components/chrome/CtaBand';
import { Credit } from '@/components/chrome/Credit';
import { DavidHero } from '@/components/chrome/DavidHero';
import { Loader, Tools, TopAnchor, Hero, Idea, Work, Kern, Studio, Guidelines, Quiz, Reels, Marquee, Archive, Clients } from '@/components/sections/home';
import { Company } from '@/components/sections/company';

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: 'TALAL·AT — Technology, AI, branding & digital growth, Dubai' },
  description: 'TALAL·AT, Dubai: software and digital platforms, AI and business automation, brand identity and creative direction, and digital marketing. Think. Inspire. Design.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const c = await getSiteContent();
  return (
    <SitePage path="/" data={{ projects: c.projects, caseStudies: c.caseStudies }} credit={<Credit />} tail={<DavidHero />}>
      <Loader />
      <Tools />
      <TopAnchor />
      <Hero />
      <Idea />
      <Work />
      <Kern />
      <Studio />
      <Guidelines />
      <Quiz />
      <Reels />
      <Marquee />
      <Archive />
      <Clients />
      <Company />
      <CtaBand />
    </SitePage>
  );
}
