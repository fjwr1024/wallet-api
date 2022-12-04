import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async getUser(): Promise<User[]> {
    const res = await AppDataSource.manager.find(User);
    return res;
  }

  public async getUserInfo(userId: number): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      userId,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  public async getWalletAddress(userId: number): Promise<User[]> {
    const res = await AppDataSource.manager.find(User, {
      select: {
        walletAddress: true,
      },
      where: {
        userId,
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

  async updateUserPassword(userId, password) {
    const user = await AppDataSource.manager.findOneBy(User, {
      userId,
    });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AppDataSource.manager.update(User, userId, {
      password: hashedPassword,
    });

    return 'ok';
  }
}
