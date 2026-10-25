import type { ReactNode } from 'react';
import { BRAND } from '@talal-at/shared/dist/brand';
import type { PageData } from '@/lib/content';
import { Sprite } from './Sprite';
import { Header } from './Header';
import { Footer } from './Footer';
import { SiteRuntime } from './SiteRuntime';

/** Every public page: the same chrome, in the same order, as the approved static pages. */
export function SitePage({
  path,
  children,
  data,
  extra,
  credit,
  tail,
}: {
  path: string;
  children: ReactNode;
  data?: PageData;
  extra?: ReactNode;
  credit?: ReactNode;
  tail?: ReactNode;
}) {
  const json = JSON.stringify(data ?? {}).replace(/</g, '\\u003c');
  return (
    <>
      <Sprite />
      <div className={'curtain' + (path === '/' ? '' : ' enter')} id="curtain" aria-hidden="true">
        <svg className="ico" viewBox={BRAND.icon.viewBox}><use href="#icon" /></svg>
      </div>
      <div className="cursor" id="cursor"><span id="cursorL">View</span></div>
      <Header path={path} />
      <main>{children}</main>
      {extra}
      <Footer credit={credit} />
      <script id="ta-data" type="application/json" dangerouslySetInnerHTML={{ __html: json }} />
      <SiteRuntime />
      {tail}
    </>
  );
}
