import { BRAND } from '@talal-at/shared/dist/brand';
import { COMPANY } from '@talal-at/shared/dist/content';
import { NAV, isCurrent } from '@/lib/site';

export function Header({ path }: { path: string }) {
  return (
    <>
      <header className="bar">
        <div className="wrap">
          <a href="/" className="logo-ico" aria-label="TALAL·AT — home">
            <svg className="ico" viewBox={BRAND.icon.viewBox}><use href="#icon" /></svg>
          </a>
          <a href="/" aria-label="TALAL·AT — home">
            <svg className="sig wm" viewBox={BRAND.wordmark.viewBox} role="img" aria-label="TALAL·AT"><use href="#word" /></svg>
          </a>
          <div className="r caps">
            <nav className="nav" aria-label="Pages">
              {NAV.slice(1).map(([href, label]) => (
                <a key={href} href={href} aria-current={isCurrent(path, href) ? 'page' : undefined}>{label}</a>
              ))}
            </nav>
            <span className="clock" id="clock">--:--</span>
            <button className="theme" id="themeBtn" type="button" aria-label="Switch to dark mode"><span className="knob"><i /></span><span className="lbl" id="themeLbl">Dark</span></button>
            <button className="menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><i /></button>
          </div>
        </div>
      </header>
      <div className="menu" id="menu" aria-hidden="true">
        <button className="close" id="menuClose" type="button" aria-label="Close menu">×</button>
        <nav aria-label="Pages">
          {NAV.map(([href, label], i) => (
            <a key={href} href={href} aria-current={isCurrent(path, href) ? 'page' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{label}</a>
          ))}
        </nav>
        <div className="mfoot caps"><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><span>Dubai · UAE</span></div>
      </div>
    </>
  );
}
