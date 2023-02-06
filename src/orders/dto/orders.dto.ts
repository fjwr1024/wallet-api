import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrdersDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
