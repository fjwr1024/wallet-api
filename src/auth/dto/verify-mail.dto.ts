import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyMailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
