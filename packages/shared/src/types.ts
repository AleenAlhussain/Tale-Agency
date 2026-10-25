/* Types shared by the website (apps/web) and the API (apps/api). */

export interface PricingItem {
  id: string;
  /** Display name. May contain HTML entities such as &amp;. */
  n: string;
  /** Price in AED. Missing when the item is quoted on request. */
  p?: number;
  d: string;
  /** Monthly price. */
  mo?: number | boolean;
  qty?: { lab: string; max: number };
  /** Included free when one of these option ids is selected. */
  inc?: string[];
  quote?: number | boolean;
  from?: number | boolean;
  tag?: string;
}

export interface PricingSection {
  k: string;
  no: string;
  /** Section title. May contain <em> and HTML entities. */
  t: string;
  sub: string;
  /** Pick one item only. */
  radio?: boolean;
  mo?: boolean;
  /** Shows the commitment (1 / 3 / 6 months) switch. */
  term?: boolean;
  items: PricingItem[];
  add?: PricingItem[];
}

export interface PricingTerm {
  id: string;
  label: string;
  discount: number;
}

export interface PricingPreset {
  label: string;
  pick: {
    id?: string;
    web?: string;
    social?: string;
    add?: string[];
    vid?: Record<string, number>;
  };
}

export interface PricingCatalog {
  currency: 'AED';
  usdPeg: number;
  deposit: number;
  terms: PricingTerm[];
  sections: PricingSection[];
  presets: PricingPreset[];
}

/** What the visitor picked in the estimator. Same shape the browser keeps in localStorage. */
export interface ScopeSelection {
  /** Radio sections: section key -> item id. */
  r: Record<string, string | undefined | null>;
  /** Checked items and add-ons: item id -> true. */
  c: Record<string, boolean | undefined | null>;
  /** Quantities: item id -> number. */
  q: Record<string, number | undefined | null>;
  /** Commitment in months: '1', '3' or '6'. */
  term: string;
}

export interface EstimateLine {
  id: string;
  name: string;
  qty: number;
  amount: number;
  monthly: boolean;
  quote: boolean;
  from: boolean;
}

export interface Estimate {
  lines: EstimateLine[];
  oneOff: number;
  monthly: number;
  termMonths: number;
  total: number;
  deposit: number;
  hasQuoteItems: boolean;
  hasFromPrices: boolean;
}

export interface CaseItem {
  src?: string;
  th: string;
  cap: string;
  vid?: string;
  poster?: string;
}

export interface CaseStudyDTO {
  slug: string;
  title: string;
  summary: string;
  category: string;
  cover: string;
  coverPosition: string;
  peek: string | null;
  peekVideo: string | null;
  items: CaseItem[];
  sortOrder: number;
  published: boolean;
  featured: boolean;
}

export interface ArchiveProjectDTO {
  slug: string;
  title: string;
  subtitle: string;
  behancePath: string;
  cover: string;
  category: 're' | 'br' | 'ca' | 'ar' | string;
  views: number;
  innerImage: string | null;
  client: string | null;
  sortOrder: number;
  published: boolean;
}

/** Everything the public pages need from the database, in one payload. */
export interface SiteContent {
  projects: ArchiveProjectDTO[];
  caseStudies: CaseStudyDTO[];
  pricing: PricingCatalog;
  payment: { link: string; whatsapp: string; email: string };
  source: 'api' | 'seed';
}

export type ProductSlug = 'ai-marketing' | 'nuss-nuss';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost' | 'spam';
export type QuoteStatus = 'new' | 'proposal_sent' | 'accepted' | 'declined' | 'paid';
