"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRef = makeRef;
exports.hashIp = hashIp;
exports.clip = clip;
exports.csvCell = csvCell;
exports.toCsv = toCsv;
const crypto_1 = require("crypto");
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function makeRef(prefix) {
    let s = '';
    for (let i = 0; i < 6; i++)
        s += ALPHABET[(0, crypto_1.randomInt)(ALPHABET.length)];
    return `${prefix}-${s}`;
}
function hashIp(req, salt) {
    const ip = req.ip || req.socket?.remoteAddress;
    if (!ip)
        return null;
    return (0, crypto_1.createHash)('sha256').update(salt + '|' + ip).digest('hex');
}
function clip(s, max) {
    if (s === undefined || s === null)
        return null;
    const t = String(s).replace(/\s+/g, ' ').trim();
    return t ? t.slice(0, max) : null;
}
function csvCell(v) {
    const s = v === null || v === undefined ? '' : Array.isArray(v) ? v.join('; ') : v instanceof Date ? v.toISOString() : String(v);
    const safe = /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
    return '"' + safe.replace(/"/g, '""') + '"';
}
function toCsv(rows, cols) {
    return [cols.map((c) => csvCell(c[0])).join(','), ...rows.map((r) => cols.map((c) => csvCell(c[1](r))).join(','))].join('\r\n') + '\r\n';
}
//# sourceMappingURL=util.js.map