import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSpaceDto {
  @IsNotEmpty()
  @IsNumber()
  aboutMintTotal: number;
}
