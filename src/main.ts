import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // サーバーがexpressであることを隠蔽するための処理
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');

  // corsの許可
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
    // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
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

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
