import { UserStatus } from 'src/auth/user-status.enum';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
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
import { SolNativeOwnerInfo } from '@solana-suite/core';
import { Roles } from 'src/decorator/role.decorator';
import jwt_decode from 'jwt-decode';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: any型修正
  @Roles(UserStatus.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getUser(@Res() res: Response): Promise<any> {
    res.append('X-Total-Count', '1');
    // X-Total-Countをつけないと react admin の仕様上corsエラーが出る
    res.send(await this.userService.getUser());
  }

  @Get('user-info/me')
  async getUserInfo(@Req() request): Promise<User> {
    const apiKey = request.cookies.access_token;
    const decoded = jwt_decode<{ [name: string]: string }>(apiKey);
    const user = await this.userService.getUserInfo(decoded.sub);
    const res = await this.userService.getUserInfo(user.id);
    return res;
  }

  @Get('wallet-address/:id')
  async getWalletAddress(@Param('id', ParseUUIDPipe) id: string): Promise<User[]> {
    const res = await this.userService.getWalletAddress(id);
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Post('get-sol')
  async getWalletSolNative(@Body() getSolNativeDto: GetSolNativeDto): Promise<SolNativeOwnerInfo> {
    const res = await this.userService.getWalletSolNative(getSolNativeDto);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-pass/:id')
  updateUserPassword(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<string> {
    const res = this.userService.updateUserPassword(id, updateUserPasswordDto.password);
    return res;
  }
}
