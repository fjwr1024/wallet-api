import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MintNftDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  quantity: number;
}
