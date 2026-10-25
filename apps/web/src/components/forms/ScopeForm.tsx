'use client';
/* "Send it to the studio": saves the current estimate through the API. The estimator (site-runtime.js)
   announces every change with a `ta:scope` event; this form listens, and sends only the selection.
   The API recalculates every price, so the browser can never set its own total. */
import { useEffect, useState, type FormEvent } from 'react';

type Scope = { state: unknown; currency: 'AED' | 'USD'; lines: number };

export function ScopeForm() {
  const [scope, setScope] = useState<Scope | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ ref: string; total: number; deposit: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const on = (e: Event) => setScope((e as CustomEvent<Scope>).detail);
    document.addEventListener('ta:scope', on);
    const now = window.__taScope?.();
    if (now) setScope({ ...now, lines: 0 });
    return () => document.removeEventListener('ta:scope', on);
  }, []);

  const empty = !scope || !scope.lines;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim();
    const live = window.__taScope?.() ?? scope;
    if (!live) return;
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v('name'),
          email: v('email'),
          phone: v('phone') || undefined,
          company: v('company') || undefined,
          message: v('message') || undefined,
          selection: live.state,
          currency: live.currency,
          website: v('website') || undefined,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(Array.isArray(j.message) ? j.message[0] : j.message || 'Could not send. Try WhatsApp instead.');
        return;
      }
      setDone({ ref: j.ref, total: j.totals.total, deposit: j.totals.deposit });
      window.__taSay?.(`Scope saved · ${j.ref}`);
    } catch {
      setError('No connection. Send it on WhatsApp instead.');
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="scopeform done" role="status">
        <span className="caps">Saved · {done.ref}</span>
        <p>Your scope is with the studio. A written proposal follows within 48 hours. Estimated AED {done.total.toLocaleString('en-US')}, AED {done.deposit.toLocaleString('en-US')} to start.</p>
        <button className="linkbtn caps" type="button" onClick={() => { setDone(null); setOpen(false); }}>Send another</button>
      </div>
    );
  }

  return (
    <div className={'scopeform' + (open ? ' open' : '')}>
      {!open ? (
        <button className="btn2" type="button" onClick={() => setOpen(true)} disabled={empty} aria-disabled={empty}>
          Send it to the studio <span className="ar">→</span>
        </button>
      ) : (
        <form onSubmit={submit} noValidate>
          <span className="caps">Send it to the studio</span>
          <div className="two">
            <div className="fld"><label className="caps" htmlFor="q-name">Name</label><input id="q-name" name="name" autoComplete="name" required maxLength={120} /></div>
            <div className="fld"><label className="caps" htmlFor="q-email">Email</label><input id="q-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
          </div>
          <div className="two">
            <div className="fld"><label className="caps" htmlFor="q-phone">Phone</label><input id="q-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
            <div className="fld"><label className="caps" htmlFor="q-co">Company</label><input id="q-co" name="company" autoComplete="organization" maxLength={160} /></div>
          </div>
          <div className="fld"><label className="caps" htmlFor="q-msg">Anything to add?</label><textarea id="q-msg" name="message" maxLength={3000} /></div>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {error ? <p className="err" role="alert">{error}</p> : null}
          <div className="row2">
            <button className="btn2 solid" type="submit" disabled={busy || empty}>{busy ? 'Sending…' : 'Send my scope'} <span className="ar">→</span></button>
            <button className="linkbtn caps" type="button" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
