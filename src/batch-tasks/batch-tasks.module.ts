import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchTasksService } from './batch-tasks.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BatchTasksService],
})
export class BatchTasksModule {}
