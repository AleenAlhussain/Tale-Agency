/* Same-origin bridge to the API, so the browser only ever talks to this site.
   In production a reverse proxy (Caddy, see docker/Caddyfile) sends /api straight to the API and this
   handler is not used; in development it saves running a proxy. */
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const API = process.env.API_INTERNAL_URL || 'http://localhost:4000';
const REQUEST_HEADERS = ['content-type', 'cookie', 'authorization', 'x-requested-with', 'user-agent', 'accept', 'accept-language', 'x-forwarded-for', 'x-real-ip'];
const RESPONSE_HEADERS = ['content-type', 'cache-control', 'content-disposition', 'retry-after'];

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = `${API}/api/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;
  const headers = new Headers();
  for (const h of REQUEST_HEADERS) {
    const v = req.headers.get(h);
    if (v) headers.set(h, v);
  }
  const init: RequestInit = { method: req.method, headers, redirect: 'manual', cache: 'no-store' };
  if (!['GET', 'HEAD'].includes(req.method)) init.body = await req.arrayBuffer();
  let res: Response;
  try {
    res = await fetch(target, init);
  } catch {
    return Response.json({ statusCode: 502, message: 'The service is not reachable right now. Please try again in a moment.' }, { status: 502 });
  }
  const out = new Headers();
  for (const h of RESPONSE_HEADERS) {
    const v = res.headers.get(h);
    if (v) out.set(h, v);
  }
  for (const c of res.headers.getSetCookie()) out.append('set-cookie', c);
  return new Response(res.body, { status: res.status, headers: out });
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE };
