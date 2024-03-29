import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req, _: Response, next: () => void): Promise<void | number> {
    console.log('middleware');
    try {
      const apiKey = req.cookies.access_token;
      const decoded = jwtDecode<{ [name: string]: string }>(apiKey);
      console.log('decoded', decoded);
      const user = await this.userService.getUserInfo(decoded.sub);
      console.log('currentuserid', user.id);
      console.log('currentuser', user);
      console.log('req.params', req.params);

      if (!(String(decoded.sub) === user.id)) {
        console.log('user is invalid');
      }
      next();
    } catch (error) {
      console.log('Middleware error', error);

      next();
    }
  }
}
