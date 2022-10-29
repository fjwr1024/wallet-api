import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(loginDto);
    const secretData = {
      token,
    };

    console.log('token', token);

    return res.cookie('auth-cookie', secretData, { httpOnly: true });
  }

  @Get('login-check')
  @UseGuards(AuthGuard('jwt'))
  async success() {
    return { message: 'login success' };
  }
}
