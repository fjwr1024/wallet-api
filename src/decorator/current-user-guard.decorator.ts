import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_data, req) => {
  console.log(req);
  console.log(req.CurrentUser);
  return req.currentUser;
});
