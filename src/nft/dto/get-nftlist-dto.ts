import { IsNotEmpty, IsString } from 'class-validator';

export class GetNftListDto {
  @IsNotEmpty()
  @IsString()
  walletAddress: string;
}
