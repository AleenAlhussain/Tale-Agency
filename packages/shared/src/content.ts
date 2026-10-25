/* Company structure: the four divisions and the two products.
   Titles may use <em> for the italic serif accent, the same way the rest of the site does.
   Product status is shown on the site as written here, so keep it honest. */
import type { ProductSlug } from './types';

export interface Division {
  slug: 'software' | 'ai' | 'brand' | 'growth';
  no: string;
  name: string;
  /** Page heading, may contain <em>. */
  title: string;
  short: string;
  intro: string;
  capabilities: { name: string; text: string; tag: string }[];
  deliverables: string[];
  process: { name: string; text: string }[];
  tools: string[];
  pricing: { text: string; href: string; cta: string };
  /** Projects page anchors or pages that show this work. */
  related: { label: string; href: string }[];
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
  features: { name: string; text: string; tag: 'Planned' | 'In build' | 'Ready' }[];
  principles: { name: string; text: string }[];
  platforms: string;
  pricingNote: string;
  waitlistPrompt: string;
}

export const DIVISIONS: Division[] = [
  {
    slug: 'software',
    no: '01',
    name: 'Software & Digital Platforms',
    title: 'Software &amp; <em>digital platforms</em>',
    short: 'Websites, web apps, mobile apps and SaaS platforms, designed and engineered in one studio.',
    intro:
      'From a launch page to a platform with thousands of users. We plan the architecture, design every screen and build it on a stack that is fast, secure and ready to grow.',
    capabilities: [
      { name: 'Websites & landing pages', text: 'Editorial, fast and easy to update. Built to convert and to rank.', tag: 'Web' },
      { name: 'Web applications', text: 'Dashboards, portals, booking and internal tools with real accounts and real data.', tag: 'Apps' },
      { name: 'Mobile apps', text: 'iOS and Android from one codebase, through to App Store and Google Play.', tag: 'Mobile' },
      { name: 'SaaS platforms', text: 'Multi-tenant products with roles, subscriptions and an admin panel from day one.', tag: 'SaaS' },
      { name: 'E-commerce', text: 'Stores with online payments, English and Arabic, built around the brand.', tag: 'Commerce' },
      { name: 'APIs & integrations', text: 'CRMs, payment gateways, WhatsApp, maps and the tools your team already uses.', tag: 'Systems' },
      { name: 'Cloud & DevOps', text: 'Containers, CI/CD, backups and monitoring on Microsoft Azure or the cloud you prefer.', tag: 'Cloud' },
    ],
    deliverables: [
      'Technical scope and architecture document',
      'UX flows, wireframes and full UI design',
      'Source code in your own repository',
      'Automated tests and deployment pipeline',
      'Admin panel and documentation',
      'Launch, monitoring and a care plan',
    ],
    process: [
      { name: 'Discovery', text: 'Goals, users and the features that matter first.' },
      { name: 'Architecture', text: 'Data model, stack and integrations, written down before code.' },
      { name: 'Design', text: 'Flows and screens in the brand, approved before the build.' },
      { name: 'Build in sprints', text: 'Working software every two weeks, on a staging link you can open.' },
      { name: 'Launch & care', text: 'Go live, measure, and keep improving.' },
    ],
    tools: ['Next.js', 'React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Microsoft Azure', 'React Native'],
    pricing: { text: 'Websites from AED 4,000. Apps from AED 4,000. Platforms quoted after a scoping call.', href: '/pricing#g-web', cta: 'Build your scope' },
    related: [
      { label: 'Website & app pricing', href: '/pricing#g-web' },
      { label: 'Case studies', href: '/projects#case-studies' },
    ],
  },
  {
    slug: 'ai',
    no: '02',
    name: 'AI & Business Automation',
    title: 'AI &amp; business <em>automation</em>',
    short: 'Assistants, automations and AI features that save hours every week, in English and Arabic.',
    intro:
      'AI is useful when it removes real work. We find the repetitive steps in your business, then design assistants and automations that handle them safely, with a person in the loop where it counts.',
    capabilities: [
      { name: 'AI assistants', text: 'Customer and sales assistants for your website and WhatsApp, trained on your own content.', tag: 'Assist' },
      { name: 'Workflow automation', text: 'Leads, follow-ups, invoices and reports moving on their own between your tools.', tag: 'Automate' },
      { name: 'Document intelligence', text: 'Read, sort and extract data from contracts, receipts, forms and PDFs.', tag: 'Docs' },
      { name: 'AI content pipelines', text: 'On-brand drafts for posts, listings and emails, reviewed by your team before they go out.', tag: 'Content' },
      { name: 'Insight & forecasting', text: 'Dashboards that explain the numbers in plain language and flag what changed.', tag: 'Data' },
      { name: 'AI features in your product', text: 'Search, recommendations and assistants inside your own app or platform.', tag: 'Product' },
      { name: 'AI readiness workshop', text: 'A half-day session that maps where AI pays off first, and where it should not be used.', tag: 'Strategy' },
    ],
    deliverables: [
      'Process map and automation plan',
      'Prompt, data and safety design',
      'Working assistant or automation',
      'Human review and escalation rules',
      'Usage and cost dashboard',
      'Team training and handover',
    ],
    process: [
      { name: 'Map', text: 'Walk through the process and measure the time it takes today.' },
      { name: 'Prove', text: 'A small pilot on real examples, with clear pass and fail criteria.' },
      { name: 'Build', text: 'Integrate with your tools, add guardrails, logging and review steps.' },
      { name: 'Train', text: 'Show the team how it works and when to step in.' },
      { name: 'Improve', text: 'Monthly review of accuracy, cost and time saved.' },
    ],
    tools: ['Azure OpenAI', 'OpenAI & Anthropic APIs', 'n8n', 'Make', 'WhatsApp Business API', 'PostgreSQL + pgvector', 'Python', 'Node.js'],
    pricing: { text: 'Workshops, pilots and builds are quoted after a short call, so the scope matches the saving.', href: '/contact', cta: 'Book a call' },
    related: [
      { label: 'AI Marketing Studio', href: '/products/ai-marketing' },
      { label: 'Start a project', href: '/contact' },
    ],
  },
  {
    slug: 'brand',
    no: '03',
    name: 'Branding, Creative Design & Digital Experiences',
    title: 'Branding, creative &amp; <em>digital experiences</em>',
    short: 'Identities, Arabic logotypes, launches, campaigns, motion and 3D, with a reason behind every line.',
    intro:
      'Where the studio began. Eight years of identities, real estate launches and campaigns in Dubai. The mark, the system and every place it appears, from a brand book to a billboard to a screen.',
    capabilities: [
      { name: 'Brand identity A to Z', text: 'Strategy, logo suite, colour, type, patterns and the guidelines book.', tag: 'Identity' },
      { name: 'Arabic logotypes', text: 'Custom Arabic lettering, drawn by hand, paired with an English mark.', tag: 'Type' },
      { name: 'Naming & brand voice', text: 'Names, taglines and a tone of voice in English and Arabic.', tag: 'Voice' },
      { name: 'Real estate launches', text: 'Brochures, hoardings, launch films and sales-centre material.', tag: 'Launch' },
      { name: 'Campaigns & print', text: 'Concepts that travel from a poster to a reel without losing the idea.', tag: 'Campaign' },
      { name: 'Motion, 3D & art direction', text: 'Logo reveals, product renders and AI-assisted imagery, directed by hand.', tag: 'Motion' },
      { name: 'UI / UX design', text: 'Interfaces that carry the brand into websites, apps and products.', tag: 'Digital' },
    ],
    deliverables: [
      'Moodboard and creative direction',
      'Logo suite and brand guidelines book',
      'Stationery, packaging and print files',
      'Social templates and launch kit',
      'Motion and 3D assets',
      'UI kit for web and app',
    ],
    process: [
      { name: 'Notice', text: 'Research the market, the audience and the place.' },
      { name: 'Direct', text: 'One page that agrees the mood, palette and type.' },
      { name: 'Draw', text: 'Concepts, refined in clear revision rounds.' },
      { name: 'Systemise', text: 'Rules and templates the whole team can use.' },
      { name: 'Launch', text: 'Print, screens, social and film, all speaking one language.' },
    ],
    tools: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Premiere', 'Figma', 'Blender', 'Firefly · Midjourney'],
    pricing: { text: 'Logos from AED 1,500. Arabic logotypes from AED 3,500. Brand identity A to Z from AED 9,500.', href: '/pricing#g-id', cta: 'Build your scope' },
    related: [
      { label: 'Case studies', href: '/projects#case-studies' },
      { label: 'Logofolio', href: '/projects#logos' },
      { label: 'Brand guidelines', href: '/#guidelines' },
    ],
  },
  {
    slug: 'growth',
    no: '04',
    name: 'Digital Marketing & Growth',
    title: 'Digital marketing &amp; <em>growth</em>',
    short: 'Social media, content, paid ads, SEO and video, run like a brand and measured every month.',
    intro:
      'Growth that still looks like you. One plan, one look and one voice across every channel, with a clear report on what worked and what changes next.',
    capabilities: [
      { name: 'Social media management', text: 'Strategy, calendar, design, captions in English and Arabic, and community care.', tag: 'Social' },
      { name: 'Content production', text: 'Shoot days, grid design, reels and covers in the brand palette.', tag: 'Content' },
      { name: 'Paid ads', text: 'Meta and Google campaigns with creative testing and weekly optimisation.', tag: 'Ads' },
      { name: 'SEO & AI search', text: 'Technical SEO, content and structured data so you appear in search and AI answers.', tag: 'Search' },
      { name: 'UGC, VSL & video', text: 'Creator videos, sales letters and launch films, cut for each platform.', tag: 'Video' },
      { name: 'Email & CRM', text: 'Lead capture, welcome flows and newsletters connected to your CRM.', tag: 'CRM' },
      { name: 'Analytics & reporting', text: 'One monthly report with the numbers that matter and the next three moves.', tag: 'Data' },
    ],
    deliverables: [
      'Channel audit and growth plan',
      'Monthly content calendar',
      'Designed posts, stories and reels',
      'Ad campaigns and creative tests',
      'SEO fixes and content briefs',
      'Monthly performance report',
    ],
    process: [
      { name: 'Audit', text: 'Where each channel stands and who it speaks to.' },
      { name: 'Plan', text: 'Pillars, calendar and targets, approved before anything is made.' },
      { name: 'Make', text: 'Shoot, design, edit and write in the brand.' },
      { name: 'Run', text: 'Publish, reply, test ads and watch the numbers.' },
      { name: 'Report', text: 'What worked, what did not, and what changes next month.' },
    ],
    tools: ['Meta Business Suite', 'Google Ads', 'Google Analytics 4', 'Search Console', 'CapCut', 'Later', 'HubSpot', 'Mailchimp'],
    pricing: { text: 'Social media from AED 3,000 a month. Content package of 15 posts from AED 3,500. Video priced per piece.', href: '/pricing#g-social', cta: 'Build your scope' },
    related: [
      { label: 'Social media management', href: '/services#social-media' },
      { label: 'Grid design', href: '/services#grid-design' },
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'ai-marketing',
    name: 'AI Marketing Studio',
    title: 'AI Marketing <em>Studio</em>',
    kind: 'AI-powered marketing management · SaaS',
    status: 'In development',
    short: 'Plan, create, approve and measure your marketing in one place, with AI that knows your brand.',
    intro:
      'Built from years of running brands and feeds for clients in the UAE. One workspace for the calendar, the content and the numbers, with an assistant that writes in your voice, in English and Arabic.',
    audience: ['Growing businesses', 'Marketing teams', 'Agencies with many brands', 'Real estate developers'],
    features: [
      { name: 'Brand memory', text: 'Upload your guidelines once. Voice, colours, words to use and words to avoid guide every draft.', tag: 'In build' },
      { name: 'Content calendar', text: 'Plan a month of posts, stories and reels by pillar, channel and campaign.', tag: 'In build' },
      { name: 'AI drafts, EN & AR', text: 'Captions, hooks and ad copy drafted in both languages, ready for a human edit.', tag: 'In build' },
      { name: 'Approvals', text: 'Clients and managers comment and approve in one place, not in chat threads.', tag: 'Planned' },
      { name: 'Scheduling', text: 'Publish to the major social platforms from one queue.', tag: 'Planned' },
      { name: 'Plain-language insights', text: 'A weekly summary of what performed, why, and what to try next.', tag: 'Planned' },
      { name: 'Agency mode', text: 'Many brands, separate workspaces, one login.', tag: 'Planned' },
    ],
    principles: [
      { name: 'People approve', text: 'Nothing is published without a person saying yes.' },
      { name: 'Your data stays yours', text: 'Brand files and drafts are never used to train public models.' },
      { name: 'Built for the region', text: 'Arabic and English, UAE time, local holidays and seasons in the calendar.' },
    ],
    platforms: 'Web app, desktop and mobile browsers.',
    pricingNote: 'Monthly plans will be announced at launch. Founding teams on the waitlist get early access and a launch discount.',
    waitlistPrompt: 'Join the waitlist for early access.',
  },
  {
    slug: 'nuss-nuss',
    name: 'Nuss Nuss',
    title: 'Nuss <em>Nuss</em>',
    kind: 'Arabic-first shared expenses · mobile app',
    status: 'In development',
    short: 'Split it fairly. Shared expenses for trips, homes and friends, made for the Middle East.',
    intro:
      'Nuss nuss means half and half. An app for the bills we share every day: the trip, the flat, the family dinner, the group gift. Arabic first, English too, and every currency in the region.',
    audience: ['Friends & trips', 'Flatmates', 'Families', 'Couples', 'Small teams'],
    features: [
      { name: 'Groups', text: 'A group for each trip, home or occasion, with everyone in it.', tag: 'In build' },
      { name: 'Split your way', text: 'Equally, by shares, by exact amounts or item by item from the bill.', tag: 'In build' },
      { name: 'Regional currencies', text: 'AED, SAR, QAR, KWD, BHD, OMR, EGP, JOD and more, in one group.', tag: 'In build' },
      { name: 'Settle up simply', text: 'The fewest transfers to make everyone even, with reminders that stay friendly.', tag: 'Planned' },
      { name: 'Receipts & notes', text: 'Snap the receipt, add a note, find it later.', tag: 'Planned' },
      { name: 'Arabic first', text: 'Designed right to left from the first sketch, with full English support.', tag: 'In build' },
    ],
    principles: [
      { name: 'Fair by design', text: 'Clear history of who paid what, so nobody has to ask twice.' },
      { name: 'Private', text: 'Your groups and spending are visible only to the people in them.' },
      { name: 'Made for here', text: 'Local currencies, local habits and the way we really split.' },
    ],
    platforms: 'iOS and Android, with a web version.',
    pricingNote: 'Free to use for everyday splitting. Any paid features will be announced before launch.',
    waitlistPrompt: 'Join the waitlist and be first to try it.',
  },
];

export const COMPANY = {
  name: 'TALAL·AT',
  legalName: 'TALAL·AT',
  tagline: 'Think. Inspire. Design.',
  description:
    'TALAL·AT is a technology, AI, branding and digital marketing company in Dubai. Software and digital platforms, AI and business automation, brand and creative design, and digital growth, under one studio.',
  email: 'talalatallah10@gmail.com',
  phone: '+971 54 280 7100',
  whatsapp: '971542807100',
  city: 'Business Bay, Dubai, UAE',
};
