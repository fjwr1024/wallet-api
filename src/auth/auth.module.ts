import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthService]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
