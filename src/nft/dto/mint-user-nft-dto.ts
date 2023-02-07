import { IsNotEmpty, IsString } from 'class-validator';

export class MintUserNftDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  quantity: number;
}
