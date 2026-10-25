import type { Metadata } from 'next';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { About, Build, Band } from '@/components/sections/about';

export const metadata: Metadata = {
  title: 'About',
  description: 'Talal Atallah, founder and creative director of TALAL·AT in Dubai.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <SitePage path="/about">
      <PageHero
        crumb="About"
        title={<>About <em>the designer</em></>}
        intro="Talal Atallah. Senior graphic designer and creative director in Dubai, with eight years of identities, launches and campaigns behind him."
        meta={[['8+', 'Years'], ['75', 'Projects'], ['8.5K', 'Followers']]}
      />
      <About />
      <Build />
      <Band />
      <CtaBand />
    </SitePage>
  );
}
