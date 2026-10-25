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
exports.QuotesController = exports.QuotesService = exports.CreateQuoteDto = void 0;
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
const throttle_1 = require("../common/throttle");
const notifications_service_1 = require("../notifications/notifications.service");
class CreateQuoteDto {
}
exports.CreateQuoteDto = CreateQuoteDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Add your name' }),
    (0, class_validator_1.MinLength)(2, { message: 'Add your name' }),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Add an email so the proposal can reach you' }),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(3000),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsObject)({ message: 'Pick at least one service' }),
    __metadata("design:type", Object)
], CreateQuoteDto.prototype, "selection", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['AED', 'USD']),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "website", void 0);
let QuotesService = class QuotesService {
    constructor(repo, notify, cfg) {
        this.repo = repo;
        this.notify = notify;
        this.cfg = cfg;
    }
    async create(dto, req) {
        const selection = (0, shared_1.normaliseSelection)(dto.selection, shared_1.PRICING);
        const est = (0, shared_1.computeEstimate)(selection, shared_1.PRICING);
        if (!est.lines.length)
            throw new common_1.BadRequestException('Pick at least one service before sending your scope');
        const q = this.repo.create({
            ref: (0, util_1.makeRef)('Q'),
            name: (0, util_1.clip)(dto.name, 120),
            email: dto.email.toLowerCase().trim(),
            phone: (0, util_1.clip)(dto.phone, 40),
            company: (0, util_1.clip)(dto.company, 160),
            message: (dto.message ?? '').trim().slice(0, 3000),
            selection,
            lines: est.lines,
            oneOffAed: est.oneOff,
            monthlyAed: est.monthly,
            termMonths: est.termMonths,
            totalAed: est.total,
            depositAed: est.deposit,
            hasQuoteItems: est.hasQuoteItems,
            hasFromPrices: est.hasFromPrices,
            viewCurrency: dto.currency ?? 'AED',
            status: 'new',
            notes: '',
            ipHash: (0, util_1.hashIp)(req, this.cfg.ipSalt),
        });
        if ((0, honeypot_1.isBot)(dto))
            return q;
        const saved = await this.repo.save(q);
        {
            const m = (v) => (0, shared_1.formatMoney)(v);
            this.notify.notify(`New scope ${saved.ref} · ${(est.hasFromPrices ? 'from ' : '') + m(est.total)} · ${saved.name}`, [
                `Name: ${saved.name}`,
                `Email: ${saved.email}`,
                `Phone: ${saved.phone ?? '—'}`,
                `Company: ${saved.company ?? '—'}`,
                '',
                ...est.lines.map((l) => `• ${l.name} — ${l.quote ? 'on request' : (l.from ? 'from ' : '') + m(l.amount) + (l.monthly ? '/mo' : '')}`),
                '',
                `One-off: ${m(est.oneOff)}`,
                est.monthly ? `Monthly: ${m(est.monthly)}/mo × ${est.termMonths}` : '',
                `Estimated investment: ${(est.hasFromPrices ? 'from ' : '') + m(est.total)}${est.hasQuoteItems ? ' + quote' : ''}`,
                `To start: ${m(est.deposit)}`,
                '',
                saved.message,
            ]
                .filter((x) => x !== '')
                .join('\n'), saved.email);
        }
        return saved;
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.QuoteRequest)),
    __param(2, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService, Object])
], QuotesService);
let QuotesController = class QuotesController {
    constructor(quotes) {
        this.quotes = quotes;
    }
    async create(dto, req) {
        const q = await this.quotes.create(dto, req);
        return {
            ok: true,
            ref: q.ref,
            totals: { oneOff: q.oneOffAed, monthly: q.monthlyAed, termMonths: q.termMonths, total: q.totalAed, deposit: q.depositAed, currency: 'AED' },
            lines: q.lines,
            message: 'Your scope is saved. A written proposal follows within 48 hours.',
        };
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, throttler_1.Throttle)(throttle_1.formThrottle),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateQuoteDto, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "create", null);
exports.QuotesController = QuotesController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('quotes'),
    __metadata("design:paramtypes", [QuotesService])
], QuotesController);
//# sourceMappingURL=quotes.js.map