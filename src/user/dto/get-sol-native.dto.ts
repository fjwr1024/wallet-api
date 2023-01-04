import { IsNotEmpty, IsString } from 'class-validator';

export class GetSolNativeDto {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
