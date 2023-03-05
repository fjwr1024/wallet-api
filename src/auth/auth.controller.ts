import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Csrf, Msg } from './interface/auth.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { BlockLoginDto } from './dto/block-login.dto';
import { CancelBlockDto } from './dto/cancel-block.dto';
import { UserStatus } from './user-status.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<Msg> {
    return await this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.login(loginDto);

    // 画面からapiを叩く場合はsecureをtrue postmanの場合はfalse
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'success',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'ok',
    };
  }

  @Patch('/block-user')
  async blockLogin(@Body() blockLoginDto: BlockLoginDto): Promise<string> {
    return await this.authService.blockLogin(blockLoginDto);
  }

  @Roles(UserStatus.Admin)
  @UseGuards(RolesGuard)
  @Patch('/cancel-block')
  async cancelBlock(@Body() cancelBlockDto: CancelBlockDto): Promise<string> {
    return await this.authService.cancelBlock(cancelBlockDto);
  }

  @Get('login-check')
  @UseGuards(AuthGuard('jwt'))
  async success() {
    return { message: 'login success' };
  }
}
