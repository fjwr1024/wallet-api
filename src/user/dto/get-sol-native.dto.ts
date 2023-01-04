import { IsNotEmpty, IsString } from 'class-validator';

export class GetSolNative {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
