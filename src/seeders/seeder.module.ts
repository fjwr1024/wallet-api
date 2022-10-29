import { UserModule } from '../user/user.module';
import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { Seeder } from './seeder';
import { UsersSeederService } from './users/user.seeder.service';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [Logger, Seeder, UsersSeederService],
})
export class SeederModule {}
