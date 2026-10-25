"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs_1 = require("fs");
const path_1 = require("path");
const envFile = (0, path_1.join)(__dirname, '..', '.env');
if (process.env.NODE_ENV !== 'production' && (0, fs_1.existsSync)(envFile))
    process.loadEnvFile(envFile);
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bootstrap_1 = require("./bootstrap");
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: false });
    const cfg = (0, bootstrap_1.configureApp)(app);
    await app.listen(cfg.port, '0.0.0.0');
    common_1.Logger.log(`API ready on :${cfg.port}${cfg.swagger ? ' · docs at /api/docs' : ''}`, 'Main');
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=main.js.map