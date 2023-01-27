import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';

import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggingService } from './logging/logging.service';
import { LoggingInterceptor } from './intercepter/logging.intercepter';

async function bootstrap() {
  // サーバーがexpressであることを隠蔽するための処理
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggingService(),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.disable('x-powered-by');

  // corsの許可
  app.enableCors({
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, X-Total-Count, Content-Type, Accept',
    exposedHeaders: 'Content-Range, X-Total-Count',
    origin: 'http://localhost:3001',
  });

  app.use(cookieParser());
  // 画面からapiを叩く場合はsecureをtrue postmanの場合はfalse
  // csrf認証が面倒なので普段はコメントアウト
  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       secure: false,
  //     },
  //     value: (req: Request) => {
  //       return req.header('csrf-token');
  //     },
  //   })
  // );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
