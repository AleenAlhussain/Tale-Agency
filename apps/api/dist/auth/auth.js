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
exports.SESSION_TTL = exports.AuthController = exports.CurrentAdmin = exports.AdminGuard = exports.LoginDto = exports.CSRF_VALUE = exports.CSRF_HEADER = exports.SESSION_COOKIE = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
const typeorm_2 = require("typeorm");
const env_1 = require("../config/env");
const entities_1 = require("../database/entities");
exports.SESSION_COOKIE = 'ta_admin';
exports.CSRF_HEADER = 'x-requested-with';
exports.CSRF_VALUE = 'talal-admin';
const SESSION_HOURS = 8;
const DUMMY_HASH = bcrypt.hashSync(Math.random().toString(36), 10);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(254),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
let AdminGuard = class AdminGuard {
    constructor(jwt, users) {
        this.jwt = jwt;
        this.users = users;
    }
    async canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const auth = req.headers.authorization;
        const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
        const token = bearer || req.cookies?.[exports.SESSION_COOKIE];
        if (!token)
            throw new common_1.UnauthorizedException('Sign in to continue');
        let payload;
        try {
            payload = await this.jwt.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Your session has ended. Sign in again');
        }
        const user = await this.users.findOne({ where: { id: payload.sub } });
        if (!user)
            throw new common_1.UnauthorizedException('Account not found');
        if (!bearer && !['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers[exports.CSRF_HEADER] !== exports.CSRF_VALUE) {
            throw new common_1.ForbiddenException('Missing request header');
        }
        req.admin = { id: user.id, email: user.email, name: user.name, role: user.role };
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.AdminUser)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AdminGuard);
exports.CurrentAdmin = (0, common_1.createParamDecorator)((_d, ctx) => ctx.switchToHttp().getRequest().admin);
let AuthController = class AuthController {
    constructor(jwt, users, cfg) {
        this.jwt = jwt;
        this.users = users;
        this.cfg = cfg;
    }
    async login(dto, res) {
        const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
        const ok = await bcrypt.compare(dto.password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !ok)
            throw new common_1.UnauthorizedException('Email or password is not right');
        user.lastLoginAt = new Date();
        await this.users.save(user);
        const token = await this.jwt.signAsync({ sub: user.id, role: user.role });
        res.cookie(exports.SESSION_COOKIE, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: this.cfg.cookieSecure,
            path: '/',
            maxAge: SESSION_HOURS * 3600_000,
        });
        return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token, expiresInHours: SESSION_HOURS };
    }
    logout(res) {
        res.clearCookie(exports.SESSION_COOKIE, { path: '/', httpOnly: true, sameSite: 'lax', secure: this.cfg.cookieSecure });
        return { ok: true };
    }
    me(admin, _req) {
        return { user: admin };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 15 * 60_000 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(AdminGuard),
    __param(0, (0, exports.CurrentAdmin)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.AdminUser)),
    __param(2, (0, common_1.Inject)(env_1.APP_CONFIG)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository, Object])
], AuthController);
exports.SESSION_TTL = `${SESSION_HOURS}h`;
//# sourceMappingURL=auth.js.map