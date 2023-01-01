import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
