import { IsNotEmpty, IsString } from 'class-validator';

export class GetSplHistoryDto {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
