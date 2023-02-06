import { IsNotEmpty, IsString } from 'class-validator';

export class OrdersDto {
  // @IsString()
  // @IsNotEmpty()
  userId: string;

  amount: number;
}
