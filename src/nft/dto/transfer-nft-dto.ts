import { IsNotEmpty, IsString } from 'class-validator';

export class TransferNftDto {
  @IsNotEmpty()
  @IsString()
  mintId: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
