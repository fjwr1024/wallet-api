import { getSolNative } from './../solana/SOL/get-solnative';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import { SolNativeOwnerInfo } from '@solana-suite/core';

@Injectable()
export class UserService {
  async getUser(): Promise<User[]> {
    const res = await AppDataSource.manager.find(User);
    return res;
  }

  async getUserInfo(id): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async getCurrentUser(email: string): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      email,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async getWalletAddress(id: string): Promise<User[]> {
    const res = await AppDataSource.manager.find(User, {
      select: {
        walletAddress: true,
      },
      where: {
        id,
      },
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async getUserEmail(email): Promise<User[]> {
    const res = await AppDataSource.manager.find(User, {
      select: {
        email: true,
      },
      where: {
        email,
      },
    });
    return res;
  }

  async updateUserPassword(id, password) {
    const user = await AppDataSource.manager.findOneBy(User, {
      id,
    });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AppDataSource.manager.update(User, id, {
      password: hashedPassword,
    });

    return 'ok';
  }

  async getWalletSolNative(getSolNativeDto): Promise<SolNativeOwnerInfo> {
    const res = getSolNative(getSolNativeDto.walletAddress);
    console.log('sol res', res);
    return res;
  }
}
