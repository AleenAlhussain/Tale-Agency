module.exports = [
"[project]/apps/web/src/components/chrome/SiteRuntime.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteRuntime",
    ()=>SiteRuntime
]);
/* Starts the interaction layer once React has hydrated the page: smooth scroll (Lenis), scroll motion (GSAP),
   the cursor, galleries, games and the estimator. Same libraries and versions as the approved static site. */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$site$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/site-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SiteRuntime() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
        window.gsap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"];
        window.ScrollTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"];
        window.Lenis = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
        let data = {};
        try {
            data = JSON.parse(document.getElementById('ta-data')?.textContent || '{}');
        } catch  {
        /* keep the page working without data */ }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$site$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initSite"])(data);
    }, []);
    return null;
}
}),
"[project]/apps/web/src/components/forms/WaitlistForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WaitlistForm",
    ()=>WaitlistForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/* Product waitlist. Saved through the API; joining twice is harmless. */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function WaitlistForm({ product, prompt, askCompany }) {
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function submit(e) {
        e.preventDefault();
        const f = e.currentTarget;
        const v = (n)=>(f.elements.namedItem(n)?.value ?? '').trim();
        if (!/^\S+@\S+\.\S+$/.test(v('email'))) {
            setMsg({
                ok: false,
                text: 'Add a valid email'
            });
            return;
        }
        setBusy(true);
        try {
            const r = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product,
                    email: v('email'),
                    name: v('name') || undefined,
                    company: v('company') || undefined,
                    country: v('country') || undefined,
                    useCase: v('useCase') || undefined,
                    website: v('website') || undefined
                })
            });
            const j = await r.json().catch(()=>({}));
            if (!r.ok) {
                setMsg({
                    ok: false,
                    text: Array.isArray(j.message) ? j.message[0] : j.message || 'Could not join right now'
                });
                return;
            }
            setMsg({
                ok: true,
                text: j.message
            });
            window.__taSay?.(j.already ? 'Already on the list' : 'You are on the list');
            f.reset();
        } catch  {
            setMsg({
                ok: false,
                text: 'No connection. Try again in a moment.'
            });
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "form reveal waitform",
        onSubmit: submit,
        noValidate: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "lead-s",
                children: prompt
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "two",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fld",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "caps",
                                htmlFor: `w-${product}-email`,
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 51,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: `w-${product}-email`,
                                name: "email",
                                type: "email",
                                autoComplete: "email",
                                required: true,
                                maxLength: 254
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 51,
                                columnNumber: 98
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fld",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "caps",
                                htmlFor: `w-${product}-name`,
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 52,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: `w-${product}-name`,
                                name: "name",
                                autoComplete: "name",
                                maxLength: 120
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 52,
                                columnNumber: 96
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "two",
                children: [
                    askCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fld",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "caps",
                                htmlFor: `w-${product}-co`,
                                children: "Company"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 56,
                                columnNumber: 32
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: `w-${product}-co`,
                                name: "company",
                                autoComplete: "organization",
                                maxLength: 160
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 56,
                                columnNumber: 99
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fld",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "caps",
                                htmlFor: `w-${product}-country`,
                                children: "Country"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 58,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: `w-${product}-country`,
                                name: "country",
                                autoComplete: "country-name",
                                maxLength: 60
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                                lineNumber: 58,
                                columnNumber: 102
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fld",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "caps",
                        htmlFor: `w-${product}-use`,
                        children: "What would you use it for?"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 60,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: `w-${product}-use`,
                        name: "useCase",
                        maxLength: 500
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 60,
                        columnNumber: 115
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                style: {
                    position: 'absolute',
                    left: '-9999px',
                    width: 1,
                    height: 1,
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    name: "website",
                    tabIndex: -1,
                    autoComplete: "off"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "btn2 solid",
                type: "submit",
                style: {
                    justifySelf: 'start'
                },
                disabled: busy,
                children: [
                    busy ? 'Joining…' : 'Join the waitlist',
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ar",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                        lineNumber: 64,
                        columnNumber: 143
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: 'note' + (msg && !msg.ok ? ' err' : ''),
                role: "status",
                "aria-live": "polite",
                children: msg ? msg.text : 'One email when early access opens. No newsletters.'
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/forms/WaitlistForm.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/lib/site-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initSite",
    ()=>initSite
]);
/* TALAL·AT — the site's interaction layer (cursor, galleries, games, scroll motion, estimator).
   Ported from the static site as-is. It runs once per page load, after React has hydrated the markup,
   and every block checks that its section exists on the page.
   DATA comes from the API through the page (see components/chrome/SiteRuntime.tsx). */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/dist/brand.js [app-ssr] (ecmascript)");
;
function initSite(DATA) {
    "use strict";
    if (window.__taSite) return;
    window.__taSite = true;
    DATA = DATA || {};
    var CDN = 'https://mir-s3-cdn-cf.behance.net/';
    var CATS = {
        re: 'Real Estate',
        br: 'Branding',
        ca: 'Campaigns',
        ar: 'Art & Type'
    };
    var LETTERS = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND"].wordmark.letters;
    var SUN = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND"].icon.sun, ROOF = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND"].icon.roof, DOOR = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND"].icon.door;
    /* archive projects, as the tuples the rest of this file expects: [slug,title,subtitle,behancePath,cover,category,views,innerImage,client] */ var P = (DATA.projects || []).map(function(p) {
        return [
            p.slug,
            p.title,
            p.subtitle,
            p.behancePath,
            p.cover,
            p.category,
            p.views,
            p.innerImage,
            p.client
        ];
    });
    var BY = {};
    P.forEach(function(p) {
        BY[p[0]] = p;
    });
    function cover(p, s) {
        return CDN + 'projects/' + (s || '808') + '/' + p[4];
    }
    var NOINNER = {
        sakura: 1,
        sky1: 1
    };
    function inner(p) {
        return p[7] && !NOINNER[p[0]] ? CDN + 'project_modules/' + p[7] : cover(p);
    }
    function link(p) {
        return 'https://www.behance.net/gallery/' + p[3];
    }
    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
    function im(src, cls, alt, fb) {
        return '<img class="' + (cls || '') + '" src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async" referrerpolicy="no-referrer"' + (fb ? ' data-fb="' + fb + '"' : '') + '>';
    }
    function $(id) {
        return document.getElementById(id);
    }
    function pad(n) {
        return String(n).padStart(2, '0');
    }
    /* ---------- local work: case studies (files in assets/img/work and assets/video) ---------- */ var W = '/assets/img/work/', V = '/assets/video/';
    function wi(p, c) {
        return {
            src: W + p + '.webp',
            th: W + p + '-t.webp',
            cap: c
        };
    }
    function wv(n, c) {
        return {
            vid: V + n + '.mp4',
            poster: V + n + '.jpg',
            th: V + n + '.jpg',
            cap: c
        };
    }
    var CASES = {}, CASE_ORDER = [];
    (DATA.caseStudies || []).forEach(function(c) {
        CASES[c.slug] = {
            t: c.title,
            s: c.summary,
            cat: c.category,
            cover: c.cover,
            pos: c.coverPosition || '50% 50%',
            peek: c.peek || undefined,
            peekVid: c.peekVideo || undefined,
            items: c.items || []
        };
        CASE_ORDER.push(c.slug);
    });
    var LOGOS = [
        [
            'grind',
            'Grind'
        ],
        [
            'ravel',
            'Ravel'
        ],
        [
            'miwal',
            'MIWAL'
        ],
        [
            'reactive',
            'reactive'
        ],
        [
            'snck',
            'SNCK'
        ],
        [
            'symbol-01',
            'Symbol'
        ],
        [
            'anstek',
            'anstek'
        ],
        [
            'whirl',
            'whirl'
        ],
        [
            'symbol-02',
            'Symbol'
        ],
        [
            'kiquzolab',
            'kiquzolab · brand board'
        ],
        [
            'symbol-03',
            'Symbol'
        ]
    ];
    var MOODS = [
        [
            'cadence',
            'Cadence',
            'Running club'
        ],
        [
            'nest',
            'Nest',
            'Neighbourhood wine bar'
        ],
        [
            'book-bridle',
            'Book & Bridle',
            'Independent bookshop'
        ],
        [
            'the-court',
            'The Court',
            'Padel & tennis club'
        ],
        [
            'mediterraneo',
            'Il Mediterraneo',
            'Local Mediterranean restaurant'
        ],
        [
            'coastal',
            'Coastal',
            'Hospitality'
        ],
        [
            'wholeness',
            'House of Wholeness',
            'Wellness'
        ]
    ];
    var RENDERS = [
        [
            'matcha-statue',
            'Statue & matcha',
            '3D · art direction'
        ],
        [
            'perfume',
            'Perfume on the map',
            '3D · product'
        ],
        [
            'gold-statue',
            'Gold statue',
            '3D · art direction'
        ],
        [
            'milano',
            'Milano Fashion',
            '3D · product'
        ],
        [
            'time',
            'What\'s protected persists',
            'Art direction'
        ],
        [
            'provenance',
            'Chain of custody',
            'Art direction'
        ],
        [
            'camera',
            'Camera',
            '3D · product'
        ],
        [
            'phone',
            'Phone',
            '3D · product'
        ],
        [
            'mouse',
            'Mouse',
            '3D · product'
        ],
        [
            'laptop',
            'Laptop',
            '3D · product'
        ]
    ];
    function caseCount(c) {
        var v = c.items.filter(function(i) {
            return i.vid;
        }).length, n = c.items.length - v;
        return n + (n === 1 ? ' frame' : ' frames') + (v ? ' · ' + v + (v === 1 ? ' film' : ' films') : '');
    }
    /* ---------- gallery viewer (images and videos) ---------- */ var gv = null, gList = [], gI = 0, gTitle = '';
    function gBuild() {
        if (gv) return;
        gv = document.createElement('div');
        gv.className = 'gv';
        gv.setAttribute('role', 'dialog');
        gv.setAttribute('aria-modal', 'true');
        gv.setAttribute('aria-hidden', 'true');
        gv.setAttribute('aria-label', 'Gallery');
        gv.innerHTML = '<div class="gv-top"><span class="gv-t"></span><span class="gv-n caps"></span><button class="gv-x" type="button" aria-label="Close">×</button></div><div class="gv-stage"></div><button class="gv-p" type="button" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="gv-nx" type="button" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><div class="gv-cap caps"></div><div class="gv-th"></div>';
        document.body.appendChild(gv);
        gv.querySelector('.gv-x').addEventListener('click', closeGallery);
        gv.querySelector('.gv-p').addEventListener('click', function() {
            gGo(-1);
        });
        gv.querySelector('.gv-nx').addEventListener('click', function() {
            gGo(1);
        });
        gv.querySelector('.gv-stage').addEventListener('click', function(e) {
            if (e.target === this) closeGallery();
        });
        gv.querySelector('.gv-th').addEventListener('click', function(e) {
            var b = e.target.closest('[data-g]');
            if (b) {
                gI = +b.dataset.g;
                gShow();
            }
        });
        var tx = null;
        gv.addEventListener('touchstart', function(e) {
            tx = e.touches[0].clientX;
        }, {
            passive: true
        });
        gv.addEventListener('touchend', function(e) {
            if (tx === null) return;
            var d = e.changedTouches[0].clientX - tx;
            if (Math.abs(d) > 50) gGo(d < 0 ? 1 : -1);
            tx = null;
        });
    }
    function gGo(d) {
        if (!gList.length) return;
        gI = (gI + d + gList.length) % gList.length;
        gShow();
    }
    function gShow() {
        var it = gList[gI], st = gv.querySelector('.gv-stage');
        [].forEach.call(st.querySelectorAll('video'), function(v) {
            v.pause();
        });
        st.innerHTML = it.vid ? '<video src="' + it.vid + '" poster="' + (it.poster || '') + '" autoplay muted loop playsinline controls></video>' : '<img src="' + it.src + '" alt="' + esc(gTitle + ' — ' + (it.cap || '')) + '">';
        var m = st.firstChild;
        if (m.tagName === 'VIDEO') {
            var pr = m.play();
            if (pr && pr.catch) pr.catch(function() {});
        }
        gv.querySelector('.gv-t').textContent = gTitle;
        gv.querySelector('.gv-n').textContent = pad(gI + 1) + ' / ' + pad(gList.length);
        gv.querySelector('.gv-cap').textContent = it.cap || '';
        var many = gList.length > 1;
        gv.querySelector('.gv-p').hidden = !many;
        gv.querySelector('.gv-nx').hidden = !many;
        gv.querySelector('.gv-th').hidden = !many;
        [].forEach.call(gv.querySelectorAll('.gv-th button'), function(b, j) {
            b.classList.toggle('on', j === gI);
            if (j === gI && b.scrollIntoView) b.scrollIntoView({
                block: 'nearest',
                inline: 'center'
            });
        });
        [
            gList[(gI + 1) % gList.length],
            gList[(gI - 1 + gList.length) % gList.length]
        ].forEach(function(n) {
            if (n && n.src) {
                var p = new Image();
                p.src = n.src;
            }
        });
    }
    function openGallery(list, i, title) {
        gBuild();
        gList = list;
        gI = i || 0;
        gTitle = title || '';
        gv.querySelector('.gv-th').innerHTML = list.map(function(it, j) {
            return '<button type="button" data-g="' + j + '" aria-label="' + esc(it.cap || 'Item ' + (j + 1)) + '"><img src="' + (it.th || it.src) + '" alt="" loading="lazy">' + (it.vid ? '<i></i>' : '') + '</button>';
        }).join('');
        gShow();
        gv.classList.add('on');
        gv.setAttribute('aria-hidden', 'false');
        root.classList.add('gv-open');
        if (window.__lenis) window.__lenis.stop();
        var x = gv.querySelector('.gv-x');
        if (x) x.focus({
            preventScroll: true
        });
    }
    function closeGallery() {
        if (!gv || !gv.classList.contains('on')) return;
        [].forEach.call(gv.querySelectorAll('video'), function(v) {
            v.pause();
        });
        gv.querySelector('.gv-stage').innerHTML = '';
        gv.classList.remove('on');
        gv.setAttribute('aria-hidden', 'true');
        root.classList.remove('gv-open');
        if (window.__lenis) window.__lenis.start();
    }
    function openCase(k, i) {
        var c = CASES[k];
        if (c) openGallery(c.items, i || 0, c.t);
    }
    addEventListener('keydown', function(e) {
        if (!gv || !gv.classList.contains('on')) return;
        if (e.key === 'ArrowRight') gGo(1);
        else if (e.key === 'ArrowLeft') gGo(-1);
    });
    document.addEventListener('click', function(e) {
        var c = e.target.closest('[data-case]');
        if (!c) return;
        e.preventDefault();
        openCase(c.getAttribute('data-case'), 0);
    });
    document.addEventListener('error', function(e) {
        var t = e.target;
        if (!t || t.tagName !== 'IMG') return;
        var f = t.getAttribute('data-fb');
        if (f) {
            t.removeAttribute('data-fb');
            t.src = f;
            return;
        }
        var lg = t.closest('.lg');
        if (lg) {
            lg.classList.add('fallback');
            return;
        }
        t.style.visibility = 'hidden';
        var fr = t.closest('.frame,.ph,.pf,.arc-it');
        if (fr) fr.classList.add('noimg');
    }, true);
    var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var root = document.documentElement;
    function css(v) {
        return getComputedStyle(root).getPropertyValue(v).trim();
    }
    var redrawers = [];
    function redrawAll() {
        redrawers.forEach(function(f) {
            f();
        });
    }
    function watch(el, fn) {
        var v = {
            on: false
        };
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function(es) {
                v.on = es[0].isIntersecting;
                if (v.on && fn) fn();
            }, {
                rootMargin: '100px'
            }).observe(el);
        } else v.on = true;
        return v;
    }
    function local(e, el) {
        var r = el.getBoundingClientRect();
        return [
            e.clientX - r.left,
            e.clientY - r.top,
            r
        ];
    }
    /* ---------- theme ---------- */ var tBtn = $('themeBtn'), tLbl = $('themeLbl');
    function syncTheme() {
        var d = root.getAttribute('data-theme') === 'dark';
        if (tLbl) tLbl.textContent = d ? 'Light' : 'Dark';
        if (tBtn) tBtn.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode');
        var m = document.querySelector('meta[name=theme-color]');
        if (m) m.setAttribute('content', d ? '#0C0D0C' : '#F4F3EF');
    }
    syncTheme();
    if (tBtn) tBtn.addEventListener('click', function() {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        function apply() {
            root.setAttribute('data-theme', next);
            syncTheme();
            try {
                localStorage.setItem('ta-theme', next);
            } catch (err) {}
            redrawAll();
        }
        if (!document.startViewTransition || reduce) {
            apply();
            return;
        }
        var r = tBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        var vt = document.startViewTransition(apply);
        vt.ready.then(function() {
            root.animate({
                clipPath: [
                    'circle(0px at ' + x + 'px ' + y + 'px)',
                    'circle(' + R + 'px at ' + x + 'px ' + y + 'px)'
                ]
            }, {
                duration: 900,
                easing: 'cubic-bezier(.19,1,.22,1)',
                pseudoElement: '::view-transition-new(root)'
            });
        });
    });
    /* ---------- toast, clock, year, copy ---------- */ var toast = $('toast'), tt;
    window.__taSay = function(m) {
        say(m);
    };
    function say(m) {
        if (!toast) return;
        toast.textContent = m;
        toast.classList.add('on');
        clearTimeout(tt);
        tt = setTimeout(function() {
            toast.classList.remove('on');
        }, 2200);
    }
    function tick() {
        var c = $('clock');
        if (!c) return;
        try {
            c.textContent = new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Dubai'
            }).format(new Date());
        } catch (e) {}
    }
    tick();
    setInterval(tick, 15000);
    [].forEach.call(document.querySelectorAll('.yr'), function(y) {
        y.textContent = new Date().getFullYear();
    });
    [].forEach.call(document.querySelectorAll('[data-copy]'), function(b) {
        b.addEventListener('click', function() {
            var a = b.getAttribute('data-copy');
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(a).then(function() {
                say('Email copied');
            }, function() {
                say(a);
            });
            else say(a);
        });
    });
    /* ---------- mobile menu ---------- */ var menu = $('menu'), menuBtn = $('menuBtn');
    function setMenu(o) {
        if (!menu) return;
        menu.classList.toggle('open', o);
        menu.setAttribute('aria-hidden', o ? 'false' : 'true');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
        document.body.style.overflow = o ? 'hidden' : '';
    }
    if (menuBtn) menuBtn.addEventListener('click', function() {
        setMenu(true);
    });
    if ($('menuClose')) $('menuClose').addEventListener('click', function() {
        setMenu(false);
    });
    addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            setMenu(false);
            closeGallery();
        }
    });
    /* ---------- page curtain between pages ---------- */ var curtain = $('curtain');
    document.addEventListener('click', function(e) {
        var a = e.target.closest('a[href]');
        if (!a || !curtain || reduce) return;
        var h = a.getAttribute('href');
        if (!/^\/(?!\/|api\/|admin)[\w\-\/]*(#.*)?$/.test(h) || h.indexOf('#') > -1 && h.split('#')[0] === location.pathname || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        setMenu(false);
        curtain.classList.remove('enter');
        curtain.classList.add('leave');
        setTimeout(function() {
            location.href = h;
        }, 650);
    });
    addEventListener('pageshow', function(e) {
        if (e.persisted && curtain) {
            curtain.classList.remove('leave');
        }
    });
    /* ---------- cursor ---------- */ var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, fx = mx, fy = my;
    var cur = $('cursor'), curL = $('cursorL');
    addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        if (cur) cur.classList.add('on');
    }, {
        passive: true
    });
    document.addEventListener('mouseover', function(e) {
        if (!cur) return;
        var t = e.target.closest('[data-cursor]');
        if (t) {
            curL.textContent = t.getAttribute('data-cursor');
            cur.classList.add('big');
        }
        cur.classList.toggle('hide', !!e.target.closest('#match .area,#sign .area,iframe,.form'));
    });
    document.addEventListener('mouseout', function(e) {
        if (!cur) return;
        var t = e.target.closest('[data-cursor]');
        if (t && !t.contains(e.relatedTarget)) cur.classList.remove('big');
    });
    /* ---------- featured grid (landing) ---------- */ var LINES = [
        function() {
            return '<circle cx="202" cy="158" r="120" pathLength="1"/><circle cx="202" cy="158" r="74" pathLength="1"/><line x1="0" y1="158" x2="404" y2="158" pathLength="1"/><line x1="202" y1="0" x2="202" y2="316" pathLength="1"/><line x1="0" y1="0" x2="404" y2="316" pathLength="1"/><line x1="404" y1="0" x2="0" y2="316" pathLength="1"/><rect class="sq" x="199" y="155" width="6" height="6"/><rect class="sq" x="319" y="155" width="6" height="6"/><text class="t" x="14" y="300">01 / STRUCTURE</text>';
        },
        function() {
            return '<rect x="40" y="30" width="195" height="195" pathLength="1"/><path d="M235 30 A195 195 0 0 1 40 225" pathLength="1"/><rect x="235" y="30" width="120" height="120" pathLength="1"/><path d="M355 150 A120 120 0 0 0 235 30" pathLength="1"/><line x1="0" y1="225" x2="404" y2="225" pathLength="1"/><rect class="sq" x="232" y="27" width="6" height="6"/><rect class="sq" x="37" y="222" width="6" height="6"/><text class="t" x="14" y="300">02 / RATIO</text>';
        },
        function() {
            var s = '';
            for(var i = 1; i < 6; i++){
                s += '<line x1="' + i * 67.3 + '" y1="0" x2="' + i * 67.3 + '" y2="316" pathLength="1"/>';
            }
            for(var j = 1; j < 4; j++){
                s += '<line x1="0" y1="' + j * 79 + '" x2="404" y2="' + j * 79 + '" pathLength="1"/>';
            }
            return s + '<circle cx="269" cy="158" r="58" pathLength="1"/><rect class="sq" x="266" y="155" width="6" height="6"/><text class="t" x="14" y="300">03 / GRID</text>';
        },
        function() {
            return '<path d="M20 290 C 120 40, 280 300, 384 30" pathLength="1"/><line x1="20" y1="290" x2="120" y2="40" pathLength="1"/><line x1="384" y1="30" x2="280" y2="300" pathLength="1"/><circle cx="202" cy="158" r="96" pathLength="1"/><rect class="sq" x="17" y="287" width="6" height="6"/><rect class="sq" x="381" y="27" width="6" height="6"/><text class="t" x="290" y="300">04 / CONTOUR</text>';
        }
    ];
    var gridEl = $('grid');
    if (gridEl) {
        var FEAT = [
            [
                'sky3',
                '1 / span 7',
                0
            ],
            [
                'sakura',
                '8 / span 5',
                36
            ],
            [
                'omoria',
                '1 / span 4',
                0
            ],
            [
                'nobu',
                '5 / span 8',
                0
            ],
            [
                'casa',
                '1 / span 6',
                0
            ],
            [
                'celeste',
                '7 / span 6',
                36
            ],
            [
                'zorah',
                '1 / span 8',
                0
            ],
            [
                'sky1',
                '9 / span 4',
                0
            ],
            [
                'mardi',
                '1 / span 5',
                0
            ],
            [
                'trends',
                '6 / span 7',
                0
            ],
            [
                'pura',
                '1 / span 4',
                0
            ],
            [
                'zam',
                '5 / span 4',
                24
            ],
            [
                'hamilton',
                '9 / span 4',
                0
            ]
        ];
        FEAT = FEAT.filter(function(f) {
            return f[0].charAt(0) === '@' ? !!CASES[f[0].slice(1)] : !!BY[f[0]];
        });
        if ($('featCount')) $('featCount').textContent = FEAT.length + ' of ' + (P.length + CASE_ORDER.length) + ' projects';
        gridEl.innerHTML = FEAT.map(function(f, i) {
            if (f[0].charAt(0) === '@') {
                var k = f[0].slice(1), c = CASES[k], tw = c.t.split(' '), lw = tw.pop(), ttl = (tw.length ? esc(tw.join(' ')) + ' ' : '') + '<em>' + esc(lw) + '</em>', cv = W + c.cover + '.webp', st = ' style="object-position:' + c.pos + '"';
                var pk = c.peekVid ? '<div class="peek"><video muted loop playsinline preload="none" poster="' + V + c.peekVid + '.jpg"><source src="' + V + c.peekVid + '.mp4" type="video/mp4"></video></div>' : '<div class="peek">' + im(W + (c.peek || c.cover) + '-t.webp', '', '') + '</div>';
                return '<a class="card" style="--c:' + f[1] + ';margin-top:' + f[2] + 'px" href="/projects#case-' + k + '" data-case="' + k + '" data-cursor="Open">' + '<div class="num caps"><span>' + pad(i + 1) + '</span><span>' + esc(c.cat) + '</span></div>' + '<div class="frame"><div class="box">' + im(cv, 'g', c.t).replace('<img ', '<img' + st + ' ') + im(cv, 'c', '').replace('<img ', '<img' + st + ' ') + '</div><span class="ph-name">' + esc(c.t) + '</span>' + '<svg class="lines" viewBox="0 0 404 316" preserveAspectRatio="none" aria-hidden="true">' + LINES[i % 4]() + '</svg>' + pk + '</div>' + '<div class="cap"><h3>' + ttl + '</h3><span class="caps">' + caseCount(c) + '</span><span class="who">' + esc(c.s) + '</span></div></a>';
            }
            var p = BY[f[0]], t = p[1].split(' '), last = t.pop();
            var title = (t.length ? esc(t.join(' ')) + ' ' : '') + '<em>' + esc(last) + '</em>';
            return '<a class="card" style="--c:' + f[1] + ';margin-top:' + f[2] + 'px" href="' + link(p) + '" target="_blank" rel="noopener" data-cursor="View">' + '<div class="num caps"><span>' + pad(i + 1) + '</span><span>' + CATS[p[5]] + '</span></div>' + '<div class="frame"><div class="box">' + im(cover(p), 'g', p[1], cover(p, '404')) + im(cover(p), 'c', '', cover(p, '404')) + '</div><span class="ph-name">' + esc(p[1]) + '</span>' + '<svg class="lines" viewBox="0 0 404 316" preserveAspectRatio="none" aria-hidden="true">' + LINES[i % 4]() + '</svg>' + '<div class="peek' + (NOINNER[p[0]] ? ' detail' : '') + '">' + im(inner(p), '', '', cover(p)) + '</div></div>' + '<div class="cap"><h3>' + title + '</h3><span class="caps">' + (p[6] ? p[6].toLocaleString('en-US') + ' views' : '') + '</span><span class="who">' + esc(p[2]) + '</span></div></a>';
        }).join('');
    }
    var cards = [].slice.call(document.querySelectorAll('.card'));
    function reveal(c) {
        if (c.classList.contains('drawn')) return;
        c.classList.add('drawn');
        setTimeout(function() {
            c.classList.add('shown');
        }, reduce ? 0 : 1150);
        setTimeout(function() {
            c.classList.add('rest');
        }, reduce ? 0 : 2900);
    }
    if ('IntersectionObserver' in window) {
        var rio = new IntersectionObserver(function(es) {
            es.forEach(function(en) {
                if (en.isIntersecting) {
                    reveal(en.target);
                    rio.unobserve(en.target);
                }
            });
        }, {
            threshold: .3
        });
        cards.forEach(function(c) {
            rio.observe(c);
        });
    } else cards.forEach(reveal);
    cards.forEach(function(card) {
        var fr = card.querySelector('.frame'), c = card.querySelector('.c'), pk = card.querySelector('.peek');
        function pos(e) {
            var r = fr.getBoundingClientRect();
            return [
                (e.clientX - r.left) / r.width,
                (e.clientY - r.top) / r.height
            ];
        }
        function set(e) {
            var p = pos(e);
            c.style.setProperty('--x', p[0] * 100 + '%');
            c.style.setProperty('--y', p[1] * 100 + '%');
        }
        var pv = pk && pk.querySelector('video');
        card.addEventListener('mouseenter', function(e) {
            set(e);
            if (pv) {
                var pr = pv.play();
                if (pr && pr.catch) pr.catch(function() {});
            }
        });
        card.addEventListener('mouseleave', function(e) {
            set(e);
            if (pv) pv.pause();
        });
        card.addEventListener('mousemove', function(e) {
            var p = pos(e);
            pk.style.setProperty('--px', ((p[0] - .5) * -40).toFixed(1) + 'px');
            pk.style.setProperty('--py', ((p[1] - .5) * -30).toFixed(1) + 'px');
            if (pk.classList.contains('detail')) {
                pk.style.setProperty('--ox', (p[0] * 100).toFixed(0) + '%');
                pk.style.setProperty('--oy', (p[1] * 100).toFixed(0) + '%');
            }
        });
    });
    /* ---------- studio track (landing) ---------- */ var GRIDS = [
        [
            'grid-01',
            'Liquid Gold',
            'Jewellery & beauty grid'
        ],
        [
            'grid-02',
            'Slow Rituals',
            'Skincare grid'
        ],
        [
            'grid-03',
            'Quiet Hours',
            'Lifestyle grid'
        ],
        [
            'grid-04',
            'Fig Season',
            'Food styling grid'
        ],
        [
            'grid-05',
            'Amber Night',
            'Mood grid'
        ],
        [
            'grid-06',
            'Into the Woods',
            'Outdoor lifestyle grid'
        ],
        [
            'grid-07',
            'Legend of Avara',
            'Social identity'
        ],
        [
            'green-carat/01',
            'Green Carat',
            'Fine jewellery grid · I'
        ],
        [
            'green-carat/02',
            'Green Carat',
            'Fine jewellery grid · II'
        ],
        [
            'green-carat/03',
            'Green Carat',
            'Fine jewellery grid · III'
        ]
    ];
    function gsrc(g) {
        return g[0].indexOf('/') > -1 ? W + g[0] + '.webp' : '/assets/img/grids/' + g[0] + '.webp';
    }
    var RITEMS = RENDERS.map(function(r) {
        return wi('renders/' + r[0], r[1] + ' · ' + r[2]);
    });
    var track = $('track');
    if (track) {
        var S = [
            [
                'g',
                0
            ],
            [
                'p',
                'trends'
            ],
            [
                'g',
                3
            ],
            [
                'p',
                'callig'
            ],
            [
                'g',
                1
            ],
            [
                'p',
                'colstory'
            ],
            [
                'g',
                6
            ],
            [
                'p',
                'coral'
            ],
            [
                'g',
                4
            ],
            [
                'p',
                'sport'
            ],
            [
                'g',
                2
            ],
            [
                'p',
                'psych'
            ],
            [
                'g',
                5
            ],
            [
                'p',
                'artistry'
            ],
            [
                'r',
                0
            ],
            [
                'r',
                2
            ],
            [
                'r',
                1
            ],
            [
                'r',
                3
            ]
        ];
        track.innerHTML = S.map(function(s) {
            if (s[0] === 'r') {
                var r = RENDERS[s[1]];
                return '<a class="slide tall grid9" href="' + W + 'renders/' + r[0] + '.webp" data-render="' + s[1] + '" data-cursor="Open"><div class="ph">' + im(W + 'renders/' + r[0] + '-t.webp', '', r[1] + ' — ' + r[2]) + '<span class="ph-name">' + esc(r[1]) + '</span></div><div class="sc caps"><span>' + esc(r[1]) + '</span><span>' + esc(r[2]) + '</span></div></a>';
            }
            if (s[0] === 'g') {
                var g = GRIDS[s[1]];
                return '<a class="slide tall grid9" href="/services#grid-design" data-cursor="Grids"><div class="ph">' + im(gsrc(g), '', g[1] + ' — ' + g[2]) + '<span class="ph-name">' + esc(g[1]) + '</span></div><div class="sc caps"><span>' + esc(g[1]) + '</span><span>' + esc(g[2]) + '</span></div></a>';
            }
            var p = BY[s[1]];
            return '<a class="slide" href="' + link(p) + '" target="_blank" rel="noopener" data-cursor="Open"><div class="ph">' + im(cover(p), '', p[1], cover(p, '404')) + '<span class="ph-name">' + esc(p[1]) + '</span></div><div class="sc caps"><span>' + esc(p[1]) + '</span><span>' + esc(p[2]) + '</span></div></a>';
        }).join('') + '<a class="slide tall cta" href="/services" data-cursor="Open"><div class="ph"><div><span class="it">Want a feed that looks like this?</span><span class="caps">Grid design &amp; social media ↗</span></div></div><div class="sc caps"><span>Services</span><span>Social</span></div></a>';
        track.addEventListener('click', function(e) {
            var a = e.target.closest('[data-render]');
            if (!a) return;
            e.preventDefault();
            openGallery(RITEMS, +a.dataset.render, 'Studio · 3D & art direction');
        });
    }
    if (!fine && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(es) {
            es.forEach(function(en) {
                en.target.classList.toggle('is-active', en.isIntersecting);
            });
        }, {
            rootMargin: '-40% 0px -40% 0px'
        });
        [].forEach.call(document.querySelectorAll('.card,.slide,.pc'), function(el) {
            io.observe(el);
        });
    }
    /* ---------- marquee ---------- */ var mq = $('mq');
    if (mq) {
        var mk = '<svg class="ico" viewBox="' + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$dist$2f$brand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BRAND"].icon.viewBox + '"><use href="#icon"/></svg>';
        var ph = [
            '<span>a vision beyond the surface ' + mk + '</span>',
            '<span class="k">Think. Inspire. Design. ' + mk + '</span>',
            '<span>where imagination becomes form ' + mk + '</span>',
            '<span class="k">Identities with intention ' + mk + '</span>'
        ].join('');
        mq.innerHTML = ph + ph;
    }
    /* ---------- archive: three moving lines of covers ---------- */ var arc = $('arcRows');
    if (arc) {
        var cut3 = [
            P.slice(0, 23),
            P.slice(23, 45),
            P.slice(45)
        ];
        arc.innerHTML = cut3.map(function(list, r) {
            var items = list.map(function(p) {
                return '<a class="arc-it" href="' + link(p) + '" target="_blank" rel="noopener" data-cursor="View">' + im(cover(p, '404'), '', p[1], cover(p)) + '<span class="ph-name">' + esc(p[1]) + '</span><span class="nm">' + esc(p[1]) + '</span></a>';
            }).join('');
            return '<div class="arc-row' + (r === 1 ? ' rev' : '') + '" style="--dur:' + [
                95,
                120,
                105
            ][r] + 's"><div class="arc-track">' + items + items.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ') + '</div></div>';
        }).join('');
    }
    /* ---------- brands: white logos, three moving lines ---------- */ var lrows = $('lrows');
    if (lrows) {
        /* [file name in assets/img/logos, brand name, width/height ratio] */ var BR = [
            [
                [
                    'hre',
                    'HRE Development',
                    2.0
                ],
                [
                    'omoria',
                    'Omoria Private Residences',
                    3.774
                ],
                [
                    'mardi-holding',
                    'Mardi Holding',
                    2.941
                ],
                [
                    'royal-caviar',
                    'Royal Caviar',
                    1.105
                ],
                [
                    'remax-zam',
                    'RE/MAX ZAM',
                    2.426
                ]
            ],
            [
                [
                    'nobu',
                    'Nobu Residences',
                    3.413
                ],
                [
                    'dubai-investments-park',
                    'Dubai Investments Park',
                    2.926
                ],
                [
                    'al-taif-mall',
                    'Al Taif Mall',
                    1.264
                ],
                [
                    'mirdif-hills',
                    'Mirdif Hills Avenue',
                    2.084
                ],
                [
                    'silk',
                    'Silk Marketing Agency',
                    2.093
                ]
            ],
            [
                [
                    'okta',
                    'Okta',
                    3.03
                ],
                [
                    'creative-link',
                    'Creative Link Services',
                    1.593
                ],
                [
                    'al-omran',
                    'Al Omran Centre',
                    0.877
                ],
                [
                    'wasfaty',
                    'Wasfaty Restaurant & Cafe',
                    1.779
                ],
                [
                    'dukan-burger',
                    'Dukan Burger',
                    1.22
                ]
            ]
        ];
        lrows.innerHTML = BR.map(function(row, r) {
            var one = row.map(function(b) {
                var k = Math.max(.62, Math.min(1.6, Math.sqrt(2.3 / b[2])));
                return '<span class="lg" style="--k:' + k.toFixed(2) + '" role="img" aria-label="' + esc(b[1]) + '"><img src="/assets/img/logos/' + b[0] + '.png" alt="" loading="lazy" decoding="async"><span class="wm s' + (1 + (r * 5 + row.indexOf(b)) % 6) + '" aria-hidden="true">' + esc(b[1]) + '</span></span>';
            }).join('');
            var hidden = one.replace(/role="img"/g, 'aria-hidden="true"');
            return '<div class="lrow' + (r === 1 ? ' rev' : '') + '" style="--dur:' + [
                46,
                56,
                50
            ][r] + 's"><div class="ltrack">' + one + hidden + hidden + hidden + '</div></div>';
        }).join('');
    }
    /* ---------- projects page ---------- */ var pgrid = $('pgrid');
    if (pgrid) {
        pgrid.innerHTML = P.map(function(p, i) {
            return '<a class="pc" href="' + link(p) + '" target="_blank" rel="noopener" data-cat="' + p[5] + '" data-cursor="View"><div class="pf">' + im(cover(p), 'g', p[1], cover(p, '404')) + im(cover(p), 'c', '', cover(p, '404')) + '<span class="ph-name">' + esc(p[1]) + '</span></div><div class="pk">' + im(inner(p), '', '', cover(p)) + '</div><div class="pmeta"><h3>' + esc(p[1]) + '</h3><span class="caps">' + CATS[p[5]] + '</span><span class="who">' + esc(p[2]) + (p[6] ? ' · ' + p[6].toLocaleString('en-US') + ' views' : '') + '</span></div></a>';
        }).join('');
        var cnt = {
            all: P.length
        };
        P.forEach(function(p) {
            cnt[p[5]] = (cnt[p[5]] || 0) + 1;
        });
        var fl = $('pfilters');
        fl.innerHTML = '<div class="grp">' + [
            [
                'all',
                'All'
            ]
        ].concat(Object.keys(CATS).map(function(k) {
            return [
                k,
                CATS[k]
            ];
        })).map(function(c, i) {
            return '<button type="button" data-f="' + c[0] + '" aria-pressed="' + (i ? 'false' : 'true') + '">' + esc(c[1]) + '<sup>' + cnt[c[0]] + '</sup></button>';
        }).join('') + '</div><span class="caps" id="pcount" style="color:var(--mute)">' + P.length + ' projects</span>';
        fl.addEventListener('click', function(e) {
            var b = e.target.closest('button');
            if (!b) return;
            [].forEach.call(fl.querySelectorAll('button'), function(x) {
                x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
            });
            var f = b.getAttribute('data-f'), n = 0;
            [].forEach.call(pgrid.children, function(c) {
                var on = f === 'all' || c.getAttribute('data-cat') === f;
                c.hidden = !on;
                if (on) {
                    n++;
                    c.classList.remove('in');
                    void c.offsetWidth;
                    c.classList.add('in');
                }
            });
            $('pcount').textContent = n + ' projects';
            if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
        var h = location.hash.slice(1);
        if (h && CATS[h]) {
            var b = fl.querySelector('[data-f="' + h + '"]');
            if (b) b.click();
        }
    }
    /* ---------- services ---------- */ var svc = $('svc');
    if (svc) {
        var SV = [
            [
                'Brand identity &amp; <em>logo</em>',
                'Marks with a reason behind every line. Research, concept, logo, icon and wordmark, built to work from a favicon to a tower facade.',
                [
                    'Logo & icon',
                    'Wordmark',
                    'Brand strategy',
                    'Naming support'
                ],
                'anira'
            ],
            [
                'Brand <em>guidelines</em>',
                'The rulebook that keeps a brand consistent: colour, typography, patterns, tone and usage, delivered as a clear PDF book and templates.',
                [
                    'Guidelines book',
                    'Colour system',
                    'Typography',
                    'Templates'
                ],
                'fanatk'
            ],
            [
                'Social media <em>management</em>',
                'Your accounts, run as one system: strategy, monthly calendar, shoots, design, captions, publishing, community and a report at the end of every month.',
                [
                    'Strategy & calendar',
                    'Content creation',
                    'Community',
                    'Monthly reports'
                ],
                '@grid-07|Legend of Avara'
            ],
            [
                'Grid <em>design</em>',
                'Instagram feeds art-directed as one composition. Every post works on its own, and every nine read as a single frame with one mood and one palette.',
                [
                    '3×3 grid plans',
                    'Mood & palette',
                    'Post templates',
                    'Highlight covers'
                ],
                '@grid-04|Fig Season'
            ],
            [
                'Real estate <em>launches</em>',
                'Everything a project needs to sell off-plan: key visuals, sales brochures, hoardings, sales gallery and launch events.',
                [
                    'Key visuals',
                    'Brochures',
                    'Hoardings',
                    'Sales gallery'
                ],
                'sky3'
            ],
            [
                'Art &amp; creative <em>direction</em>',
                'Concepts, shoots and campaigns with one point of view, including celebrity campaigns like Salman Khan × Sakura Gardens.',
                [
                    'Campaign concept',
                    'Shoot direction',
                    'AI imagery',
                    'Retouching'
                ],
                'pura'
            ],
            [
                'Campaigns &amp; paid <em>ads</em>',
                'Paid creatives that look like the brand and perform like ads, tested in sets and refreshed on schedule.',
                [
                    'Meta ads',
                    'Key visuals',
                    'Reels covers',
                    'A/B creatives'
                ],
                'iggrid'
            ],
            [
                'Print &amp; <em>production</em>',
                'Press-ready files and vendor follow-up for brochures, signage, packaging and stationery. CMYK, bleed and finishes handled.',
                [
                    'Brochures',
                    'Signage',
                    'Packaging',
                    'Stationery'
                ],
                'taifbro'
            ],
            [
                'Motion &amp; <em>video</em>',
                'Launch films, reels and motion graphics that bring the identity to life on screens and road billboards.',
                [
                    'Reels',
                    'Launch films',
                    'Motion graphics',
                    'DOOH'
                ],
                'nobu'
            ],
            [
                'Web &amp; <em>UI</em>',
                'Landing pages and websites designed around the brand, from the first wireframe to the final UI.',
                [
                    'Landing pages',
                    'Websites',
                    'UI design',
                    'Wireframes'
                ],
                'dipweb'
            ]
        ];
        function svcImg(k) {
            var a;
            if (k.charAt(0) === '@') {
                a = k.slice(1).split('|');
                return [
                    '/assets/img/grids/' + a[0] + '.webp',
                    a[1]
                ];
            }
            if (k.charAt(0) === '~') {
                a = k.slice(1).split('|');
                return [
                    W + a[0] + '.webp',
                    a[1]
                ];
            }
            var p = BY[k];
            return p ? [
                cover(p),
                p[1]
            ] : [
                '',
                k
            ];
        }
        var svcPv = $('svcPv'), svcOn = -1;
        svc.innerHTML = SV.map(function(s, i) {
            return '<li><button type="button" aria-expanded="false" data-i="' + i + '"><span class="n caps">' + pad(i + 1) + '</span><span class="tt">' + s[0] + '</span><span class="pl"></span></button><div class="bd"><div><p>' + s[1] + '</p><div class="chips">' + s[2].map(function(c) {
                return '<span>' + esc(c) + '</span>';
            }).join('') + '</div></div></div></li>';
        }).join('');
        var svcItems = [].slice.call(svc.children);
        var svcSet = function(i) {
            if (i === svcOn) return;
            svcOn = i;
            svcItems.forEach(function(li, j) {
                li.classList.toggle('on', j === i);
                li.querySelector('button').setAttribute('aria-expanded', j === i ? 'true' : 'false');
            });
            var d = svcImg(SV[i][3]);
            $('svcCap').textContent = d[1];
            $('svcNo').textContent = pad(i + 1) + ' / ' + pad(SV.length);
            $('svcBig').textContent = pad(i + 1);
            $('svcPh').textContent = d[1];
            var old = [].slice.call(svcPv.querySelectorAll('img'));
            var n = new Image();
            n.alt = d[1];
            n.referrerPolicy = 'no-referrer';
            n.className = 'out';
            n.src = d[0];
            n.onerror = function() {
                n.remove();
            };
            svcPv.appendChild(n);
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    n.className = 'in';
                });
            });
            old.forEach(function(o) {
                setTimeout(function() {
                    o.remove();
                }, 1100);
            });
        };
        svcItems.forEach(function(li, i) {
            var b = li.querySelector('button');
            b.addEventListener('click', function() {
                svcSet(i);
            });
            if (fine) b.addEventListener('mouseenter', function() {
                svcSet(i);
            });
        });
        var start = 0, hs = location.hash;
        if (hs === '#social-media') start = 2;
        if (hs === '#grid-design') start = 3;
        svcSet(start);
    }
    /* ---------- galleries: grid design, moodboards, cases, logofolio ---------- */ var gs = $('gridshow');
    if (gs) {
        var GS = GRIDS.filter(function(g) {
            return g[0] !== 'grid-07';
        }), GSI = GS.map(function(g) {
            return {
                src: gsrc(g),
                th: gsrc(g),
                cap: g[1] + ' · ' + g[2]
            };
        });
        gs.innerHTML = GS.map(function(g, i) {
            return '<button class="gi" type="button" data-i="' + i + '" data-cursor="Open"><div class="gimg">' + im(gsrc(g), '', g[1] + ' — ' + g[2]) + '</div><div class="gcap caps"><b>' + esc(g[1]) + '</b><span>' + pad(i + 1) + ' · ' + esc(g[2]) + '</span></div></button>';
        }).join('');
        gs.addEventListener('click', function(e) {
            var b = e.target.closest('.gi');
            if (b) openGallery(GSI, +b.dataset.i, 'Grid design');
        });
    }
    var ms = $('moodshow');
    if (ms) {
        var MI = MOODS.map(function(m) {
            return wi('moodboards/' + m[0], m[1] + ' · ' + m[2]);
        });
        ms.innerHTML = MOODS.map(function(m, i) {
            return '<button class="mb" type="button" data-i="' + i + '" data-cursor="Open"><span class="mimg">' + im(W + 'moodboards/' + m[0] + '-t.webp', '', m[1] + ' moodboard — ' + m[2]) + '</span><span class="gcap caps"><b>' + esc(m[1]) + '</b><span>' + esc(m[2]) + '</span></span></button>';
        }).join('');
        ms.addEventListener('click', function(e) {
            var b = e.target.closest('.mb');
            if (b) openGallery(MI, +b.dataset.i, 'Moodboards');
        });
    }
    document.addEventListener('click', function(e) {
        var t = e.target.closest('[data-lb]');
        if (!t) return;
        e.preventDefault();
        openGallery([
            {
                src: t.getAttribute('data-lb'),
                cap: t.getAttribute('data-cap') || ''
            }
        ], 0, '');
    });
    function caseCard(k, home) {
        var c = CASES[k], cv = W + c.cover + '-t.webp', st = ' style="object-position:' + c.pos + '"', pk = c.peekVid ? V + c.peekVid + '.jpg' : W + (c.peek || c.cover) + '-t.webp';
        return '<a class="pc cs"' + (home ? '' : ' id="case-' + k + '"') + ' href="' + (home ? '/projects' : '') + '#case-' + k + '" data-case="' + k + '" data-cursor="Open"><div class="pf">' + im(cv, 'g', c.t).replace('<img ', '<img' + st + ' ') + im(cv, 'c', '').replace('<img ', '<img' + st + ' ') + '<span class="ph-name">' + esc(c.t) + '</span><span class="cnt caps">' + caseCount(c) + '</span></div><div class="pk">' + im(pk, '', '') + '</div><div class="pmeta"><h3>' + esc(c.t) + '</h3><span class="caps">' + esc(c.cat) + '</span><span class="who">' + esc(c.s) + '</span></div></a>';
    }
    function watchActive(els) {
        if (fine || !('IntersectionObserver' in window)) return;
        var o = new IntersectionObserver(function(es) {
            es.forEach(function(en) {
                en.target.classList.toggle('is-active', en.isIntersecting);
            });
        }, {
            rootMargin: '-40% 0px -40% 0px'
        });
        [].forEach.call(els, function(el) {
            o.observe(el);
        });
    }
    var csEl = $('cases');
    if (csEl) {
        csEl.innerHTML = CASE_ORDER.map(function(k) {
            return caseCard(k);
        }).join('');
        watchActive(csEl.children);
        var h0 = location.hash.match(/^#case-(\w+)/);
        if (h0 && CASES[h0[1]]) setTimeout(function() {
            openCase(h0[1]);
        }, 700);
    }
    var lc = $('latestCases');
    if (lc) {
        lc.innerHTML = [
            'avara',
            'hamilton',
            'sakura',
            'green'
        ].map(function(k) {
            return caseCard(k, 1);
        }).join('');
        watchActive(lc.children);
    }
    var lf = $('logofolio');
    if (lf) {
        var LI = LOGOS.map(function(l) {
            return wi('logos/' + l[0], l[1]);
        });
        lf.innerHTML = LOGOS.map(function(l, i) {
            return '<button class="lgt" type="button" data-i="' + i + '" data-cursor="Open">' + im(W + 'logos/' + l[0] + '-t.webp', '', l[1] + ' logo') + '<span class="caps">' + esc(l[1]) + '</span></button>';
        }).join('') + '<a class="lgt cta" href="/pricing"><span class="it">Your mark,<br>next.</span><span class="caps">Build your scope →</span></a>';
        lf.addEventListener('click', function(e) {
            var b = e.target.closest('.lgt[data-i]');
            if (b) openGallery(LI, +b.dataset.i, 'Logofolio');
        });
    }
    [].forEach.call(document.querySelectorAll('.pc'), function(c) {
        var f = c.querySelector('.pf'), col = c.querySelector('.c');
        if (!f || !col) return;
        function set(e) {
            var r = f.getBoundingClientRect();
            col.style.setProperty('--x', (e.clientX - r.left) / r.width * 100 + '%');
            col.style.setProperty('--y', (e.clientY - r.top) / r.height * 100 + '%');
        }
        c.addEventListener('mouseenter', set);
        c.addEventListener('mouseleave', set);
    });
    /* every step row on the page draws its copper line when it scrolls in */ [].forEach.call(document.querySelectorAll('.steps'), function(steps) {
        if ('IntersectionObserver' in window) {
            var so = new IntersectionObserver(function(es) {
                if (es[0].isIntersecting) {
                    steps.classList.add('in');
                    so.disconnect();
                }
            }, {
                threshold: .3
            });
            so.observe(steps);
        } else steps.classList.add('in');
    });
    /* ---------- pricing: build your scope ---------- */ (function() {
        var L = $('estL');
        if (!L) return;
        /* ===== EDIT YOUR PRICES HERE (AED). mo:true = monthly. qty = quantity stepper. inc = included free with these option ids. quote = price on request ===== */ var PR = DATA.pricing, PM = DATA.payment || {};
        if (!PR) return;
        var PAY = {
            link: PM.link || '',
            deposit: PR.deposit,
            whatsapp: PM.whatsapp || '971542807100',
            email: PM.email || 'talalatallah10@gmail.com',
            usd: PR.usdPeg
        };
        var TERMS = PR.terms.map(function(t) {
            return [
                t.id,
                t.label,
                t.discount
            ];
        });
        var S = PR.sections;
        var PRE = PR.presets.map(function(p) {
            return [
                p.label,
                p.pick
            ];
        });
        var state = {
            r: {},
            c: {},
            q: {},
            term: '1',
            cur: 'AED'
        };
        function all() {
            var o = {};
            S.forEach(function(s) {
                s.items.forEach(function(i) {
                    o[i.id] = [
                        i,
                        s
                    ];
                });
                (s.add || []).forEach(function(i) {
                    o[i.id] = [
                        i,
                        s
                    ];
                });
            });
            return o;
        }
        var IX = all();
        function money(v, cur) {
            cur = cur || state.cur;
            var x = cur === 'USD' ? v / PAY.usd : v;
            return (cur === 'USD' ? '$' : 'AED ') + Math.round(x).toLocaleString('en-US');
        }
        function priceLab(i) {
            if (i.quote) return 'On request';
            return (i.from ? 'from ' : '') + money(i.p) + (i.mo ? '<small>/mo</small>' : '') + (i.qty ? '<small> each</small>' : '');
        }
        function included(i) {
            return i.inc && i.inc.some(function(id) {
                return Object.keys(state.r).some(function(k) {
                    return state.r[k] === id;
                });
            });
        }
        function render() {
            L.innerHTML = S.map(function(s) {
                var opts = s.items.map(function(i) {
                    var on = s.radio ? state.r[s.k] === i.id : !!state.c[i.id];
                    var inc = included(i);
                    return '<div class="opt' + (on ? ' on' : '') + (inc ? ' inc' : '') + '"><button type="button" class="ob" data-s="' + s.k + '" data-id="' + i.id + '" aria-pressed="' + on + '"' + (inc ? ' disabled' : '') + '><span class="mk ' + (s.radio ? 'rad' : 'chk') + '"></span><span class="ot"><b>' + i.n + (i.tag ? ' <em class="tg">' + i.tag + '</em>' : '') + '</b><span>' + i.d + '</span></span><span class="op">' + (inc ? 'Included' : priceLab(i)) + '</span></button>' + (i.qty && on ? '<div class="qty"><span>' + i.qty.lab + '<small> ' + money(i.p) + ' each</small></span><span class="st"><button type="button" data-q="' + i.id + '" data-d="-1" aria-label="Fewer">−</button><output>' + (state.q[i.id] || 1) + '</output><button type="button" data-q="' + i.id + '" data-d="1" aria-label="More">+</button></span></div>' : '') + '</div>';
                }).join('');
                var adds = (s.add || []).map(function(i) {
                    var inc = included(i), on = !inc && !!state.c[i.id];
                    return '<div class="opt add' + (on ? ' on' : '') + (inc ? ' inc' : '') + '"><button type="button" class="ob" data-c="' + i.id + '" aria-pressed="' + on + '"' + (inc ? ' disabled' : '') + '><span class="mk chk"></span><span class="ot"><b>' + i.n + '</b><span>' + i.d + '</span></span><span class="op">' + (inc ? 'Included' : '+ ' + priceLab(i)) + '</span></button>' + (i.qty && on ? '<div class="qty"><span>' + i.qty.lab + '</span><span class="st"><button type="button" data-q="' + i.id + '" data-d="-1" aria-label="Fewer">−</button><output>' + (state.q[i.id] || 1) + '</output><button type="button" data-q="' + i.id + '" data-d="1" aria-label="More">+</button></span></div>' : '') + '</div>';
                }).join('');
                var term = s.term ? '<div class="term"><span class="caps">Commitment</span><div role="group" aria-label="Commitment">' + TERMS.map(function(t) {
                    return '<button type="button" data-term="' + t[0] + '" aria-pressed="' + (state.term === t[0]) + '">' + t[1] + (t[2] ? ' <em>−' + Math.round(t[2] * 100) + '%</em>' : '') + '</button>';
                }).join('') + '</div></div>' : '';
                return '<fieldset class="grp" id="g-' + s.k + '"><legend><span class="no">' + s.no + '</span><span class="gt">' + s.t + '</span></legend><p class="gs">' + s.sub + '</p>' + opts + (adds ? '<div class="addh caps">Add-ons</div>' + adds : '') + term + '</fieldset>';
            }).join('');
            sum();
        }
        function lines() {
            var out = [], disc = (TERMS.filter(function(t) {
                return t[0] === state.term;
            })[0] || TERMS[0])[2];
            function push(i, s) {
                if (included(i)) return;
                var q = i.qty ? state.q[i.id] || 1 : 1, amt = (i.p || 0) * q;
                if (i.mo) amt = Math.round(amt * (1 - disc));
                out.push({
                    n: i.n.replace(/&amp;/g, '&') + (q > 1 ? ' × ' + q : ''),
                    amt: amt,
                    mo: !!i.mo,
                    quote: !!i.quote,
                    from: !!i.from
                });
            }
            S.forEach(function(s) {
                s.items.forEach(function(i) {
                    if (s.radio ? state.r[s.k] === i.id : state.c[i.id]) push(i, s);
                });
                (s.add || []).forEach(function(i) {
                    if (state.c[i.id]) push(i, s);
                });
            });
            return out;
        }
        function sum() {
            var ls = lines(), one = 0, mo = 0, quote = false, from = false;
            ls.forEach(function(l) {
                if (l.quote) quote = true;
                if (l.from) from = true;
                if (l.mo) mo += l.amt;
                else one += l.amt;
            });
            var months = +state.term, dep = Math.round(one * PAY.deposit) + mo;
            $('sumLines').innerHTML = ls.length ? ls.map(function(l) {
                return '<li><span>' + esc(l.n) + '</span><b>' + (l.quote ? 'On request' : (l.from ? 'from ' : '') + money(l.amt) + (l.mo ? '<small>/mo</small>' : '')) + '</b></li>';
            }).join('') : '<li class="empty">Nothing selected yet. Pick a service on the left.</li>';
            $('totOne').textContent = money(one);
            $('totMo').innerHTML = money(mo) + '<small>/mo</small>';
            $('rowMo').hidden = !mo;
            var big = one + mo * months;
            $('totBig').innerHTML = (from ? 'from ' : '') + money(big) + (quote ? '<small> + quote</small>' : '');
            $('totSub').textContent = mo ? (one ? money(one) + ' one-off + ' : '') + money(mo) + ' × ' + months + (months > 1 ? ' months' : ' month') : ls.length ? 'One-off project' : ' ';
            $('totDep').textContent = money(dep);
            $('mbTot').textContent = (from ? 'from ' : '') + money(big);
            var txt = 'Hello Talal, here is my scope from your website:\n\n' + ls.map(function(l) {
                return '• ' + l.n + ' — ' + (l.quote ? 'on request' : (l.from ? 'from ' : '') + money(l.amt, 'AED') + (l.mo ? '/mo' : ''));
            }).join('\n') + (mo ? '\n\nCommitment: ' + TERMS.filter(function(t) {
                return t[0] === state.term;
            })[0][1] : '') + '\n\nOne-off: ' + money(one, 'AED') + (mo ? '\nMonthly: ' + money(mo, 'AED') + '/mo' : '') + '\nEstimated investment: ' + (from ? 'from ' : '') + money(big, 'AED') + '\nTo start: ' + money(dep, 'AED') + '\n\nMy name: \nCompany: ';
            $('sendWa').href = 'https://wa.me/' + PAY.whatsapp + '?text=' + encodeURIComponent(txt);
            $('sendMail').href = 'mailto:' + PAY.email + '?subject=' + encodeURIComponent('My project scope — ' + money(big, 'AED')) + '&body=' + encodeURIComponent(txt);
            var pb = $('payBtn');
            pb.hidden = !PAY.link || !ls.length || quote;
            if (PAY.link) pb.href = PAY.link;
            pb.dataset.amt = money(dep, 'AED');
            [
                $('sendWa'),
                $('sendMail')
            ].forEach(function(a) {
                a.classList.toggle('off', !ls.length);
            });
            $('mbar').classList.toggle('show', ls.length > 0);
            try {
                localStorage.setItem('ta-scope', JSON.stringify(state));
            } catch (e) {}
            /* the 'send to the studio' form (React) listens for this */ document.dispatchEvent(new CustomEvent('ta:scope', {
                detail: {
                    state: {
                        r: state.r,
                        c: state.c,
                        q: state.q,
                        term: state.term
                    },
                    currency: state.cur,
                    lines: ls.length,
                    total: big,
                    from: from,
                    quote: quote
                }
            }));
        }
        L.addEventListener('click', function(e) {
            var b = e.target.closest('button');
            if (!b || b.disabled) return;
            if (b.dataset.q) {
                var i = IX[b.dataset.q][0], v = (state.q[i.id] || 1) + +b.dataset.d;
                state.q[i.id] = Math.max(1, Math.min(i.qty.max, v));
                render();
                return;
            }
            if (b.dataset.term) {
                state.term = b.dataset.term;
                render();
                return;
            }
            if (b.dataset.c) {
                state.c[b.dataset.c] = !state.c[b.dataset.c];
                render();
                return;
            }
            var s = b.dataset.s, id = b.dataset.id, sec = IX[id][1];
            if (sec.radio) {
                state.r[s] = state.r[s] === id ? undefined : id;
            } else state.c[id] = !state.c[id];
            render();
        });
        document.querySelector('.cur').addEventListener('click', function(e) {
            var b = e.target.closest('[data-cur]');
            if (!b) return;
            state.cur = b.dataset.cur;
            [].forEach.call(this.children, function(x) {
                x.setAttribute('aria-pressed', x === b);
            });
            render();
        });
        $('estReset').addEventListener('click', function() {
            state = {
                r: {},
                c: {},
                q: {},
                term: '1',
                cur: state.cur
            };
            render();
            [].forEach.call(document.querySelectorAll('#presets button'), function(x) {
                x.setAttribute('aria-pressed', 'false');
            });
            say('Cleared');
        });
        $('payBtn').addEventListener('click', function() {
            var a = this.dataset.amt;
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(a.replace(/[^\d]/g, '')).catch(function() {});
            say('Deposit ' + a + ' — amount copied for the payment page');
        });
        var pr = $('presets');
        pr.innerHTML = '<span class="caps">Start from</span>' + PRE.map(function(p, i) {
            return '<button type="button" data-p="' + i + '" aria-pressed="false">' + p[0] + '</button>';
        }).join('');
        pr.addEventListener('click', function(e) {
            var b = e.target.closest('[data-p]');
            if (!b) return;
            var p = PRE[+b.dataset.p][1];
            state = {
                r: {},
                c: {},
                q: {},
                term: state.term,
                cur: state.cur
            };
            if (p.id) state.r.id = p.id;
            if (p.web) state.r.web = p.web;
            if (p.social) state.r.social = p.social;
            (p.add || []).forEach(function(a) {
                state.c[a] = true;
            });
            if (p.vid) Object.keys(p.vid).forEach(function(k) {
                state.c[k] = true;
                state.q[k] = p.vid[k];
            });
            [].forEach.call(pr.querySelectorAll('button'), function(x) {
                x.setAttribute('aria-pressed', x === b);
            });
            render();
            say(PRE[+b.dataset.p][0] + ' — adjust anything you like');
        });
        try {
            var sv = JSON.parse(localStorage.getItem('ta-scope') || 'null');
            if (sv && sv.r) state = sv;
        } catch (e) {}
        [].forEach.call(document.querySelectorAll('.cur button'), function(x) {
            x.setAttribute('aria-pressed', x.dataset.cur === state.cur);
        });
        window.__taScope = function() {
            return {
                state: {
                    r: state.r,
                    c: state.c,
                    q: state.q,
                    term: state.term
                },
                currency: state.cur
            };
        };
        render();
    })();
    /* ---------- contact form: handled by components/forms/ContactForm.tsx (saved through the API) ---------- */ /* ---------- reels: the videos play in the page ---------- */ var strip = $('strip');
    if (strip) {
        /* Files live in assets/video as reel-01.mp4 … with a poster reel-01.jpg. Add a row here to add a reel. */ var RL = [
            [
                '01',
                'Sakura Gardens',
                'I find my calm · launch film'
            ],
            [
                '02',
                'Avara Resorts',
                'Some places · brand film'
            ],
            [
                '03',
                'Beauty is an opinion',
                'Mood film'
            ],
            [
                '04',
                'Joy Café',
                'F&B reel'
            ],
            [
                '05',
                'Mosavali',
                'Drink · product reel'
            ]
        ];
        var SND = '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>', MUTE = '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9l5 6M21 9l-5 6"/></svg>';
        strip.innerHTML = RL.map(function(r) {
            return '<figure class="phone" style="margin:0"><div class="screen"><video muted loop playsinline preload="none" poster="/assets/video/reel-' + r[0] + '.jpg" aria-label="' + esc(r[1] + ' — ' + r[2]) + '"><source src="/assets/video/reel-' + r[0] + '.mp4" type="video/mp4"></video><button class="snd" type="button" aria-label="Sound on">' + MUTE + '</button><div class="rtag"><b>' + esc(r[1]) + '</b><span class="caps">' + esc(r[2]) + '</span></div></div><figcaption class="pc caps"><span>' + r[0] + ' / ' + pad(RL.length) + '</span><span>' + esc(r[1]) + '</span></figcaption></figure>';
        }).join('');
        var vids = [].slice.call(strip.querySelectorAll('video'));
        vids.forEach(function(v) {
            var sc = v.parentNode, b = sc.querySelector('.snd');
            v.muted = true;
            b.addEventListener('click', function() {
                var on = v.muted;
                vids.forEach(function(o) {
                    if (o !== v && !o.muted) {
                        o.muted = true;
                        o.parentNode.querySelector('.snd').innerHTML = MUTE;
                        o.parentNode.classList.remove('loud');
                    }
                });
                v.muted = !on;
                b.innerHTML = on ? SND : MUTE;
                b.setAttribute('aria-label', on ? 'Sound off' : 'Sound on');
                sc.classList.toggle('loud', on);
                if (on) v.play().catch(function() {});
            });
            v.addEventListener('click', function() {
                if (v.paused) v.play().catch(function() {});
                else v.pause();
            });
        });
        if ('IntersectionObserver' in window && !reduce) {
            var vo = new IntersectionObserver(function(es) {
                es.forEach(function(en) {
                    var v = en.target;
                    if (en.isIntersecting) {
                        if (v.preload === 'none') v.preload = 'auto';
                        v.play().catch(function() {});
                    } else v.pause();
                });
            }, {
                threshold: .35
            });
            vids.forEach(function(v) {
                vo.observe(v);
            });
        } else vids.forEach(function(v) {
            v.controls = true;
        });
        function stepR(dir) {
            var w = strip.querySelector('.phone').getBoundingClientRect().width + 24;
            strip.scrollBy({
                left: dir * w * 2,
                behavior: 'smooth'
            });
        }
        if ($('rlPrev')) $('rlPrev').addEventListener('click', function() {
            stepR(-1);
        });
        if ($('rlNext')) $('rlNext').addEventListener('click', function() {
            stepR(1);
        });
    }
    /* ---------- brand guidelines book ---------- */ var brandsEl = $('brands');
    if (brandsEl) {
        var M = CDN + 'project_modules/1400/';
        var GB = [
            {
                k: 'anira',
                name: 'Anira',
                sub: 'Restaurant · Dubai',
                sw: '#2B3A55',
                pages: [
                    [
                        'The mark',
                        M + '94f17e182132319.6527f8c827c52.jpg'
                    ],
                    [
                        'Brand story',
                        M + 'a8eb15182132319.6527f8c82f351.jpg'
                    ],
                    [
                        'Colour',
                        M + '9a979c182132319.6527f8c828b10.jpg'
                    ],
                    [
                        'Colour in use',
                        M + 'da9c89182132319.6527f8c830242.jpg'
                    ],
                    [
                        'Pattern',
                        M + '4e5200182132319.6527f8c832f61.jpg'
                    ]
                ]
            },
            {
                k: 'silk',
                name: 'Silk Studio',
                sub: 'Creative agency · GCC',
                sw: '#9BD13A',
                pages: [
                    [
                        'The mark',
                        M + 'fd5b38182155533.6528482c5b118.jpg'
                    ],
                    [
                        'Variations',
                        M + '4c4ac7182155533.6528482c5c319.jpg'
                    ],
                    [
                        'Lock-ups',
                        M + '2490a2182155533.6528482c653e2.jpg'
                    ],
                    [
                        'Monochrome',
                        M + 'ddfb9b182155533.6528482c6628a.jpg'
                    ],
                    [
                        'The icon',
                        M + 'bc3e8d182155533.6528482c5fe9d.jpg'
                    ]
                ]
            },
            {
                k: 'velino',
                name: 'Velino',
                sub: 'Fashion label',
                sw: '#6E1420',
                pages: [
                    [
                        'The mark',
                        cover(BY.velino)
                    ],
                    [
                        'On colour',
                        M + '0701a7205197431.66b65002ead23.jpg'
                    ],
                    [
                        'Wordmark',
                        M + '5e84ec205197431.66b65002eb3e7.jpg'
                    ]
                ]
            },
            {
                k: 'fanatk',
                name: 'Fanatk',
                sub: 'Chocolate · packaging',
                sw: '#5A3463',
                pages: [
                    [
                        'Cover',
                        cover(BY.fanatk)
                    ],
                    [
                        'Logo system',
                        M + '7d0155182161079.65286102b96f5.jpg'
                    ],
                    [
                        'On colour',
                        M + '2de59c182161079.65286102c1d86.jpg'
                    ],
                    [
                        'Brand world',
                        inner(BY.fanatk)
                    ]
                ]
            },
            {
                k: 'avara',
                name: 'Avara',
                sub: 'Resorts & sanctuaries',
                sw: '#3E4A2E',
                pages: [
                    [
                        'Cover',
                        W + 'avara/01.webp'
                    ],
                    [
                        'A ritual of renewal',
                        W + 'avara/02.webp'
                    ],
                    [
                        'Community',
                        W + 'avara/03.webp'
                    ],
                    [
                        'Experiences',
                        W + 'avara/04.webp'
                    ],
                    [
                        'The collection',
                        W + 'avara/05.webp'
                    ],
                    [
                        'Legends',
                        W + 'avara/06.webp'
                    ],
                    [
                        'Resorts',
                        W + 'avara/07.webp'
                    ],
                    [
                        'Vicus',
                        W + 'avara/09.webp'
                    ]
                ]
            }
        ];
        var toc = $('toc'), pw = $('pagewrap'), gb = 0, pg = 0;
        brandsEl.innerHTML = GB.map(function(b, i) {
            return '<button type="button" role="tab" id="gb-' + b.k + '" aria-pressed="' + (i ? 'false' : 'true') + '" style="--sw:' + b.sw + '"><i></i>' + esc(b.name) + '</button>';
        }).join('');
        var palette = function(img, cb) {
            try {
                var c = document.createElement('canvas'), w = 80, h = Math.max(1, Math.round(80 * img.naturalHeight / img.naturalWidth));
                c.width = w;
                c.height = h;
                var x = c.getContext('2d');
                x.drawImage(img, 0, 0, w, h);
                var d = x.getImageData(0, 0, w, h).data, bins = {};
                for(var i = 0; i < d.length; i += 4){
                    var r = d[i] >> 4, g = d[i + 1] >> 4, b = d[i + 2] >> 4, k = r + ',' + g + ',' + b;
                    bins[k] = (bins[k] || 0) + 1;
                }
                var arr = Object.keys(bins).map(function(k) {
                    var p = k.split(',').map(Number);
                    return {
                        c: p.map(function(v) {
                            return v * 16 + 8;
                        }),
                        n: bins[k]
                    };
                }).sort(function(a, b) {
                    return b.n - a.n;
                });
                var out = [];
                arr.forEach(function(e) {
                    if (out.length >= 6) return;
                    if (out.every(function(o) {
                        return Math.abs(o[0] - e.c[0]) + Math.abs(o[1] - e.c[1]) + Math.abs(o[2] - e.c[2]) > 70;
                    })) out.push(e.c);
                });
                cb(out);
            } catch (err) {
                cb(null);
            }
        };
        var hexA = function(c) {
            return '#' + c.map(function(v) {
                return Math.min(255, v).toString(16).padStart(2, '0');
            }).join('').toUpperCase();
        };
        var renderToc = function() {
            var b = GB[gb];
            toc.innerHTML = '<div class="bn"><b>' + esc(b.name) + '</b><span class="caps">' + esc(b.sub) + '</span></div><div class="chap" role="tablist">' + b.pages.map(function(p, i) {
                return '<button type="button" role="tab" aria-selected="' + (i === pg ? 'true' : 'false') + '" data-i="' + i + '"><span class="caps">' + pad(i + 1) + '</span><b>' + esc(p[0]) + '</b></button>';
            }).join('') + '</div><div class="sws"><span class="caps" style="color:var(--mute)">Palette · sampled live</span><div class="row2" id="sws"></div></div>';
        };
        var showPage = function(i) {
            var b = GB[gb];
            pg = (i + b.pages.length) % b.pages.length;
            [].forEach.call(toc.querySelectorAll('[data-i]'), function(x, j) {
                x.setAttribute('aria-selected', j === pg ? 'true' : 'false');
            });
            $('folioL').textContent = b.name + ' · ' + b.pages[pg][0];
            $('folioR').textContent = pad(pg + 1) + ' / ' + pad(b.pages.length);
            var old = [].slice.call(pw.querySelectorAll('img')), msg = pw.querySelector('.noimg-msg');
            if (msg) msg.remove();
            var im2 = new Image();
            if (/^https?:/.test(b.pages[pg][1])) im2.crossOrigin = 'anonymous';
            im2.referrerPolicy = 'no-referrer';
            im2.alt = b.name + ' — ' + b.pages[pg][0];
            im2.className = 'enter';
            im2.onload = function() {
                requestAnimationFrame(function() {
                    im2.className = 'shown';
                });
                old.forEach(function(o) {
                    setTimeout(function() {
                        o.remove();
                    }, 1000);
                });
                palette(im2, function(cols) {
                    var el = $('sws');
                    if (!el) return;
                    if (!cols) {
                        el.parentNode.style.display = 'none';
                        return;
                    }
                    el.parentNode.style.display = '';
                    el.innerHTML = cols.map(function(c) {
                        var h = hexA(c);
                        return '<i style="background:' + h + '" data-hex="' + h + '" title="' + h + '"></i>';
                    }).join('');
                });
            };
            im2.onerror = function() {
                old.forEach(function(o) {
                    o.remove();
                });
                var m = document.createElement('div');
                m.className = 'noimg-msg';
                m.textContent = b.name + ' · ' + b.pages[pg][0];
                pw.appendChild(m);
            };
            im2.src = b.pages[pg][1];
            pw.insertBefore(im2, pw.querySelector('.nav2'));
        };
        var showBrand = function(i) {
            gb = i;
            pg = 0;
            [].forEach.call(brandsEl.children, function(x, j) {
                x.setAttribute('aria-pressed', j === i ? 'true' : 'false');
            });
            renderToc();
            showPage(0);
        };
        toc.addEventListener('click', function(e) {
            var t = e.target.closest('[data-i]');
            if (t) showPage(+t.dataset.i);
            var s = e.target.closest('#sws i');
            if (!s) return;
            var hx = s.dataset.hex;
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(hx).then(function() {
                say(hx + ' copied');
            }, function() {
                say(hx);
            });
            else say(hx);
        });
        brandsEl.addEventListener('click', function(e) {
            var t = e.target.closest('button');
            if (t) showBrand([].indexOf.call(brandsEl.children, t));
        });
        $('pgPrev').addEventListener('click', function() {
            showPage(pg - 1);
        });
        $('pgNext').addEventListener('click', function() {
            showPage(pg + 1);
        });
        showBrand(0);
    }
    /* ---------- PLAY: brief spinner ---------- */ (function() {
        var reels = $('briefReels');
        if (!reels) return;
        var R = [
            [
                'For',
                'a <em>real estate</em> launch',
                'a <em>caviar</em> house',
                'a desert <em>retreat</em>',
                'a <em>café</em> brand',
                'a <em>fashion</em> label',
                'a <em>wellness</em> studio',
                'a <em>tech</em> startup',
                'a <em>chocolate</em> brand'
            ],
            [
                'Mood',
                '<em>quiet</em> luxury',
                'desert <em>warmth</em>',
                'bold &amp; <em>graphic</em>',
                'editorial <em>calm</em>',
                'Arabic <em>calligraphy</em>',
                '<em>copper</em> &amp; stone',
                'modern <em>heritage</em>',
                'night <em>gold</em>'
            ],
            [
                'Make',
                'a <em>logo</em> system',
                'a launch <em>campaign</em>',
                'a sales <em>brochure</em>',
                'a social <em>grid</em>',
                'a <em>guidelines</em> book',
                '<em>packaging</em>',
                'a road <em>billboard</em>',
                'a landing <em>page</em>'
            ]
        ];
        var N = 0, spinning = false, picks = [
            0,
            0,
            0
        ];
        reels.innerHTML = R.map(function(r) {
            var items = r.slice(1);
            var list = '';
            for(var k = 0; k < 4; k++)list += items.map(function(t) {
                return '<li>' + t + '</li>';
            }).join('');
            return '<div class="reel"><span class="cap2">' + r[0] + '</span><ul>' + list + '</ul></div>';
        }).join('');
        var uls = [].slice.call(reels.querySelectorAll('ul'));
        function h() {
            return reels.querySelector('li').getBoundingClientRect().height;
        }
        uls.forEach(function(u) {
            u.style.transform = 'translateY(0)';
        });
        function strip2(s) {
            var d = document.createElement('div');
            d.innerHTML = s;
            return d.textContent;
        }
        $('spinBtn').addEventListener('click', function() {
            if (spinning) return;
            spinning = true;
            var H = h();
            uls.forEach(function(u, i) {
                var n = R[i].length - 1, pick = Math.floor(Math.random() * n);
                picks[i] = pick;
                var idx = n * 2 + pick;
                u.style.transition = 'none';
                u.style.transform = 'translateY(0)';
                u.offsetHeight;
                u.style.transition = 'transform ' + (1.4 + i * .45) + 's cubic-bezier(.15,.9,.2,1)';
                u.style.transform = 'translateY(' + -idx * H + 'px)';
            });
            setTimeout(function() {
                spinning = false;
                N++;
                $('briefN').textContent = N;
                var a = R[0][picks[0] + 1], b = R[1][picks[1] + 1], c = R[2][picks[2] + 1];
                var sentence = strip2(c) + ' with ' + strip2(b) + ', for ' + strip2(a) + '.';
                $('briefOut').innerHTML = '“' + c.charAt(0).toUpperCase() + c.slice(1) + ' with ' + b + ', for ' + a + '.” <br><a href="mailto:talalatallah10@gmail.com?subject=' + encodeURIComponent('Brief: ' + sentence) + '">Send this brief to Talal ↗</a>';
            }, 2500);
        });
    })();
    /* ---------- PLAY: do & don't quiz ---------- */ (function() {
        var tilesEl = $('tiles');
        if (!tilesEl) return;
        var WRONG = [
            [
                'Never stretch the mark',
                'transform="matrix(1.45 0 0 .78 -235 116)"',
                ''
            ],
            [
                'Never rotate the mark',
                'transform="rotate(24 530 530)"',
                ''
            ],
            [
                'Never change the colour',
                '',
                'fill="#3A6FD8"'
            ],
            [
                'Never outline the mark',
                '',
                'fill="none" stroke="currentColor" stroke-width="22"'
            ],
            [
                'Never add effects',
                'filter="url(#qShadow)"',
                ''
            ],
            [
                'Never rebuild the pieces',
                '',
                '',
                'swap'
            ],
            [
                'Keep the clear space',
                'transform="matrix(1.9 0 0 1.9 -477 -477)"',
                ''
            ]
        ];
        var round = 0, score = 0, locked = false;
        function svgFor(t, attrs, fill, mode) {
            var base = '<svg viewBox="-80 -80 1220 1220" aria-hidden="true"><defs><filter id="qShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="40" dy="50" stdDeviation="30" flood-color="#000" flood-opacity=".55"/></filter></defs><g ' + (attrs || '') + ' fill="currentColor" ' + (fill || '') + '>';
            if (mode === 'swap') return base + '<path d="' + SUN + '" transform="rotate(180 530 304)"/><path d="' + ROOF + '"/><path d="' + DOOR + '" transform="translate(0 -760)"/></g></svg>';
            return base + '<path d="' + SUN + '"/><path d="' + ROOF + '"/><path d="' + DOOR + '"/></g></svg>';
        }
        function newRound() {
            locked = false;
            round++;
            $('quizRound').textContent = Math.min(round, 5);
            if (round > 5) {
                tilesEl.innerHTML = '';
                $('qq').innerHTML = score >= 4 ? 'You read guidelines like a <em>designer</em>.' : 'Every brand has <em>rules</em>. Now you know four.';
                $('quizMsg').textContent = 'Score ' + score + ' / 5.';
                $('quizNext').textContent = 'Play again';
                return;
            }
            $('quizNext').textContent = 'Next round';
            $('qq').innerHTML = 'Round ' + round + ': which one follows the <em>guidelines</em>?';
            var pool = WRONG.slice().sort(function() {
                return Math.random() - .5;
            }).slice(0, 3), correct = Math.floor(Math.random() * 4), k = 0, html = '';
            for(var i = 0; i < 4; i++){
                if (i === correct) html += '<button class="tile" type="button" data-ok="1" style="color:var(--copper)">' + svgFor() + '<span class="tag">Correct use</span></button>';
                else {
                    var w = pool[k++];
                    html += '<button class="tile" type="button" data-ok="0" style="color:var(--copper)">' + svgFor(null, w[1], w[2], w[3]) + '<span class="tag">' + w[0] + '</span></button>';
                }
            }
            tilesEl.innerHTML = html;
        }
        tilesEl.addEventListener('click', function(e) {
            var t = e.target.closest('.tile');
            if (!t || locked) return;
            locked = true;
            var ok = t.dataset.ok === '1';
            if (ok) {
                score++;
                t.classList.add('ok');
                $('quizMsg').textContent = 'Right. The mark stays exactly as drawn.';
            } else {
                t.classList.add('bad');
                tilesEl.querySelector('[data-ok="1"]').classList.add('ok');
                $('quizMsg').textContent = t.querySelector('.tag').textContent + '.';
            }
            $('quizScore').textContent = score;
            setTimeout(function() {
                if (round <= 5) newRound();
            }, 1700);
        });
        $('quizNext').addEventListener('click', function() {
            if (round > 5) {
                round = 0;
                score = 0;
                $('quizScore').textContent = 0;
            }
            newRound();
        });
        newRound();
    })();
    /* ---------- PLAY: cut on the beat ---------- */ (function() {
        var area = $('cutArea');
        if (!area) return;
        var tl = $('tl'), head = $('head'), fb = $('cutFb'), vis = watch(area);
        var B = [
            .12,
            .29,
            .45,
            .6,
            .76,
            .9
        ], D = 4200, run = false, t0 = 0, pass = 0, score = 0, hits = [], marks = [];
        var beats = B.map(function(b) {
            var d = document.createElement('span');
            d.className = 'beat';
            d.style.left = b * 100 + '%';
            d.innerHTML = '<i></i>';
            tl.appendChild(d);
            return d;
        });
        function clearPass() {
            hits = B.map(function() {
                return false;
            });
            beats.forEach(function(b) {
                b.classList.remove('hit', 'miss');
            });
            marks.forEach(function(m) {
                m.remove();
            });
            marks = [];
        }
        function start() {
            run = true;
            pass = 1;
            score = 0;
            t0 = performance.now();
            clearPass();
            $('cutPass').textContent = 1;
            $('cutScore').textContent = 0;
            fb.textContent = 'Cut!';
            $('cutStart').textContent = 'Restart';
            $('cutMsg').textContent = 'Three passes. Perfect cuts score double.';
        }
        function cut() {
            if (!run) {
                start();
                return;
            }
            var x = (performance.now() - t0) % D / D, best = -1, bd = 1;
            B.forEach(function(b, i) {
                var d = Math.abs(b - x);
                if (!hits[i] && d < bd) {
                    bd = d;
                    best = i;
                }
            });
            var ms = bd * D, m = document.createElement('span');
            m.className = 'cutm';
            m.style.left = x * 100 + '%';
            tl.appendChild(m);
            marks.push(m);
            if (best >= 0 && ms < 70) {
                hits[best] = true;
                beats[best].classList.add('hit');
                score += 2;
                fb.textContent = 'Perfect cut.';
            } else if (best >= 0 && ms < 160) {
                hits[best] = true;
                beats[best].classList.add('hit');
                score += 1;
                fb.textContent = x < B[best] ? 'A frame early.' : 'A frame late.';
            } else {
                m.classList.add('bad');
                score = Math.max(0, score - 1);
                fb.textContent = 'Off the beat.';
            }
            $('cutScore').textContent = score;
        }
        area.addEventListener('pointerdown', function(e) {
            if (e.target.closest('#cutStart')) return;
            cut();
        });
        $('cutStart').addEventListener('click', function(e) {
            e.stopPropagation();
            start();
        });
        addEventListener('keydown', function(e) {
            if (e.code !== 'Space' || !vis.on || !run) return;
            var t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest && t.closest('button,a,[role=button]'))) return;
            var r = area.getBoundingClientRect();
            if (r.top > innerHeight || r.bottom < 0) return;
            e.preventDefault();
            cut();
        });
        (function loop() {
            if (vis.on && run) {
                var el = performance.now() - t0, x = el % D / D, p = Math.floor(el / D) + 1;
                head.style.left = x * 100 + '%';
                if (p !== pass) {
                    beats.forEach(function(b, i) {
                        if (!hits[i]) b.classList.add('miss');
                    });
                    pass = p;
                    if (pass > 3) {
                        run = false;
                        var max = B.length * 3 * 2;
                        $('cutMsg').textContent = 'Final score ' + score + ' of ' + max + '.';
                        fb.textContent = score >= max * .75 ? 'That edit is ready to post.' : score >= max * .4 ? 'Good rhythm. One more take?' : 'Every editor needs a second take.';
                        head.style.left = '0%';
                        $('cutStart').textContent = 'Play again';
                    } else {
                        setTimeout(clearPass, 180);
                        $('cutPass').textContent = pass;
                    }
                }
            }
            requestAnimationFrame(loop);
        })();
    })();
    /* ---------- PLAY: pen tool ---------- */ (function() {
        var pen = $('pen'), idea = $('idea');
        if (!pen || !idea) return;
        var A = [], C = [], drag = null, target = null, auto = 0, vis = watch(idea);
        function layout() {
            var w = idea.clientWidth, h = idea.clientHeight;
            A = [
                [
                    w * .14,
                    h * .78
                ],
                [
                    w * .5,
                    h * .62
                ],
                [
                    w * .86,
                    h * .2
                ]
            ];
            C = [
                [
                    w * .36,
                    h * .38
                ],
                [
                    w * .66,
                    h * .9
                ]
            ];
            target = null;
            draw();
        }
        function draw() {
            var a0 = A[0], a1 = A[1], a2 = A[2], c1 = C[0], c2 = C[1], m1 = [
                2 * a1[0] - c2[0],
                2 * a1[1] - c2[1]
            ];
            $('curve').setAttribute('d', 'M' + a0[0] + ' ' + a0[1] + ' C' + c1[0] + ' ' + c1[1] + ' ' + m1[0] + ' ' + m1[1] + ' ' + a1[0] + ' ' + a1[1] + ' S' + c2[0] + ' ' + c2[1] + ' ' + a2[0] + ' ' + a2[1]);
            function L(id, p, q) {
                var l = $(id);
                l.setAttribute('x1', p[0]);
                l.setAttribute('y1', p[1]);
                l.setAttribute('x2', q[0]);
                l.setAttribute('y2', q[1]);
            }
            L('h1a', a0, c1);
            L('h1b', a1, m1);
            L('h2a', a1, c2);
            L('h2b', a2, c2);
            $('c1').setAttribute('cx', c1[0]);
            $('c1').setAttribute('cy', c1[1]);
            $('c2').setAttribute('cx', c2[0]);
            $('c2').setAttribute('cy', c2[1]);
            [
                'a0',
                'a1',
                'a2'
            ].forEach(function(id, i) {
                $(id).setAttribute('x', A[i][0] - 4);
                $(id).setAttribute('y', A[i][1] - 4);
            });
            $('arrow').setAttribute('transform', 'translate(' + (c2[0] + 6) + ' ' + (c2[1] + 6) + ')');
        }
        layout();
        addEventListener('resize', layout);
        idea.addEventListener('pointermove', function(e) {
            var p = local(e, idea);
            if (drag) {
                drag[0] = p[0];
                drag[1] = p[1];
                draw();
                return;
            }
            target = p;
        });
        idea.addEventListener('pointerleave', function() {
            target = null;
        });
        pen.addEventListener('pointerdown', function(e) {
            var map = {
                a0: A[0],
                a1: A[1],
                a2: A[2],
                c1: C[0],
                c2: C[1]
            };
            if (map[e.target.id]) {
                drag = map[e.target.id];
                pen.setPointerCapture(e.pointerId);
                e.preventDefault();
            }
        });
        addEventListener('pointerup', function() {
            drag = null;
        });
        (function loop() {
            if (vis.on && !drag) {
                var w = idea.clientWidth, h = idea.clientHeight, tx, ty;
                if (target) {
                    tx = target[0];
                    ty = target[1];
                } else {
                    auto += .008;
                    tx = w * (.66 + .12 * Math.sin(auto));
                    ty = h * (.72 + .2 * Math.cos(auto * 1.3));
                }
                C[1][0] += (tx - C[1][0]) * .08;
                C[1][1] += (ty - C[1][1]) * .08;
                draw();
            }
            requestAnimationFrame(loop);
        })();
    })();
    /* ---------- PLAY: kerning with the real TALAL·AT letters ---------- */ (function() {
        var svg = $('kernSvg');
        if (!svg) return;
        var NS = 'http://www.w3.org/2000/svg';
        var guide = document.createElementNS(NS, 'line');
        guide.setAttribute('class', 'guide');
        guide.setAttribute('x1', '-60');
        guide.setAttribute('x2', '2614');
        guide.setAttribute('y1', '407');
        guide.setAttribute('y2', '407');
        svg.appendChild(guide);
        var G = LETTERS.map(function(d) {
            var p = document.createElementNS(NS, 'path');
            p.setAttribute('d', d);
            p.setAttribute('fill-rule', 'evenodd');
            p.setAttribute('class', 'lt');
            svg.appendChild(p);
            return p;
        });
        var dx = G.map(function() {
            return 0;
        }), done = false;
        var score = $('kernScore'), msg = $('kernMsg');
        function apply(anim) {
            G.forEach(function(g, i) {
                g.style.transition = anim ? 'transform 1s cubic-bezier(.19,1,.22,1), fill .3s' : 'fill .3s';
                g.style.transform = 'translateX(' + dx[i].toFixed(1) + 'px)';
            });
            rate();
        }
        function rate() {
            var m = dx.reduce(function(s, v) {
                return s + Math.abs(v);
            }, 0) / dx.length, sc = Math.max(0, Math.round(100 - m / 1.6));
            score.textContent = sc;
            if (sc >= 98 && !done) {
                done = true;
                msg.textContent = 'Perfect. That is exactly how TALAL·AT is spaced.';
            } else if (sc < 98) {
                done = false;
                msg.textContent = sc > 85 ? 'Almost. Trust your eye.' : sc > 60 ? 'Getting there. Watch the space between A and T.' : 'The logo lost its spacing. Can you fix it?';
            }
        }
        function shuffle() {
            dx = G.map(function(g, i) {
                var s = (i % 2 ? 1 : -1) * (Math.random() < .5 ? 1 : -1);
                return s * (70 + Math.random() * 150);
            });
            done = false;
            apply(true);
        }
        var drag = -1, sx = 0, sd = 0;
        G.forEach(function(g, i) {
            g.addEventListener('pointerdown', function(e) {
                drag = i;
                sx = e.clientX;
                sd = dx[i];
                g.classList.add('drag');
                g.setPointerCapture(e.pointerId);
                g.style.transition = 'fill .3s';
                e.preventDefault();
            });
        });
        svg.addEventListener('pointermove', function(e) {
            if (drag < 0) return;
            var k = 2554 / svg.getBoundingClientRect().width;
            dx[drag] = sd + (e.clientX - sx) * k;
            G[drag].style.transform = 'translateX(' + dx[drag].toFixed(1) + 'px)';
            rate();
        });
        function up() {
            if (drag < 0) return;
            if (Math.abs(dx[drag]) < 16) {
                dx[drag] = 0;
                apply(true);
            }
            G[drag].classList.remove('drag');
            drag = -1;
            rate();
        }
        svg.addEventListener('pointerup', up);
        svg.addEventListener('pointercancel', up);
        $('kernShuffle').addEventListener('click', shuffle);
        $('kernShow').addEventListener('click', function() {
            dx = dx.map(function() {
                return 0;
            });
            apply(true);
        });
        shuffle();
    })();
    /* ---------- PLAY: eyedropper, match the copper ---------- */ (function() {
        var cv = $('matchCv');
        if (!cv) return;
        var ctx = cv.getContext('2d'), eye = $('eye'), area = cv.parentNode;
        var T = [
            183,
            117,
            54
        ];
        function hsl2rgb(h, s, l) {
            var a = s * Math.min(l, 1 - l);
            function f(n) {
                var k = (n + h / 30) % 12;
                return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
            }
            return [
                f(0),
                f(8),
                f(4)
            ];
        }
        function lab(c) {
            var r = c.map(function(v) {
                v /= 255;
                return v > .04045 ? Math.pow((v + .055) / 1.055, 2.4) : v / 12.92;
            });
            var x = (r[0] * .4124 + r[1] * .3576 + r[2] * .1805) / .95047, y = r[0] * .2126 + r[1] * .7152 + r[2] * .0722, z = (r[0] * .0193 + r[1] * .1192 + r[2] * .9505) / 1.08883;
            function f(t) {
                return t > .008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
            }
            return [
                116 * f(y) - 16,
                500 * (f(x) - f(y)),
                200 * (f(y) - f(z))
            ];
        }
        function de(a, b) {
            var p = lab(a), q = lab(b);
            return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
        }
        function at(x, y) {
            var w = cv.clientWidth, h = cv.clientHeight;
            return hsl2rgb(360 * x / w, .58, .86 - .72 * y / h);
        }
        function hex(c) {
            return '#' + c.map(function(v) {
                return v.toString(16).padStart(2, '0');
            }).join('').toUpperCase();
        }
        function draw() {
            var w = area.clientWidth, h = area.clientHeight;
            cv.width = Math.max(2, Math.round(w / 2));
            cv.height = Math.max(2, Math.round(h / 2));
            var d = ctx.createImageData(cv.width, cv.height);
            for(var y = 0; y < cv.height; y++)for(var x = 0; x < cv.width; x++){
                var c = hsl2rgb(360 * x / cv.width, .58, .86 - .72 * y / cv.height), k = (y * cv.width + x) * 4;
                d.data[k] = c[0];
                d.data[k + 1] = c[1];
                d.data[k + 2] = c[2];
                d.data[k + 3] = 255;
            }
            ctx.putImageData(d, 0, 0);
        }
        draw();
        var rt;
        addEventListener('resize', function() {
            clearTimeout(rt);
            rt = setTimeout(draw, 200);
        });
        function move(e) {
            var p = local(e, area);
            eye.style.left = p[0] + 'px';
            eye.style.top = p[1] + 'px';
            eye.style.background = hex(at(p[0], p[1]));
            eye.classList.add('on');
        }
        area.addEventListener('pointermove', move);
        area.addEventListener('pointerleave', function() {
            eye.classList.remove('on');
        });
        area.addEventListener('click', function(e) {
            move(e);
            var p = local(e, area), c = at(p[0], p[1]), d = de(c, T), sc = Math.max(0, Math.round(100 - d * 2.2));
            $('pickSw').style.background = hex(c);
            $('pickHex').textContent = hex(c);
            $('matchScore').textContent = sc;
            $('matchMsg').textContent = sc >= 95 ? 'That is the one. #B77536, the TALAL·AT copper.' : sc >= 80 ? 'Very close. A touch ' + (lab(c)[0] > lab(T)[0] ? 'darker.' : 'lighter.') : sc >= 50 ? 'Warm, but not copper yet.' : 'Keep looking. Copper lives between orange and brown.';
        });
    })();
    /* ---------- PLAY: magnetic grid, stamp the mark ---------- */ (function() {
        var cv = $('gridCv');
        if (!cv) return;
        var ctx = cv.getContext('2d'), area = cv.parentNode, vis = watch(area);
        var icon = [
            new Path2D(SUN),
            new Path2D(ROOF),
            new Path2D(DOOR)
        ];
        var dots = [], S = 30, P2 = null, marks = [], dpr = Math.min(2, devicePixelRatio || 1), auto = 0;
        function build() {
            var w = area.clientWidth, h = area.clientHeight;
            cv.width = w * dpr;
            cv.height = h * dpr;
            dots = [];
            for(var y = S / 2; y < h; y += S)for(var x = S / 2; x < w; x += S)dots.push({
                x: x,
                y: y,
                ox: x,
                oy: y,
                vx: 0,
                vy: 0
            });
        }
        build();
        addEventListener('resize', build);
        area.addEventListener('pointermove', function(e) {
            var p = local(e, area);
            P2 = [
                p[0],
                p[1]
            ];
        });
        area.addEventListener('pointerleave', function() {
            P2 = null;
        });
        area.addEventListener('click', function(e) {
            var p = local(e, area), gx = Math.round((p[0] - S / 2) / S) * S + S / 2, gy = Math.round((p[1] - S / 2) / S) * S + S / 2;
            marks.push({
                x: gx,
                y: gy,
                t: 0,
                r: (Math.random() < .5 ? -1 : 1) * Math.PI / 12 * Math.floor(Math.random() * 3)
            });
            if (marks.length > 40) marks.shift();
            $('gridCount').textContent = marks.length;
            $('gridMsg').textContent = marks.length >= 12 ? 'A pattern. You just designed a brand texture.' : marks.length >= 4 ? 'Repetition builds recognition.' : 'Everything snaps to the grid. Even you.';
        });
        $('gridClear').addEventListener('click', function() {
            marks = [];
            $('gridCount').textContent = 0;
        });
        (function loop() {
            if (vis.on) {
                var w = area.clientWidth, h = area.clientHeight, col = css('--line2'), cop = css('--copper'), pt = P2;
                if (!pt && !fine) {
                    auto += .01;
                    pt = [
                        w * (.5 + .35 * Math.sin(auto)),
                        h * (.5 + .3 * Math.cos(auto * 1.4))
                    ];
                }
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, w, h);
                ctx.fillStyle = col;
                for(var i = 0; i < dots.length; i++){
                    var d = dots[i], fx2 = 0, fy2 = 0;
                    if (pt) {
                        var ddx = d.x - pt[0], ddy = d.y - pt[1], dist = Math.hypot(ddx, ddy), R = 130;
                        if (dist < R && dist > 0.1) {
                            var f = (1 - dist / R) * 7;
                            fx2 = ddx / dist * f;
                            fy2 = ddy / dist * f;
                        }
                    }
                    d.vx = (d.vx + fx2 + (d.ox - d.x) * .08) * .82;
                    d.vy = (d.vy + fy2 + (d.oy - d.y) * .08) * .82;
                    d.x += d.vx;
                    d.y += d.vy;
                    var near = pt ? Math.max(0, 1 - Math.hypot(d.x - pt[0], d.y - pt[1]) / 130) : 0;
                    ctx.fillStyle = near > .05 ? cop : col;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, 1.2 + near * 1.8, 0, 6.283);
                    ctx.fill();
                }
                ctx.fillStyle = cop;
                marks.forEach(function(m) {
                    m.t = Math.min(1, m.t + .06);
                    var e = 1 - Math.pow(1 - m.t, 3), s = S * 1.15 / 1060 * e;
                    ctx.save();
                    ctx.translate(m.x, m.y);
                    ctx.rotate(m.r * (1 - e));
                    ctx.scale(s, s);
                    ctx.translate(-530, -530);
                    icon.forEach(function(p) {
                        ctx.fill(p);
                    });
                    ctx.restore();
                });
            }
            requestAnimationFrame(loop);
        })();
    })();
    /* ---------- PLAY: build the mark ---------- */ (function() {
        var area = document.querySelector('#build .area');
        if (!area) return;
        var vis = watch(area), pct = $('buildPct'), msg = $('buildMsg');
        var pieces = [
            [
                $('bSun'),
                -260,
                -420,
                -75,
                .7
            ],
            [
                $('bRoof'),
                430,
                260,
                40,
                .85
            ],
            [
                $('bDoor'),
                -460,
                330,
                -140,
                1.4
            ]
        ];
        var f = 0, target = 0, ptr = null;
        area.addEventListener('pointermove', function(e) {
            var p = local(e, area);
            ptr = [
                p[0],
                p[1],
                p[2]
            ];
        });
        area.addEventListener('pointerleave', function() {
            ptr = null;
        });
        (function loop() {
            if (vis.on) {
                var r = area.getBoundingClientRect();
                if (ptr) {
                    var d = Math.hypot(ptr[0] - r.width / 2, ptr[1] - r.height / 2), R = Math.min(r.width, r.height) * .75;
                    target = Math.max(0, Math.min(1, 1 - (d - 30) / R));
                } else if (!fine) {
                    var c = r.top + r.height / 2;
                    target = Math.max(0, Math.min(1, 1 - Math.abs(c - innerHeight / 2) / (innerHeight * .45)));
                } else target = 0;
                f += (target - f) * .08;
                var e = f * f * (3 - 2 * f);
                pieces.forEach(function(p) {
                    var k = 1 - e;
                    p[0].style.transform = 'translate(' + (p[1] * k).toFixed(1) + 'px,' + (p[2] * k).toFixed(1) + 'px) rotate(' + (p[3] * k).toFixed(1) + 'deg) scale(' + (1 + (p[4] - 1) * k).toFixed(3) + ')';
                    p[0].style.opacity = (.35 + .65 * e).toFixed(2);
                });
                var v = Math.round(e * 100);
                pct.textContent = v;
                msg.textContent = v >= 98 ? 'The TALAL·AT mark: a sun, a roof, a door.' : v > 60 ? 'Almost there. Every piece has its place.' : 'Three pieces, one mark. Come closer.';
            }
            requestAnimationFrame(loop);
        })();
    })();
    /* ---------- PLAY: weight wave ---------- */ (function() {
        var box = $('waveWord');
        if (!box) return;
        var area = box.parentNode, vis = watch(area), out = $('waveW');
        box.innerHTML = [
            'THINK.',
            'INSPIRE.',
            'DESIGN.'
        ].map(function(w) {
            return '<span class="wd">' + w.split('').map(function(c) {
                return '<span>' + c + '</span>';
            }).join('') + '</span>';
        }).join('');
        var L = [].slice.call(box.querySelectorAll('.wd>span')), ptr = null, t = 0;
        area.addEventListener('pointermove', function(e) {
            ptr = [
                e.clientX,
                e.clientY
            ];
        });
        area.addEventListener('pointerleave', function() {
            ptr = null;
        });
        (function loop() {
            if (vis.on) {
                t += .03;
                var maxW = 200, cop = css('--copper');
                L.forEach(function(s, i) {
                    var r = s.getBoundingClientRect(), cxx = r.left + r.width / 2, cyy = r.top + r.height / 2, k;
                    if (ptr) {
                        var d = Math.hypot(ptr[0] - cxx, (ptr[1] - cyy) * 1.6);
                        k = Math.max(0, 1 - d / 260);
                    } else {
                        k = (Math.sin(t - i * .45) + 1) / 2 * .8;
                    }
                    var w = Math.round(100 + 800 * k);
                    s.style.fontWeight = w;
                    s.style.color = k > .62 ? cop : '';
                    if (w > maxW) maxW = w;
                });
                out.textContent = maxW;
            }
            requestAnimationFrame(loop);
        })();
    })();
    /* ---------- PLAY: sign here ---------- */ (function() {
        var cv = $('signCv');
        if (!cv) return;
        var ctx = cv.getContext('2d'), area = cv.parentNode, ph = $('signPh'), msg = $('signMsg');
        var dpr = Math.min(2, devicePixelRatio || 1), strokes = [], curS = null, len = 0;
        function size() {
            cv.width = area.clientWidth * dpr;
            cv.height = area.clientHeight * dpr;
            redraw();
        }
        function seg(a, b, c) {
            ctx.beginPath();
            ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
            ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
            ctx.lineWidth = b.w;
            ctx.stroke();
        }
        function redraw() {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, cv.width, cv.height);
            ctx.strokeStyle = css('--copper');
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            strokes.forEach(function(s) {
                for(var i = 1; i < s.length - 1; i++)seg(s[i - 1], s[i], s[i + 1]);
            });
        }
        redrawers.push(redraw);
        size();
        addEventListener('resize', size);
        area.addEventListener('pointerdown', function(e) {
            var p = local(e, area);
            curS = [
                {
                    x: p[0],
                    y: p[1],
                    w: 2.4,
                    t: performance.now()
                }
            ];
            strokes.push(curS);
            area.setPointerCapture(e.pointerId);
            ph.style.opacity = 0;
        });
        area.addEventListener('pointermove', function(e) {
            if (!curS) return;
            var p = local(e, area), l = curS[curS.length - 1], now = performance.now(), dist = Math.hypot(p[0] - l.x, p[1] - l.y);
            if (dist < 1.5) return;
            var v = dist / Math.max(1, now - l.t), w = Math.max(.9, Math.min(4, 3.6 - v * 1.4));
            w = l.w + (w - l.w) * .35;
            curS.push({
                x: p[0],
                y: p[1],
                w: w,
                t: now
            });
            len += dist;
            ctx.strokeStyle = css('--copper');
            ctx.lineCap = 'round';
            if (curS.length > 2) seg(curS[curS.length - 3], curS[curS.length - 2], curS[curS.length - 1]);
        });
        function end() {
            if (!curS) return;
            curS = null;
            if (len > 260) msg.textContent = 'Signed. Now send it, and we start.';
        }
        area.addEventListener('pointerup', end);
        area.addEventListener('pointercancel', end);
        $('signClear').addEventListener('click', function() {
            strokes = [];
            len = 0;
            redraw();
            ph.style.opacity = 1;
            msg.textContent = 'Every project starts with a signature.';
        });
    })();
    /* ---------- lead + counters ---------- */ var lead = $('lead'), LW = [];
    if (lead) {
        (function wrapW(n) {
            [].slice.call(n.childNodes).forEach(function(c) {
                if (c.nodeType === 3) {
                    var f = document.createDocumentFragment();
                    c.textContent.split(/(\s+)/).forEach(function(w) {
                        if (!w || /^\s+$/.test(w)) f.appendChild(document.createTextNode(w));
                        else {
                            var s = document.createElement('span');
                            s.className = 'w';
                            s.textContent = w;
                            f.appendChild(s);
                        }
                    });
                    c.replaceWith(f);
                } else if (c.nodeType === 1) wrapW(c);
            });
        })(lead);
        LW = [].slice.call(lead.querySelectorAll('.w'));
    }
    function fmt(n, k) {
        return k && n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'K' : String(n);
    }
    if ('IntersectionObserver' in window) {
        var co = new IntersectionObserver(function(es) {
            es.forEach(function(en) {
                if (!en.isIntersecting) return;
                var el = en.target, to = +el.dataset.count, k = el.dataset.k, s = el.dataset.suf || '', t0 = performance.now();
                (function st(t) {
                    var q = Math.min(1, (t - t0) / 1500), v = Math.round(to * (1 - Math.pow(1 - q, 4)));
                    el.textContent = fmt(v, k) + (q === 1 ? s : '');
                    if (q < 1) requestAnimationFrame(st);
                })(t0);
                co.unobserve(el);
            });
        }, {
            threshold: .6
        });
        [].forEach.call(document.querySelectorAll('[data-count]'), function(el) {
            co.observe(el);
        });
    }
    /* ---------- split serif headings ---------- */ [].forEach.call(document.querySelectorAll('.split-h'), function(h) {
        [].slice.call(h.childNodes).forEach(function(n) {
            if (n.nodeType === 3 && n.textContent.trim()) {
                var f = document.createDocumentFragment();
                n.textContent.split(/(\s+)/).forEach(function(w) {
                    if (!w.trim()) {
                        f.appendChild(document.createTextNode(w));
                        return;
                    }
                    var o = document.createElement('span');
                    o.className = 'w';
                    var i = document.createElement('span');
                    i.textContent = w;
                    o.appendChild(i);
                    f.appendChild(o);
                });
                n.replaceWith(f);
            } else if (n.nodeType === 1 && n.tagName === 'EM') {
                var o = document.createElement('span');
                o.className = 'w';
                n.replaceWith(o);
                var i = document.createElement('span');
                i.appendChild(n);
                o.appendChild(i);
            }
        });
    });
    /* ---------- motion ---------- */ var hasG = !!(window.gsap && window.ScrollTrigger), lenis = null;
    if (hasG) gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis && !reduce && fine) {
        lenis = new Lenis({
            lerp: .085
        });
        window.__lenis = lenis;
        if (hasG) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(function(t) {
                lenis.raf(t * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            (function r(t) {
                lenis.raf(t);
                requestAnimationFrame(r);
            })(0);
        }
    }
    [].forEach.call(document.querySelectorAll('a[href^="#"]'), function(a) {
        a.addEventListener('click', function(e) {
            var id = a.getAttribute('href'), t = id === '#top' ? 0 : document.querySelector(id);
            if (t === null) return;
            e.preventDefault();
            if (lenis) lenis.scrollTo(t, {
                duration: 1.6,
                offset: id === '#top' ? 0 : -62
            });
            else id === '#top' ? scrollTo({
                top: 0,
                behavior: 'smooth'
            }) : t.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    var toolLinks = [].slice.call(document.querySelectorAll('#tools a')), secs = toolLinks.map(function(a) {
        var id = a.getAttribute('href');
        return id === '#top' ? $('hero') : id.charAt(0) === '#' ? document.querySelector(id) : null;
    });
    function markTool() {
        var y = innerHeight * .45, on = 0;
        secs.forEach(function(s, i) {
            if (s && s.getBoundingClientRect().top < y) on = i;
        });
        toolLinks.forEach(function(a, i) {
            a.classList.toggle('on', i === on);
        });
    }
    if (toolLinks.length) {
        addEventListener('scroll', markTool, {
            passive: true
        });
        markTool();
    }
    var depthEls = [].slice.call(document.querySelectorAll('[data-depth]')), flt = $('float');
    (function raf() {
        cx += (mx - cx) * .2;
        cy += (my - cy) * .2;
        if (cur) cur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
        fx += (mx - fx) * .12;
        fy += (my - fy) * .12;
        if (flt) {
            flt.style.left = fx + 'px';
            flt.style.top = fy + 'px';
        }
        if (fine && depthEls.length) {
            var dx = mx / innerWidth - .5, dy = my / innerHeight - .5;
            depthEls.forEach(function(el) {
                var d = +el.dataset.depth;
                el.style.translate = (dx * d).toFixed(2) + 'px ' + (dy * d * .6).toFixed(2) + 'px';
            });
        }
        requestAnimationFrame(raf);
    })();
    function q(s) {
        return document.querySelector(s);
    }
    function intro() {
        if (!hasG || reduce || !$('portrait')) return;
        var tl = gsap.timeline({
            defaults: {
                ease: 'expo.out'
            }
        });
        tl.from('#portrait', {
            clipPath: 'inset(50% 0 50% 0)',
            duration: 1.5
        }).from('#portrait img', {
            scale: 1.25,
            duration: 2
        }, '<').from('#rule', {
            scaleX: 0,
            duration: 1.6
        }, '<.2').from('#halfL svg', {
            clipPath: 'inset(0 0 0 100%)',
            duration: 1.6
        }, '<.35').from('#halfR svg', {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1.6
        }, '<.15').from('.frames rect', {
            strokeDasharray: '0 1000',
            duration: 2.2,
            ease: 'power2.out'
        }, '<').from('.frames .cap,.hero .top-l,.hero-foot>*', {
            opacity: 0,
            y: 16,
            duration: 1.2,
            stagger: .08,
            clearProps: 'opacity,transform'
        }, '<.4');
    }
    if (hasG && !reduce) {
        if ($('hero')) {
            [].forEach.call(document.querySelectorAll('.frames rect'), function(r) {
                r.setAttribute('pathLength', '1000');
                r.style.strokeDasharray = '1000 1000';
            });
            var st = {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            };
            gsap.to('#halfL', {
                xPercent: -35,
                ease: 'none',
                scrollTrigger: st
            });
            gsap.to('#halfR', {
                xPercent: 35,
                ease: 'none',
                scrollTrigger: st
            });
            gsap.to('#portrait,#d3wrap', {
                scale: .86,
                ease: 'none',
                scrollTrigger: st
            });
            gsap.to('#rule', {
                scaleX: 1.6,
                opacity: .2,
                ease: 'none',
                scrollTrigger: st
            });
            gsap.to('.frames.l', {
                y: -120,
                ease: 'none',
                scrollTrigger: st
            });
            gsap.to('.frames.r', {
                y: 120,
                ease: 'none',
                scrollTrigger: st
            });
        }
        if ($('idea')) {
            gsap.from('.think span', {
                yPercent: 60,
                opacity: 0,
                letterSpacing: '0.5em',
                duration: 1.4,
                stagger: .06,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '#idea',
                    start: 'top 65%'
                }
            });
            gsap.from('.intent', {
                opacity: 0,
                y: 30,
                duration: 1.4,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '#idea',
                    start: 'top 55%'
                }
            });
        }
        gsap.utils.toArray('.split-h').forEach(function(h) {
            gsap.from(h.querySelectorAll('.w>span'), {
                yPercent: 110,
                duration: 1.3,
                stagger: .08,
                ease: 'expo.out',
                delay: h.closest('.phero') ? .35 : 0,
                scrollTrigger: {
                    trigger: h,
                    start: 'top 85%'
                }
            });
        });
        gsap.utils.toArray('.phero .intro>*,.phero .crumb').forEach(function(el, i) {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 1.3,
                delay: .6 + i * .1,
                ease: 'expo.out',
                clearProps: 'opacity,transform'
            });
        });
        gsap.utils.toArray('.card').forEach(function(c) {
            gsap.fromTo(c.querySelectorAll('.box img'), {
                yPercent: -5
            }, {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                    trigger: c,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
        gsap.utils.toArray('.stage').forEach(function(s) {
            gsap.from(s, {
                y: 60,
                opacity: 0,
                duration: 1.3,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: s,
                    start: 'top 90%'
                },
                clearProps: 'opacity,transform'
            });
        });
        gsap.utils.toArray('.reveal').forEach(function(s) {
            gsap.from(s, {
                y: 50,
                opacity: 0,
                duration: 1.3,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: s,
                    start: 'top 88%'
                },
                clearProps: 'opacity,transform'
            });
        });
        if (track) gsap.matchMedia().add('(min-width: 861px)', function() {
            function d() {
                return Math.max(0, track.scrollWidth - innerWidth);
            }
            gsap.to(track, {
                x: function() {
                    return -d();
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: '#trackWrap',
                    start: 'center center',
                    end: function() {
                        return '+=' + d();
                    },
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        });
        if ($('poster')) gsap.fromTo('#poster', {
            rotate: -4,
            y: 60
        }, {
            rotate: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#poster',
                start: 'top bottom',
                end: 'center center',
                scrub: true
            }
        });
        if (lead) ScrollTrigger.create({
            trigger: lead,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true,
            onUpdate: function(s) {
                var n = Math.round(s.progress * LW.length);
                LW.forEach(function(w, i) {
                    w.style.opacity = i < n ? 1 : .16;
                });
            }
        });
        if (q('.endsig')) gsap.fromTo('.endsig .sig', {
            clipPath: 'inset(0 100% 0 0)'
        }, {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
                trigger: '.endsig',
                start: 'top 95%',
                end: 'bottom 75%',
                scrub: true
            }
        });
        if (q('.cta')) gsap.utils.toArray('.cta').forEach(function(c) {
            gsap.from(c, {
                y: 60,
                opacity: 0,
                duration: 1.4,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: c,
                    start: 'top 85%'
                }
            });
        });
    } else {
        LW.forEach(function(w) {
            w.style.opacity = 1;
        });
    }
    /* ---------- loader (landing only) ---------- */ var loader = $('loader'), bar = $('lbar');
    if (loader) {
        var finish = function() {
            if (loader.classList.contains('done')) return;
            loader.classList.add('done');
            intro();
            setTimeout(function() {
                loader.remove();
                if (window.ScrollTrigger) ScrollTrigger.refresh();
            }, 1300);
        };
        if (reduce) {
            loader.remove();
        } else {
            var t0 = performance.now();
            (function c(t) {
                var qq = Math.min(1, (t - t0) / 2000);
                bar.style.transform = 'scaleX(' + qq + ')';
                if (qq < 1) requestAnimationFrame(c);
                else finish();
            })(t0);
            setTimeout(finish, 3200);
        }
    }
    addEventListener('load', function() {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    if (document.readyState === 'complete') setTimeout(function() {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 50);
}
}),
"[project]/packages/shared/dist/brand.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BRAND = void 0;
/* TALAL·AT brand geometry: signature, icon (sun, roof, door) and wordmark letters. Generated from the approved logo files. */ exports.BRAND = {
    "signature": {
        "viewBox": "0 0 1143 415",
        "d": "M203.7 408.3C201.7 406.3 203.3 401.1 211.9 382.7C214.2 377.8 216.0 373.7 216.0 373.5C216.0 373.3 217.5 369.9 219.4 365.8C225.2 353.5 238.4 323.8 264.2 265.0C282.3 223.9 283.0 222.3 283.0 221.1C283.0 220.4 280.4 220.0 276.2 220.0C266.2 220.0 212.6 215.9 205.0 214.5C203.6 214.3 199.8 213.8 196.5 213.5C169.5 210.9 127.6 203.7 104.5 197.8C52.3 184.5 23.5 168.2 13.8 146.3C11.1 140.2 10.9 129.4 13.5 123.2C15.1 119.4 15.5 119.0 18.7 119.0C21.7 119.0 22.1 119.3 21.5 120.8C14.5 137.6 19.6 150.7 38.8 164.8C75.0 191.4 161.9 210.6 273.3 216.6L285.0 217.2L287.6 211.3C292.2 201.0 315.1 147.8 318.5 139.5C320.3 135.1 325.3 123.2 329.5 113.0C343.6 79.1 360.0 34.3 360.0 29.7C360.0 27.9 359.1 27.8 335.2 28.5C290.1 29.7 260.4 31.7 235.8 35.1C228.2 36.2 228.1 36.3 227.7 39.4L227.3 42.5L227.2 39.2C227.0 36.4 226.7 36.0 224.8 36.4C223.5 36.7 218.9 37.4 214.5 38.0C200.5 39.9 171.9 45.8 153.9 50.4C91.2 66.7 43.2 90.5 25.6 114.2C23.3 117.3 22.1 118.0 19.4 118.0C15.2 118.0 15.2 117.9 19.5 112.0C44.5 78.0 129.4 45.2 228.0 31.6C255.5 27.8 312.9 24.0 343.7 24.0L361.9 24.0L362.9 18.8C363.5 15.9 364.1 11.9 364.3 10.0C364.5 6.7 364.7 6.5 368.0 6.5C371.1 6.5 371.5 6.9 372.4 10.0C373.0 12.0 375.7 15.8 378.6 18.8L383.9 24.0L399.7 24.0C444.6 24.0 530.4 30.6 556.0 36.1C566.1 38.2 569.1 41.3 565.2 45.2C562.6 47.8 551.1 48.6 513.0 48.9C443.4 49.3 398.6 43.5 378.8 31.5C372.2 27.4 368.4 27.0 367.0 30.2C366.5 31.5 362.4 42.4 357.9 54.5C348.5 79.8 329.8 125.2 306.9 178.6C298.2 199.0 291.0 216.2 291.0 216.8C291.0 218.3 313.7 218.7 346.5 217.8C378.4 216.9 377.0 217.0 382.6 213.1C388.5 208.8 393.6 208.1 397.2 211.0C398.8 212.2 400.0 213.8 400.0 214.6C400.0 217.6 402.1 215.7 406.7 208.8C410.5 203.0 412.0 201.5 414.0 201.5C418.1 201.5 417.5 204.8 411.1 217.1C405.2 228.4 401.2 238.6 402.3 239.6C404.1 241.4 424.3 222.5 437.2 207.0C459.5 180.3 483.6 144.0 497.4 116.2C503.2 104.5 508.9 93.6 510.0 91.9C512.4 88.7 515.1 88.2 517.1 90.6C518.8 92.6 516.2 97.8 500.7 123.4C489.3 142.3 482.8 154.6 472.8 176.4C457.2 210.4 438.2 257.6 439.6 259.0C440.1 259.4 452.6 260.0 467.4 260.2L494.3 260.5L499.2 249.5C505.0 236.4 505.1 235.8 500.2 241.2C493.2 249.2 490.0 250.9 486.4 248.5C483.8 246.8 483.1 240.5 485.0 235.6C486.4 231.9 485.5 232.3 479.6 237.9C469.3 247.9 464.5 250.2 460.3 247.5C450.9 241.3 471.2 210.0 484.5 210.0C488.3 210.0 492.0 212.5 492.0 215.1C492.0 217.9 493.7 217.4 495.4 214.2C497.4 210.3 502.0 206.0 504.1 206.0C509.1 206.0 507.9 212.6 501.6 220.3C498.2 224.5 492.0 236.3 492.0 238.8C492.0 241.1 493.6 240.0 501.7 232.2C509.4 224.9 510.0 224.0 514.5 213.0C517.1 206.7 524.4 189.6 530.7 175.0C562.5 101.7 573.4 84.4 582.1 93.1C592.2 103.2 559.2 169.5 517.7 222.4C512.3 229.3 510.2 233.1 508.0 239.4C506.5 243.9 504.1 249.9 502.6 252.9C501.2 255.9 500.0 259.0 500.0 259.7C500.0 260.8 518.7 261.0 603.4 261.0L706.8 261.0L707.4 258.8C707.7 257.5 708.3 251.8 708.6 246.0C710.2 219.5 702.3 203.4 682.2 191.9L674.5 187.5L640.8 187.8C605.8 188.1 599.9 187.6 598.1 184.1C596.5 181.2 597.9 178.2 601.4 177.1C616.8 172.0 653.5 173.5 672.6 179.9C677.9 181.6 682.0 181.9 711.4 182.2L744.3 182.5L753.5 161.5C767.1 130.2 768.3 128.3 772.6 131.5C774.4 132.8 774.1 133.6 766.3 149.2C756.4 169.0 751.0 180.6 751.0 182.0C751.0 182.7 763.8 183.0 790.9 183.0L830.7 183.0L838.7 171.8C855.4 148.5 865.9 131.2 877.0 108.8C889.8 83.0 892.4 79.1 895.8 80.9C899.6 82.9 898.8 85.3 888.0 104.5C887.1 106.2 881.9 114.7 876.5 123.5C867.8 137.8 861.5 149.8 850.4 173.8C848.5 177.9 847.0 181.6 847.0 182.1C847.0 182.6 850.3 183.0 854.3 183.0L861.6 183.0L865.5 173.7C885.1 127.0 907.9 83.8 915.9 78.0C922.6 73.3 928.7 77.6 927.6 86.3C925.5 102.0 905.8 145.4 886.9 175.7C884.7 179.1 883.0 182.2 883.0 182.5C883.0 182.8 899.3 182.9 919.1 182.8L955.3 182.5L963.0 166.0C982.6 123.8 996.6 97.3 1002.3 91.2C1004.7 88.6 1008.7 88.6 1010.4 91.2C1013.4 96.0 995.2 141.1 978.2 171.0C975.0 176.8 972.5 181.8 972.7 182.3C972.9 182.7 978.4 182.8 984.8 182.6C1008.5 181.6 1108.3 181.9 1109.3 182.9C1109.8 183.4 1110.0 184.6 1109.6 185.5C1109.1 187.0 1103.4 187.1 1039.3 186.5L969.5 185.9L957.2 204.7C950.4 215.0 942.5 226.5 939.5 230.2C935.9 234.7 932.6 240.3 930.0 246.6C925.3 257.9 925.1 258.7 928.5 253.8C929.9 251.8 931.0 249.7 931.0 249.1C931.0 248.6 931.3 248.0 931.8 247.8C932.2 247.6 934.3 245.0 936.5 242.0C955.0 216.1 966.8 203.0 971.8 203.0C979.5 203.0 978.8 209.3 969.0 229.1C964.6 238.0 964.6 239.6 968.8 236.2C970.3 235.0 973.1 232.9 975.0 231.6C976.9 230.3 980.9 226.9 983.8 224.0C989.5 218.5 993.2 217.6 993.8 221.5C994.1 223.6 989.2 228.5 975.0 240.1C964.4 248.9 960.4 250.1 957.4 245.5C955.3 242.3 956.0 239.0 962.0 226.0C967.5 214.0 968.5 211.0 967.2 211.0C966.1 211.0 954.3 223.3 950.5 228.5C948.8 230.7 947.2 232.7 946.8 233.0C944.9 234.4 929.1 259.3 929.6 260.1C930.2 261.1 983.5 260.6 1013.7 259.4C1028.4 258.8 1030.0 258.9 1030.6 260.4C1032.1 264.4 1030.9 264.5 977.7 264.2L926.4 263.9L922.1 271.4C919.7 275.6 917.3 281.1 916.6 283.7C915.6 287.8 915.0 288.5 912.9 288.5C909.2 288.5 909.5 285.9 914.4 274.9C916.9 269.4 919.0 264.6 919.0 264.4C919.0 264.2 906.0 264.0 890.1 264.0L861.3 264.0L852.9 274.1C839.1 290.7 833.3 296.0 828.8 296.0C823.1 296.0 822.8 288.0 827.9 270.8L829.9 264.0L821.5 264.0L813.2 264.0L810.2 272.3C799.3 302.2 793.8 325.5 797.0 327.5C798.5 328.4 798.2 332.6 796.5 334.0C794.4 335.8 790.5 334.5 789.2 331.6C788.4 329.9 788.4 327.3 789.0 323.3C789.9 317.9 798.7 291.1 805.8 272.2L808.9 264.0L762.6 264.0L716.3 264.0L713.6 273.2C712.0 278.3 710.6 283.4 710.3 284.5C709.1 289.0 705.5 290.5 703.0 287.5C701.9 286.2 702.1 284.2 703.8 276.2C705.0 270.9 706.0 265.9 706.0 265.2C706.0 263.8 500.5 263.4 498.4 264.8C496.9 265.7 495.3 269.0 487.4 286.7C461.2 345.2 448.9 374.1 443.6 389.4C439.2 402.0 437.2 404.6 434.4 401.9C433.0 400.4 433.2 399.2 436.8 387.8C449.3 348.6 450.3 314.5 439.5 292.5C437.6 288.7 434.9 284.2 433.6 282.6L431.2 279.7L427.6 291.1C421.8 309.7 420.4 317.7 422.4 321.2C425.8 326.8 419.0 331.0 415.5 325.6C413.2 322.2 414.7 314.8 422.0 293.7L427.9 276.7L425.7 274.9C420.3 270.3 411.0 266.7 402.2 265.8C390.2 264.5 389.3 264.2 388.6 262.4C388.3 261.6 388.5 259.9 389.1 258.8C390.1 256.9 390.8 256.8 398.9 257.4C403.6 257.7 413.6 258.3 421.0 258.6L434.6 259.3L439.9 245.9C447.6 226.8 456.6 205.1 464.9 186.1C468.8 177.2 472.0 169.5 472.0 169.2C472.0 168.9 468.7 173.5 464.6 179.3C434.2 222.7 410.1 249.0 400.7 249.0C397.3 249.0 393.0 245.0 393.0 241.7C393.0 240.4 393.7 237.1 394.5 234.4C395.3 231.7 396.0 229.3 396.0 229.1C396.0 228.9 392.1 232.5 387.3 237.0C377.4 246.4 373.6 249.0 369.9 249.0C363.4 249.0 363.2 241.6 369.3 229.8L373.5 221.5L331.1 221.5L288.6 221.5L279.7 242.0C274.9 253.3 269.9 265.0 268.6 268.0C267.3 271.0 257.6 294.0 247.0 319.0C236.5 344.0 227.6 365.4 227.3 366.5C227.0 367.6 223.5 375.9 219.5 385.0C215.5 394.1 211.5 403.2 210.7 405.2C209.2 408.9 205.7 410.4 203.7 408.3ZM463.7 331.0C468.9 319.2 475.0 305.4 477.2 300.5C483.8 285.9 492.1 265.8 491.8 265.5C491.1 264.8 480.5 264.6 458.8 264.8L436.2 265.0L434.6 269.6L433.0 274.3L435.9 277.6C449.3 292.8 454.8 322.4 449.9 353.5C447.9 366.8 447.7 367.0 463.7 331.0ZM841.3 278.4C845.6 273.5 850.0 268.3 851.1 266.8L853.1 264.0L843.7 264.0L834.3 264.0L832.1 272.1C830.9 276.5 829.6 282.5 829.3 285.3L828.7 290.5L831.1 288.9C832.4 288.0 837.0 283.3 841.3 278.4ZM431.5 267.2C432.1 265.1 431.9 265.0 427.3 265.0L422.5 265.1L426.0 268.0C429.7 271.0 430.3 270.9 431.5 267.2ZM813.8 252.0C820.1 236.1 831.9 207.5 836.4 197.1C838.9 191.4 841.0 186.6 841.0 186.4C841.0 186.2 839.7 186.0 838.1 186.0C835.7 186.0 834.1 187.6 825.8 198.8C802.3 230.3 783.6 249.2 774.5 250.7C771.8 251.1 770.7 250.7 768.6 248.7C765.6 245.6 765.3 241.8 767.5 234.4C768.3 231.7 769.0 229.3 769.0 229.1C769.0 228.9 764.8 232.8 759.6 237.8C745.5 251.4 740.0 254.0 736.4 248.4C729.8 238.4 754.0 205.9 766.2 208.4C769.7 209.1 773.0 211.6 773.0 213.6C773.0 217.2 775.5 215.3 780.0 208.1C785.2 200.1 786.8 198.6 789.5 199.6C792.2 200.7 791.1 204.9 785.5 215.4C780.2 225.3 774.4 239.7 775.4 240.7C778.2 243.5 801.9 220.0 821.9 194.5L828.2 186.5L788.9 186.2C767.3 186.1 749.3 186.3 748.9 186.7C746.0 189.7 717.6 258.6 718.6 260.2C718.9 260.7 739.7 260.9 764.8 260.8L810.4 260.5L813.8 252.0ZM836.6 245.6C839.6 237.4 842.0 230.1 842.0 229.4C842.0 228.6 843.1 225.9 844.5 223.3C846.5 219.6 853.9 202.0 859.7 187.2C860.1 186.2 858.5 186.0 852.5 186.2L844.7 186.5L839.0 199.6C832.0 215.7 816.4 254.5 815.5 258.3L814.8 261.1L823.0 260.8L831.2 260.5L836.6 245.6ZM872.8 238.7C889.2 217.2 894.8 211.2 901.7 207.6C907.2 204.8 912.4 205.8 916.0 210.3C917.6 212.3 917.7 212.2 921.0 208.2C924.5 203.8 927.3 202.9 928.9 205.7C929.6 207.0 928.9 209.2 926.4 214.2C922.6 221.8 918.0 234.7 918.0 238.0C918.0 241.0 920.6 239.4 929.7 230.6C936.9 223.7 937.2 223.0 945.0 205.6C949.4 195.8 953.0 187.4 953.0 186.9C953.0 186.4 937.6 186.0 916.8 186.0L880.5 186.1L869.1 203.6C862.8 213.2 854.7 224.1 851.2 227.8C845.2 234.0 844.5 235.3 840.4 246.8C838.0 253.6 836.0 259.5 836.0 260.0C836.0 260.6 840.3 261.0 845.8 261.0L855.7 261.0L872.8 238.7ZM923.9 253.5C927.7 244.3 927.7 244.2 923.9 247.4C922.2 248.8 920.5 250.0 920.2 250.1C919.8 250.1 918.3 250.4 916.7 250.6C909.9 251.7 906.9 242.1 910.5 230.4C911.3 227.7 912.0 225.3 912.0 225.1C912.0 224.8 907.4 229.1 901.8 234.7C890.1 246.1 886.4 248.5 882.5 247.0C881.1 246.5 879.6 245.1 879.2 244.0C878.5 242.1 877.6 242.9 871.7 250.3C868.0 255.0 865.0 259.3 865.0 259.9C865.0 260.7 873.4 261.0 892.9 261.0L920.7 261.0L923.9 253.5ZM651.6 248.8C649.6 246.0 649.6 243.6 651.5 237.5L652.9 232.7L648.2 237.2C639.8 245.3 633.0 250.0 629.8 250.0C624.5 250.0 623.0 248.5 623.0 242.9C623.0 235.7 627.6 227.3 636.4 218.4C647.1 207.5 654.9 206.2 658.9 214.5C660.2 217.2 660.4 217.3 661.4 215.6C667.0 206.0 672.6 202.5 675.0 207.0C676.3 209.5 674.0 214.7 668.5 221.5C664.3 226.5 658.7 238.3 659.2 240.7C659.5 242.1 662.8 239.4 672.3 229.8C684.3 217.6 688.0 215.0 688.0 218.6C688.0 220.0 679.9 229.5 665.6 244.7C658.9 251.8 654.6 253.1 651.6 248.8ZM729.9 216.6C736.6 200.7 742.0 187.4 742.0 186.9C742.0 186.4 730.3 186.0 715.9 186.0C701.6 186.0 690.0 186.4 690.2 186.9C690.4 187.3 693.0 189.7 696.0 192.2C709.9 203.5 715.9 217.8 716.1 240.5C716.1 246.3 716.4 248.8 717.0 247.5C717.4 246.4 723.2 232.5 729.9 216.6ZM747.1 241.4C753.1 237.7 768.8 223.3 769.5 221.0C771.0 216.4 764.1 214.3 758.1 217.5C753.3 219.9 745.3 229.6 743.1 235.5C739.6 244.7 740.3 245.7 747.1 241.4ZM376.2 239.7C384.0 234.4 397.0 222.0 397.0 220.0C397.0 217.3 393.5 215.7 389.3 216.5C382.3 217.8 370.0 233.2 370.0 240.7C370.0 243.7 370.5 243.6 376.2 239.7ZM638.8 237.2C646.5 231.6 655.0 222.7 655.0 220.5C655.0 214.2 647.5 215.4 640.0 222.9C635.1 227.9 630.0 236.9 630.0 240.8C630.0 243.2 630.0 243.2 632.8 241.5C634.3 240.5 637.0 238.6 638.8 237.2ZM470.4 238.1C472.8 236.4 477.9 232.1 481.8 228.3C488.0 222.3 488.8 221.2 488.0 219.2C485.8 213.8 475.6 218.8 469.6 228.3C466.9 232.5 464.0 239.0 464.0 240.6C464.0 241.7 466.6 240.6 470.4 238.1ZM890.3 238.1C892.6 236.5 898.5 231.4 903.5 226.7C911.3 219.3 912.3 217.9 911.4 216.3C909.7 213.6 904.2 213.5 899.9 216.2C893.6 220.1 885.0 233.4 885.0 239.1C885.0 241.6 885.4 241.5 890.3 238.1ZM867.3 195.4C870.4 190.9 873.0 186.9 873.0 186.6C873.0 186.2 871.1 186.0 868.8 186.2L864.5 186.5L859.3 198.5C856.5 205.1 854.1 211.1 854.1 211.8C854.0 213.4 859.4 206.7 867.3 195.4ZM956.3 197.7C963.9 186.5 964.0 186.0 959.7 186.0L956.2 186.0L951.0 197.8C948.2 204.2 945.6 210.2 945.3 211.0C944.5 213.5 950.3 206.5 956.3 197.7ZM526.0 201.7C548.1 170.9 562.4 146.2 570.6 124.8C573.6 116.8 577.6 101.2 576.7 100.4C575.9 99.6 570.8 106.0 565.5 114.5C558.2 126.2 545.6 151.3 534.0 177.0C529.0 188.3 523.8 199.9 522.5 202.8C519.4 209.7 520.5 209.3 526.0 201.7ZM844.8 178.2C851.0 163.6 851.0 163.7 842.4 175.7C837.3 183.0 837.3 183.0 840.4 183.0C842.2 183.0 843.2 182.0 844.8 178.2ZM881.2 174.5C900.8 142.2 916.8 106.5 918.6 91.1L919.2 86.5L916.6 89.5C905.7 102.0 881.9 145.8 867.2 180.3L866.0 183.1L871.2 182.8L876.4 182.5L881.2 174.5ZM971.7 173.5C985.6 150.6 1006.4 102.1 1003.6 99.3C1001.4 97.0 959.0 175.2 959.0 181.7C959.0 182.7 960.0 183.0 962.6 182.8C966.1 182.5 966.6 181.9 971.7 173.5ZM534.0 42.0C537.6 41.6 539.9 41.2 539.2 41.2C538.5 41.1 529.9 39.9 520.2 38.6C498.3 35.5 478.2 33.4 453.4 31.5C431.8 29.9 395.2 28.4 396.0 29.3C397.2 30.6 421.0 36.2 432.7 37.9C458.9 41.8 515.8 44.1 534.0 42.0Z"
    },
    "icon": {
        "viewBox": "0 0 1060 1060",
        "sun": "M41.0 606.9C22.7 605.7 14.5 600.6 7.6 586.0C4.5 579.5 4.5 579.5 4.5 531.0C4.5 474.6 4.4 475.0 14.7 464.0C25.2 452.6 9.8 453.6 173.1 453.0C315.6 452.5 315.6 452.5 319.8 449.8C324.6 446.6 325.8 442.7 324.0 435.9C322.9 431.9 313.9 422.6 223.0 331.5C118.1 226.5 120.2 228.8 118.5 218.4C117.8 213.6 120.0 202.9 123.1 196.7C126.2 190.5 190.0 126.6 196.4 123.3C206.1 118.3 219.6 118.3 229.5 123.2C232.1 124.5 267.8 159.4 331.5 223.0C385.4 276.8 430.4 321.2 431.5 321.8C432.6 322.3 436.6 322.9 440.4 323.1C448.5 323.6 450.7 321.7 452.1 313.3C452.5 310.7 452.9 247.5 452.9 172.8C453.0 42.9 453.1 36.9 454.9 31.1C458.7 18.7 465.4 11.0 475.9 6.8C481.4 4.5 482.0 4.5 529.5 4.5C577.4 4.5 577.5 4.5 583.7 6.8C594.2 10.8 601.1 18.2 605.1 29.8C606.9 35.1 607.0 40.5 607.0 172.9C607.1 248.6 607.5 312.4 607.9 314.8C609.1 320.9 612.3 324.0 617.4 324.0C627.9 324.0 621.9 329.5 728.5 223.1C836.0 115.8 830.4 120.9 843.1 119.4C849.8 118.7 860.5 121.0 865.7 124.4C870.3 127.3 937.3 194.5 939.0 197.9C939.7 199.3 940.2 205.0 940.3 212.4C940.3 224.0 940.2 224.8 937.5 229.5C935.6 232.9 903.9 265.3 837.4 332.0C735.0 434.6 736.1 433.4 736.0 442.3C736.0 447.5 740.3 451.7 746.3 452.4C748.6 452.7 813.0 453.1 889.5 453.4C1044.9 453.9 1033.6 453.4 1042.5 461.2C1047.9 466.0 1051.3 471.4 1054.0 479.9C1057.1 489.6 1057.1 571.3 1054.0 581.2C1050.1 594.0 1040.4 603.5 1028.5 606.5C1026.8 606.9 989.2 607.2 944.8 607.2C856.0 607.1 856.1 607.1 842.3 601.0C831.2 596.0 827.1 592.3 771.0 536.5C737.7 503.5 711.9 478.6 706.5 474.5C643.6 426.5 575.7 407.6 495.8 415.9C456.1 420.0 409.1 437.0 374.5 459.8C348.5 476.9 343.5 481.4 281.5 543.0C223.7 600.5 223.6 600.6 204.6 605.2C197.0 607.0 192.0 607.1 123.5 607.3C83.3 607.4 46.2 607.2 41.0 606.9Z",
        "roof": "M158.1 903.6C110.9 856.4 104.8 849.9 105.4 847.9C106.6 843.5 398.9 551.3 410.7 542.7C434.7 525.1 459.8 514.0 491.2 507.3C509.6 503.4 549.0 503.4 568.7 507.4C600.8 513.8 628.0 526.8 655.8 548.7C667.0 557.6 956.4 846.2 955.8 848.0C955.5 849.0 852.4 952.8 848.6 955.9C847.0 957.2 832.7 943.2 701.2 811.9C577.4 688.3 554.7 666.0 550.0 663.8C544.4 661.1 530.4 657.6 528.9 658.6C528.4 658.9 525.3 659.6 521.9 660.1C508.1 662.3 511.8 658.9 412.0 758.9C280.3 890.8 213.6 957.0 212.5 957.0C211.9 957.0 187.5 933.0 158.1 903.6Z",
        "door": "M454.0 1054.5C451.9 1052.0 453.2 966.7 455.4 957.6C461.6 932.3 482.5 911.5 509.1 904.1C519.8 901.1 539.2 901.1 549.9 904.1C578.6 912.1 598.7 932.3 605.0 959.5C606.8 967.4 607.0 971.6 607.0 1010.8C607.0 1042.8 606.7 1053.9 605.8 1054.8C603.8 1056.8 455.7 1056.5 454.0 1054.5Z"
    },
    "wordmark": {
        "viewBox": "0 0 2554 407",
        "letters": [
            "M152.0 401.9C152.0 401.3 152.8 399.6 153.9 398.2C159.9 389.5 159.5 404.0 159.8 201.5C159.9 100.3 159.8 16.5 159.5 15.2C159.0 13.0 159.0 13.0 118.2 13.0C50.7 13.0 39.5 15.3 16.4 34.0C8.9 40.0 4.0 41.8 4.0 38.5C4.0 36.7 15.8 7.1 17.3 5.2C18.0 4.3 52.0 4.0 183.3 4.2L348.4 4.5L355.2 21.0C358.9 30.1 361.9 38.1 362.0 38.8C362.1 42.2 356.1 39.7 347.0 32.4C325.2 15.2 314.3 13.1 247.3 13.0C206.0 13.0 206.0 13.0 205.5 15.3C205.2 16.5 205.1 99.4 205.3 199.5C205.6 397.8 205.4 388.8 211.2 397.4C212.7 399.6 213.7 401.7 213.4 402.2C212.6 403.5 152.0 403.2 152.0 401.9Z",
            "M311.0 402.1C311.0 401.6 313.2 399.8 315.9 398.0C328.9 389.7 328.3 391.0 359.8 308.5C364.2 296.9 373.5 272.6 380.5 254.5C387.5 236.3 399.0 206.2 406.1 187.5C413.3 168.8 419.7 151.9 420.5 150.0C421.3 148.1 426.5 134.6 432.0 120.0C437.6 105.4 442.7 91.9 443.5 90.0C450.4 73.4 467.0 27.9 467.0 25.7C467.0 24.2 465.6 19.3 463.9 14.9C462.2 10.5 461.1 6.3 461.4 5.5C462.1 3.5 507.2 3.3 508.7 5.2C509.2 5.9 515.1 21.1 521.8 39.0C528.4 56.9 536.9 79.4 540.5 89.0C544.2 98.6 549.6 112.8 552.5 120.5C560.4 141.4 595.6 232.4 607.5 263.0C634.8 332.8 651.8 375.6 654.2 380.4C657.7 387.4 664.8 395.2 670.7 398.7C673.1 400.1 675.0 401.6 675.0 402.1C675.0 403.4 603.3 403.3 602.5 402.0C602.1 401.4 602.3 400.3 603.0 399.6C608.0 393.5 606.5 387.7 588.5 340.6C563.7 276.1 562.0 271.7 560.9 270.3C559.6 268.8 387.6 268.3 385.2 269.8C384.5 270.3 381.7 276.5 379.0 283.6C376.3 290.7 369.6 308.2 364.0 322.5C338.8 387.3 337.3 392.3 341.4 398.5C342.3 399.9 342.8 401.5 342.5 402.0C341.7 403.3 311.0 403.3 311.0 402.1ZM555.8 260.1C557.7 258.9 558.0 259.9 534.0 197.5C522.3 167.2 510.8 137.3 508.4 131.0C483.3 65.0 474.3 42.5 473.2 42.5C472.4 42.5 470.3 46.5 468.4 51.5C466.5 56.5 463.2 65.0 461.0 70.5C458.9 76.0 452.6 92.4 447.0 107.0C441.4 121.6 435.8 136.2 434.5 139.5C433.3 142.8 428.5 155.2 424.0 167.0C419.5 178.8 410.2 203.0 403.4 220.8C389.9 255.8 389.0 258.7 391.1 260.1C392.9 261.2 554.0 261.3 555.8 260.1Z",
            "M717.0 401.9C717.0 401.2 717.9 399.2 719.1 397.3C724.7 388.3 724.4 398.4 724.8 211.5C725.2 23.9 725.1 21.7 720.0 11.6C718.3 8.4 717.0 5.3 717.0 4.9C717.0 3.7 776.7 3.7 777.4 4.9C777.7 5.4 776.5 8.6 774.7 12.0L771.5 18.3L771.2 205.8C771.0 355.8 771.2 393.5 772.2 394.2C772.9 394.6 806.8 395.0 847.5 395.0C936.5 395.0 948.5 394.1 965.5 386.1C972.4 382.9 983.3 375.6 986.5 372.0C989.0 369.3 993.3 367.0 996.0 367.0C998.4 367.0 998.6 368.9 996.6 375.1C995.8 377.5 993.7 384.2 991.9 390.0C990.2 395.8 988.3 401.1 987.8 401.8C986.4 403.5 717.0 403.6 717.0 401.9Z",
            "M1020.0 402.1C1020.0 401.7 1022.5 399.6 1025.5 397.6C1037.8 389.4 1037.6 389.8 1067.6 311.5C1085.7 263.9 1098.1 231.6 1129.2 150.5C1133.6 138.9 1138.7 125.7 1140.5 121.0C1142.3 116.3 1146.4 105.8 1149.5 97.5C1152.6 89.2 1156.9 78.0 1159.0 72.5C1178.5 21.8 1177.4 26.0 1173.0 15.5C1167.7 3.2 1166.2 4.0 1193.5 4.0C1214.8 4.0 1217.0 4.2 1217.9 5.8C1218.4 6.7 1226.9 29.1 1236.8 55.5C1246.7 81.9 1257.8 111.4 1261.5 121.0C1277.9 163.8 1296.6 212.1 1313.7 256.0C1323.9 282.1 1333.7 307.3 1335.5 312.0C1345.2 337.4 1362.1 379.1 1364.3 383.0C1367.6 388.8 1373.5 394.9 1379.4 398.6C1381.9 400.2 1384.0 401.8 1384.0 402.2C1384.0 402.7 1367.6 403.0 1347.5 403.0C1327.4 403.0 1311.0 402.6 1311.0 402.2C1311.0 401.7 1311.7 399.8 1312.6 398.0C1313.9 395.5 1314.1 393.2 1313.7 388.1C1313.1 381.7 1312.0 378.1 1304.7 359.5C1297.4 340.7 1288.9 318.7 1280.0 295.5C1275.0 282.3 1270.1 270.9 1269.2 270.2C1267.4 268.8 1096.5 268.4 1094.2 269.8C1093.2 270.5 1074.4 317.9 1055.3 368.0C1049.0 384.5 1047.6 393.4 1050.3 398.7C1051.2 400.4 1051.6 402.0 1051.3 402.4C1050.3 403.3 1020.0 403.1 1020.0 402.1ZM1264.4 259.7C1266.2 258.4 1265.6 256.6 1250.5 217.5C1247.1 208.7 1231.3 167.5 1222.5 144.5C1218.3 133.5 1213.6 121.1 1212.0 117.0C1210.4 112.9 1203.2 94.4 1196.2 76.0C1188.2 55.3 1182.8 42.5 1181.9 42.5C1180.5 42.5 1179.8 44.4 1155.9 107.0C1147.6 128.7 1139.3 150.3 1137.4 155.0C1132.7 167.2 1103.2 244.3 1100.4 252.0C1098.1 258.1 1098.1 258.6 1099.7 259.8C1102.2 261.6 1261.8 261.6 1264.4 259.7Z",
            "M1428.0 402.4C1428.0 402.0 1429.3 399.0 1431.0 395.6C1435.9 385.4 1436.0 383.9 1436.0 203.5C1436.0 22.8 1436.0 21.8 1430.9 11.4C1429.3 8.0 1428.0 5.0 1428.0 4.6C1428.0 3.8 1488.5 3.8 1489.3 4.6C1489.7 5.0 1489.0 6.6 1487.8 8.2C1481.6 16.9 1482.0 4.3 1482.0 208.5C1482.0 376.5 1482.1 393.8 1483.6 394.4C1487.3 395.8 1632.2 395.0 1645.0 393.5C1668.9 390.7 1679.7 386.5 1695.4 374.1C1704.7 366.6 1709.0 365.1 1709.0 369.1C1709.0 370.3 1706.7 378.4 1704.0 387.1L1698.9 403.0L1563.5 403.0C1489.0 403.0 1428.0 402.7 1428.0 402.4Z",
            "M1677.6 262.2C1676.6 258.9 1678.8 195.6 1680.0 191.5C1689.9 158.7 1729.0 144.0 1761.0 161.1C1773.9 167.9 1785.1 183.4 1787.0 197.2C1788.1 204.2 1788.4 259.9 1787.4 262.4C1786.4 265.0 1678.4 264.8 1677.6 262.2Z",
            "M1888.0 402.2C1888.0 401.7 1889.8 400.4 1892.0 399.1C1903.6 392.6 1908.3 384.6 1922.3 348.0C1928.1 332.9 1938.7 305.0 1945.9 286.0C1953.2 267.0 1960.2 248.8 1961.5 245.5C1962.8 242.2 1969.1 226.0 1975.4 209.5C1981.7 193.0 1990.5 169.8 1995.1 158.0C1999.6 146.2 2004.7 132.7 2006.5 128.0C2008.3 123.3 2015.0 105.8 2021.5 89.0C2041.6 36.3 2045.0 27.3 2045.0 25.9C2045.0 25.1 2043.4 20.3 2041.5 15.1C2039.6 10.0 2038.3 5.4 2038.6 4.9C2038.9 4.4 2049.6 4.0 2062.4 4.0C2089.4 4.0 2085.5 1.5 2093.5 23.5C2099.2 39.2 2123.6 103.8 2132.7 127.5C2142.9 154.2 2151.6 176.6 2158.4 194.2C2159.8 197.7 2166.4 214.7 2173.1 232.0C2179.8 249.3 2188.6 272.1 2192.7 282.5C2196.8 292.9 2201.9 306.0 2204.0 311.5C2214.7 339.0 2229.5 376.0 2231.2 379.5C2235.0 387.0 2241.1 394.1 2247.1 397.9C2250.4 400.0 2252.7 402.0 2252.3 402.3C2251.5 403.1 2180.6 403.3 2179.8 402.5C2179.5 402.2 2180.1 400.3 2181.2 398.2C2185.2 390.6 2184.2 387.4 2159.6 323.5C2139.1 270.3 2139.0 270.2 2137.3 269.6C2133.8 268.2 1963.3 269.0 1962.1 270.4C1961.5 271.1 1960.1 274.1 1959.1 277.1C1958.0 280.1 1954.2 290.1 1950.5 299.5C1946.9 308.9 1941.4 323.0 1938.3 331.0C1935.2 339.0 1930.0 352.5 1926.7 361.0C1916.7 387.0 1915.6 391.9 1918.9 398.2C1919.9 400.3 1920.5 402.2 1920.2 402.5C1919.3 403.3 1888.0 403.1 1888.0 402.2ZM2132.4 260.4C2134.9 259.4 2134.4 257.1 2128.1 240.8C2112.4 200.1 2100.2 168.3 2095.7 156.5C2091.6 145.6 2053.8 47.1 2052.3 43.2C2051.5 41.2 2049.2 41.8 2048.4 44.3C2047.9 46.2 2038.9 69.9 2030.0 93.0C2028.4 97.1 2023.4 109.9 2019.0 121.5C2014.6 133.1 2009.7 145.9 2008.1 150.0C2006.4 154.1 2004.0 160.4 2002.6 164.0C2001.3 167.6 1992.7 190.0 1983.6 213.8C1966.5 258.3 1966.1 259.5 1968.2 260.3C1970.1 261.1 2130.5 261.1 2132.4 260.4Z",
            "M2351.0 401.9C2351.0 401.3 2352.5 397.8 2354.2 394.1L2357.5 387.5L2357.5 200.5L2357.5 13.5L2319.5 13.2C2252.2 12.6 2238.6 15.2 2216.6 32.5C2207.6 39.7 2201.9 42.1 2202.0 38.8C2202.1 38.1 2205.1 30.1 2208.8 21.0L2215.6 4.5L2380.7 4.2C2572.8 4.0 2550.0 1.5 2550.0 22.4C2550.0 29.3 2549.8 35.0 2549.5 35.0C2549.3 35.0 2546.0 32.7 2542.3 29.9C2522.8 15.1 2508.5 12.7 2444.0 13.2L2404.5 13.5L2404.2 194.0C2403.9 390.2 2403.8 388.2 2409.2 396.6C2410.7 399.0 2412.0 401.5 2412.0 402.0C2412.0 402.6 2400.4 403.0 2381.5 403.0C2359.5 403.0 2351.0 402.7 2351.0 401.9Z"
        ],
        "d": "M152.0 401.9C152.0 401.3 152.8 399.6 153.9 398.2C159.9 389.5 159.5 404.0 159.8 201.5C159.9 100.3 159.8 16.5 159.5 15.2C159.0 13.0 159.0 13.0 118.2 13.0C50.7 13.0 39.5 15.3 16.4 34.0C8.9 40.0 4.0 41.8 4.0 38.5C4.0 36.7 15.8 7.1 17.3 5.2C18.0 4.3 52.0 4.0 183.3 4.2L348.4 4.5L355.2 21.0C358.9 30.1 361.9 38.1 362.0 38.8C362.1 42.2 356.1 39.7 347.0 32.4C325.2 15.2 314.3 13.1 247.3 13.0C206.0 13.0 206.0 13.0 205.5 15.3C205.2 16.5 205.1 99.4 205.3 199.5C205.6 397.8 205.4 388.8 211.2 397.4C212.7 399.6 213.7 401.7 213.4 402.2C212.6 403.5 152.0 403.2 152.0 401.9ZM311.0 402.1C311.0 401.6 313.2 399.8 315.9 398.0C328.9 389.7 328.3 391.0 359.8 308.5C364.2 296.9 373.5 272.6 380.5 254.5C387.5 236.3 399.0 206.2 406.1 187.5C413.3 168.8 419.7 151.9 420.5 150.0C421.3 148.1 426.5 134.6 432.0 120.0C437.6 105.4 442.7 91.9 443.5 90.0C450.4 73.4 467.0 27.9 467.0 25.7C467.0 24.2 465.6 19.3 463.9 14.9C462.2 10.5 461.1 6.3 461.4 5.5C462.1 3.5 507.2 3.3 508.7 5.2C509.2 5.9 515.1 21.1 521.8 39.0C528.4 56.9 536.9 79.4 540.5 89.0C544.2 98.6 549.6 112.8 552.5 120.5C560.4 141.4 595.6 232.4 607.5 263.0C634.8 332.8 651.8 375.6 654.2 380.4C657.7 387.4 664.8 395.2 670.7 398.7C673.1 400.1 675.0 401.6 675.0 402.1C675.0 403.4 603.3 403.3 602.5 402.0C602.1 401.4 602.3 400.3 603.0 399.6C608.0 393.5 606.5 387.7 588.5 340.6C563.7 276.1 562.0 271.7 560.9 270.3C559.6 268.8 387.6 268.3 385.2 269.8C384.5 270.3 381.7 276.5 379.0 283.6C376.3 290.7 369.6 308.2 364.0 322.5C338.8 387.3 337.3 392.3 341.4 398.5C342.3 399.9 342.8 401.5 342.5 402.0C341.7 403.3 311.0 403.3 311.0 402.1ZM555.8 260.1C557.7 258.9 558.0 259.9 534.0 197.5C522.3 167.2 510.8 137.3 508.4 131.0C483.3 65.0 474.3 42.5 473.2 42.5C472.4 42.5 470.3 46.5 468.4 51.5C466.5 56.5 463.2 65.0 461.0 70.5C458.9 76.0 452.6 92.4 447.0 107.0C441.4 121.6 435.8 136.2 434.5 139.5C433.3 142.8 428.5 155.2 424.0 167.0C419.5 178.8 410.2 203.0 403.4 220.8C389.9 255.8 389.0 258.7 391.1 260.1C392.9 261.2 554.0 261.3 555.8 260.1ZM717.0 401.9C717.0 401.2 717.9 399.2 719.1 397.3C724.7 388.3 724.4 398.4 724.8 211.5C725.2 23.9 725.1 21.7 720.0 11.6C718.3 8.4 717.0 5.3 717.0 4.9C717.0 3.7 776.7 3.7 777.4 4.9C777.7 5.4 776.5 8.6 774.7 12.0L771.5 18.3L771.2 205.8C771.0 355.8 771.2 393.5 772.2 394.2C772.9 394.6 806.8 395.0 847.5 395.0C936.5 395.0 948.5 394.1 965.5 386.1C972.4 382.9 983.3 375.6 986.5 372.0C989.0 369.3 993.3 367.0 996.0 367.0C998.4 367.0 998.6 368.9 996.6 375.1C995.8 377.5 993.7 384.2 991.9 390.0C990.2 395.8 988.3 401.1 987.8 401.8C986.4 403.5 717.0 403.6 717.0 401.9ZM1020.0 402.1C1020.0 401.7 1022.5 399.6 1025.5 397.6C1037.8 389.4 1037.6 389.8 1067.6 311.5C1085.7 263.9 1098.1 231.6 1129.2 150.5C1133.6 138.9 1138.7 125.7 1140.5 121.0C1142.3 116.3 1146.4 105.8 1149.5 97.5C1152.6 89.2 1156.9 78.0 1159.0 72.5C1178.5 21.8 1177.4 26.0 1173.0 15.5C1167.7 3.2 1166.2 4.0 1193.5 4.0C1214.8 4.0 1217.0 4.2 1217.9 5.8C1218.4 6.7 1226.9 29.1 1236.8 55.5C1246.7 81.9 1257.8 111.4 1261.5 121.0C1277.9 163.8 1296.6 212.1 1313.7 256.0C1323.9 282.1 1333.7 307.3 1335.5 312.0C1345.2 337.4 1362.1 379.1 1364.3 383.0C1367.6 388.8 1373.5 394.9 1379.4 398.6C1381.9 400.2 1384.0 401.8 1384.0 402.2C1384.0 402.7 1367.6 403.0 1347.5 403.0C1327.4 403.0 1311.0 402.6 1311.0 402.2C1311.0 401.7 1311.7 399.8 1312.6 398.0C1313.9 395.5 1314.1 393.2 1313.7 388.1C1313.1 381.7 1312.0 378.1 1304.7 359.5C1297.4 340.7 1288.9 318.7 1280.0 295.5C1275.0 282.3 1270.1 270.9 1269.2 270.2C1267.4 268.8 1096.5 268.4 1094.2 269.8C1093.2 270.5 1074.4 317.9 1055.3 368.0C1049.0 384.5 1047.6 393.4 1050.3 398.7C1051.2 400.4 1051.6 402.0 1051.3 402.4C1050.3 403.3 1020.0 403.1 1020.0 402.1ZM1264.4 259.7C1266.2 258.4 1265.6 256.6 1250.5 217.5C1247.1 208.7 1231.3 167.5 1222.5 144.5C1218.3 133.5 1213.6 121.1 1212.0 117.0C1210.4 112.9 1203.2 94.4 1196.2 76.0C1188.2 55.3 1182.8 42.5 1181.9 42.5C1180.5 42.5 1179.8 44.4 1155.9 107.0C1147.6 128.7 1139.3 150.3 1137.4 155.0C1132.7 167.2 1103.2 244.3 1100.4 252.0C1098.1 258.1 1098.1 258.6 1099.7 259.8C1102.2 261.6 1261.8 261.6 1264.4 259.7ZM1428.0 402.4C1428.0 402.0 1429.3 399.0 1431.0 395.6C1435.9 385.4 1436.0 383.9 1436.0 203.5C1436.0 22.8 1436.0 21.8 1430.9 11.4C1429.3 8.0 1428.0 5.0 1428.0 4.6C1428.0 3.8 1488.5 3.8 1489.3 4.6C1489.7 5.0 1489.0 6.6 1487.8 8.2C1481.6 16.9 1482.0 4.3 1482.0 208.5C1482.0 376.5 1482.1 393.8 1483.6 394.4C1487.3 395.8 1632.2 395.0 1645.0 393.5C1668.9 390.7 1679.7 386.5 1695.4 374.1C1704.7 366.6 1709.0 365.1 1709.0 369.1C1709.0 370.3 1706.7 378.4 1704.0 387.1L1698.9 403.0L1563.5 403.0C1489.0 403.0 1428.0 402.7 1428.0 402.4ZM1677.6 262.2C1676.6 258.9 1678.8 195.6 1680.0 191.5C1689.9 158.7 1729.0 144.0 1761.0 161.1C1773.9 167.9 1785.1 183.4 1787.0 197.2C1788.1 204.2 1788.4 259.9 1787.4 262.4C1786.4 265.0 1678.4 264.8 1677.6 262.2ZM1888.0 402.2C1888.0 401.7 1889.8 400.4 1892.0 399.1C1903.6 392.6 1908.3 384.6 1922.3 348.0C1928.1 332.9 1938.7 305.0 1945.9 286.0C1953.2 267.0 1960.2 248.8 1961.5 245.5C1962.8 242.2 1969.1 226.0 1975.4 209.5C1981.7 193.0 1990.5 169.8 1995.1 158.0C1999.6 146.2 2004.7 132.7 2006.5 128.0C2008.3 123.3 2015.0 105.8 2021.5 89.0C2041.6 36.3 2045.0 27.3 2045.0 25.9C2045.0 25.1 2043.4 20.3 2041.5 15.1C2039.6 10.0 2038.3 5.4 2038.6 4.9C2038.9 4.4 2049.6 4.0 2062.4 4.0C2089.4 4.0 2085.5 1.5 2093.5 23.5C2099.2 39.2 2123.6 103.8 2132.7 127.5C2142.9 154.2 2151.6 176.6 2158.4 194.2C2159.8 197.7 2166.4 214.7 2173.1 232.0C2179.8 249.3 2188.6 272.1 2192.7 282.5C2196.8 292.9 2201.9 306.0 2204.0 311.5C2214.7 339.0 2229.5 376.0 2231.2 379.5C2235.0 387.0 2241.1 394.1 2247.1 397.9C2250.4 400.0 2252.7 402.0 2252.3 402.3C2251.5 403.1 2180.6 403.3 2179.8 402.5C2179.5 402.2 2180.1 400.3 2181.2 398.2C2185.2 390.6 2184.2 387.4 2159.6 323.5C2139.1 270.3 2139.0 270.2 2137.3 269.6C2133.8 268.2 1963.3 269.0 1962.1 270.4C1961.5 271.1 1960.1 274.1 1959.1 277.1C1958.0 280.1 1954.2 290.1 1950.5 299.5C1946.9 308.9 1941.4 323.0 1938.3 331.0C1935.2 339.0 1930.0 352.5 1926.7 361.0C1916.7 387.0 1915.6 391.9 1918.9 398.2C1919.9 400.3 1920.5 402.2 1920.2 402.5C1919.3 403.3 1888.0 403.1 1888.0 402.2ZM2132.4 260.4C2134.9 259.4 2134.4 257.1 2128.1 240.8C2112.4 200.1 2100.2 168.3 2095.7 156.5C2091.6 145.6 2053.8 47.1 2052.3 43.2C2051.5 41.2 2049.2 41.8 2048.4 44.3C2047.9 46.2 2038.9 69.9 2030.0 93.0C2028.4 97.1 2023.4 109.9 2019.0 121.5C2014.6 133.1 2009.7 145.9 2008.1 150.0C2006.4 154.1 2004.0 160.4 2002.6 164.0C2001.3 167.6 1992.7 190.0 1983.6 213.8C1966.5 258.3 1966.1 259.5 1968.2 260.3C1970.1 261.1 2130.5 261.1 2132.4 260.4ZM2351.0 401.9C2351.0 401.3 2352.5 397.8 2354.2 394.1L2357.5 387.5L2357.5 200.5L2357.5 13.5L2319.5 13.2C2252.2 12.6 2238.6 15.2 2216.6 32.5C2207.6 39.7 2201.9 42.1 2202.0 38.8C2202.1 38.1 2205.1 30.1 2208.8 21.0L2215.6 4.5L2380.7 4.2C2572.8 4.0 2550.0 1.5 2550.0 22.4C2550.0 29.3 2549.8 35.0 2549.5 35.0C2549.3 35.0 2546.0 32.7 2542.3 29.9C2522.8 15.1 2508.5 12.7 2444.0 13.2L2404.5 13.5L2404.2 194.0C2403.9 390.2 2403.8 388.2 2409.2 396.6C2410.7 399.0 2412.0 401.5 2412.0 402.0C2412.0 402.6 2400.4 403.0 2381.5 403.0C2359.5 403.0 2351.0 402.7 2351.0 401.9Z"
    }
};
}),
];

//# sourceMappingURL=_0hirgvj._.js.map