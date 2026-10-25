/* Product pages. Every feature carries its real status (Planned / In build / Ready),
   and nothing is presented as available before it is. */
import type { Product } from '@talal-at/shared/dist/content';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ProductCards } from './company';

export function ProductsIndex() {
  return (
    <section className="sec" id="products" style={{ paddingTop: 'clamp(50px,6vw,90px)' }}>
      <div className="wrap">
        <div className="label caps"><span>01 / Products</span><span>Built in Dubai, for the region</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">Made <em>in-house</em></h2>
          <p>Two products shaped by years of client work. Both are in development. Join a waitlist to try them first and help decide what ships.</p>
        </div>
        <ProductCards big />
      </div>
    </section>
  );
}

export function ProductFeatures({ p }: { p: Product }) {
  return (
    <section className="sec" id="features" style={{ paddingTop: 'clamp(50px,6vw,90px)' }}>
      <div className="wrap">
        <div className="label caps"><span>01 / Features</span><span className="avail2 dev"><i />{p.status}</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">What it <em>does</em></h2>
          <p>{p.short}</p>
        </div>
        <div className="rules caps-grid">
          {p.features.map((f) => (
            <div key={f.name} className="reveal">
              <span className="caps">{f.tag}</span>
              <h3>{f.name}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
        <p className="fine statusnote">Features marked Planned or In build are not available yet. This page will change as the product does.</p>
      </div>
    </section>
  );
}

export function ProductPrinciples({ p }: { p: Product }) {
  return (
    <section className="sec" id="principles" style={{ background: 'var(--bg2)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="label caps"><span>02 / Who it&apos;s for</span><span>{p.platforms}</span></div>
        <div className="work-head">
          <h2 className="h-serif split-h">Made <em>for</em></h2>
          <div className="aud">{p.audience.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
        <div className="facts reveal">
          {p.principles.map((x) => (
            <div key={x.name}><span className="caps">{x.name}</span><p>{x.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductWaitlist({ p }: { p: Product }) {
  return (
    <section className="sec" id="waitlist">
      <div className="wrap">
        <div className="label caps"><span>03 / Early access</span><span>Waitlist</span></div>
        <div className="cwrap">
          <div className="cinfo">
            <h2 className="h-serif split-h waith">Be <em>first.</em></h2>
            <p className="lead-s">{p.pricingNote}</p>
            <dl className="caps-free">
              <dt className="caps">Status</dt><dd>{p.status}</dd>
              <dt className="caps">Platforms</dt><dd>{p.platforms}</dd>
              <dt className="caps">Questions</dt><dd><a href="/contact">Write to the studio</a></dd>
            </dl>
          </div>
          <WaitlistForm product={p.slug} prompt={p.waitlistPrompt} askCompany={p.slug === 'ai-marketing'} />
        </div>
      </div>
    </section>
  );
}
