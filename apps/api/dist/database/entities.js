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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITIES = exports.ArchiveProject = exports.CaseStudy = exports.WaitlistEntry = exports.QuoteRequest = exports.Lead = exports.AdminUser = void 0;
const typeorm_1 = require("typeorm");
let AdminUser = class AdminUser {
};
exports.AdminUser = AdminUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AdminUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 254, unique: true }),
    __metadata("design:type", String)
], AdminUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120, default: '' }),
    __metadata("design:type", String)
], AdminUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], AdminUser.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'owner' }),
    __metadata("design:type", String)
], AdminUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], AdminUser.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], AdminUser.prototype, "createdAt", void 0);
exports.AdminUser = AdminUser = __decorate([
    (0, typeorm_1.Entity)('admin_users')
], AdminUser);
let Lead = class Lead {
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lead.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 16, unique: true }),
    __metadata("design:type", String)
], Lead.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 254 }),
    __metadata("design:type", String)
], Lead.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: () => "'{}'" }),
    __metadata("design:type", Array)
], Lead.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "division", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Lead.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'new' }),
    __metadata("design:type", String)
], Lead.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Lead.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "ipHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Lead.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Lead.prototype, "updatedAt", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)('leads'),
    (0, typeorm_1.Index)('leads_status_created_idx', ['status', 'createdAt'])
], Lead);
let QuoteRequest = class QuoteRequest {
};
exports.QuoteRequest = QuoteRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuoteRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 16, unique: true }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 254 }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", Object)
], QuoteRequest.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160, nullable: true }),
    __metadata("design:type", Object)
], QuoteRequest.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], QuoteRequest.prototype, "selection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], QuoteRequest.prototype, "lines", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'one_off_aed', type: 'integer' }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "oneOffAed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_aed', type: 'integer' }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "monthlyAed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'term_months', type: 'integer' }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "termMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_aed', type: 'integer' }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "totalAed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deposit_aed', type: 'integer' }),
    __metadata("design:type", Number)
], QuoteRequest.prototype, "depositAed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_quote_items', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuoteRequest.prototype, "hasQuoteItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_from_prices', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuoteRequest.prototype, "hasFromPrices", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_currency', type: 'varchar', length: 3, default: 'AED' }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "viewCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'new' }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], QuoteRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", Object)
], QuoteRequest.prototype, "ipHash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], QuoteRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], QuoteRequest.prototype, "updatedAt", void 0);
exports.QuoteRequest = QuoteRequest = __decorate([
    (0, typeorm_1.Entity)('quote_requests'),
    (0, typeorm_1.Index)('quotes_status_created_idx', ['status', 'createdAt'])
], QuoteRequest);
let WaitlistEntry = class WaitlistEntry {
};
exports.WaitlistEntry = WaitlistEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 254 }),
    __metadata("design:type", String)
], WaitlistEntry.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'use_case', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "useCase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", Object)
], WaitlistEntry.prototype, "ipHash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], WaitlistEntry.prototype, "createdAt", void 0);
exports.WaitlistEntry = WaitlistEntry = __decorate([
    (0, typeorm_1.Entity)('waitlist_entries'),
    (0, typeorm_1.Unique)('waitlist_product_email_uq', ['product', 'email'])
], WaitlistEntry);
let CaseStudy = class CaseStudy {
};
exports.CaseStudy = CaseStudy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CaseStudy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, unique: true }),
    __metadata("design:type", String)
], CaseStudy.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160 }),
    __metadata("design:type", String)
], CaseStudy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], CaseStudy.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], CaseStudy.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], CaseStudy.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cover_position', type: 'varchar', length: 40, default: '50% 50%' }),
    __metadata("design:type", String)
], CaseStudy.prototype, "coverPosition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], CaseStudy.prototype, "peek", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'peek_video', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], CaseStudy.prototype, "peekVideo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: () => "'[]'" }),
    __metadata("design:type", Array)
], CaseStudy.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], CaseStudy.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CaseStudy.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CaseStudy.prototype, "featured", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CaseStudy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], CaseStudy.prototype, "updatedAt", void 0);
exports.CaseStudy = CaseStudy = __decorate([
    (0, typeorm_1.Entity)('case_studies')
], CaseStudy);
let ArchiveProject = class ArchiveProject {
};
exports.ArchiveProject = ArchiveProject;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArchiveProject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, unique: true }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160 }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, default: '' }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'behance_path', type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "behancePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], ArchiveProject.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ArchiveProject.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inner_image', type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", Object)
], ArchiveProject.prototype, "innerImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, nullable: true }),
    __metadata("design:type", Object)
], ArchiveProject.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ArchiveProject.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ArchiveProject.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ArchiveProject.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ArchiveProject.prototype, "updatedAt", void 0);
exports.ArchiveProject = ArchiveProject = __decorate([
    (0, typeorm_1.Entity)('archive_projects')
], ArchiveProject);
exports.ENTITIES = [AdminUser, Lead, QuoteRequest, WaitlistEntry, CaseStudy, ArchiveProject];
//# sourceMappingURL=entities.js.map