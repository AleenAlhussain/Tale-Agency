/* Used by the TypeORM CLI: npm run migration:run -w @talal-at/api */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadConfig } from '../config/env';
import { typeormOptions } from './typeorm-options';

const cfg = loadConfig();
export default new DataSource({ ...typeormOptions(cfg), migrationsRun: false });
