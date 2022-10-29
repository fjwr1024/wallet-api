import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../entities/user.entity';
import { users } from './data';

@Injectable()
export class UsersSeederService {
  constructor(private readonly userRepository: UserRepository) {}

  create(): Array<Promise<User>> {
    return users.map(async user => {
      const result = await this.userRepository.findOneBy({ walletAddress: user.walletAddress });
      if (!result) {
        return Promise.resolve(await this.userRepository.save(user).catch(error => Promise.reject(error)));
      } else {
        return Promise.resolve(null);
      }
    });
  }
}
