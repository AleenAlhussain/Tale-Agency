/* npm run seed -w @talal-at/api : runs migrations, then fills empty tables and creates the admin. */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadConfig } from '../config/env';
import { typeormOptions } from './typeorm-options';
import { runSeed } from './seed-core';

(async () => {
  const cfg = loadConfig();
  const db = await new DataSource({ ...typeormOptions(cfg), migrationsRun: false }).initialize();
  await db.runMigrations();
  const r = await runSeed(db, cfg);
  console.log('Seed done:', r);
  await db.destroy();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
