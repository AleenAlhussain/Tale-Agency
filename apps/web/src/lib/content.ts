/* Server-side data for the public pages. Reads the API, and falls back to the bundled seed content
   when the API is not reachable (for example while the Docker image is being built), so the site never breaks. */
import { COMPANY, PRICING, SEED_CASE_STUDIES, SEED_PROJECTS, type SiteContent } from '@talal-at/shared';

export const API_URL = process.env.API_INTERNAL_URL || 'http://localhost:4000';

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const r = await fetch(`${API_URL}/api/content/site`, { next: { revalidate: 60, tags: ['site-content'] }, signal: AbortSignal.timeout(4000) });
    if (!r.ok) throw new Error(`API ${r.status}`);
    return (await r.json()) as SiteContent;
  } catch {
    return {
      projects: SEED_PROJECTS,
      caseStudies: SEED_CASE_STUDIES,
      pricing: PRICING,
      payment: { link: process.env.PAYMENT_LINK || '', whatsapp: COMPANY.whatsapp, email: COMPANY.email },
      source: 'seed',
    };
  }
}

/** Only what a page needs travels to the browser. */
export type PageData = Partial<Pick<SiteContent, 'projects' | 'caseStudies' | 'pricing' | 'payment'>>;
