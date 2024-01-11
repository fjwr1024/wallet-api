import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { AuthEmail } from 'src/entities/auth-email.entity';
import { jwtDecode } from 'jwt-decode';

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

export const ownInfoByJwt = request => {
  const apiKey = request.cookies.access_token;
  const ownInfo = jwtDecode<{ [name: string]: string }>(apiKey);

  return ownInfo;
};
