import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AppDataSource } from 'src/data-source';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  public async getUserInfo(userId: number): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      userId,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  // TODO: 戻り値の型修正
  public async getUserWalletAddress(userId: number): Promise<any> {
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

  // TODO: 戻り値の型修正
  async getUserEmail(email): Promise<any> {
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
