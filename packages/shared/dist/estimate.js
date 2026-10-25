"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEntities = decodeEntities;
exports.normaliseSelection = normaliseSelection;
exports.computeEstimate = computeEstimate;
exports.formatMoney = formatMoney;
function decodeEntities(s) {
    return s
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"');
}
/** Cleans anything a browser could send into a valid selection for this catalog. */
function normaliseSelection(input, catalog) {
    const raw = (input && typeof input === 'object' ? input : {});
    const out = { r: {}, c: {}, q: {}, term: '1' };
    const termIds = catalog.terms.map((t) => t.id);
    out.term = typeof raw.term === 'string' && termIds.includes(raw.term) ? raw.term : catalog.terms[0].id;
    const bySection = new Map();
    const byItem = new Map();
    for (const s of catalog.sections) {
        bySection.set(s.k, s);
        for (const i of s.items)
            byItem.set(i.id, i);
        for (const i of s.add ?? [])
            byItem.set(i.id, i);
    }
    for (const [k, v] of Object.entries(raw.r ?? {})) {
        const s = bySection.get(k);
        if (s?.radio && typeof v === 'string' && s.items.some((i) => i.id === v))
            out.r[k] = v;
    }
    for (const [k, v] of Object.entries(raw.c ?? {})) {
        if (v === true && byItem.has(k))
            out.c[k] = true;
    }
    for (const [k, v] of Object.entries(raw.q ?? {})) {
        const i = byItem.get(k);
        const n = typeof v === 'number' ? Math.floor(v) : Number.NaN;
        if (i?.qty && Number.isFinite(n))
            out.q[k] = Math.max(1, Math.min(i.qty.max, n));
    }
    return out;
}
function computeEstimate(sel, catalog) {
    const term = catalog.terms.find((t) => t.id === sel.term) ?? catalog.terms[0];
    const chosen = Object.values(sel.r).filter(Boolean);
    const included = (i) => !!i.inc && i.inc.some((id) => chosen.includes(id));
    const lines = [];
    const push = (i) => {
        if (included(i))
            return;
        const qty = i.qty ? Math.max(1, Math.min(i.qty.max, sel.q[i.id] || 1)) : 1;
        let amount = (i.p || 0) * qty;
        if (i.mo)
            amount = Math.round(amount * (1 - term.discount));
        lines.push({
            id: i.id,
            name: decodeEntities(i.n) + (qty > 1 ? ' × ' + qty : ''),
            qty,
            amount,
            monthly: !!i.mo,
            quote: !!i.quote,
            from: !!i.from,
        });
    };
    for (const s of catalog.sections) {
        for (const i of s.items)
            if (s.radio ? sel.r[s.k] === i.id : sel.c[i.id])
                push(i);
        for (const i of s.add ?? [])
            if (sel.c[i.id])
                push(i);
    }
    let oneOff = 0;
    let monthly = 0;
    for (const l of lines) {
        if (l.monthly)
            monthly += l.amount;
        else
            oneOff += l.amount;
    }
    const termMonths = Number(term.id);
    return {
        lines,
        oneOff,
        monthly,
        termMonths,
        total: oneOff + monthly * termMonths,
        deposit: Math.round(oneOff * catalog.deposit) + monthly,
        hasQuoteItems: lines.some((l) => l.quote),
        hasFromPrices: lines.some((l) => l.from),
    };
}
function formatMoney(aed, currency = 'AED', usdPeg = 3.6725) {
    const v = currency === 'USD' ? aed / usdPeg : aed;
    return (currency === 'USD' ? '$' : 'AED ') + Math.round(v).toLocaleString('en-US');
}
