import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { createWallet } from './solana/createWallet';

export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const walletAddress = createWallet();

    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.walletAddress = (await walletAddress).pubkey;

    AppDataSource.manager.save(user);
    return user;
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
