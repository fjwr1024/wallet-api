import { News } from './entities/news.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';

const env = dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: 'admin',
  password: 'password',
  database: 'wallet_db',
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
