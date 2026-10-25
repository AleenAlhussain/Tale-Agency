/* Reads and checks the environment once, at boot. The app refuses to start in production
   with weak or missing secrets. */
import { randomBytes } from 'crypto';

export interface AppConfig {
  nodeEnv: string;
  isProd: boolean;
  port: number;
  databaseUrl: string;
  databaseSsl: boolean;
  migrationsRun: boolean;
  jwtSecret: string;
  ipSalt: string;
  cookieSecure: boolean;
  corsOrigins: string[];
  adminEmail: string | null;
  adminPassword: string | null;
  adminPasswordReset: boolean;
  swagger: boolean;
  throttleLimit: number;
  formThrottleLimit: number;
  paymentLink: string;
  notifyEmail: string;
  smtp: { host: string; port: number; user: string; pass: string; from: string; secure: boolean } | null;
}

function bool(v: string | undefined, d: boolean): boolean {
  if (v === undefined || v === '') return d;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const nodeEnv = env.NODE_ENV || 'development';
  const isProd = nodeEnv === 'production';
  const problems: string[] = [];

  const databaseUrl =
    env.DATABASE_URL ||
    (env.POSTGRES_HOST
      ? `postgres://${encodeURIComponent(env.POSTGRES_USER || 'talal')}:${encodeURIComponent(env.POSTGRES_PASSWORD || '')}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT || 5432}/${env.POSTGRES_DB || 'talal_at'}`
      : '');
  if (!databaseUrl) problems.push('DATABASE_URL (or POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB) is required');

  let jwtSecret = env.JWT_SECRET || '';
  if (jwtSecret.length < 32) {
    if (isProd) problems.push('JWT_SECRET must be at least 32 characters in production');
    else jwtSecret = randomBytes(32).toString('hex');
  }
  const adminPassword = env.ADMIN_PASSWORD || null;
  if (isProd && adminPassword && adminPassword.length < 12) problems.push('ADMIN_PASSWORD must be at least 12 characters in production');

  if (problems.length) throw new Error('Invalid configuration:\n - ' + problems.join('\n - '));

  const smtpHost = env.SMTP_HOST || '';
  return {
    nodeEnv,
    isProd,
    port: Number(env.PORT || env.API_PORT || 4000),
    databaseUrl,
    databaseSsl: bool(env.DATABASE_SSL, false),
    migrationsRun: bool(env.MIGRATIONS_RUN, true),
    jwtSecret,
    ipSalt: env.IP_SALT || jwtSecret,
    cookieSecure: bool(env.COOKIE_SECURE, isProd),
    corsOrigins: (env.CORS_ORIGINS || 'http://localhost:3000').split(',').map((s) => s.trim()).filter(Boolean),
    adminEmail: env.ADMIN_EMAIL ? env.ADMIN_EMAIL.toLowerCase().trim() : null,
    adminPassword,
    adminPasswordReset: bool(env.ADMIN_PASSWORD_RESET, false),
    swagger: bool(env.SWAGGER_ENABLED, !isProd),
    throttleLimit: Number(env.THROTTLE_LIMIT || 120),
    formThrottleLimit: Number(env.FORM_THROTTLE_LIMIT || 6),
    paymentLink: env.PAYMENT_LINK || '',
    notifyEmail: env.NOTIFY_EMAIL || 'talalatallah10@gmail.com',
    smtp: smtpHost
      ? {
          host: smtpHost,
          port: Number(env.SMTP_PORT || 587),
          user: env.SMTP_USER || '',
          pass: env.SMTP_PASS || '',
          from: env.SMTP_FROM || 'TALAL·AT <no-reply@talal.at>',
          secure: bool(env.SMTP_SECURE, false),
        }
      : null,
  };
}

export const APP_CONFIG = 'APP_CONFIG';
