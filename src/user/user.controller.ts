import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { User } from 'src/entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // react admin get list用api
  @Get()
  async getUser(@Res() res: Response): Promise<Response> {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    // X-Total-Countをつけないとcorsエラーが出る
    res.set('X-Total-Count', '1');
    return res.send(await this.userService.getUser());
  }

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

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Patch('/update-pass/:userId')
  updateUserPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    return this.userService.updateUserPassword(userId, updateUserPasswordDto.password);
  }
}
