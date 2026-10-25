/* The back office: everything under /api/admin needs a signed-in admin. */
import { BadRequestException, Body, Controller, Get, Header, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { PRODUCTS, type LeadStatus, type QuoteStatus } from '@talal-at/shared';
import { AdminGuard, CurrentAdmin, type SessionUser } from '../auth/auth';
import { AdminUser, ArchiveProject, CaseStudy, Lead, QuoteRequest, WaitlistEntry } from '../database/entities';
import { toCaseDTO, toProjectDTO } from '../content/content';
import { toCsv } from '../common/util';

const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];
const QUOTE_STATUSES: QuoteStatus[] = ['new', 'proposal_sent', 'accepted', 'declined', 'paid'];

class ListQuery {
  @IsOptional() @IsString() @MaxLength(30) status?: string;
  @IsOptional() @IsString() @MaxLength(120) q?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(200) limit?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) offset?: number;
}

class WaitlistQuery extends ListQuery {
  @IsOptional() @IsIn(PRODUCTS.map((p) => p.slug)) product?: string;
}

class UpdateLeadDto {
  @IsOptional() @IsIn(LEAD_STATUSES) status?: LeadStatus;
  @IsOptional() @IsString() @MaxLength(5000) notes?: string;
}

class UpdateQuoteDto {
  @IsOptional() @IsIn(QUOTE_STATUSES) status?: QuoteStatus;
  @IsOptional() @IsString() @MaxLength(5000) notes?: string;
}

class UpdateCaseDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(160) title?: string;
  @IsOptional() @IsString() @MinLength(1) @MaxLength(300) summary?: string;
  @IsOptional() @IsString() @MinLength(1) @MaxLength(60) category?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10000) sortOrder?: number;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsBoolean() featured?: boolean;
}

class UpdateProjectDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(160) title?: string;
  @IsOptional() @IsString() @MaxLength(300) subtitle?: string;
  @IsOptional() @IsIn(['re', 'br', 'ca', 'ar']) category?: string;
  @IsOptional() @IsInt() @Min(0) @Max(10000) sortOrder?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class ChangePasswordDto {
  @IsString() @MinLength(1) @MaxLength(200) current: string;
  @IsString() @MinLength(12, { message: 'Use at least 12 characters' }) @MaxLength(200) next: string;
}

/** Copies only the fields that were actually sent, so a partial update never blanks the rest. */
function applyDefined<T extends object>(target: T, patch: object): T {
  for (const [k, v] of Object.entries(patch)) if (v !== undefined) (target as Record<string, unknown>)[k] = v;
  return target;
}

function page(q: ListQuery) {
  return { take: q.limit ?? 50, skip: q.offset ?? 0 };
}

