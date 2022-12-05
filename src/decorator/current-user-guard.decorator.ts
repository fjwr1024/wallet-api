import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_data, req) => {
  return req.currentUser;
});
