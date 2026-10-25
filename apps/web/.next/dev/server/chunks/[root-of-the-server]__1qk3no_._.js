module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/apps/web/src/app/api/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* Same-origin bridge to the API, so the browser only ever talks to this site.
   In production a reverse proxy (Caddy, see docker/Caddyfile) sends /api straight to the API and this
   handler is not used; in development it saves running a proxy. */ __turbopack_context__.s([
    "DELETE",
    ()=>proxy,
    "GET",
    ()=>proxy,
    "PATCH",
    ()=>proxy,
    "POST",
    ()=>proxy,
    "PUT",
    ()=>proxy,
    "dynamic",
    ()=>dynamic
]);
const dynamic = 'force-dynamic';
const API = process.env.API_INTERNAL_URL || 'http://localhost:4000';
const REQUEST_HEADERS = [
    'content-type',
    'cookie',
    'authorization',
    'x-requested-with',
    'user-agent',
    'accept',
    'accept-language',
    'x-forwarded-for',
    'x-real-ip'
];
const RESPONSE_HEADERS = [
    'content-type',
    'cache-control',
    'content-disposition',
    'retry-after'
];
async function proxy(req, ctx) {
    const { path } = await ctx.params;
    const target = `${API}/api/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;
    const headers = new Headers();
    for (const h of REQUEST_HEADERS){
        const v = req.headers.get(h);
        if (v) headers.set(h, v);
    }
    const init = {
        method: req.method,
        headers,
        redirect: 'manual',
        cache: 'no-store'
    };
    if (![
        'GET',
        'HEAD'
    ].includes(req.method)) init.body = await req.arrayBuffer();
    let res;
    try {
        res = await fetch(target, init);
    } catch  {
        return Response.json({
            statusCode: 502,
            message: 'The service is not reachable right now. Please try again in a moment.'
        }, {
            status: 502
        });
    }
    const out = new Headers();
    for (const h of RESPONSE_HEADERS){
        const v = res.headers.get(h);
        if (v) out.set(h, v);
    }
    for (const c of res.headers.getSetCookie())out.append('set-cookie', c);
    return new Response(res.body, {
        status: res.status,
        headers: out
    });
}
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1qk3no_._.js.map