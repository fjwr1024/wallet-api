import { Orders } from './../entities/orders.entity';
import { AUTH_MAIL_BODY, AUTH_MAIL_TITLE } from './../utils/mail/mail-content';
import { getUserByEmail, getUserById } from './../utils/usersUtil';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthEmail } from './../entities/auth-email.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { AppDataSource } from '../data-source';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { BlockLoginDto } from './dto/block-login.dto';
import { ConfigService } from '@nestjs/config';
import { Jwt, Msg } from './interface/auth.interface';
import { createWallet } from '../solana/wallet/createWallet';
import { UserStatus } from './user-status.enum';
import { sendMail } from 'src/utils/mail/mailer';
import { createRandomCode } from '../utils/crypt/rand';
import { CancelBlockDto } from './dto/cancel-block.dto';
import { VerifyAuthCodeDto } from './dto/verify-code.dto';
import { UserTmp } from 'src/entities/user-tmp.entity';

// bcrypt がdockerだと使用できない https://qiita.com/curious_enginee/items/45f6ff65177b26971bad
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly config: ConfigService) {}

  public async signUp(createUserDto: CreateUserDto): Promise<Msg> {
    const hashed = await bcrypt.hash(createUserDto.password, 12);

    try {
      const tmpUser = new UserTmp();

      tmpUser.email = createUserDto.email;
      tmpUser.password = hashed;

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
      // const mailTitle = AUTH_MAIL_TITLE;
      // const mailBody = AUTH_MAIL_BODY(authCode);
      // sendMail(EMAIL_TO, mailTitle, mailBody);

      console.log('user', tmpUser);
      console.log('authcode', authCode);
      AppDataSource.manager.insert(UserTmp, tmpUser);
      return { message: 'ok' };
    } catch (error) {
      throw new InternalServerErrorException('Sign up Error');
    }
  }

  async verifyAuthCode(verifyAuthCodeDto: VerifyAuthCodeDto) {
    const verifyUser = await AppDataSource.manager.findOne(AuthEmail, {
      where: { email: verifyAuthCodeDto.email },
      order: { id: 'DESC' },
    });
    console.log('verifyUser', verifyUser);

    if (verifyAuthCodeDto.authCode === verifyUser.sentCode) {
      console.log('authcode verified');
      const user = new User();
      const walletAddress = createWallet();

      const tmpUser = await AppDataSource.manager.findOneBy(UserTmp, {
        email: verifyUser.email,
      });

      if (!tmpUser) {
        throw new NotFoundException('User is not found');
      }

      user.email = tmpUser.email;
      user.password = tmpUser.password;
      user.walletAddress = (await walletAddress).pubkey;

      console.log('user', user);

      AppDataSource.manager.insert(User, user);
    } else {
      throw new InternalServerErrorException('ウォレット生成時エラー');
    }

    return 'ok';
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
      expiresIn: '60m',
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

  async blockLogin(blockLoginDto: BlockLoginDto): Promise<string> {
    const blockUser = await getUserByEmail(blockLoginDto.email);
    await AppDataSource.manager.update(
      User,
      { email: blockUser.email },
      {
        blockFlag: true,
      }
    );
    return 'ok';
  }

  async cancelBlock(cancelBlockDto: CancelBlockDto): Promise<string> {
    const cancelUser = await getUserById(cancelBlockDto.id);
    await AppDataSource.manager.update(
      User,
      {
        id: cancelUser.id,
      },
      {
        blockFlag: false,
      }
    );
    return 'ok';
  }
}
