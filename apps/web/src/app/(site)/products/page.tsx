import type { Metadata } from 'next';
import { SitePage } from '@/components/chrome/SitePage';
import { PageHero } from '@/components/chrome/PageHero';
import { CtaBand } from '@/components/chrome/CtaBand';
import { ProductsIndex } from '@/components/sections/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'AI Marketing Studio and Nuss Nuss: two products in development at TALAL·AT. Join the waitlists for early access.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <SitePage path="/products">
      <PageHero
        crumb="Products"
        title={<>Our <em>products</em></>}
        intro="Software we are building for businesses and for everyday life in the region. Both are in development, and early access opens to the waitlist first."
        meta={[['2', 'Products'], ['EN · AR', 'Languages'], ['UAE', 'Made in Dubai']]}
      />
      <ProductsIndex />
      <CtaBand />
    </SitePage>
  );
}
