'use client';
/* The brief form. Same markup and look as before; it now saves the brief through the API
   and gives the visitor a reference. If the API cannot be reached, it falls back to the old
   behaviour and opens the visitor's email app with everything filled in. */
import { useEffect, useRef, useState, type FormEvent } from 'react';

const SERVICES = [
  'Brand identity',
  'Guidelines',
  'Social media',
  'Grid design',
  'Real estate launch',
  'Campaign',
  'Print',
  'Motion',
  'Web & UI',
  'Software & apps',
  'AI & automation',
  'Ads & SEO',
];
const BY_DIVISION: Record<string, string[]> = {
  software: ['Software & apps', 'Web & UI'],
  ai: ['AI & automation'],
  brand: ['Brand identity', 'Guidelines'],
  growth: ['Social media', 'Ads & SEO'],
};
const EMAIL = 'talalatallah10@gmail.com';

function say(m: string) {
  window.__taSay?.(m);
}

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [division, setDivision] = useState<string | undefined>();
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [note, setNote] = useState('Your brief is saved securely and reaches the studio straight away.');

  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get('division') || undefined;
    if (!d || !BY_DIVISION[d] || !form.current) return;
    setDivision(d);
    for (const v of BY_DIVISION[d]) {
      const box = form.current.querySelector<HTMLInputElement>(`input[name=svc][value="${v}"]`);
      if (box) box.checked = true;
    }
  }, []);

  function mailtoFallback(f: HTMLFormElement, services: string[]) {
    const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '';
    const body = `Name: ${v('name')}\nEmail: ${v('email')}\nCompany: ${v('company')}\nBudget: ${v('budget')}\nServices: ${services.join(', ') || '—'}\n\n${v('msg')}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry — ' + v('name'))}&body=${encodeURIComponent(body)}`;
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim();
    const services = Array.from(f.querySelectorAll<HTMLInputElement>('input[name=svc]:checked')).map((x) => x.value);
    if (!v('name') || !v('msg')) {
      say('Add your name and a few words');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(v('email'))) {
      say('Add your email so the studio can reply');
      (f.elements.namedItem('email') as HTMLInputElement)?.focus();
      return;
    }
    setState('sending');
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v('name'),
          email: v('email'),
          company: v('company') || undefined,
          budget: v('budget') || undefined,
          services,
          division,
          message: v('msg'),
          source: window.location.pathname + window.location.search,
          website: v('website') || undefined,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setState('sent');
        setNote(`Thank you. Your reference is ${j.ref}. Expect a reply within one working day.`);
        say(`Brief sent · ${j.ref}`);
        f.reset();
        return;
      }
      if (r.status === 400 || r.status === 429) {
        setState('idle');
        const m = Array.isArray(j.message) ? j.message[0] : j.message || 'Please check the form';
        setNote(m);
        say(m);
        return;
      }
      throw new Error('API ' + r.status);
    } catch {
      setState('idle');
      say('Opening your email app…');
      mailtoFallback(f, services);
    }
  }

  return (
    <form className="form reveal" id="cform" noValidate ref={form} onSubmit={submit}>
      <div className="two">
        <div className="fld"><label className="caps" htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required maxLength={120} /></div>
        {' '}
        <div className="fld"><label className="caps" htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      </div>
      {' '}
      <div className="two">
        <div className="fld"><label className="caps" htmlFor="f-co">Company</label><input id="f-co" name="company" autoComplete="organization" maxLength={160} /></div>
        {' '}
        <div className="fld">
          <label className="caps" htmlFor="f-budget">Budget</label>
          <select id="f-budget" name="budget" defaultValue="Not sure yet">
            <option>Not sure yet</option>
            <option>Under AED 10K</option>
            <option>AED 10K — 30K</option>
            <option>AED 30K — 80K</option>
            <option>AED 80K +</option>
          </select>
        </div>
      </div>
      {' '}
      <div className="fld">
        <span className="caps" style={{ color: 'var(--mute)' }}>What do you need?</span>
        <div className="chips2">
          {SERVICES.map((s) => (
            <label key={s}><input type="checkbox" name="svc" value={s} /><span>{s}</span></label>
          ))}
        </div>
      </div>
      {' '}
      <div className="fld"><label className="caps" htmlFor="f-msg">Tell me about it</label><textarea id="f-msg" name="msg" required maxLength={5000} /></div>
      {/* spam trap: hidden from people, irresistible to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="f-website">Website</label><input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {' '}
      <button className="btn2 solid" type="submit" style={{ justifySelf: 'start' }} disabled={state === 'sending'} aria-busy={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : state === 'sent' ? 'Send another brief' : 'Send the brief'}{' '}<span className="ar">→</span>
      </button>
      {' '}
      <p className="note" role="status" aria-live="polite">{note}</p>
    </form>
  );
}
