import { IsNotEmpty, IsString } from 'class-validator';

export class TransferNftDto {
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
