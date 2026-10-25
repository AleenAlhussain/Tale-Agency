"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("../config/env");
const typeorm_options_1 = require("./typeorm-options");
const cfg = (0, env_1.loadConfig)();
exports.default = new typeorm_1.DataSource({ ...(0, typeorm_options_1.typeormOptions)(cfg), migrationsRun: false });
//# sourceMappingURL=data-source.js.map