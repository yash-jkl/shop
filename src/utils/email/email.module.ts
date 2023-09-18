import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { SendgridService } from './sendgrid/sendgrid.service';

@Module({
  imports: [SendgridModule],
  providers: [
    {
      provide: EmailService,
      useClass: SendgridService,
    },
  ],
})
export class EmailModule {}
