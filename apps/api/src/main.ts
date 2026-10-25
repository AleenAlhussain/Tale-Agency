import 'reflect-metadata';
import { existsSync } from 'fs';
import { join } from 'path';

/* in development, read apps/api/.env if it exists (Docker passes real environment variables instead) */
const envFile = join(__dirname, '..', '.env');
if (process.env.NODE_ENV !== 'production' && existsSync(envFile)) process.loadEnvFile(envFile);
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApp } from './bootstrap';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: false });
  const cfg = configureApp(app);
  await app.listen(cfg.port, '0.0.0.0');
  Logger.log(`API ready on :${cfg.port}${cfg.swagger ? ' · docs at /api/docs' : ''}`, 'Main');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
