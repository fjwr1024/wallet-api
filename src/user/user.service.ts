import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getTokenAmount } from './solana/getTokenAmount';
import { UserRepository } from './user.repository';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  public async createWallet() {
    return await this.createWallet();
  }

  public async getUserInfo(userId: number): Promise<User> {
    const res = await this.userRepository.getUser(userId);

    if (!res) {
      throw new InternalServerErrorException('User is not found');
    }
    return res;
  }

  public async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    console.log('service', tokenAmount);
    return tokenAmount;
  }
}
