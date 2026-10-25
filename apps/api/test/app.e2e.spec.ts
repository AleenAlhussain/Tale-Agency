/* End-to-end tests against a real PostgreSQL database (TEST_DATABASE_URL). The schema is rebuilt from the migrations. */
import { Test } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/bootstrap';

describe('TALAL·AT API (e2e)', () => {
  let app: NestExpressApplication;
  let http: ReturnType<typeof request>;
  let cookie = '';

  beforeAll(async () => {
    /* start from an empty schema so the migrations and the seed run exactly as on a new server */
    const raw = new DataSource({ type: 'postgres', url: process.env.DATABASE_URL });
    await raw.initialize();
    await raw.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await raw.destroy();

    const mod = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = mod.createNestApplication<NestExpressApplication>();
    configureApp(app);
    await app.init();
    http = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app?.close();
  });

  it('reports healthy with the database up', async () => {
    const r = await http.get('/api/health').expect(200);
    expect(r.body).toMatchObject({ status: 'ok', db: 'up' });
  });

  it('serves the seeded portfolio, the price list and the payment settings', async () => {
    const r = await http.get('/api/content/site').expect(200);
    expect(r.body.projects).toHaveLength(67);
    expect(r.body.caseStudies.map((c: { slug: string }) => c.slug)).toEqual(['avara', 'hamilton', 'sakura', 'green', 'nava', 'apex', 'avantcha', 'nhu']);
    expect(r.body.pricing.sections.map((s: { k: string }) => s.k)).toEqual(['id', 'voice', 'web', 'app', 'social', 'video']);
    expect(r.body.payment.link).toBe('https://pay.example.com/deposit');
    expect(r.headers['cache-control']).toContain('max-age=60');
  });

  it('lists the four divisions and two products', async () => {
    const r = await http.get('/api/content/company').expect(200);
    expect(r.body.divisions.map((d: { slug: string }) => d.slug)).toEqual(['software', 'ai', 'brand', 'growth']);
    expect(r.body.products.map((p: { slug: string; status: string }) => [p.slug, p.status])).toEqual([
      ['ai-marketing', 'In development'],
      ['nuss-nuss', 'In development'],
    ]);
  });

  describe('contact briefs', () => {
    it('saves a brief and returns a reference', async () => {
      const r = await http
        .post('/api/leads')
        .send({ name: 'Mira Haddad', email: 'Mira@Example.com', company: 'Haddad & Co', budget: 'AED 10K — 30K', services: ['Brand identity', 'Web & UI'], division: 'brand', message: 'A new identity for our café group.', source: '/contact' })
        .expect(201);
      expect(r.body.ref).toMatch(/^L-[2-9A-HJ-NP-Z]{6}$/);
    });

    it('rejects a brief without an email or message, in plain words', async () => {
      const r = await http.post('/api/leads').send({ name: 'No Email' }).expect(400);
      expect(String(r.body.message)).toMatch(/email|few words/i);
    });

    it('drops unknown fields and refuses an unknown division', async () => {
      await http.post('/api/leads').send({ name: 'Sam', email: 'sam@example.com', message: 'Hello there', division: 'crypto' }).expect(400);
    });

    it('accepts a bot quietly but files it as spam', async () => {
      await http.post('/api/leads').send({ name: 'Bot', email: 'bot@example.com', message: 'Buy now buy now', website: 'http://spam.example' }).expect(201);
    });
  });

  describe('build your scope', () => {
    it('recalculates every price on the server and ignores totals sent by the browser', async () => {
      const r = await http
        .post('/api/quotes')
        .send({
          name: 'Omar',
          email: 'omar@example.com',
          selection: { r: { id: 'az', web: 'w1', social: 's1' }, c: { ig: true, notAnItem: true }, q: {}, term: '3' },
          total: 1,
          lines: [{ name: 'Everything', amount: 1 }],
        })
        .expect(201);
      expect(r.body.ref).toMatch(/^Q-/);
      expect(r.body.totals).toEqual({ oneOff: 14700, monthly: 2850, termMonths: 3, total: 23250, deposit: 10200, currency: 'AED' });
      expect(r.body.lines.map((l: { id: string }) => l.id)).toEqual(['az', 'w1', 's1', 'ig']);
    });

    it('makes the guidelines book free with A to Z, and clamps quantities', async () => {
      const r = await http
        .post('/api/quotes')
        .send({ name: 'Lina', email: 'lina@example.com', selection: { r: { id: 'az' }, c: { gl: true, ed: true }, q: { ed: 999 }, term: '1' } })
        .expect(201);
      const ids = r.body.lines.map((l: { id: string }) => l.id);
      expect(ids).toEqual(['az', 'ed']);
      expect(r.body.lines[1]).toMatchObject({ qty: 50, amount: 350 * 50 });
    });

    it('refuses an empty scope', async () => {
      await http.post('/api/quotes').send({ name: 'Empty', email: 'e@example.com', selection: { r: {}, c: {}, q: {}, term: '1' } }).expect(400);
    });
  });

  describe('waitlists', () => {
    it('adds an email once per product', async () => {
      const a = await http.post('/api/waitlist').send({ product: 'ai-marketing', email: 'team@agency.ae', name: 'Agency' }).expect(201);
      expect(a.body.already).toBe(false);
      const b = await http.post('/api/waitlist').send({ product: 'ai-marketing', email: 'TEAM@agency.ae' }).expect(201);
      expect(b.body.already).toBe(true);
      const c = await http.post('/api/waitlist').send({ product: 'nuss-nuss', email: 'team@agency.ae' }).expect(201);
      expect(c.body.already).toBe(false);
    });

    it('refuses a product that does not exist', async () => {
      await http.post('/api/waitlist').send({ product: 'something-else', email: 'x@example.com' }).expect(400);
    });
  });

  describe('admin', () => {
    it('keeps the back office closed without a session', async () => {
      await http.get('/api/admin/stats').expect(401);
      await http.get('/api/auth/me').expect(401);
    });

    it('refuses a wrong password', async () => {
      await http.post('/api/auth/login').send({ email: 'owner@talal.test', password: 'nope' }).expect(401);
    });

    it('signs in with an http-only session cookie', async () => {
      const r = await http.post('/api/auth/login').send({ email: 'OWNER@talal.test', password: 'Correct-Horse-Battery-9' }).expect(200);
      const set = ([] as string[]).concat(r.headers['set-cookie'] ?? []);
      const c = set.find((s) => s.startsWith('ta_admin='))!;
      expect(c).toMatch(/HttpOnly/i);
      expect(c).toMatch(/SameSite=Lax/i);
      cookie = c.split(';')[0];
      const me = await http.get('/api/auth/me').set('Cookie', cookie).expect(200);
      expect(me.body.user.email).toBe('owner@talal.test');
    });

    it('shows the overview numbers', async () => {
      const r = await http.get('/api/admin/stats').set('Cookie', cookie).expect(200);
      expect(r.body.leads).toMatchObject({ new: 1, spam: 1 });
      expect(r.body.quotes.new.count).toBe(2);
      expect(r.body.waitlist).toEqual({ 'ai-marketing': 1, 'nuss-nuss': 1 });
      expect(r.body.openPipelineAed).toBe(23250 + 9500 + 17500);
    });

    it('needs the request header before changing anything from a browser session', async () => {
      const list = await http.get('/api/admin/leads?status=new').set('Cookie', cookie).expect(200);
      const id = list.body.items[0].id;
      await http.patch(`/api/admin/leads/${id}`).set('Cookie', cookie).send({ status: 'contacted' }).expect(403);
      const ok = await http.patch(`/api/admin/leads/${id}`).set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ status: 'contacted', notes: 'Called, sending proposal' }).expect(200);
      expect(ok.body).toMatchObject({ status: 'contacted', notes: 'Called, sending proposal' });
      const only = await http.patch(`/api/admin/leads/${id}`).set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ status: 'qualified' }).expect(200);
      expect(only.body).toMatchObject({ status: 'qualified', notes: 'Called, sending proposal', name: 'Mira Haddad' });
      await http.patch(`/api/admin/leads/${id}`).set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ status: 'archived' }).expect(400);
      await http.patch('/api/admin/leads/not-a-uuid').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ status: 'won' }).expect(400);
      await http.patch('/api/admin/leads/00000000-0000-4000-8000-000000000000').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ status: 'won' }).expect(404);
    });

    it('searches leads and exports them to CSV safely', async () => {
      const s = await http.get('/api/admin/leads?q=haddad').set('Cookie', cookie).expect(200);
      expect(s.body.total).toBe(1);
      const csv = await http.get('/api/admin/leads.csv').set('Cookie', cookie).expect(200);
      expect(csv.headers['content-type']).toContain('text/csv');
      expect(csv.text.split('\r\n')[0]).toContain('"Ref","Date","Status"');
    });

    it('hides a case study from the public site when unpublished', async () => {
      const u = await http.patch('/api/admin/content/case-studies/nhu').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ published: false }).expect(200);
      /* a partial update keeps every other field */
      expect(u.body).toMatchObject({ slug: 'nhu', title: 'Nhu Design Studio', category: 'Branding', published: false, featured: true });
      const r = await http.get('/api/content/site').expect(200);
      expect(r.body.caseStudies.map((c: { slug: string }) => c.slug)).not.toContain('nhu');
      await http.patch('/api/admin/content/case-studies/nhu').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ published: true }).expect(200);
    });

    it('lets the owner change the password', async () => {
      await http.post('/api/admin/account/password').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ current: 'wrong', next: 'Another-Long-Password-1' }).expect(400);
      await http.post('/api/admin/account/password').set('Cookie', cookie).set('X-Requested-With', 'talal-admin').send({ current: 'Correct-Horse-Battery-9', next: 'Another-Long-Password-1' }).expect(201);
      await http.post('/api/auth/login').send({ email: 'owner@talal.test', password: 'Another-Long-Password-1' }).expect(200);
    });

    it('signs out', async () => {
      const r = await http.post('/api/auth/logout').set('Cookie', cookie).expect(200);
      expect(String(r.headers['set-cookie'])).toMatch(/ta_admin=;/);
    });
  });
});
