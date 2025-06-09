import { Controller } from '@nestjs/common';
import { NotoficationService } from './notofication.service';

@Controller('notofication')
export class NotoficationController {
  constructor(private readonly notoficationService: NotoficationService) {}
}
