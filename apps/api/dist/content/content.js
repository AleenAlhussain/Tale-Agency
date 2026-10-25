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
exports.ContentController = exports.ContentService = void 0;
exports.toProjectDTO = toProjectDTO;
exports.toCaseDTO = toCaseDTO;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const swagger_1 = require("@nestjs/swagger");
const typeorm_2 = require("typeorm");
const shared_1 = require("@talal-at/shared");
const env_1 = require("../config/env");
const entities_1 = require("../database/entities");
function toProjectDTO(p) {
    return {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        behancePath: p.behancePath,
        cover: p.cover,
        category: p.category,
        views: p.views,
        innerImage: p.innerImage,
        client: p.client,
        sortOrder: p.sortOrder,
        published: p.published,
    };
}
function toCaseDTO(c) {
    return {
        slug: c.slug,
        title: c.title,
        summary: c.summary,
        category: c.category,
        cover: c.cover,
        coverPosition: c.coverPosition,
        peek: c.peek,
        peekVideo: c.peekVideo,
        items: c.items,
        sortOrder: c.sortOrder,
        published: c.published,
        featured: c.featured,
    };
}
let ContentService = class ContentService {
    constructor(projects, cases, cfg) {
        this.projects = projects;
        this.cases = cases;
        this.cfg = cfg;
    }
    async site() {
        const [projects, caseStudies] = await Promise.all([
            this.projects.find({ where: { published: true }, order: { sortOrder: 'ASC', title: 'ASC' } }),
            this.cases.find({ where: { published: true }, order: { sortOrder: 'ASC', title: 'ASC' } }),
        ]);
        return {
            projects: projects.map(toProjectDTO),
            caseStudies: caseStudies.map(toCaseDTO),
            pricing: shared_1.PRICING,
            payment: { link: this.cfg.paymentLink, whatsapp: shared_1.COMPANY.whatsapp, email: shared_1.COMPANY.email },
            source: 'api',
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ArchiveProject)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CaseStudy)),
    __param(2, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], ContentService);
let ContentController = class ContentController {
    constructor(content) {
        this.content = content;
    }
    site() {
        return this.content.site();
    }
    company() {
        return { company: shared_1.COMPANY, divisions: shared_1.DIVISIONS, products: shared_1.PRODUCTS };
    }
    pricing() {
        return shared_1.PRICING;
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)('site'),
    (0, common_1.Header)('Cache-Control', 'public, max-age=60, stale-while-revalidate=300'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "site", null);
__decorate([
    (0, common_1.Get)('company'),
    (0, common_1.Header)('Cache-Control', 'public, max-age=300'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "company", null);
__decorate([
    (0, common_1.Get)('pricing'),
    (0, common_1.Header)('Cache-Control', 'public, max-age=300'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "pricing", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [ContentService])
], ContentController);
//# sourceMappingURL=content.js.map