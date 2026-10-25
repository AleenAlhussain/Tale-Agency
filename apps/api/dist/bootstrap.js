"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApp = configureApp;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
function configureApp(app) {
    const cfg = app.get(env_1.APP_CONFIG);
    app.setGlobalPrefix('api');
    app.set('trust proxy', 1);
    app.disable('x-powered-by');
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'same-site' } }));
    app.use((0, cookie_parser_1.default)());
    app.enableCors({ origin: cfg.corsOrigins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'OPTIONS'] });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true, stopAtFirstError: true, transformOptions: { enableImplicitConversion: false } }));
    app.enableShutdownHooks();
    if (cfg.swagger)
        setupSwagger(app);
    return cfg;
}
function setupSwagger(app) {
    const doc = new swagger_1.DocumentBuilder()
        .setTitle('TALAL·AT API')
        .setDescription('Leads, scopes, waitlists, portfolio content and the admin back office.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addCookieAuth('ta_admin')
        .build();
    swagger_1.SwaggerModule.setup('api/docs', app, swagger_1.SwaggerModule.createDocument(app, doc));
}
//# sourceMappingURL=bootstrap.js.map