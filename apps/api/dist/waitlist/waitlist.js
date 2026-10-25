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
exports.WaitlistController = exports.WaitlistService = exports.JoinWaitlistDto = void 0;
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
class JoinWaitlistDto {
}
exports.JoinWaitlistDto = JoinWaitlistDto;
__decorate([
    (0, class_validator_1.IsIn)(shared_1.PRODUCTS.map((p) => p.slug)),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "product", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Add a valid email' }),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(160),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "useCase", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], JoinWaitlistDto.prototype, "website", void 0);
let WaitlistService = class WaitlistService {
    constructor(repo, notify, cfg) {
        this.repo = repo;
        this.notify = notify;
        this.cfg = cfg;
    }
    async join(dto, req) {
        const email = dto.email.toLowerCase().trim();
        if ((0, honeypot_1.isBot)(dto))
            return { already: false };
        const result = await this.repo
            .createQueryBuilder()
            .insert()
            .values({
            product: dto.product,
            email,
            name: (0, util_1.clip)(dto.name, 120),
            company: (0, util_1.clip)(dto.company, 160),
            country: (0, util_1.clip)(dto.country, 60),
            useCase: (0, util_1.clip)(dto.useCase, 500),
            ipHash: (0, util_1.hashIp)(req, this.cfg.ipSalt),
        })
            .orIgnore()
            .returning(['id'])
            .execute();
        const already = !result.raw?.length;
        if (!already) {
            const product = shared_1.PRODUCTS.find((p) => p.slug === dto.product);
            this.notify.notify(`Waitlist: ${product.name} · ${email}`, [`Email: ${email}`, `Name: ${dto.name ?? '—'}`, `Company: ${dto.company ?? '—'}`, `Country: ${dto.country ?? '—'}`, `Use: ${dto.useCase ?? '—'}`].join('\n'));
        }
        return { already };
    }
};
exports.WaitlistService = WaitlistService;
exports.WaitlistService = WaitlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.WaitlistEntry)),
    __param(2, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService, Object])
], WaitlistService);
let WaitlistController = class WaitlistController {
    constructor(waitlist) {
        this.waitlist = waitlist;
    }
    async join(dto, req) {
        const { already } = await this.waitlist.join(dto, req);
        return { ok: true, already, message: already ? 'You are already on the list. We will be in touch.' : 'You are on the list. We will write when early access opens.' };
    }
};
exports.WaitlistController = WaitlistController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, throttler_1.Throttle)(throttle_1.formThrottle),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [JoinWaitlistDto, Object]),
    __metadata("design:returntype", Promise)
], WaitlistController.prototype, "join", null);
exports.WaitlistController = WaitlistController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('waitlist'),
    __metadata("design:paramtypes", [WaitlistService])
], WaitlistController);
//# sourceMappingURL=waitlist.js.map