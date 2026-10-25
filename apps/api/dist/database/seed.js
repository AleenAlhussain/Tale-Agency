"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("../config/env");
const typeorm_options_1 = require("./typeorm-options");
const seed_core_1 = require("./seed-core");
(async () => {
    const cfg = (0, env_1.loadConfig)();
    const db = await new typeorm_1.DataSource({ ...(0, typeorm_options_1.typeormOptions)(cfg), migrationsRun: false }).initialize();
    await db.runMigrations();
    const r = await (0, seed_core_1.runSeed)(db, cfg);
    console.log('Seed done:', r);
    await db.destroy();
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map