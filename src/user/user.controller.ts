import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetSolNativeDto } from './dto/get-sol-native.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserService } from './user.service';
import { SolNativeOwnerInfo } from '@solana-suite/core';
import { Roles } from 'src/decorator/role.decorator';
import { UserStatus } from 'src/auth/user-status.enum';
import { ownInfoByJwt } from '../utils/getOwnInfoByJwt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(UserStatus.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAllUser(): Promise<User[]> {
    const res = await this.userService.getAllUser();
    return res;
  }

  @Get('/search-query')
  async getQueryUser(@Query('take') take: number, @Query('page') page: number): Promise<User[]> {
    const skip = (page - 1) * take;
    const res = await this.userService.getQueryUser(skip || 0, take || 10, page || 1);
    return res;
  }

  @Get('user-info/me')
  async getUserInfo(@Req() request): Promise<User> {
    const ownData = ownInfoByJwt(request);
    const res = await this.userService.getUserInfo(ownData.sub);
    return res;
  }

  @Get('wallet-address/me')
  async getWalletAddress(@Req() request): Promise<User[]> {
    const ownData = ownInfoByJwt(request);
    const res = await this.userService.getWalletAddress(ownData.sub);
    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Post('get-sol')
  async getWalletSolNative(@Body() getSolNativeDto: GetSolNativeDto): Promise<SolNativeOwnerInfo> {
    const res = await this.userService.getWalletSolNative(getSolNativeDto);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-pass/me')
  updateUserPassword(@Req() request, @Body() updateUserPasswordDto: UpdateUserPasswordDto): Promise<string> {
    const ownData = ownInfoByJwt(request);
    const res = this.userService.updateUserPassword(ownData.sub, updateUserPasswordDto.password);
    return res;
  }
}
