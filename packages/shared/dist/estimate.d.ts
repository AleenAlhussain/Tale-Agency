import type { Estimate, PricingCatalog, ScopeSelection } from './types';
export declare function decodeEntities(s: string): string;
/** Cleans anything a browser could send into a valid selection for this catalog. */
export declare function normaliseSelection(input: unknown, catalog: PricingCatalog): ScopeSelection;
export declare function computeEstimate(sel: ScopeSelection, catalog: PricingCatalog): Estimate;
export declare function formatMoney(aed: number, currency?: 'AED' | 'USD', usdPeg?: number): string;
