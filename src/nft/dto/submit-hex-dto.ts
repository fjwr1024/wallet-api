import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitHexDto {
  @IsNotEmpty()
  @IsString()
  hex: string;
}
