import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
  // @IsString()
  // @IsNotEmpty()
  userId: string;

  amount: number;
}
