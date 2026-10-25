"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
const typeorm_2 = require("typeorm");
const shared_1 = require("@talal-at/shared");
const auth_1 = require("../auth/auth");
const entities_1 = require("../database/entities");
const content_1 = require("../content/content");
const util_1 = require("../common/util");
const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];
const QUOTE_STATUSES = ['new', 'proposal_sent', 'accepted', 'declined', 'paid'];
class ListQuery {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], ListQuery.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListQuery.prototype, "q", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], ListQuery.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ListQuery.prototype, "offset", void 0);
class WaitlistQuery extends ListQuery {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(shared_1.PRODUCTS.map((p) => p.slug)),
    __metadata("design:type", String)
], WaitlistQuery.prototype, "product", void 0);
class UpdateLeadDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(LEAD_STATUSES),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "notes", void 0);
class UpdateQuoteDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(QUOTE_STATUSES),
    __metadata("design:type", String)
], UpdateQuoteDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], UpdateQuoteDto.prototype, "notes", void 0);
class UpdateCaseDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], UpdateCaseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], UpdateCaseDto.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], UpdateCaseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], UpdateCaseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCaseDto.prototype, "published", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCaseDto.prototype, "featured", void 0);
class UpdateProjectDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "subtitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['re', 'br', 'ca', 'ar']),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectDto.prototype, "published", void 0);
class ChangePasswordDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "current", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(12, { message: 'Use at least 12 characters' }),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "next", void 0);
function applyDefined(target, patch) {
    for (const [k, v] of Object.entries(patch))
        if (v !== undefined)
            target[k] = v;
    return target;
}
function page(q) {
    return { take: q.limit ?? 50, skip: q.offset ?? 0 };
}
let AdminController = class AdminController {
    constructor(leads, quotes, waitlist, cases, projects, users) {
        this.leads = leads;
        this.quotes = quotes;
        this.waitlist = waitlist;
        this.cases = cases;
        this.projects = projects;
        this.users = users;
    }
    async stats() {
        const since = new Date(Date.now() - 7 * 86400_000);
        const [leadRows, quoteRows, waitRows, leads7, quotes7, wait7] = await Promise.all([
            this.leads.createQueryBuilder('l').select('l.status', 'status').addSelect('COUNT(*)::int', 'n').groupBy('l.status').getRawMany(),
            this.quotes
                .createQueryBuilder('q')
                .select('q.status', 'status')
                .addSelect('COUNT(*)::int', 'n')
                .addSelect('COALESCE(SUM(q.total_aed),0)::bigint', 'value')
                .groupBy('q.status')
                .getRawMany(),
            this.waitlist.createQueryBuilder('w').select('w.product', 'product').addSelect('COUNT(*)::int', 'n').groupBy('w.product').getRawMany(),
            this.leads.count({ where: { createdAt: (0, typeorm_2.MoreThanOrEqual)(since) } }),
            this.quotes.count({ where: { createdAt: (0, typeorm_2.MoreThanOrEqual)(since) } }),
            this.waitlist.count({ where: { createdAt: (0, typeorm_2.MoreThanOrEqual)(since) } }),
        ]);
        const open = quoteRows.filter((r) => ['new', 'proposal_sent'].includes(r.status)).reduce((a, r) => a + Number(r.value), 0);
        return {
            leads: Object.fromEntries(leadRows.map((r) => [r.status, r.n])),
            quotes: Object.fromEntries(quoteRows.map((r) => [r.status, { count: r.n, valueAed: Number(r.value) }])),
            waitlist: Object.fromEntries(shared_1.PRODUCTS.map((p) => [p.slug, waitRows.find((r) => r.product === p.slug)?.n ?? 0])),
            openPipelineAed: open,
            last7Days: { leads: leads7, quotes: quotes7, waitlist: wait7 },
        };
    }
    async listLeads(q) {
        const base = { ...(q.status && LEAD_STATUSES.includes(q.status) ? { status: q.status } : {}) };
        const where = q.q ? [{ ...base, name: (0, typeorm_2.ILike)(`%${q.q}%`) }, { ...base, email: (0, typeorm_2.ILike)(`%${q.q}%`) }, { ...base, company: (0, typeorm_2.ILike)(`%${q.q}%`) }] : base;
        const [items, total] = await this.leads.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
        return { items, total };
    }
    async updateLead(id, dto) {
        const lead = await this.leads.findOne({ where: { id } });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        applyDefined(lead, dto);
        return this.leads.save(lead);
    }
    async leadsCsv() {
        const rows = await this.leads.find({ order: { createdAt: 'DESC' } });
        return (0, util_1.toCsv)(rows, [
            ['Ref', (r) => r.ref],
            ['Date', (r) => r.createdAt],
            ['Status', (r) => r.status],
            ['Name', (r) => r.name],
            ['Email', (r) => r.email],
            ['Phone', (r) => r.phone],
            ['Company', (r) => r.company],
            ['Budget', (r) => r.budget],
            ['Services', (r) => r.services],
            ['Division', (r) => r.division],
            ['Message', (r) => r.message],
            ['Notes', (r) => r.notes],
        ]);
    }
    async listQuotes(q) {
        const base = { ...(q.status && QUOTE_STATUSES.includes(q.status) ? { status: q.status } : {}) };
        const where = q.q ? [{ ...base, name: (0, typeorm_2.ILike)(`%${q.q}%`) }, { ...base, email: (0, typeorm_2.ILike)(`%${q.q}%`) }, { ...base, company: (0, typeorm_2.ILike)(`%${q.q}%`) }] : base;
        const [items, total] = await this.quotes.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
        return { items, total };
    }
    async updateQuote(id, dto) {
        const quote = await this.quotes.findOne({ where: { id } });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        applyDefined(quote, dto);
        return this.quotes.save(quote);
    }
    async listWaitlist(q) {
        const base = q.product ? { product: q.product } : {};
        const where = q.q ? [{ ...base, email: (0, typeorm_2.ILike)(`%${q.q}%`) }, { ...base, name: (0, typeorm_2.ILike)(`%${q.q}%`) }] : base;
        const [items, total] = await this.waitlist.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
        return { items, total };
    }
    async waitlistCsv(q) {
        const rows = await this.waitlist.find({ where: q.product ? { product: q.product } : {}, order: { createdAt: 'DESC' } });
        return (0, util_1.toCsv)(rows, [
            ['Date', (r) => r.createdAt],
            ['Product', (r) => r.product],
            ['Email', (r) => r.email],
            ['Name', (r) => r.name],
            ['Company', (r) => r.company],
            ['Country', (r) => r.country],
            ['Use case', (r) => r.useCase],
        ]);
    }
    async listCases() {
        return (await this.cases.find({ order: { sortOrder: 'ASC' } })).map(content_1.toCaseDTO);
    }
    async updateCase(slug, dto) {
        const c = await this.cases.findOne({ where: { slug } });
        if (!c)
            throw new common_1.NotFoundException('Case study not found');
        applyDefined(c, dto);
        return (0, content_1.toCaseDTO)(await this.cases.save(c));
    }
    async listProjects() {
        return (await this.projects.find({ order: { sortOrder: 'ASC' } })).map(content_1.toProjectDTO);
    }
    async updateProject(slug, dto) {
        const p = await this.projects.findOne({ where: { slug } });
        if (!p)
            throw new common_1.NotFoundException('Project not found');
        applyDefined(p, dto);
        return (0, content_1.toProjectDTO)(await this.projects.save(p));
    }
    async changePassword(me, dto) {
        const user = await this.users.findOneOrFail({ where: { id: me.id } });
        if (!(await bcrypt.compare(dto.current, user.passwordHash)))
            throw new common_1.BadRequestException('Current password is not right');
        user.passwordHash = await bcrypt.hash(dto.next, 12);
        await this.users.save(user);
        return { ok: true };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListQuery]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listLeads", null);
__decorate([
    (0, common_1.Patch)('leads/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateLeadDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateLead", null);
__decorate([
    (0, common_1.Get)('leads.csv'),
    (0, common_1.Header)('Content-Type', 'text/csv; charset=utf-8'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename="talal-at-leads.csv"'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "leadsCsv", null);
__decorate([
    (0, common_1.Get)('quotes'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListQuery]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listQuotes", null);
__decorate([
    (0, common_1.Patch)('quotes/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateQuoteDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateQuote", null);
__decorate([
    (0, common_1.Get)('waitlist'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WaitlistQuery]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listWaitlist", null);
__decorate([
    (0, common_1.Get)('waitlist.csv'),
    (0, common_1.Header)('Content-Type', 'text/csv; charset=utf-8'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename="talal-at-waitlist.csv"'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WaitlistQuery]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "waitlistCsv", null);
__decorate([
    (0, common_1.Get)('content/case-studies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listCases", null);
__decorate([
    (0, common_1.Patch)('content/case-studies/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCaseDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCase", null);
__decorate([
    (0, common_1.Get)('content/projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listProjects", null);
__decorate([
    (0, common_1.Patch)('content/projects/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Post)('account/password'),
    __param(0, (0, auth_1.CurrentAdmin)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "changePassword", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.UseGuards)(auth_1.AdminGuard),
    (0, common_1.Controller)('admin'),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Lead)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.QuoteRequest)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.WaitlistEntry)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.CaseStudy)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.ArchiveProject)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.AdminUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminController);
//# sourceMappingURL=admin.js.map