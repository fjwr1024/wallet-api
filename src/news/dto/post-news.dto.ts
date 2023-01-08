import { IsString, IsNotEmpty } from 'class-validator';

export class PostNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
