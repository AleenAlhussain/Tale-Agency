'use client';
/* Studio admin: briefs, scopes, waitlists and portfolio visibility. Talks to /api/admin with the
   http-only session cookie; every change also sends X-Requested-With so other sites cannot forge it. */
import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { BRAND } from '@talal-at/shared/dist/brand';

type User = { id: string; email: string; name: string; role: string };
type Lead = { id: string; ref: string; name: string; email: string; phone: string | null; company: string | null; budget: string | null; services: string[]; division: string | null; message: string; source: string | null; status: string; notes: string; createdAt: string };
type Line = { id: string; name: string; amount: number; monthly: boolean; quote: boolean; from: boolean };
type Quote = { id: string; ref: string; name: string; email: string; phone: string | null; company: string | null; message: string; lines: Line[]; oneOffAed: number; monthlyAed: number; termMonths: number; totalAed: number; depositAed: number; hasQuoteItems: boolean; hasFromPrices: boolean; status: string; notes: string; createdAt: string };
type Wait = { id: string; product: string; email: string; name: string | null; company: string | null; country: string | null; useCase: string | null; createdAt: string };
type Case = { slug: string; title: string; category: string; sortOrder: number; published: boolean; featured: boolean };
type Project = { slug: string; title: string; subtitle: string; category: string; sortOrder: number; published: boolean };
type Stats = { leads: Record<string, number>; quotes: Record<string, { count: number; valueAed: number }>; waitlist: Record<string, number>; openPipelineAed: number; last7Days: { leads: number; quotes: number; waitlist: number } };

const LEAD_STATUS = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];
const QUOTE_STATUS = ['new', 'proposal_sent', 'accepted', 'declined', 'paid'];
const PRODUCTS: Record<string, string> = { 'ai-marketing': 'AI Marketing Studio', 'nuss-nuss': 'Nuss Nuss' };
const CATS: Record<string, string> = { re: 'Real Estate', br: 'Branding', ca: 'Campaigns', ar: 'Art & Type' };
const TABS = ['Overview', 'Briefs', 'Scopes', 'Waitlists', 'Portfolio', 'Account'] as const;
type Tab = (typeof TABS)[number];

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const method = init?.method ?? 'GET';
  const r = await fetch('/api' + path, {
    method,
    credentials: 'same-origin',
    headers: { Accept: 'application/json', ...(init?.body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(method !== 'GET' ? { 'X-Requested-With': 'talal-admin' } : {}) },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new ApiError(r.status, Array.isArray(j.message) ? j.message[0] : j.message || 'Something went wrong');
  return j as T;
}

const aed = (n: number) => 'AED ' + Math.round(n).toLocaleString('en-US');
const when = (s: string) => new Date(s).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' });
const label = (s: string) => s.replace(/_/g, ' ');

export function AdminApp() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>('Overview');
  const [toast, setToast] = useState('');

  useEffect(() => {
    api<{ user: User }>('/auth/me').then((r) => setUser(r.user)).catch(() => setUser(null));
    const h = window.location.hash.slice(1);
    const t = TABS.find((x) => x.toLowerCase() === h);
    if (t) setTab(t);
  }, []);

  const say = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(''), 2200);
  }, []);

  const onAuthError = useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) setUser(null);
      else say(e instanceof Error ? e.message : 'Something went wrong');
    },
    [say],
  );

  if (user === undefined) return <div className="adm-loading caps">Loading…</div>;
  if (user === null) return <Login onIn={setUser} />;

  return (
    <div className="adm">
      <header className="adm-bar">
        <a href="/" className="adm-brand" aria-label="Back to the website">
          <svg className="ico" viewBox={BRAND.icon.viewBox}><use href="#icon" /></svg>
          <svg className="wm" viewBox={BRAND.wordmark.viewBox}><use href="#word" /></svg>
        </a>
        <span className="caps adm-title">Studio admin</span>
        <span className="adm-who caps">{user.email}</span>
        <button
          className="linkbtn caps"
          type="button"
          onClick={() => api('/auth/logout', { method: 'POST' }).finally(() => setUser(null))}
        >
          Sign out
        </button>
      </header>
      <nav className="adm-tabs caps" aria-label="Admin sections">
        {TABS.map((t) => (
          <button key={t} type="button" aria-pressed={tab === t} onClick={() => { setTab(t); history.replaceState(null, '', '#' + t.toLowerCase()); }}>
            {t}
          </button>
        ))}
      </nav>
      <main className="adm-main">
        {tab === 'Overview' && <Overview onError={onAuthError} go={setTab} />}
        {tab === 'Briefs' && <Briefs onError={onAuthError} say={say} />}
        {tab === 'Scopes' && <Scopes onError={onAuthError} say={say} />}
        {tab === 'Waitlists' && <Waitlists onError={onAuthError} />}
        {tab === 'Portfolio' && <Portfolio onError={onAuthError} say={say} />}
        {tab === 'Account' && <Account onError={onAuthError} say={say} />}
      </main>
      <div className={'adm-toast' + (toast ? ' on' : '')} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

function Login({ onIn }: { onIn: (u: User) => void }) {
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setErr('');
    try {
      const r = await api<{ user: User }>('/auth/login', { method: 'POST', body: { email: f.get('email'), password: f.get('password') } });
      onIn(r.user);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : 'Could not sign in');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="adm-login">
      <form className="form" onSubmit={submit}>
        <svg className="ico" viewBox={BRAND.icon.viewBox} aria-hidden="true"><use href="#icon" /></svg>
        <h1 className="h-serif">Studio <em>admin</em></h1>
        <div className="fld"><label className="caps" htmlFor="a-email">Email</label><input id="a-email" name="email" type="email" autoComplete="username" required /></div>
        <div className="fld"><label className="caps" htmlFor="a-pass">Password</label><input id="a-pass" name="password" type="password" autoComplete="current-password" required /></div>
        {err ? <p className="note err" role="alert">{err}</p> : null}
        <button className="btn2 solid" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <span className="ar">→</span></button>
        <a className="linkbtn caps" href="/">Back to the website</a>
      </form>
    </div>
  );
}

