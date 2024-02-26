import { IsNotEmpty, IsString } from 'class-validator';

export class MintCnftDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  treeOwner: string;

  @IsString()
  mintCollection: string;
}
