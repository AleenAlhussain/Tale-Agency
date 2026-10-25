import { Controller, Get, Header, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { COMPANY, DIVISIONS, PRICING, PRODUCTS, type ArchiveProjectDTO, type CaseStudyDTO, type SiteContent } from '@talal-at/shared';
import { APP_CONFIG, type AppConfig } from '../config/env';
import { ArchiveProject, CaseStudy } from '../database/entities';

export function toProjectDTO(p: ArchiveProject): ArchiveProjectDTO {
  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    behancePath: p.behancePath,
    cover: p.cover,
    category: p.category,
    views: p.views,
    innerImage: p.innerImage,
    client: p.client,
    sortOrder: p.sortOrder,
    published: p.published,
  };
}

export function toCaseDTO(c: CaseStudy): CaseStudyDTO {
  return {
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    category: c.category,
    cover: c.cover,
    coverPosition: c.coverPosition,
    peek: c.peek,
    peekVideo: c.peekVideo,
    items: c.items,
    sortOrder: c.sortOrder,
    published: c.published,
    featured: c.featured,
  };
}

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ArchiveProject) private readonly projects: Repository<ArchiveProject>,
    @InjectRepository(CaseStudy) private readonly cases: Repository<CaseStudy>,
    @Inject(APP_CONFIG) private readonly cfg: AppConfig,
  ) {}

  async site(): Promise<SiteContent> {
    const [projects, caseStudies] = await Promise.all([
      this.projects.find({ where: { published: true }, order: { sortOrder: 'ASC', title: 'ASC' } }),
      this.cases.find({ where: { published: true }, order: { sortOrder: 'ASC', title: 'ASC' } }),
    ]);
    return {
      projects: projects.map(toProjectDTO),
      caseStudies: caseStudies.map(toCaseDTO),
      pricing: PRICING,
      payment: { link: this.cfg.paymentLink, whatsapp: COMPANY.whatsapp, email: COMPANY.email },
      source: 'api',
    };
  }
}

@ApiTags('public')
@Controller('content')
export class ContentController {
  constructor(private readonly content: ContentService) {}

  /** Everything the public pages read from the database, in one call. */
  @Get('site')
  @Header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  site() {
    return this.content.site();
  }

  @Get('company')
  @Header('Cache-Control', 'public, max-age=300')
  company() {
    return { company: COMPANY, divisions: DIVISIONS, products: PRODUCTS };
  }

  @Get('pricing')
  @Header('Cache-Control', 'public, max-age=300')
  pricing() {
    return PRICING;
  }
}
