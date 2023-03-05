import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthEmail } from './../entities/auth-email.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { AppDataSource } from '../data-source';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Jwt, Msg } from './interface/auth.interface';
import { createWallet } from '../solana/wallet/createWallet';
import { UserStatus } from './user-status.enum';
import { sendMail } from 'src/utils/mail/mailer';
import { createRandomCode } from './../utils/rand';

// bcrypt がdockerだと使用できない https://qiita.com/curious_enginee/items/45f6ff65177b26971bad
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly config: ConfigService) {}

  public async signUp(createUserDto: CreateUserDto): Promise<Msg> {
    const hashed = await bcrypt.hash(createUserDto.password, 12);

    //TODO: typeorm 内部で errorが吐き出された場合のエラーハンドリングを考える
    try {
      const user = new User();
      const walletAddress = createWallet();

      user.email = createUserDto.email;
      user.password = hashed;
      user.walletAddress = (await walletAddress).pubkey;

      const currentUser = await AppDataSource.manager.findOneBy(User, {
        email: createUserDto.email,
      });
      if (currentUser) throw new ConflictException('This email is already exist');

      // Email の 6桁コード認証メール送信 不必要かもしれない
      const authCode = createRandomCode();
      const authEmail = new AuthEmail();
      const limitTime = new Date();

      // auth code の有効期限を60分後までに設定
      limitTime.setMinutes(limitTime.getMinutes() + 60);

      authEmail.email = createUserDto.email;
      authEmail.sentCode = authCode;
      authEmail.limitTime = limitTime;

      AppDataSource.manager.insert(AuthEmail, authEmail);

      // TODO: 本来は sign up dto から取得する
      const EMAIL_TO = process.env.SENDGRID_EMAIL_TO as string;

      // メールを送りたい時のみコメント解除
      // sendMail(EMAIL_TO, 'test', 'test');

      console.log('user', user);
      AppDataSource.manager.insert(User, user);
      return { message: 'ok' };
    } catch (error) {
      throw new InternalServerErrorException('Sign up Error');
    }
  }

  async login(loginDto: LoginDto): Promise<Jwt> {
    const user = await AppDataSource.manager.findOneBy(User, {
      email: loginDto.email,
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');
    console.log('user', user);
    return this.generateJwt(user.id, user.email, user.role);
  }

  async generateJwt(userId: string, email: string, role: UserStatus): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const secret = this.config.get('JWT_SECRET');
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      accessToken,
    };
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await AppDataSource.manager.findOneBy(User, { email });
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
