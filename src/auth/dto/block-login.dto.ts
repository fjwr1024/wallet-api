import { IsEmail, IsNotEmpty } from 'class-validator';

export class BlockLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
