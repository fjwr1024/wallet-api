import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await AppDataSource.manager.findOneBy(User, {
      id: payload.sub,
    });
    return user;
  }
}
