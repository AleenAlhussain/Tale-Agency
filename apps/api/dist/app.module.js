"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const throttler_1 = require("@nestjs/throttler");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("./config/config.module");
const env_1 = require("./config/env");
const entities_1 = require("./database/entities");
const typeorm_options_1 = require("./database/typeorm-options");
const seed_service_1 = require("./database/seed.service");
const notifications_service_1 = require("./notifications/notifications.service");
const auth_1 = require("./auth/auth");
const leads_1 = require("./leads/leads");
const quotes_1 = require("./quotes/quotes");
const waitlist_1 = require("./waitlist/waitlist");
const content_1 = require("./content/content");
const admin_1 = require("./admin/admin");
const health_1 = require("./health/health");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [env_1.APP_CONFIG],
                useFactory: (cfg) => (0, typeorm_options_1.typeormOptions)(cfg),
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.ENTITIES),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [env_1.APP_CONFIG],
                useFactory: (cfg) => ({ secret: cfg.jwtSecret, signOptions: { expiresIn: '8h', issuer: 'talal-at' }, verifyOptions: { issuer: 'talal-at' } }),
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [env_1.APP_CONFIG],
                useFactory: (cfg) => [{ name: 'default', ttl: 60_000, limit: cfg.throttleLimit }],
            }),
        ],
        controllers: [health_1.HealthController, content_1.ContentController, leads_1.LeadsController, quotes_1.QuotesController, waitlist_1.WaitlistController, auth_1.AuthController, admin_1.AdminController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            notifications_service_1.NotificationsService,
            seed_service_1.SeedService,
            auth_1.AdminGuard,
            leads_1.LeadsService,
            quotes_1.QuotesService,
            waitlist_1.WaitlistService,
            content_1.ContentService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map