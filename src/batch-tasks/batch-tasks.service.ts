import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BatchTasksService {
  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    console.log('Running a task every seconds');
  }
}
