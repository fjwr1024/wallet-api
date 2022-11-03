import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // サーバーがexpressとバレないようにするための処理
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.disable('x-powered-by');

  app.use(cookieParser());

  // corsの許可
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
