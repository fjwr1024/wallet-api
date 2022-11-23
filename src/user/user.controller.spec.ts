import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
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
      getUserWalletAddress: jest.fn((): Promise<string> => {
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
      controllers: [UserController],
      providers: [UserServiceProvider],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('userControllerのgetUserInfoが呼ばれること', async () => {
      userController.getUserInfo(1);
      expect(userService.getUserInfo).toHaveBeenCalled();
    });

    it('userInfoが返されること', async () => {
      const expected: User = mockUser1;

      const actual = await userController.getUserInfo(mockUser1.userId);
      expect(actual).toEqual(expected);
    });
  });

  describe('getWalletAddress', () => {
    it('userControllerのgetWalletAddressが呼ばれること', async () => {
      userController.getWalletAddress(1);
      expect(userService.getWalletAddress).toHaveBeenCalled();
    });

    it('userInfoが返されること', async () => {
      const expected = mockUser1.walletAddress;

      const actual = await userController.getWalletAddress(mockUser1.userId);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateUserPassword', () => {
    it('userControllerのupdateUserPasswordが呼ばれること', async () => {
      userController.updateUserPassword(1, { password: 'updatepass' });
      expect(userService.updateUserPassword).toHaveBeenCalled();
    });
  });
});
