import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'wallet-db',
  port: 3306,
  username: 'admin',
  password: 'password',
  database: 'develop',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/migration/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
