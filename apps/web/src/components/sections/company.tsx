/* New on the home page: the company at a glance. Built only from existing patterns
   (label, work-head, steps, buttons) so it reads as part of the original design. */
import { DIVISIONS, PRODUCTS } from '@talal-at/shared/dist/content';

export function DivisionSteps({ current }: { current?: string }) {
  return (
    <div className="steps four">
      {DIVISIONS.map((d) => (
        <a className={'step divlink' + (d.slug === current ? ' on' : '')} key={d.slug} href={`/services/${d.slug}`} data-cursor="Open" aria-current={d.slug === current ? 'page' : undefined}>
          <span className="no">{d.no}</span>
          <h3>{d.name}</h3>
          <p>{d.short}</p>
          <span className="divmore caps">Explore <span className="ar">→</span></span>
        </a>
      ))}
    </div>
  );
}

export function ProductCards({ big }: { big?: boolean }) {
  return (
    <div className={'prods' + (big ? ' big' : '')}>
      {PRODUCTS.map((p) => (
        <a className="prod" key={p.slug} href={`/products/${p.slug}`} data-cursor="Open">
          <span className="caps">{p.kind}</span>
          <h3 className="h-serif" dangerouslySetInnerHTML={{ __html: p.title }} />
          <p>{p.short}</p>
          <span className="status caps"><i />{p.status}</span>
        </a>
      ))}
    </div>
  );
}

export function Company() {
  return (
    <section className="sec company" id="company" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="label caps"><span>08 / The company</span><span>Four divisions · two products</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">One studio, <em>four divisions</em></h2>
          <p>Software, AI, brand and growth under one roof, so the idea, the product and the launch speak one language.</p>
        </div>
        <DivisionSteps />
        <ProductCards />
      </div>
    </section>
  );
}
