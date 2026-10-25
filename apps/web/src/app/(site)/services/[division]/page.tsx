import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIVISIONS } from '@talal-at/shared/dist/content';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { DivisionCapabilities, DivisionDeliverables, DivisionProcess, DivisionStart } from '@/components/sections/divisions';

export const dynamicParams = false;

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ division: string }> }): Promise<Metadata> {
  const { division } = await params;
  const d = DIVISIONS.find((x) => x.slug === division);
  if (!d) return {};
  return { title: d.name, description: d.short, alternates: { canonical: `/services/${d.slug}` } };
}

export default async function DivisionPage({ params }: { params: Promise<{ division: string }> }) {
  const slug = (await params).division;
  const d = DIVISIONS.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <SitePage path={`/services/${d.slug}`}>
      <PageHero
        crumb={d.name}
        trail={[['/services', 'Services']]}
        titleHtml={d.title}
        intro={d.intro}
        meta={[[d.no, 'Division'], [String(d.capabilities.length), 'Capabilities'], ['EN · AR', 'Languages']]}
      />
      <DivisionCapabilities d={d} />
      <DivisionProcess d={d} />
      <DivisionDeliverables d={d} />
      <DivisionStart d={d} />
      <CtaBand />
    </SitePage>
  );
}
