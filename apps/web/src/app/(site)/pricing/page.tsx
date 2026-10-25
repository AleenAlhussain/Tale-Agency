import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/content';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { Estimator, How } from '@/components/sections/pricing';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Build your scope: logo, branding, brand voice, websites, apps, social media and video. Clear prices in AED.',
  alternates: { canonical: '/pricing' },
};

export default async function PricingPage() {
  const c = await getSiteContent();
  return (
    <SitePage path="/pricing" data={{ pricing: c.pricing, payment: c.payment }}>
      <PageHero
        crumb="Pricing"
        title={<>Build your <em>scope</em></>}
        intro="Choose what you need and watch the investment add up. Clear prices in AED, no guessing. Every project is confirmed on a short call before anything starts."
        meta={[['AED', 'Prices'], ['50%', 'To start'], ['48h', 'Proposal']]}
      />
      <Estimator />
      <How />
      <CtaBand />
    </SitePage>
  );
}
