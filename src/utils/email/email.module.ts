import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendgridModule } from './sendgrid/sendgrid.module';
// import { SendgridService } from './sendgrid/sendgrid.service';
import { EmailjsModule } from './emailjs/emailjs.module';
import { EmailjsService } from './emailjs/emailjs.service';

@Module({
  imports: [SendgridModule, EmailjsModule],
  providers: [
    {
      provide: EmailService,
      useClass: EmailjsService,
    },
  ],
})
export class EmailModule {}
