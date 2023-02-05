import { News } from './entities/news.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

const env = process.env;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST || 'localhost',
  port: parseInt(env.DB_PORT) || 3306,
  username: env.DB_USER || 'admin',
  password: env.DB_PASS || 'password',
  database: env.DB_NAME || 'wallet_db',
  synchronize: false,
  logging: false,
  entities: [User, News],
  migrations: ['src/migration/*.ts'],
});

//TODO: docker compose で起動後、timeoutするので調査
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
