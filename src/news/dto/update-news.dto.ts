import { IsString, IsBoolean } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsBoolean()
  isPublished: boolean;
}
