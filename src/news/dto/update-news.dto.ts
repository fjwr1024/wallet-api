import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;
}
