import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getTokenAmount } from '../solana/spl-token/getTokenAmount';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { getTransactionHistory } from '../solana/spl-token/transactionHistory';
import { submitHex } from '../solana/spl-token/submitHex';
import { createSplToken } from '../solana/spl-token/createSpl';

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
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    console.log('hex data', transferHexDto.hex);
    const response = submitHex(transferHexDto.hex, ownerSecretKey);
    return response;
  }

  async createSpl(createSplDto) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await createSplToken(
      createSplDto.totalAmount,
      createSplDto.decimals,
      ownerWalletAddress,
      ownerSecretKey
    );

    return response;
  }
}
