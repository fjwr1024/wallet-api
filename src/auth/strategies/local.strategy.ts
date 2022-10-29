import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CurrentUser } from 'src/auth/interface/current.user';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(loginDto: LoginDto): Promise<CurrentUser> {
    const user = await this.authService.validateUserCredentials(loginDto);

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
