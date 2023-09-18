import { Module } from '@nestjs/common';
import { EmailjsService } from './emailjs.service';

@Module({
  providers: [EmailjsService],
})
export class EmailjsModule {}
