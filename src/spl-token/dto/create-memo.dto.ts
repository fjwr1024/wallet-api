import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}
