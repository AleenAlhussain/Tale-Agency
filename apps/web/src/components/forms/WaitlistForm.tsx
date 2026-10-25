'use client';
/* Product waitlist. Saved through the API; joining twice is harmless. */
import { useState, type FormEvent } from 'react';

export function WaitlistForm({ product, prompt, askCompany }: { product: 'ai-marketing' | 'nuss-nuss'; prompt: string; askCompany?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim();
    if (!/^\S+@\S+\.\S+$/.test(v('email'))) {
      setMsg({ ok: false, text: 'Add a valid email' });
      return;
    }
    setBusy(true);
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          email: v('email'),
          name: v('name') || undefined,
          company: v('company') || undefined,
          country: v('country') || undefined,
          useCase: v('useCase') || undefined,
          website: v('website') || undefined,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMsg({ ok: false, text: Array.isArray(j.message) ? j.message[0] : j.message || 'Could not join right now' });
        return;
      }
      setMsg({ ok: true, text: j.message });
      window.__taSay?.(j.already ? 'Already on the list' : 'You are on the list');
      f.reset();
    } catch {
      setMsg({ ok: false, text: 'No connection. Try again in a moment.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form reveal waitform" onSubmit={submit} noValidate>
      <p className="lead-s">{prompt}</p>
      <div className="two">
        <div className="fld"><label className="caps" htmlFor={`w-${product}-email`}>Email</label><input id={`w-${product}-email`} name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div className="fld"><label className="caps" htmlFor={`w-${product}-name`}>Name</label><input id={`w-${product}-name`} name="name" autoComplete="name" maxLength={120} /></div>
      </div>
      <div className="two">
        {askCompany ? (
          <div className="fld"><label className="caps" htmlFor={`w-${product}-co`}>Company</label><input id={`w-${product}-co`} name="company" autoComplete="organization" maxLength={160} /></div>
        ) : null}
        <div className="fld"><label className="caps" htmlFor={`w-${product}-country`}>Country</label><input id={`w-${product}-country`} name="country" autoComplete="country-name" maxLength={60} /></div>
      </div>
      <div className="fld"><label className="caps" htmlFor={`w-${product}-use`}>What would you use it for?</label><textarea id={`w-${product}-use`} name="useCase" maxLength={500} /></div>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn2 solid" type="submit" style={{ justifySelf: 'start' }} disabled={busy}>{busy ? 'Joining…' : 'Join the waitlist'} <span className="ar">→</span></button>
      <p className={'note' + (msg && !msg.ok ? ' err' : '')} role="status" aria-live="polite">{msg ? msg.text : 'One email when early access opens. No newsletters.'}</p>
    </form>
  );
}
