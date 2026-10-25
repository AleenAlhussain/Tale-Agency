import { BadRequestException, Body, Controller, HttpCode, Inject, Injectable, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { IsEmail, IsIn, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { Request } from 'express';
import { Repository } from 'typeorm';
import { PRICING, computeEstimate, formatMoney, normaliseSelection } from '@talal-at/shared';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { QuoteRequest } from '../database/entities';
import { clip, hashIp, makeRef } from '../common/util';
import { isBot } from '../common/honeypot';
import { formThrottle } from '../common/throttle';
import { NotificationsService } from '../notifications/notifications.service';

export class CreateQuoteDto {
  @IsString({ message: 'Add your name' }) @MinLength(2, { message: 'Add your name' }) @MaxLength(120) name: string;
  @IsEmail({}, { message: 'Add an email so the proposal can reach you' }) @MaxLength(254) email: string;
  @IsOptional() @IsString() @MaxLength(40) phone?: string;
  @IsOptional() @IsString() @MaxLength(160) company?: string;
  @IsOptional() @IsString() @MaxLength(3000) message?: string;
  /** The estimator state: { r, c, q, term }. Prices are never taken from the browser. */
  @IsObject({ message: 'Pick at least one service' }) selection: Record<string, unknown>;
  @IsOptional() @IsIn(['AED', 'USD']) currency?: 'AED' | 'USD';
  @IsOptional() @IsString() @MaxLength(200) website?: string;
}

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuoteRequest) private readonly repo: Repository<QuoteRequest>,
    private readonly notify: NotificationsService,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  async create(dto: CreateQuoteDto, req: Request): Promise<QuoteRequest> {
    const selection = normaliseSelection(dto.selection, PRICING);
    const est = computeEstimate(selection, PRICING);
    if (!est.lines.length) throw new BadRequestException('Pick at least one service before sending your scope');
    const q = this.repo.create({
      ref: makeRef('Q'),
      name: clip(dto.name, 120)!,
      email: dto.email.toLowerCase().trim(),
      phone: clip(dto.phone, 40),
      company: clip(dto.company, 160),
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
      ipHash: hashIp(req, this.cfg.ipSalt),
    });
    /* the spam trap: answer like a success, store nothing */
    if (isBot(dto)) return q;
    const saved = await this.repo.save(q);
    {
      const m = (v: number) => formatMoney(v);
      this.notify.notify(
        `New scope ${saved.ref} · ${(est.hasFromPrices ? 'from ' : '') + m(est.total)} · ${saved.name}`,
        [
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
          .join('\n'),
        saved.email,
      );
    }
    return saved;
  }
}

@ApiTags('public')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotes: QuotesService) {}

  /** "Build your scope": saves the selection and returns the totals the studio will see. */
  @Post()
  @HttpCode(201)
  @Throttle(formThrottle)
  async create(@Body() dto: CreateQuoteDto, @Req() req: Request) {
    const q = await this.quotes.create(dto, req);
    return {
      ok: true,
      ref: q.ref,
      totals: { oneOff: q.oneOffAed, monthly: q.monthlyAed, termMonths: q.termMonths, total: q.totalAed, deposit: q.depositAed, currency: 'AED' },
      lines: q.lines,
      message: 'Your scope is saved. A written proposal follows within 48 hours.',
    };
  }
}
