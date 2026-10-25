import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { COMPANY } from '@talal-at/shared/dist/content';
import { SITE_URL } from '@/lib/site';
import './site.css';
import './extend.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'TALAL·AT — Technology, AI, branding & digital growth, Dubai', template: '%s — TALAL·AT' },
  description: COMPANY.description,
  openGraph: {
    type: 'website',
    siteName: 'TALAL·AT',
    images: ['https://mir-s3-cdn-cf.behance.net/projects/808/332e8a240861707.Y3JvcCw0MTE3LDMyMjAsMTgyNCw5Nzg.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F4F3EF',
};

/* Runs before paint so a dark-mode visitor never sees a light flash. */
const THEME = "try{var t=localStorage.getItem('ta-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://mir-s3-cdn-cf.behance.net" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
