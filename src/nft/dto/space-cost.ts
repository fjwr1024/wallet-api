import { IsNotEmpty, IsNumber } from 'class-validator';

export class SpaceCostDto {
  @IsNotEmpty()
  @IsNumber()
  spaceCost: number;
}
