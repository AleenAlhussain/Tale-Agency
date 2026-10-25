import { createHash, randomInt } from 'crypto';
import type { Request } from 'express';

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

/** Short, readable reference such as L-7KQ2M9. No 0/O or 1/I to misread on the phone. */
export function makeRef(prefix: string): string {
  let s = '';
  for (let i = 0; i < 6; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return `${prefix}-${s}`;
}

/** The visitor's address, hashed with a secret salt. Enough to spot abuse, not enough to identify anyone. */
export function hashIp(req: Request, salt: string): string | null {
  const ip = req.ip || req.socket?.remoteAddress;
  if (!ip) return null;
  return createHash('sha256').update(salt + '|' + ip).digest('hex');
}

export function clip(s: string | undefined | null, max: number): string | null {
  if (s === undefined || s === null) return null;
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t ? t.slice(0, max) : null;
}

export function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? '' : Array.isArray(v) ? v.join('; ') : v instanceof Date ? v.toISOString() : String(v);
  /* neutralise spreadsheet formulas */
  const safe = /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
  return '"' + safe.replace(/"/g, '""') + '"';
}

export function toCsv<T>(rows: T[], cols: [string, (r: T) => unknown][]): string {
  return [cols.map((c) => csvCell(c[0])).join(','), ...rows.map((r) => cols.map((c) => csvCell(c[1](r))).join(','))].join('\r\n') + '\r\n';
}
