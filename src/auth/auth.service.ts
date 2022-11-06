import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

import { LoginDto } from './dto/login.dto';
import { AppDataSource } from '../data-source';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Jwt, Msg } from './interface/auth.interface';
import { createWallet } from 'src/user/solana/createWallet';

// bcrypt がdockerだと使用できない https://qiita.com/curious_enginee/items/45f6ff65177b26971bad

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly config: ConfigService) {}

  public async signUp(createUserDto: CreateUserDto): Promise<Msg> {
    const hashed = await bcrypt.hash(createUserDto.password, 12);

    try {
      const user = new User();
      const walletAddress = createWallet();

      user.email = createUserDto.email;
      user.password = hashed;
      user.walletAddress = (await walletAddress).pubkey;

      AppDataSource.manager.save(user);
      console.log('user', user);
      return { message: 'ok' };
    } catch (error) {
      throw new ConflictException('This email is already exist');
    }
  }

  async login(loginDto: LoginDto): Promise<Jwt> {
    const user = await AppDataSource.manager.findOneBy(User, {
      email: loginDto.email,
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');
    return this.generateJwt(user.userId, user.email);
  }

  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: secret,
    });
    return {
      accessToken: token,
    };
  }
}
//   public async getRefreshToken(userId: number): Promise<string> {
//     const userDataToUpdate = {
//       refreshToken: randomToken.generate(16),
//       refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
//     };

//     await this.authRepository.update(userId, userDataToUpdate);
//     return userDataToUpdate.refreshToken;
//   }

//   public async validRefreshToken(email: string, refreshToken: string): Promise<CurrentUser> {
//     const currentDate = moment().day(1).format('YYYY/MM/DD');
//     const user = await this.authRepository.findOne({
//       where: {
//         email: email,
//         refreshToken: refreshToken,
//         refreshTokenExp: MoreThanOrEqual(currentDate),
//       },
//     });

//     if (!user) {
//       return null;
//     }

//     const currentUser = new CurrentUser();
//     currentUser.userId = user.userId;
//     currentUser.email = user.email;

//     return currentUser;
//   }
// }
