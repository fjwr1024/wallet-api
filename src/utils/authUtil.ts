import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { AuthEmail } from 'src/entities/auth-email.entity';

export const confirmAuthCode = async ({ id, authCode }): Promise<number> => {
  const getAuthCodeId = await AppDataSource.manager.findOneBy(AuthEmail, {
    id,
  });
  const now = new Date();

  if (authCode === getAuthCodeId.sentCode && now < getAuthCodeId.limitTime) {
    return HttpStatus.OK;
  } else {
    throw new UnauthorizedException('Verfication incorrect or time over');
  }
};