function useList<T>(path: string, onError: (e: unknown) => void) {
  const [data, setData] = useState<{ items: T[]; total: number } | null>(null);
  const load = useCallback(() => {
    api<{ items: T[]; total: number }>(path).then(setData).catch(onError);
  }, [path, onError]);
  useEffect(load, [load]);
  return { data, setData, load };
}

function Overview({ onError, go }: { onError: (e: unknown) => void; go: (t: Tab) => void }) {
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    api<Stats>('/admin/stats').then(setS).catch(onError);
  }, [onError]);
  if (!s) return <p className="caps adm-muted">Loading…</p>;
  const cards: [string, ReactNode, string, Tab][] = [
    ['New briefs', s.leads.new ?? 0, `${s.last7Days.leads} in the last 7 days`, 'Briefs'],
    ['Open pipeline', aed(s.openPipelineAed), `${(s.quotes.new?.count ?? 0) + (s.quotes.proposal_sent?.count ?? 0)} open scopes`, 'Scopes'],
    ['AI Marketing Studio', s.waitlist['ai-marketing'] ?? 0, 'on the waitlist', 'Waitlists'],
    ['Nuss Nuss', s.waitlist['nuss-nuss'] ?? 0, 'on the waitlist', 'Waitlists'],
  ];
  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Good to <em>see you.</em></h2><p className="adm-muted">Everything that came in through the website.</p></div>
      <div className="adm-cards">
        {cards.map(([t, v, sub, to]) => (
          <button key={t} type="button" className="adm-card" onClick={() => go(to)}>
            <span className="caps">{t}</span>
            <b>{v}</b>
            <span className="adm-muted">{sub}</span>
          </button>
        ))}
      </div>
      <div className="adm-split">
        <div>
          <span className="caps">Briefs by status</span>
          <ul className="adm-bars">{LEAD_STATUS.map((k) => <li key={k}><span>{label(k)}</span><b>{s.leads[k] ?? 0}</b></li>)}</ul>
        </div>
        <div>
          <span className="caps">Scopes by status</span>
          <ul className="adm-bars">{QUOTE_STATUS.map((k) => <li key={k}><span>{label(k)}</span><b>{s.quotes[k]?.count ?? 0}</b><em>{aed(s.quotes[k]?.valueAed ?? 0)}</em></li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Filters({ statuses, status, setStatus, q, setQ, csv }: { statuses: string[]; status: string; setStatus: (s: string) => void; q: string; setQ: (s: string) => void; csv?: string }) {
  return (
    <div className="adm-filters">
      <div className="adm-chips caps" role="group" aria-label="Status">
        {['', ...statuses].map((s) => (
          <button key={s || 'all'} type="button" aria-pressed={status === s} onClick={() => setStatus(s)}>{s ? label(s) : 'All'}</button>
        ))}
      </div>
      <input className="adm-search" type="search" placeholder="Search name, email or company" value={q} onChange={(e) => setQ(e.target.value)} />
      {csv ? <a className="btn2" href={csv}>Export CSV</a> : null}
    </div>
  );
}

function useDebounced(v: string, ms = 300) {
  const [d, setD] = useState(v);
  useEffect(() => {
    const t = window.setTimeout(() => setD(v), ms);
    return () => window.clearTimeout(t);
  }, [v, ms]);
  return d;
}

function Notes({ value, onSave }: { value: string; onSave: (v: string) => Promise<void> }) {
  const [v, setV] = useState(value);
  const [busy, setBusy] = useState(false);
  return (
    <div className="adm-notes">
      <span className="caps">Notes</span>
      <textarea aria-label="Notes" value={v} onChange={(e) => setV(e.target.value)} placeholder="Calls, next steps, anything worth remembering" />
      <button className="btn2" type="button" disabled={busy || v === value} onClick={async () => { setBusy(true); await onSave(v).finally(() => setBusy(false)); }}>Save notes</button>
    </div>
  );
}

function Briefs({ onError, say }: { onError: (e: unknown) => void; say: (m: string) => void }) {
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const dq = useDebounced(q);
  const path = useMemo(() => `/admin/leads?limit=100${status ? '&status=' + status : ''}${dq ? '&q=' + encodeURIComponent(dq) : ''}`, [status, dq]);
  const { data, setData } = useList<Lead>(path, onError);
  const [open, setOpen] = useState<string | null>(null);

  async function patch(id: string, body: Partial<Lead>) {
    try {
      const u = await api<Lead>(`/admin/leads/${id}`, { method: 'PATCH', body });
      setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === id ? u : x)) } : d));
      say('Saved');
    } catch (e) {
      onError(e);
    }
  }

  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Project <em>briefs</em></h2><p className="adm-muted">{data ? `${data.total} in this view` : ' '}</p></div>
      <Filters statuses={LEAD_STATUS} status={status} setStatus={setStatus} q={q} setQ={setQ} csv="/api/admin/leads.csv" />
      <div className="adm-table" role="table">
        <div className="adm-tr adm-th caps" role="row"><span>Date</span><span>Ref</span><span>From</span><span>Needs</span><span>Budget</span><span>Status</span></div>
        {data?.items.map((l) => (
          <div key={l.id} className={'adm-row' + (open === l.id ? ' open' : '')}>
            <div className="adm-tr" role="row" onClick={() => setOpen(open === l.id ? null : l.id)}>
              <span>{when(l.createdAt)}</span>
              <span className="caps">{l.ref}</span>
              <span><b>{l.name}</b><small>{l.company || l.email}</small></span>
              <span className="adm-tags">{l.services.slice(0, 3).join(' · ') || '—'}</span>
              <span>{l.budget || '—'}</span>
              <span onClick={(e) => e.stopPropagation()}>
                <select value={l.status} onChange={(e) => patch(l.id, { status: e.target.value })} aria-label={`Status of ${l.ref}`}>
                  {LEAD_STATUS.map((s) => <option key={s} value={s}>{label(s)}</option>)}
                </select>
              </span>
            </div>
            {open === l.id ? (
              <div className="adm-detail">
                <div>
                  <p className="adm-msg">{l.message}</p>
                  <dl>
                    <dt className="caps">Email</dt><dd><a href={`mailto:${l.email}?subject=${encodeURIComponent('Your brief ' + l.ref + ' — TALAL·AT')}`}>{l.email}</a></dd>
                    {l.phone ? <><dt className="caps">Phone</dt><dd>{l.phone}</dd></> : null}
                    <dt className="caps">Services</dt><dd>{l.services.join(', ') || '—'}</dd>
                    <dt className="caps">Division</dt><dd>{l.division || '—'}</dd>
                    <dt className="caps">Page</dt><dd>{l.source || '—'}</dd>
                  </dl>
                </div>
                <Notes value={l.notes} onSave={(v) => patch(l.id, { notes: v })} />
              </div>
            ) : null}
          </div>
        ))}
        {data && !data.items.length ? <p className="adm-empty">Nothing here yet.</p> : null}
      </div>
    </section>
  );
}

