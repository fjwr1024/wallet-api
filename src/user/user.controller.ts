import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user-info/:userId')
  async getUserInfo(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    const res = await this.userService.getUserInfo(userId);
    return res;
  }

  @Get('user-wallet-address/:userId')
  async getUserWalletAddress(@Param('useId', ParseIntPipe) userId: number): Promise<User> {
    const res = await this.userService.getUserWalletAddress(userId);
    return res;
  }
}
