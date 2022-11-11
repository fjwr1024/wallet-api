import { Body, Controller, Get, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
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
  async getUserWalletAddress(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    const res = await this.userService.getUserWalletAddress(userId);
    return res;
  }

  @Patch('/update-pass/:userId')
  updateTaskById(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    return this.userService.updateUserPassword(userId, updateUserPasswordDto.password);
  }
}
