import type { ReactNode } from 'react';
import { BRAND } from '@talal-at/shared/dist/brand';
import { COMPANY } from '@talal-at/shared/dist/content';
import { NAV } from '@/lib/site';

export function Footer({ credit }: { credit?: ReactNode }) {
  return (
    <>
      <footer className="foot2">
        <div className="wrap">
          <div className="endsig"><svg className="sig" viewBox={BRAND.signature.viewBox} aria-hidden="true"><use href="#sig" /></svg></div>
          <div className="fgrid">
            <div><svg className="wm" viewBox={BRAND.wordmark.viewBox} aria-hidden="true"><use href="#word" /></svg><p>Software, AI, branding &amp; digital growth.<br />Business Bay, Dubai.</p></div>
            <div><span className="caps">Pages</span>{NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</div>
            <div><span className="caps">Contact</span><a href={`mailto:${COMPANY.email}`}>Email</a><a href="tel:+971542807100">{COMPANY.phone}</a><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener">WhatsApp ↗</a></div>
            <div><span className="caps">Follow</span><a href="https://www.instagram.com/talal.ata11ah" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.behance.net/talalatallah" target="_blank" rel="noopener">Behance ↗</a><a href="https://www.linkedin.com/in/talalatallah" target="_blank" rel="noopener">LinkedIn ↗</a><a href="https://dribbble.com/talalatallah10" target="_blank" rel="noopener">Dribbble ↗</a></div>
          </div>
          <div className="foot caps"><span>© <span className="yr">{new Date().getFullYear()}</span> Talal Atallah</span><span>Think. Inspire. Design.</span><span>Where imagination becomes form</span></div>
        </div>
        {credit}
      </footer>
      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
