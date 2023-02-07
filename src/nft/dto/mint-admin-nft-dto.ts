import { IsNotEmpty, IsString } from 'class-validator';

export class MintAdminNftDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  quantity: number;
}
