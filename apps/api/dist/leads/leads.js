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
exports.LeadsController = exports.LeadsService = exports.CreateLeadDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const shared_1 = require("@talal-at/shared");
const env_1 = require("../config/env");
const entities_1 = require("../database/entities");
const util_1 = require("../common/util");
const honeypot_1 = require("../common/honeypot");
const notifications_service_1 = require("../notifications/notifications.service");
const throttle_1 = require("../common/throttle");
class CreateLeadDto {
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Add your name' }),
    (0, class_validator_1.MinLength)(2, { message: 'Add your name' }),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Add an email so the studio can reply' }),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(16),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(60, { each: true }),
    __metadata("design:type", Array)
], CreateLeadDto.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(shared_1.DIVISIONS.map((d) => d.slug)),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "division", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Add a few words about the project' }),
    (0, class_validator_1.MinLength)(5, { message: 'Add a few words about the project' }),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "website", void 0);
let LeadsService = class LeadsService {
    constructor(repo, notify, cfg) {
        this.repo = repo;
        this.notify = notify;
        this.cfg = cfg;
    }
    async create(dto, req) {
        const lead = this.repo.create({
            ref: (0, util_1.makeRef)('L'),
            name: (0, util_1.clip)(dto.name, 120),
            email: dto.email.toLowerCase().trim(),
            phone: (0, util_1.clip)(dto.phone, 40),
            company: (0, util_1.clip)(dto.company, 160),
            budget: (0, util_1.clip)(dto.budget, 40),
            services: (dto.services ?? []).map((s) => (0, util_1.clip)(s, 60)).filter((s) => !!s),
            division: dto.division ?? null,
            message: String(dto.message).trim().slice(0, 5000),
            source: (0, util_1.clip)(dto.source, 200),
            status: (0, honeypot_1.isBot)(dto) ? 'spam' : 'new',
            ipHash: (0, util_1.hashIp)(req, this.cfg.ipSalt),
            userAgent: (0, util_1.clip)(req.headers['user-agent'], 300),
        });
        const saved = await this.repo.save(lead);
        if (saved.status !== 'spam') {
            this.notify.notify(`New brief ${saved.ref} from ${saved.name}`, [
                `Name: ${saved.name}`,
                `Email: ${saved.email}`,
                `Company: ${saved.company ?? '—'}`,
                `Budget: ${saved.budget ?? '—'}`,
                `Services: ${saved.services.join(', ') || '—'}`,
                `Division: ${saved.division ?? '—'}`,
                `Page: ${saved.source ?? '—'}`,
                '',
                saved.message,
            ].join('\n'), saved.email);
        }
        return saved;
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Lead)),
    __param(2, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService, Object])
], LeadsService);
let LeadsController = class LeadsController {
    constructor(leads) {
        this.leads = leads;
    }
    async create(dto, req) {
        const lead = await this.leads.create(dto, req);
        return { ok: true, ref: lead.ref, message: 'Thank you. Your brief is with the studio. Expect a reply within one working day.' };
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, throttler_1.Throttle)(throttle_1.formThrottle),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLeadDto, Object]),
    __metadata("design:returntype", Promise)
], LeadsController.prototype, "create", null);
exports.LeadsController = LeadsController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [LeadsService])
], LeadsController);
//# sourceMappingURL=leads.js.map