function Scopes({ onError, say }: { onError: (e: unknown) => void; say: (m: string) => void }) {
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const dq = useDebounced(q);
  const path = useMemo(() => `/admin/quotes?limit=100${status ? '&status=' + status : ''}${dq ? '&q=' + encodeURIComponent(dq) : ''}`, [status, dq]);
  const { data, setData } = useList<Quote>(path, onError);
  const [open, setOpen] = useState<string | null>(null);

  async function patch(id: string, body: Partial<Quote>) {
    try {
      const u = await api<Quote>(`/admin/quotes/${id}`, { method: 'PATCH', body });
      setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === id ? u : x)) } : d));
      say('Saved');
    } catch (e) {
      onError(e);
    }
  }

  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Saved <em>scopes</em></h2><p className="adm-muted">Totals are recalculated by the server from the price list.</p></div>
      <Filters statuses={QUOTE_STATUS} status={status} setStatus={setStatus} q={q} setQ={setQ} />
      <div className="adm-table" role="table">
        <div className="adm-tr adm-th caps" role="row"><span>Date</span><span>Ref</span><span>From</span><span>Estimate</span><span>To start</span><span>Status</span></div>
        {data?.items.map((x) => (
          <div key={x.id} className={'adm-row' + (open === x.id ? ' open' : '')}>
            <div className="adm-tr" role="row" onClick={() => setOpen(open === x.id ? null : x.id)}>
              <span>{when(x.createdAt)}</span>
              <span className="caps">{x.ref}</span>
              <span><b>{x.name}</b><small>{x.company || x.email}</small></span>
              <span>{(x.hasFromPrices ? 'from ' : '') + aed(x.totalAed)}{x.hasQuoteItems ? ' + quote' : ''}</span>
              <span>{aed(x.depositAed)}</span>
              <span onClick={(e) => e.stopPropagation()}>
                <select value={x.status} onChange={(e) => patch(x.id, { status: e.target.value })} aria-label={`Status of ${x.ref}`}>
                  {QUOTE_STATUS.map((s) => <option key={s} value={s}>{label(s)}</option>)}
                </select>
              </span>
            </div>
            {open === x.id ? (
              <div className="adm-detail">
                <div>
                  <ul className="adm-lines">
                    {x.lines.map((l) => <li key={l.id + l.name}><span>{l.name}</span><b>{l.quote ? 'On request' : (l.from ? 'from ' : '') + aed(l.amount) + (l.monthly ? '/mo' : '')}</b></li>)}
                    <li className="sum"><span>One-off</span><b>{aed(x.oneOffAed)}</b></li>
                    {x.monthlyAed ? <li className="sum"><span>Monthly × {x.termMonths}</span><b>{aed(x.monthlyAed)}/mo</b></li> : null}
                  </ul>
                  {x.message ? <p className="adm-msg">{x.message}</p> : null}
                  <dl>
                    <dt className="caps">Email</dt><dd><a href={`mailto:${x.email}?subject=${encodeURIComponent('Your proposal ' + x.ref + ' — TALAL·AT')}`}>{x.email}</a></dd>
                    {x.phone ? <><dt className="caps">Phone</dt><dd><a href={`https://wa.me/${x.phone.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener">{x.phone} ↗</a></dd></> : null}
                  </dl>
                </div>
                <Notes value={x.notes} onSave={(v) => patch(x.id, { notes: v })} />
              </div>
            ) : null}
          </div>
        ))}
        {data && !data.items.length ? <p className="adm-empty">Nothing here yet.</p> : null}
      </div>
    </section>
  );
}

function Waitlists({ onError }: { onError: (e: unknown) => void }) {
  const [product, setProduct] = useState('');
  const [q, setQ] = useState('');
  const dq = useDebounced(q);
  const path = useMemo(() => `/admin/waitlist?limit=200${product ? '&product=' + product : ''}${dq ? '&q=' + encodeURIComponent(dq) : ''}`, [product, dq]);
  const { data } = useList<Wait>(path, onError);
  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Product <em>waitlists</em></h2><p className="adm-muted">{data ? `${data.total} people` : ' '}</p></div>
      <div className="adm-filters">
        <div className="adm-chips caps" role="group" aria-label="Product">
          {['', ...Object.keys(PRODUCTS)].map((p) => <button key={p || 'all'} type="button" aria-pressed={product === p} onClick={() => setProduct(p)}>{p ? PRODUCTS[p] : 'All'}</button>)}
        </div>
        <input className="adm-search" type="search" placeholder="Search email or name" value={q} onChange={(e) => setQ(e.target.value)} />
        <a className="btn2" href={`/api/admin/waitlist.csv${product ? '?product=' + product : ''}`}>Export CSV</a>
      </div>
      <div className="adm-table" role="table">
        <div className="adm-tr adm-th caps w5" role="row"><span>Date</span><span>Product</span><span>Email</span><span>Name · company</span><span>Use</span></div>
        {data?.items.map((w) => (
          <div key={w.id} className="adm-tr w5" role="row">
            <span>{when(w.createdAt)}</span>
            <span className="caps">{PRODUCTS[w.product] ?? w.product}</span>
            <span><a href={`mailto:${w.email}`}>{w.email}</a></span>
            <span>{[w.name, w.company, w.country].filter(Boolean).join(' · ') || '—'}</span>
            <span className="adm-tags">{w.useCase || '—'}</span>
          </div>
        ))}
        {data && !data.items.length ? <p className="adm-empty">Nobody yet. Share the product pages.</p> : null}
      </div>
    </section>
  );
}

function Portfolio({ onError, say }: { onError: (e: unknown) => void; say: (m: string) => void }) {
  const [cases, setCases] = useState<Case[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    api<Case[]>('/admin/content/case-studies').then(setCases).catch(onError);
    api<Project[]>('/admin/content/projects').then(setProjects).catch(onError);
  }, [onError]);

  async function patchCase(slug: string, body: Partial<Case>) {
    try {
      const u = await api<Case>(`/admin/content/case-studies/${slug}`, { method: 'PATCH', body });
      setCases((c) => c && c.map((x) => (x.slug === slug ? u : x)));
      say('Saved. The site updates within a minute.');
    } catch (e) {
      onError(e);
    }
  }
  async function patchProject(slug: string, body: Partial<Project>) {
    try {
      const u = await api<Project>(`/admin/content/projects/${slug}`, { method: 'PATCH', body });
      setProjects((c) => c && c.map((x) => (x.slug === slug ? u : x)));
      say('Saved. The site updates within a minute.');
    } catch (e) {
      onError(e);
    }
  }

  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Portfolio <em>on the site</em></h2><p className="adm-muted">Show, hide and order the work. Images stay in the project files.</p></div>
      <span className="caps adm-sub">Case studies</span>
      <div className="adm-table" role="table">
        <div className="adm-tr adm-th caps w5" role="row"><span>Order</span><span>Case study</span><span>Category</span><span>On the site</span><span>On the home page</span></div>
        {cases?.map((c) => (
          <div key={c.slug} className="adm-tr w5" role="row">
            <span><input className="adm-num" type="number" min={0} max={10000} defaultValue={c.sortOrder} onBlur={(e) => Number(e.target.value) !== c.sortOrder && patchCase(c.slug, { sortOrder: Number(e.target.value) })} aria-label={`Order of ${c.title}`} /></span>
            <span><b>{c.title}</b></span>
            <span>{c.category}</span>
            <span><Toggle on={c.published} onChange={(v) => patchCase(c.slug, { published: v })} label={`Show ${c.title}`} /></span>
            <span><Toggle on={c.featured} onChange={(v) => patchCase(c.slug, { featured: v })} label={`Feature ${c.title}`} /></span>
          </div>
        ))}
      </div>
      <span className="caps adm-sub">Archive · Behance projects</span>
      <div className="adm-table" role="table">
        <div className="adm-tr adm-th caps w5" role="row"><span>Order</span><span>Project</span><span>Category</span><span>On the site</span><span> </span></div>
        {projects?.map((p) => (
          <div key={p.slug} className="adm-tr w5" role="row">
            <span><input className="adm-num" type="number" min={0} max={10000} defaultValue={p.sortOrder} onBlur={(e) => Number(e.target.value) !== p.sortOrder && patchProject(p.slug, { sortOrder: Number(e.target.value) })} aria-label={`Order of ${p.title}`} /></span>
            <span><b>{p.title}</b><small>{p.subtitle}</small></span>
            <span>{CATS[p.category] ?? p.category}</span>
            <span><Toggle on={p.published} onChange={(v) => patchProject(p.slug, { published: v })} label={`Show ${p.title}`} /></span>
            <span />
          </div>
        ))}
      </div>
    </section>
  );
}

function Toggle({ on, onChange, label: l }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" className={'adm-toggle' + (on ? ' on' : '')} aria-pressed={on} aria-label={l} onClick={() => onChange(!on)}>
      <i />
      <span className="caps">{on ? 'Shown' : 'Hidden'}</span>
    </button>
  );
}

function Account({ onError, say }: { onError: (e: unknown) => void; say: (m: string) => void }) {
  const [err, setErr] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get('next') !== f.get('again')) {
      setErr('The new passwords do not match');
      return;
    }
    setErr('');
    try {
      await api('/admin/account/password', { method: 'POST', body: { current: f.get('current'), next: f.get('next') } });
      form.reset();
      say('Password changed');
    } catch (e2) {
      if (e2 instanceof ApiError && e2.status !== 401) setErr(e2.message);
      else onError(e2);
    }
  }
  return (
    <section>
      <div className="adm-head"><h2 className="h-serif">Your <em>account</em></h2><p className="adm-muted">Use a long password you do not use anywhere else.</p></div>
      <form className="form adm-narrow" onSubmit={submit}>
        <div className="fld"><label className="caps" htmlFor="p-cur">Current password</label><input id="p-cur" name="current" type="password" autoComplete="current-password" required /></div>
        <div className="fld"><label className="caps" htmlFor="p-new">New password</label><input id="p-new" name="next" type="password" autoComplete="new-password" minLength={12} required /></div>
        <div className="fld"><label className="caps" htmlFor="p-again">New password again</label><input id="p-again" name="again" type="password" autoComplete="new-password" minLength={12} required /></div>
        {err ? <p className="note err" role="alert">{err}</p> : null}
        <button className="btn2 solid" type="submit">Change password <span className="ar">→</span></button>
      </form>
    </section>
  );
}
