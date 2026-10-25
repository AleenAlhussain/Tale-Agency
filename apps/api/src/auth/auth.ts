import {
  Body,
  CanActivate,
  Controller,
  ExecutionContext,
  ForbiddenException,
  Get,
  HttpCode,
  Inject,
  Injectable,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { AdminUser } from '../database/entities';

export const SESSION_COOKIE = 'ta_admin';
export const CSRF_HEADER = 'x-requested-with';
export const CSRF_VALUE = 'talal-admin';
const SESSION_HOURS = 8;
/* a real hash of a random string, compared against when the email is unknown */
const DUMMY_HASH = bcrypt.hashSync(Math.random().toString(36), 10);

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'editor';
}

export class LoginDto {
  @IsEmail() @MaxLength(254) email: string;
  @IsString() @MinLength(1) @MaxLength(200) password: string;
}

/** Protects /api/admin/*. Accepts the session cookie (browser) or a Bearer token (scripts).
 *  Any request that changes data from the browser must also carry X-Requested-With: talal-admin,
 *  which a cross-site form cannot send. */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(AdminUser) private readonly users: Repository<AdminUser>,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request & { admin?: SessionUser }>();
    const auth = req.headers.authorization;
    const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
    const token = bearer || (req.cookies?.[SESSION_COOKIE] as string | undefined);
    if (!token) throw new UnauthorizedException('Sign in to continue');
    let payload: { sub: string };
    try {
      payload = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Your session has ended. Sign in again');
    }
    const user = await this.users.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('Account not found');
    if (!bearer && !['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers[CSRF_HEADER] !== CSRF_VALUE) {
      throw new ForbiddenException('Missing request header');
    }
    req.admin = { id: user.id, email: user.email, name: user.name, role: user.role };
    return true;
  }
}

export const CurrentAdmin = createParamDecorator((_d: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().admin as SessionUser);

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(AdminUser) private readonly users: Repository<AdminUser>,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  @Post('login')
  @HttpCode(200)
  @Throttle({ default: { limit: 10, ttl: 15 * 60_000 } })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
    /* compare even when the user does not exist, so timing does not reveal which emails are registered */
    const ok = await bcrypt.compare(dto.password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException('Email or password is not right');
    user.lastLoginAt = new Date();
    await this.users.save(user);
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role });
    res.cookie(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.cfg.cookieSecure,
      path: '/',
      maxAge: SESSION_HOURS * 3600_000,
    });
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token, expiresInHours: SESSION_HOURS };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(SESSION_COOKIE, { path: '/', httpOnly: true, sameSite: 'lax', secure: this.cfg.cookieSecure });
    return { ok: true };
  }

  @Get('me')
  @UseGuards(AdminGuard)
  me(@CurrentAdmin() admin: SessionUser, @Req() _req: Request) {
    return { user: admin };
  }
}

export const SESSION_TTL = `${SESSION_HOURS}h`;
