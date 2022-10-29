import { IsNotEmpty, IsString } from 'class-validator';

export class TransferHexDto {
  @IsNotEmpty()
  @IsString()
  hex: string;
}
