import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import e from 'express';

describe('UserController', () => {
  let authController: AuthController;
  let authService: AuthService;

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

  const AuthServiceProvider = {
    provide: AuthService,
    useFactory: () => ({
      csrf: jest.fn(),
      signup: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      logincheck: jest.fn(),
    }),
  };

  // 各テストケース実行前に必要なインスタンスを生成
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceProvider],
    }).compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('okが返却されること', async () => {
      const actual = '{message: ok}';
    });
  });
});
