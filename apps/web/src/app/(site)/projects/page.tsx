import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { CaseStudies, Logos, All, GridPlay } from '@/components/sections/projects';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real estate launches, brand identities, campaigns and personal studies by TALAL·AT.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  const c = await getSiteContent();
  return (
    <SitePage path="/projects" data={{ projects: c.projects, caseStudies: c.caseStudies }}>
      <PageHero
        crumb="Projects"
        title={<>Our <em>projects</em></>}
        intro="Real estate launches, identities, campaigns and personal studies. Hover any frame to bring it to colour and pull a second image out of the project."
        meta={[[String(c.projects.length + c.caseStudies.length), 'Projects'], ['4', 'Disciplines'], ['8+', 'Years']]}
      />
      <CaseStudies />
      <Logos />
      <All />
      <GridPlay />
      <CtaBand />
    </SitePage>
  );
}
