"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormOptions = typeormOptions;
const path_1 = require("path");
const entities_1 = require("./entities");
function typeormOptions(cfg) {
    return {
        type: 'postgres',
        url: cfg.databaseUrl,
        ssl: cfg.databaseSsl ? { rejectUnauthorized: false } : false,
        entities: entities_1.ENTITIES,
        migrations: [(0, path_1.join)(__dirname, 'migrations', '*.{js,ts}')],
        migrationsTableName: 'schema_migrations',
        migrationsRun: cfg.migrationsRun,
        synchronize: false,
        uuidExtension: 'pgcrypto',
        logging: ['error', 'warn', 'migration'],
    };
}
//# sourceMappingURL=typeorm-options.js.map