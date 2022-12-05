import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import jwt_decode from 'jwt-decode';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req, _: Response, next: () => void): Promise<void> {
    const apiKey = req.cookies.access_token;
    const decoded = jwt_decode<{ [name: string]: string }>(apiKey);
    console.log('decoded_jet', decoded);
    try {
      const user = await this.userService.getCurrentUser(decoded.email);
      req.currentUser = user;
      next();
    } catch {
      next();
    }
  }
}
