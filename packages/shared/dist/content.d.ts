import type { ProductSlug } from './types';
export interface Division {
    slug: 'software' | 'ai' | 'brand' | 'growth';
    no: string;
    name: string;
    /** Page heading, may contain <em>. */
    title: string;
    short: string;
    intro: string;
    capabilities: {
        name: string;
        text: string;
        tag: string;
    }[];
    deliverables: string[];
    process: {
        name: string;
        text: string;
    }[];
    tools: string[];
    pricing: {
        text: string;
        href: string;
        cta: string;
    };
    /** Projects page anchors or pages that show this work. */
    related: {
        label: string;
        href: string;
    }[];
}
export interface Product {
    slug: ProductSlug;
    name: string;
    /** Page heading, may contain <em>. */
    title: string;
    kind: string;
    status: 'In development' | 'Private beta' | 'Live';
    short: string;
    intro: string;
    audience: string[];
    features: {
        name: string;
        text: string;
        tag: 'Planned' | 'In build' | 'Ready';
    }[];
    principles: {
        name: string;
        text: string;
    }[];
    platforms: string;
    pricingNote: string;
    waitlistPrompt: string;
}
export declare const DIVISIONS: Division[];
export declare const PRODUCTS: Product[];
export declare const COMPANY: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    whatsapp: string;
    city: string;
};
