import { IsNotEmpty, IsString } from 'class-validator';

export class GetTokenAmountDto {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
