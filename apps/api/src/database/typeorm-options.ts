import { join } from 'path';
import type { DataSourceOptions } from 'typeorm';
import type { AppConfig } from '../config/env';
import { ENTITIES } from './entities';

/** One place for the database options, used by the app and by the TypeORM CLI. */
export function typeormOptions(cfg: Pick<AppConfig, 'databaseUrl' | 'databaseSsl' | 'migrationsRun'>): DataSourceOptions {
  return {
    type: 'postgres',
    url: cfg.databaseUrl,
    ssl: cfg.databaseSsl ? { rejectUnauthorized: false } : false,
    entities: ENTITIES,
    migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
    migrationsTableName: 'schema_migrations',
    migrationsRun: cfg.migrationsRun,
    synchronize: false,
    uuidExtension: 'pgcrypto',
    logging: ['error', 'warn', 'migration'],
  };
}
