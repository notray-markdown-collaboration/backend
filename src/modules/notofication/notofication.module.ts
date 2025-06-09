import { Module } from '@nestjs/common';
import { NotoficationService } from './notofication.service';
import { NotoficationController } from './notofication.controller';

@Module({
  controllers: [NotoficationController],
  providers: [NotoficationService],
})
export class NotoficationModule {}
