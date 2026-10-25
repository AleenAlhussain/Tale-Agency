import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@talal-at/shared/dist/content';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { ProductFeatures, ProductPrinciples, ProductWaitlist } from '@/components/sections/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} · ${p.status}`, description: p.short, alternates: { canonical: `/products/${p.slug}` } };
}

const META: Record<string, [string, string][]> = {
  'ai-marketing': [['SaaS', 'Web app'], ['EN · AR', 'Languages'], ['Soon', 'Early access']],
  'nuss-nuss': [['App', 'iOS · Android'], ['AR · EN', 'Arabic first'], ['Soon', 'Early access']],
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <SitePage path={`/products/${p.slug}`}>
      <PageHero crumb={p.name} trail={[['/products', 'Products']]} titleHtml={p.title} intro={p.intro} meta={META[p.slug]} />
      <ProductFeatures p={p} />
      <ProductPrinciples p={p} />
      <ProductWaitlist p={p} />
      <CtaBand />
    </SitePage>
  );
}
