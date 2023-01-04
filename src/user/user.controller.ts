import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator/current-user-guard.decorator';

import { User } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetSolNativeDto } from './dto/get-sol-native.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserService } from './user.service';
import { getSolNative } from './../solana/SOL/get-solnative';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // react admin get list用api
  @UseGuards(RolesGuard)
  @Get()
  async getUser(@Res() res: Response): Promise<any> {
    res.append('X-Total-Count', '1');
    // X-Total-Countをつけないとcorsエラーが出る
    res.send(await this.userService.getUser());
  }

  @Get('user-info/:id')
  async getUserInfo(@CurrentUser() currentUser, @Param('id', ParseIntPipe) id: number): Promise<User> {
    const res = await this.userService.getUserInfo(id);
    return res;
  }

  @Get('wallet-address/:id')
  async getWalletAddress(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    const res = await this.userService.getWalletAddress(id);
    return res;
  }

  // TODO: any修正
  @Post('get-sol')
  async getWalletSolNative(@Body() getSolNativeDto: GetSolNativeDto): Promise<any> {
    const res = await this.userService.getWalletSolNative(getSolNativeDto);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Patch('/update-pass/:id')
  updateUserPassword(
    @CurrentUser() currentUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    return this.userService.updateUserPassword(id, updateUserPasswordDto.password);
  }
}
