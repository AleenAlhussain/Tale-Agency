import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { runSeed } from './seed-core';

/** On boot: makes sure the admin account exists and the portfolio tables are filled the first time. */
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly log = new Logger('Seed');
  constructor(
    private readonly db: DataSource,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  async onApplicationBootstrap() {
    const r = await runSeed(this.db, this.cfg);
    if (r.projects || r.caseStudies) this.log.log(`Seeded ${r.projects} projects and ${r.caseStudies} case studies`);
    if (r.admin) this.log.log(`Admin account ${r.admin}: ${this.cfg.adminEmail}`);
    if (!this.cfg.adminEmail) this.log.warn('ADMIN_EMAIL and ADMIN_PASSWORD are not set, so no admin account was created');
  }
}
