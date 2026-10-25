import type { ReactNode } from 'react';
import { BRAND } from '@talal-at/shared/dist/brand';

/** The inner-page hero: crumb, big serif title, intro and three figures. */
export function PageHero({ crumb, title, titleHtml, intro, meta, trail }: { crumb: ReactNode; title?: ReactNode; titleHtml?: string; intro: ReactNode; meta: [ReactNode, ReactNode][]; trail?: [string, string][] }) {
  return (
    <section className="phero" id="top">
      <svg className="wmark" viewBox={BRAND.icon.viewBox} aria-hidden="true"><use href="#icon" /></svg>
      <div className="wrap">
        <div className="crumb caps">
          <a href="/">TALAL·AT</a>
          {(trail ?? []).map(([href, label]) => (
            <span key={href} style={{ display: 'contents' }}><span>/</span><a href={href}>{label}</a></span>
          ))}
          <span>/</span><span>{crumb}</span>
        </div>
        {titleHtml ? <h1 className="split-h" dangerouslySetInnerHTML={{ __html: titleHtml }} /> : <h1 className="split-h">{title}</h1>}
        <div className="intro">
          <p>{intro}</p>
          <div className="meta3">{meta.map(([b, s], i) => <div key={i}><b>{b}</b><span className="caps">{s}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}
