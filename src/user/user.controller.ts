import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';

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

  @Get('wallet-address/:userId')
  async getWalletAddress(@Param('userId', ParseIntPipe) userId: number): Promise<User[]> {
    const res = await this.userService.getWalletAddress(userId);
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update-pass/:userId')
  updateUserPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    return this.userService.updateUserPassword(userId, updateUserPasswordDto.password);
  }
}
