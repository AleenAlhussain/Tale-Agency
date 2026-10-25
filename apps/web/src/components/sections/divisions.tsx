/* Division pages and the divisions overview. Built from the site's own patterns:
   label + work-head, rules grid, steps, the dark "deliverables" list and pill chips. */
import { DIVISIONS, type Division } from '@talal-at/shared/dist/content';
import { DivisionSteps } from './company';

const LETTERS = 'abcdefghij';

export function DivisionsIndex() {
  return (
    <section className="sec" id="divisions" style={{ paddingTop: 'clamp(50px,6vw,90px)', paddingBottom: 0 }}>
      <div className="wrap">
        <div className="label caps"><span>The company</span><span>Four divisions · one studio</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">Four <em>divisions</em></h2>
          <p>Software, AI, brand and growth. Choose a division to see what it builds, how it works and what it costs.</p>
        </div>
        <DivisionSteps />
      </div>
    </section>
  );
}

export function DivisionCapabilities({ d }: { d: Division }) {
  return (
    <section className="sec" id="capabilities" style={{ paddingTop: 'clamp(50px,6vw,90px)' }}>
      <div className="wrap">
        <div className="label caps"><span>01 / Capabilities</span><span>{d.capabilities.length} ways we help</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">What we <em>build</em></h2>
          <p>{d.short}</p>
        </div>
        <div className="rules caps-grid">
          {d.capabilities.map((c) => (
            <div key={c.name} className="reveal">
              <span className="caps">{c.tag}</span>
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DivisionProcess({ d }: { d: Division }) {
  return (
    <section className="sec" id="process" style={{ background: 'var(--bg2)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="label caps"><span>02 / Process</span><span>Five steps, written down</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">How it <em>works</em></h2>
          <p>The same clear rhythm on every project, so you always know what happens next.</p>
        </div>
        <div className="steps">
          {d.process.map((s, i) => (
            <div className="step" key={s.name}>
              <span className="no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DivisionDeliverables({ d }: { d: Division }) {
  return (
    <section className="hre dark sec divdeliv" id="deliverables">
      <div className="wrap">
        <div className="label caps"><span>03 / Deliverables</span><span>What you receive</span></div>
        <div className="hre-top">
          <h2 className="h-serif split-h">What you <em>get</em><span className="caps-l">{d.name}</span></h2>
          <div>
            <ul className="deliv">
              {d.deliverables.map((x, i) => (
                <li key={x}><span className="it">{LETTERS[i]}</span><b>{x}</b><span className="caps">{String(i + 1).padStart(2, '0')}</span></li>
              ))}
            </ul>
            <div className="tools-used">
              <span className="caps">Tools &amp; stack</span>
              <div className="chips">{d.tools.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DivisionStart({ d }: { d: Division }) {
  const i = DIVISIONS.findIndex((x) => x.slug === d.slug);
  const prev = DIVISIONS[(i + DIVISIONS.length - 1) % DIVISIONS.length];
  const next = DIVISIONS[(i + 1) % DIVISIONS.length];
  return (
    <section className="sec" id="start">
      <div className="wrap">
        <div className="label caps"><span>04 / Investment</span><span>Clear prices in AED</span></div>
        <div className="divstart">
          <p className="price h-serif">{d.pricing.text}</p>
          <div className="divbtns">
            <a className="btn2 solid" href={d.pricing.href.startsWith('/contact') ? `/contact?division=${d.slug}` : d.pricing.href}>{d.pricing.cta} <span className="ar">→</span></a>
            {d.pricing.href.startsWith('/contact') ? null : <a className="btn2" href={`/contact?division=${d.slug}`}>Start a project</a>}
            {d.related.filter((r) => !r.href.startsWith('/contact')).map((r) => <a className="btn2" key={r.href} href={r.href}>{r.label}</a>)}
          </div>
        </div>
        <nav className="divnav caps" aria-label="Other divisions">
          <a href={`/services/${prev.slug}`}><span className="ar">←</span> {prev.no} · {prev.name}</a>
          <a href="/services">All services</a>
          <a href={`/services/${next.slug}`}>{next.no} · {next.name} <span className="ar">→</span></a>
        </nav>
      </div>
    </section>
  );
}
