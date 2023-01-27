import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthService]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, RefreshStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
