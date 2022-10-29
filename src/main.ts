import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });

  // サーバーがexpressとバレないようにするための処理
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.disable('x-powered-by');

  app.use(cookieParser());

  // corsの許可
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
