import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
