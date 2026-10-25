import { Body, Controller, HttpCode, Inject, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ArrayMaxSize, IsArray, IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { Request } from 'express';
import { Repository } from 'typeorm';
import { DIVISIONS } from '@talal-at/shared';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { Lead } from '../database/entities';
import { clip, hashIp, makeRef } from '../common/util';
import { isBot } from '../common/honeypot';
import { NotificationsService } from '../notifications/notifications.service';
import { formThrottle } from '../common/throttle';

export class CreateLeadDto {
  @IsString({ message: 'Add your name' }) @MinLength(2, { message: 'Add your name' }) @MaxLength(120) name: string;
  @IsEmail({}, { message: 'Add an email so the studio can reply' }) @MaxLength(254) email: string;
  @IsOptional() @IsString() @MaxLength(40) phone?: string;
  @IsOptional() @IsString() @MaxLength(160) company?: string;
  @IsOptional() @IsString() @MaxLength(40) budget?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(16) @IsString({ each: true }) @MaxLength(60, { each: true }) services?: string[];
  @IsOptional() @IsIn(DIVISIONS.map((d) => d.slug)) division?: string;
  @IsString({ message: 'Add a few words about the project' }) @MinLength(5, { message: 'Add a few words about the project' }) @MaxLength(5000) message: string;
  @IsOptional() @IsString() @MaxLength(200) source?: string;
  /** honeypot */
  @IsOptional() @IsString() @MaxLength(200) website?: string;
}

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly repo: Repository<Lead>,
    private readonly notify: NotificationsService,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  async create(dto: CreateLeadDto, req: Request): Promise<Lead> {
    const lead = this.repo.create({
      ref: makeRef('L'),
      name: clip(dto.name, 120)!,
      email: dto.email.toLowerCase().trim(),
      phone: clip(dto.phone, 40),
      company: clip(dto.company, 160),
      budget: clip(dto.budget, 40),
      services: (dto.services ?? []).map((s) => clip(s, 60)).filter((s): s is string => !!s),
      division: dto.division ?? null,
      message: String(dto.message).trim().slice(0, 5000),
      source: clip(dto.source, 200),
      status: isBot(dto) ? 'spam' : 'new',
      ipHash: hashIp(req, this.cfg.ipSalt),
      userAgent: clip(req.headers['user-agent'], 300),
    });
    const saved = await this.repo.save(lead);
    if (saved.status !== 'spam') {
      this.notify.notify(
        `New brief ${saved.ref} from ${saved.name}`,
        [
          `Name: ${saved.name}`,
          `Email: ${saved.email}`,
          `Company: ${saved.company ?? '—'}`,
          `Budget: ${saved.budget ?? '—'}`,
          `Services: ${saved.services.join(', ') || '—'}`,
          `Division: ${saved.division ?? '—'}`,
          `Page: ${saved.source ?? '—'}`,
          '',
          saved.message,
        ].join('\n'),
        saved.email,
      );
    }
    return saved;
  }
}

@ApiTags('public')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  /** The contact form. Returns a reference the visitor can quote. */
  @Post()
  @HttpCode(201)
  @Throttle(formThrottle)
  async create(@Body() dto: CreateLeadDto, @Req() req: Request) {
    const lead = await this.leads.create(dto, req);
    return { ok: true, ref: lead.ref, message: 'Thank you. Your brief is with the studio. Expect a reply within one working day.' };
  }
}
