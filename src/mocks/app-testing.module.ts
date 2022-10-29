import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'wallet-db',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'develop',
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: ['src/migration/*.ts'],
    }),
  ],
})
export class AppTestingModule {}
