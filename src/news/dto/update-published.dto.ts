import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdatePublishedDto {
  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;
}
