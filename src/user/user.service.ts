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

  public async getUserInfo(id): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  public async getCurrentUser(email: string): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      email,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  public async getWalletAddress(id: number): Promise<User[]> {
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
}
