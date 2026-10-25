import * as bcrypt from 'bcryptjs';
import type { DataSource } from 'typeorm';
import { SEED_CASE_STUDIES, SEED_PROJECTS } from '@talal-at/shared';
import type { AppConfig } from '../config/env';
import { AdminUser, ArchiveProject, CaseStudy } from './entities';

/** Idempotent: only fills empty tables, only creates the admin when missing
 *  (or resets the password when ADMIN_PASSWORD_RESET=true). */
export async function runSeed(db: DataSource, cfg: Pick<AppConfig, 'adminEmail' | 'adminPassword' | 'adminPasswordReset'>) {
  const out = { projects: 0, caseStudies: 0, admin: '' as '' | 'created' | 'password reset' };
  const projects = db.getRepository(ArchiveProject);
  const cases = db.getRepository(CaseStudy);
  const users = db.getRepository(AdminUser);

  if ((await projects.count()) === 0) {
    await projects.insert(SEED_PROJECTS.map((p) => projects.create(p)));
    out.projects = SEED_PROJECTS.length;
  }
  if ((await cases.count()) === 0) {
    await cases.insert(SEED_CASE_STUDIES.map((c) => cases.create(c)));
    out.caseStudies = SEED_CASE_STUDIES.length;
  }
  if (cfg.adminEmail && cfg.adminPassword) {
    const existing = await users.findOne({ where: { email: cfg.adminEmail } });
    if (!existing) {
      await users.save(users.create({ email: cfg.adminEmail, name: 'Talal Atallah', role: 'owner', passwordHash: await bcrypt.hash(cfg.adminPassword, 12) }));
      out.admin = 'created';
    } else if (cfg.adminPasswordReset) {
      existing.passwordHash = await bcrypt.hash(cfg.adminPassword, 12);
      await users.save(existing);
      out.admin = 'password reset';
    }
  }
  return out;
}
