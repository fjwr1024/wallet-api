import { IsNotEmpty, IsString } from 'class-validator';

export class MintAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
