import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { APP_CONFIG, type AppConfig } from './config/env';
import { ENTITIES } from './database/entities';
import { typeormOptions } from './database/typeorm-options';
import { SeedService } from './database/seed.service';
import { NotificationsService } from './notifications/notifications.service';
import { AdminGuard, AuthController } from './auth/auth';
import { LeadsController, LeadsService } from './leads/leads';
import { QuotesController, QuotesService } from './quotes/quotes';
import { WaitlistController, WaitlistService } from './waitlist/waitlist';
import { ContentController, ContentService } from './content/content';
import { AdminController } from './admin/admin';
import { HealthController } from './health/health';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (cfg: AppConfig) => typeormOptions(cfg),
    }),
    TypeOrmModule.forFeature(ENTITIES),
    JwtModule.registerAsync({
      global: true,
      inject: [APP_CONFIG],
      useFactory: (cfg: AppConfig) => ({ secret: cfg.jwtSecret, signOptions: { expiresIn: '8h', issuer: 'talal-at' }, verifyOptions: { issuer: 'talal-at' } }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (cfg: AppConfig) => [{ name: 'default', ttl: 60_000, limit: cfg.throttleLimit }],
    }),
  ],
  controllers: [HealthController, ContentController, LeadsController, QuotesController, WaitlistController, AuthController, AdminController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    NotificationsService,
    SeedService,
    AdminGuard,
    LeadsService,
    QuotesService,
    WaitlistService,
    ContentService,
  ],
})
export class AppModule {}
