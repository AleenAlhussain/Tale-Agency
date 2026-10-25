"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const env_1 = require("../config/env");
const seed_core_1 = require("./seed-core");
let SeedService = class SeedService {
    constructor(db, cfg) {
        this.db = db;
        this.cfg = cfg;
        this.log = new common_1.Logger('Seed');
    }
    async onApplicationBootstrap() {
        const r = await (0, seed_core_1.runSeed)(this.db, this.cfg);
        if (r.projects || r.caseStudies)
            this.log.log(`Seeded ${r.projects} projects and ${r.caseStudies} case studies`);
        if (r.admin)
            this.log.log(`Admin account ${r.admin}: ${this.cfg.adminEmail}`);
        if (!this.cfg.adminEmail)
            this.log.warn('ADMIN_EMAIL and ADMIN_PASSWORD are not set, so no admin account was created');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [typeorm_1.DataSource, Object])
], SeedService);
//# sourceMappingURL=seed.service.js.map