@ApiTags('admin')
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Lead) private readonly leads: Repository<Lead>,
    @InjectRepository(QuoteRequest) private readonly quotes: Repository<QuoteRequest>,
    @InjectRepository(WaitlistEntry) private readonly waitlist: Repository<WaitlistEntry>,
    @InjectRepository(CaseStudy) private readonly cases: Repository<CaseStudy>,
    @InjectRepository(ArchiveProject) private readonly projects: Repository<ArchiveProject>,
    @InjectRepository(AdminUser) private readonly users: Repository<AdminUser>,
  ) {}

  /* ---------- overview ---------- */
  @Get('stats')
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
      this.leads.count({ where: { createdAt: MoreThanOrEqual(since) } }),
      this.quotes.count({ where: { createdAt: MoreThanOrEqual(since) } }),
      this.waitlist.count({ where: { createdAt: MoreThanOrEqual(since) } }),
    ]);
    const open = quoteRows.filter((r) => ['new', 'proposal_sent'].includes(r.status)).reduce((a, r) => a + Number(r.value), 0);
    return {
      leads: Object.fromEntries(leadRows.map((r) => [r.status, r.n])),
      quotes: Object.fromEntries(quoteRows.map((r) => [r.status, { count: r.n, valueAed: Number(r.value) }])),
      waitlist: Object.fromEntries(PRODUCTS.map((p) => [p.slug, waitRows.find((r) => r.product === p.slug)?.n ?? 0])),
      openPipelineAed: open,
      last7Days: { leads: leads7, quotes: quotes7, waitlist: wait7 },
    };
  }

  /* ---------- leads ---------- */
  @Get('leads')
  async listLeads(@Query() q: ListQuery) {
    const base = { ...(q.status && LEAD_STATUSES.includes(q.status as LeadStatus) ? { status: q.status as LeadStatus } : {}) };
    const where = q.q ? [{ ...base, name: ILike(`%${q.q}%`) }, { ...base, email: ILike(`%${q.q}%`) }, { ...base, company: ILike(`%${q.q}%`) }] : base;
    const [items, total] = await this.leads.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
    return { items, total };
  }

  @Patch('leads/:id')
  async updateLead(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateLeadDto) {
    const lead = await this.leads.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Lead not found');
    applyDefined(lead, dto);
    return this.leads.save(lead);
  }

  @Get('leads.csv')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="talal-at-leads.csv"')
  async leadsCsv() {
    const rows = await this.leads.find({ order: { createdAt: 'DESC' } });
    return toCsv(rows, [
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

  /* ---------- quotes ---------- */
  @Get('quotes')
  async listQuotes(@Query() q: ListQuery) {
    const base = { ...(q.status && QUOTE_STATUSES.includes(q.status as QuoteStatus) ? { status: q.status as QuoteStatus } : {}) };
    const where = q.q ? [{ ...base, name: ILike(`%${q.q}%`) }, { ...base, email: ILike(`%${q.q}%`) }, { ...base, company: ILike(`%${q.q}%`) }] : base;
    const [items, total] = await this.quotes.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
    return { items, total };
  }

  @Patch('quotes/:id')
  async updateQuote(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateQuoteDto) {
    const quote = await this.quotes.findOne({ where: { id } });
    if (!quote) throw new NotFoundException('Quote not found');
    applyDefined(quote, dto);
    return this.quotes.save(quote);
  }

  /* ---------- waitlists ---------- */
  @Get('waitlist')
  async listWaitlist(@Query() q: WaitlistQuery) {
    const base = q.product ? { product: q.product as WaitlistEntry['product'] } : {};
    const where = q.q ? [{ ...base, email: ILike(`%${q.q}%`) }, { ...base, name: ILike(`%${q.q}%`) }] : base;
    const [items, total] = await this.waitlist.findAndCount({ where, order: { createdAt: 'DESC' }, ...page(q) });
    return { items, total };
  }

  @Get('waitlist.csv')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="talal-at-waitlist.csv"')
  async waitlistCsv(@Query() q: WaitlistQuery) {
    const rows = await this.waitlist.find({ where: q.product ? { product: q.product as WaitlistEntry['product'] } : {}, order: { createdAt: 'DESC' } });
    return toCsv(rows, [
      ['Date', (r) => r.createdAt],
      ['Product', (r) => r.product],
      ['Email', (r) => r.email],
      ['Name', (r) => r.name],
      ['Company', (r) => r.company],
      ['Country', (r) => r.country],
      ['Use case', (r) => r.useCase],
    ]);
  }

  /* ---------- portfolio content ---------- */
  @Get('content/case-studies')
  async listCases() {
    return (await this.cases.find({ order: { sortOrder: 'ASC' } })).map(toCaseDTO);
  }

  @Patch('content/case-studies/:slug')
  async updateCase(@Param('slug') slug: string, @Body() dto: UpdateCaseDto) {
    const c = await this.cases.findOne({ where: { slug } });
    if (!c) throw new NotFoundException('Case study not found');
    applyDefined(c, dto);
    return toCaseDTO(await this.cases.save(c));
  }

  @Get('content/projects')
  async listProjects() {
    return (await this.projects.find({ order: { sortOrder: 'ASC' } })).map(toProjectDTO);
  }

  @Patch('content/projects/:slug')
  async updateProject(@Param('slug') slug: string, @Body() dto: UpdateProjectDto) {
    const p = await this.projects.findOne({ where: { slug } });
    if (!p) throw new NotFoundException('Project not found');
    applyDefined(p, dto);
    return toProjectDTO(await this.projects.save(p));
  }

  /* ---------- account ---------- */
  @Post('account/password')
  async changePassword(@CurrentAdmin() me: SessionUser, @Body() dto: ChangePasswordDto) {
    const user = await this.users.findOneOrFail({ where: { id: me.id } });
    if (!(await bcrypt.compare(dto.current, user.passwordHash))) throw new BadRequestException('Current password is not right');
    user.passwordHash = await bcrypt.hash(dto.next, 12);
    await this.users.save(user);
    return { ok: true };
  }
}
