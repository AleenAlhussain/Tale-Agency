import type { MetadataRoute } from 'next';
import { DIVISIONS, PRODUCTS } from '@talal-at/shared/dist/content';
import { NAV, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...NAV.map(([href]) => ({ url: SITE_URL + href, lastModified: now, priority: href === '/' ? 1 : 0.8 })),
    ...DIVISIONS.map((d) => ({ url: `${SITE_URL}/services/${d.slug}`, lastModified: now, priority: 0.7 })),
    ...PRODUCTS.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
