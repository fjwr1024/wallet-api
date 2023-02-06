import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrdersDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  // TODO: max 値をプロダクトごとに決定
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
