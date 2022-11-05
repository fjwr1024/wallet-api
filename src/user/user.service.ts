import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    const res = await this.userRepository.getUserEmail(createUserDto.email);

    if (!res.length) {
      return await this.userRepository.createUser(createUserDto);
    }
    if (res[0].email === createUserDto.email) {
      throw new ConflictException('This email is already exist');
    }
  }

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
