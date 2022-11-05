import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return await this.userService.signUp(createUserDto);
  }

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
