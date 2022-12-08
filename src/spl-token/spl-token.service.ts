import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getTokenAmount } from 'src/spl-token/solana/getTokenAmount';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { getTransactionHistory } from './solana/transactionHistory';
import { submitHex } from './solana/submitHex';

@Injectable()
export class SplTokenService {
  constructor(private readonly config: ConfigService) {}

  async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    return tokenAmount;
  }

  async getSplHistory(getSplTokenHistoryDto: GetSplHistoryDto) {
    const tokenKey = this.config.get<string>('TOKEN_KEY');

    const splHistory = await getTransactionHistory(tokenKey, getSplTokenHistoryDto.walletAddress);
    return splHistory;
  }

  async submitHex(transferHexDto) {
    const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');
    console.log('hex data', transferHexDto.hex);
    const response = submitHex(transferHexDto.hex, ownerSecretKey);
    return response;
  }
}
