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
  async getUser(@Res() res: Response): Promise<any> {
    res.append('X-Total-Count', '1');
    // X-Total-Countをつけないとcorsエラーが出る
    res.send(await this.userService.getUser());
    // return await this.userService.getUser();
  }

  @Get('user-info/:id')
  async getUserInfo(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const res = await this.userService.getUserInfo(id);
    return res;
  }

  @Get('wallet-address/:id')
  async getWalletAddress(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    const res = await this.userService.getWalletAddress(id);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Patch('/update-pass/:id')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    return this.userService.updateUserPassword(id, updateUserPasswordDto.password);
  }
}
