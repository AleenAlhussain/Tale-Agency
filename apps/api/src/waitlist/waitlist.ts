import { Body, Controller, HttpCode, Inject, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { Request } from 'express';
import { Repository } from 'typeorm';
import { PRODUCTS, type ProductSlug } from '@talal-at/shared';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { WaitlistEntry } from '../database/entities';
import { clip, hashIp } from '../common/util';
import { isBot } from '../common/honeypot';
import { formThrottle } from '../common/throttle';
import { NotificationsService } from '../notifications/notifications.service';

export class JoinWaitlistDto {
  @IsIn(PRODUCTS.map((p) => p.slug)) product: ProductSlug;
  @IsEmail({}, { message: 'Add a valid email' }) @MaxLength(254) email: string;
  @IsOptional() @IsString() @MaxLength(120) name?: string;
  @IsOptional() @IsString() @MaxLength(160) company?: string;
  @IsOptional() @IsString() @MaxLength(60) country?: string;
  @IsOptional() @IsString() @MaxLength(500) useCase?: string;
  @IsOptional() @IsString() @MaxLength(200) website?: string;
}

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(WaitlistEntry) private readonly repo: Repository<WaitlistEntry>,
    private readonly notify: NotificationsService,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  /** Joining twice is fine: the second time simply says you are already on the list. */
  async join(dto: JoinWaitlistDto, req: Request): Promise<{ already: boolean }> {
    const email = dto.email.toLowerCase().trim();
    if (isBot(dto)) return { already: false };
    const result = await this.repo
      .createQueryBuilder()
      .insert()
      .values({
        product: dto.product,
        email,
        name: clip(dto.name, 120),
        company: clip(dto.company, 160),
        country: clip(dto.country, 60),
        useCase: clip(dto.useCase, 500),
        ipHash: hashIp(req, this.cfg.ipSalt),
      })
      .orIgnore()
      .returning(['id'])
      .execute();
    const already = !result.raw?.length;
    if (!already) {
      const product = PRODUCTS.find((p) => p.slug === dto.product)!;
      this.notify.notify(`Waitlist: ${product.name} · ${email}`, [`Email: ${email}`, `Name: ${dto.name ?? '—'}`, `Company: ${dto.company ?? '—'}`, `Country: ${dto.country ?? '—'}`, `Use: ${dto.useCase ?? '—'}`].join('\n'));
    }
    return { already };
  }
}

@ApiTags('public')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlist: WaitlistService) {}

  @Post()
  @HttpCode(201)
  @Throttle(formThrottle)
  async join(@Body() dto: JoinWaitlistDto, @Req() req: Request) {
    const { already } = await this.waitlist.join(dto, req);
    return { ok: true, already, message: already ? 'You are already on the list. We will be in touch.' : 'You are on the list. We will write when early access opens.' };
  }
}
