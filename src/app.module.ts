import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { SplTokenModule } from './spl-token/spl-token.module';
import { NftModule } from './nft/nft.module';
import { AppDataSource } from './data-source';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { CurrentUserMiddleware } from './middleware/user-auth.middleware';
import { NewsModule } from './news/news.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { BatchTasksModule } from './batch-tasks/batch-tasks.module';

// TODO: 実際のプロダクトでは DB設定は env からの読み取りに変更する
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
    }),
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10,
    // }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UserModule,
    SplTokenModule,
    NftModule,
    LoggingModule,
    NewsModule,
    OrdersModule,
    BatchTasksModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, LoggingService, OrdersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*');
  // }
}
