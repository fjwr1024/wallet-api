import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSplTokenDto {
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  decimals: number;
}
