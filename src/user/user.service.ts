import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from 'src/data-source';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    const res = this.registrationValidation(createUserDto);
    if (res) {
      throw new ConflictException('This email is already exist');
    }

    return await this.userRepository.createUser(createUserDto);
  }

  private async registrationValidation(createUserDto: CreateUserDto): Promise<string> {
    const user = await AppDataSource.manager.findOneBy(User, {
      email: createUserDto.email,
    });
    if (user != null && user.email) {
      return 'Email already exist';
    }
    return '';
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
