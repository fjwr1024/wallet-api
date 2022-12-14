import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { AppDataSource } from '../data-source';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Jwt, Msg } from './interface/auth.interface';
import { createWallet } from '../solana/wallet/createWallet';

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

      console.log('user', user);
      AppDataSource.manager.insert(User, user);
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
    console.log('user', user);
    return this.generateJwt(user.id, user.email);
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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await AppDataSource.manager.findOneBy(User, { email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
