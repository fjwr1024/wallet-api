import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyAuthCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  authCode: number;
}
