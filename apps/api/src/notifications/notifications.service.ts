import { Inject, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { APP_CONFIG, type AppConfig } from '../config/env';

/** Tells the studio when a brief, a scope or a waitlist sign-up arrives.
 *  With SMTP settings it sends an email; without them it writes to the log. It never blocks the visitor. */
@Injectable()
export class NotificationsService {
  private readonly log = new Logger('Notify');
  private readonly transport: nodemailer.Transporter | null;

  constructor(@Inject(APP_CONFIG) private readonly cfg: AppConfig) {
    this.transport = cfg.smtp
      ? nodemailer.createTransport({
          host: cfg.smtp.host,
          port: cfg.smtp.port,
          secure: cfg.smtp.secure,
          auth: cfg.smtp.user ? { user: cfg.smtp.user, pass: cfg.smtp.pass } : undefined,
        })
      : null;
  }

  notify(subject: string, text: string, replyTo?: string): void {
    if (!this.transport) {
      this.log.log(`${subject} (set SMTP_HOST to receive these by email)`);
      return;
    }
    this.transport
      .sendMail({ from: this.cfg.smtp!.from, to: this.cfg.notifyEmail, subject, text, replyTo })
      .catch((e: Error) => this.log.warn(`Email failed: ${e.message}`));
  }
}
