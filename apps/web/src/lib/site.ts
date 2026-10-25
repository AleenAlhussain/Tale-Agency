export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const NAV: [href: string, label: string][] = [
  ['/', 'Home'],
  ['/projects', 'Projects'],
  ['/services', 'Services'],
  ['/products', 'Products'],
  ['/pricing', 'Pricing'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

export function isCurrent(path: string, href: string) {
  return href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
}
