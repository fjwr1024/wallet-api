import { IsNotEmpty, IsString } from 'class-validator';

export class CancelBlockDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
