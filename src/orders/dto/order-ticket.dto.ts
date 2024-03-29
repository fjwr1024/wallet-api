import { IsNotEmpty, IsString } from 'class-validator';

export class OrderTicketDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
