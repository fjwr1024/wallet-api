import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { AppDataSource } from 'src/data-source';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserInfo(userId: number): Promise<User> {
    const res = await this.userRepository.getUser(userId);

    if (!res) {
      throw new InternalServerErrorException('User is not found');
    }
    return res;
  }

  public async getUserWalletAddress(userId: number): Promise<User> {
    const res = await this.userRepository.getUserWalletAddress(userId);

    if (!res) {
      throw new InternalServerErrorException('User is not found');
    }
    return res;
  }
}
