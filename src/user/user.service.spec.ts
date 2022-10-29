import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { NotFoundException } from '@nestjs/common';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';

const mockUser1 = {
  id: 1,
  email: 'aaa@email.com',
  password: 'password',
  wallet_address: 'walletAddresswalletAddresswalletAddress',
};

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('getUserInfo', () => {
    it('正常系', async () => {
      const expected = {
        userId: mockUser1.id,
        email: mockUser1.email,
        password: mockUser1.password,
        wallet_address: mockUser1.wallet_address,
      };

      // userRepository.getUser(1);
      const result = await userService.getUserInfo(1);
      expect(result).toEqual(expected);
    });

    it('異常系: ユーザーが存在しない', async () => {
      userRepository.getUser(null);
      await expect(userService.getUserInfo(100)).rejects.toThrow(NotFoundException);
    });
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
