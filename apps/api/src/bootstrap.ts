import { INestApplication, ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { APP_CONFIG, type AppConfig } from './config/env';

/** Shared by main.ts and the tests, so both run the exact same app. */
export function configureApp(app: NestExpressApplication): AppConfig {
  const cfg = app.get<AppConfig>(APP_CONFIG);
  app.setGlobalPrefix('api');
  /* the web app (and any load balancer) sits in front, so trust one proxy hop for the visitor's address */
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'same-site' } }));
  app.use(cookieParser());
  app.enableCors({ origin: cfg.corsOrigins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'OPTIONS'] });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, stopAtFirstError: true, transformOptions: { enableImplicitConversion: false } }),
  );
  app.enableShutdownHooks();
  if (cfg.swagger) setupSwagger(app);
  return cfg;
}

function setupSwagger(app: INestApplication) {
  const doc = new DocumentBuilder()
    .setTitle('TALAL·AT API')
    .setDescription('Leads, scopes, waitlists, portfolio content and the admin back office.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addCookieAuth('ta_admin')
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, doc));
}
