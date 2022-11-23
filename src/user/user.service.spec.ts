import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

describe('UserServiceTest', () => {
  let userService: UserService;

  const mockUser1 = {
    userId: 1,
    email: 'test1',
    password: '1234',
    walletAddress: 'walletaddresswalletaddresswalletaddress',
    refreshToken: 'tokentoken',
    refreshTokenExp: 'tokentoken',
    createdAt: new Date(2022 - 11 - 11, 22, 0o2, 59, 678895),
    updatedAt: new Date(2022 - 11 - 11, 22, 0o2, 59, 678895),
  };

  const UserServiceProvider = {
    provide: UserService,
    useFactory: () => ({
      getUserInfo: jest.fn((): Promise<User> => {
        return Promise.resolve(mockUser1);
      }),
      getWalletAddress: jest.fn((): Promise<string> => {
        return Promise.resolve(mockUser1.walletAddress);
      }),
      updateUserPassword: jest.fn((): Promise<User> => {
        return Promise.resolve(mockUser1);
      }),
    }),
  };

  // 各テストケース実行前に必要なインスタンスを生成
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceProvider],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('userServiceインスタンスが定義されてること', async () => {
    expect(userService).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('userService の getUserInfo テスト', async () => {
      userService.getUserInfo(1);
      expect(userService.getUserInfo).toHaveBeenCalled();
    });

    it('正常系: ユーザー情報を返却', async () => {
      const expected: User = mockUser1;

      const actual = await userService.getUserInfo(mockUser1.userId);
      expect(actual).toEqual(expected);
    });

    it('異常系: ユーザーが存在しない', async () => {
      try {
        await userService.getUserInfo(100000000);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('User is not found');
      }
    });
  });

  describe('getWalletAddress', () => {
    it('userServiceのgetWalletAddressが呼ばれること', async () => {
      userService.getWalletAddress(1);
      expect(userService.getWalletAddress).toHaveBeenCalled();
    });

    it('userWalletAddressが返されること', async () => {
      const expected = mockUser1.walletAddress;

      const actual = await userService.getWalletAddress(mockUser1.userId);
      expect(actual).toEqual(expected);
    });

    it('異常系: ユーザーが存在しない', async () => {
      try {
        await userService.getUserInfo(100000000);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe('User is not found');
      }
    });
  });

  describe('updateUserPassword', () => {
    it('正常系 : ', async () => {
      userService.updateUserPassword(1, { password: 'updatepass' });
      expect(userService.updateUserPassword).toHaveBeenCalled();
    });
  });
});
