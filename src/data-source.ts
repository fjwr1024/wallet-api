import { Metadata } from './entities/metadata.entity';
import { Nft } from './entities/nft.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { News } from './entities/news.entity';
import { Orders } from './entities/orders.entity';
import { AuthEmail } from './entities/auth-email.entity';
import { UserTmp } from './entities/user-tmp.entity';
import { AddressBook } from './entities/address-book.entity';

const env = process.env;

// TODO: 環境ごとにenvの切り分け
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST || '127.0.0.1',
  port: parseInt(env.DB_PORT) || 3306,
  username: env.DB_USER || 'admin',
  password: env.DB_PASS || 'password',
  database: env.DB_NAME || 'wallet_db',
  synchronize: false,
  logging: false,
  entities: [User, News, Orders, AuthEmail, UserTmp, Nft, Metadata, AddressBook],
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
