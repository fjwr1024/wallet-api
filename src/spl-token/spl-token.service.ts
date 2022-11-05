import { Injectable } from '@nestjs/common';
import { getTokenAmount } from 'src/spl-token/solana/getTokenAmount';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

@Injectable()
export class SplTokenService {
  public async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    return tokenAmount;
  }
}
