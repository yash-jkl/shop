import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from './sendgrid.service';
import sendgridConfig from './sendgrid.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sendgridConfig],
    }),
  ],
  providers: [SendgridService],
})
export class SendgridModule {}
