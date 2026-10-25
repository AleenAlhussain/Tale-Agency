/* Database tables. The schema itself is created by the migrations in ./migrations,
   these classes only describe it to TypeORM (synchronize is always off). */
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import type { CaseItem, EstimateLine, LeadStatus, ProductSlug, QuoteStatus, ScopeSelection } from '@talal-at/shared';

@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 254, unique: true }) email: string;
  @Column({ type: 'varchar', length: 120, default: '' }) name: string;
  @Column({ name: 'password_hash', type: 'varchar', length: 100 }) passwordHash: string;
  @Column({ type: 'varchar', length: 20, default: 'owner' }) role: 'owner' | 'editor';
  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true }) lastLoginAt: Date | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
}

@Entity('leads')
@Index('leads_status_created_idx', ['status', 'createdAt'])
export class Lead {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 16, unique: true }) ref: string;
  @Column({ type: 'varchar', length: 120 }) name: string;
  @Column({ type: 'varchar', length: 254 }) email: string;
  @Column({ type: 'varchar', length: 40, nullable: true }) phone: string | null;
  @Column({ type: 'varchar', length: 160, nullable: true }) company: string | null;
  @Column({ type: 'varchar', length: 40, nullable: true }) budget: string | null;
  @Column({ type: 'text', array: true, default: () => "'{}'" }) services: string[];
  @Column({ type: 'varchar', length: 20, nullable: true }) division: string | null;
  @Column({ type: 'text' }) message: string;
  @Column({ type: 'varchar', length: 200, nullable: true }) source: string | null;
  @Column({ type: 'varchar', length: 20, default: 'new' }) status: LeadStatus;
  @Column({ type: 'text', default: '' }) notes: string;
  @Column({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }) ipHash: string | null;
  @Column({ name: 'user_agent', type: 'varchar', length: 300, nullable: true }) userAgent: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }) updatedAt: Date;
}

@Entity('quote_requests')
@Index('quotes_status_created_idx', ['status', 'createdAt'])
export class QuoteRequest {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 16, unique: true }) ref: string;
  @Column({ type: 'varchar', length: 120 }) name: string;
  @Column({ type: 'varchar', length: 254 }) email: string;
  @Column({ type: 'varchar', length: 40, nullable: true }) phone: string | null;
  @Column({ type: 'varchar', length: 160, nullable: true }) company: string | null;
  @Column({ type: 'text', default: '' }) message: string;
  @Column({ type: 'jsonb' }) selection: ScopeSelection;
  @Column({ type: 'jsonb' }) lines: EstimateLine[];
  @Column({ name: 'one_off_aed', type: 'integer' }) oneOffAed: number;
  @Column({ name: 'monthly_aed', type: 'integer' }) monthlyAed: number;
  @Column({ name: 'term_months', type: 'integer' }) termMonths: number;
  @Column({ name: 'total_aed', type: 'integer' }) totalAed: number;
  @Column({ name: 'deposit_aed', type: 'integer' }) depositAed: number;
  @Column({ name: 'has_quote_items', type: 'boolean', default: false }) hasQuoteItems: boolean;
  @Column({ name: 'has_from_prices', type: 'boolean', default: false }) hasFromPrices: boolean;
  @Column({ name: 'view_currency', type: 'varchar', length: 3, default: 'AED' }) viewCurrency: 'AED' | 'USD';
  @Column({ type: 'varchar', length: 20, default: 'new' }) status: QuoteStatus;
  @Column({ type: 'text', default: '' }) notes: string;
  @Column({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }) ipHash: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }) updatedAt: Date;
}

@Entity('waitlist_entries')
@Unique('waitlist_product_email_uq', ['product', 'email'])
export class WaitlistEntry {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 30 }) product: ProductSlug;
  @Column({ type: 'varchar', length: 254 }) email: string;
  @Column({ type: 'varchar', length: 120, nullable: true }) name: string | null;
  @Column({ type: 'varchar', length: 160, nullable: true }) company: string | null;
  @Column({ type: 'varchar', length: 60, nullable: true }) country: string | null;
  @Column({ name: 'use_case', type: 'varchar', length: 500, nullable: true }) useCase: string | null;
  @Column({ name: 'ip_hash', type: 'varchar', length: 64, nullable: true }) ipHash: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
}

@Entity('case_studies')
export class CaseStudy {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 60, unique: true }) slug: string;
  @Column({ type: 'varchar', length: 160 }) title: string;
  @Column({ type: 'varchar', length: 300 }) summary: string;
  @Column({ type: 'varchar', length: 60 }) category: string;
  @Column({ type: 'varchar', length: 200 }) cover: string;
  @Column({ name: 'cover_position', type: 'varchar', length: 40, default: '50% 50%' }) coverPosition: string;
  @Column({ type: 'varchar', length: 200, nullable: true }) peek: string | null;
  @Column({ name: 'peek_video', type: 'varchar', length: 200, nullable: true }) peekVideo: string | null;
  @Column({ type: 'jsonb', default: () => "'[]'" }) items: CaseItem[];
  @Column({ name: 'sort_order', type: 'integer', default: 0 }) sortOrder: number;
  @Column({ type: 'boolean', default: true }) published: boolean;
  @Column({ type: 'boolean', default: true }) featured: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }) updatedAt: Date;
}

@Entity('archive_projects')
export class ArchiveProject {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 60, unique: true }) slug: string;
  @Column({ type: 'varchar', length: 160 }) title: string;
  @Column({ type: 'varchar', length: 300, default: '' }) subtitle: string;
  @Column({ name: 'behance_path', type: 'varchar', length: 300 }) behancePath: string;
  @Column({ type: 'varchar', length: 300 }) cover: string;
  @Column({ type: 'varchar', length: 10 }) category: string;
  @Column({ type: 'integer', default: 0 }) views: number;
  @Column({ name: 'inner_image', type: 'varchar', length: 300, nullable: true }) innerImage: string | null;
  @Column({ type: 'varchar', length: 60, nullable: true }) client: string | null;
  @Column({ name: 'sort_order', type: 'integer', default: 0 }) sortOrder: number;
  @Column({ type: 'boolean', default: true }) published: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }) updatedAt: Date;
}

export const ENTITIES = [AdminUser, Lead, QuoteRequest, WaitlistEntry, CaseStudy, ArchiveProject];
