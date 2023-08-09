import { Pubkey } from '@solana-suite/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNftListDto {
  @IsNotEmpty()
  @IsString()
  walletAddress: Pubkey;
}
