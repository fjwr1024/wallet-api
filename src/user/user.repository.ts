import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { createWallet } from './solana/createWallet';

export class UserRepository extends Repository<User> {
  // TODO: 型指定修正
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

  async getUser(userId): Promise<User> {
    const res = AppDataSource.manager.findOneBy(User, {
      userId,
    });
    return res;
  }

  // TODO: 型指定修正
  async getUserWalletAddress(userId): Promise<any> {
    const res = await AppDataSource.manager.find(User, {
      select: {
        walletAddress: true,
      },
      where: {
        userId,
      },
    });

    return res;
  }
}
