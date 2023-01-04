import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingService } from './logging/logging.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: LoggingService) {}

  @Get('healthcheck')
  healthCheck() {
    this.logger.debug('Debug Message');
    this.logger.log('Info Message');
    this.logger.warn('Warn Message');
    this.logger.error('Error Message', 'error in AppController');
    return { message: 'ok' };
  }
}
