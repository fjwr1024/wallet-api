import { transferSplToken } from './../solana/spl-token/transfer-spl-token';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getTokenAmount } from '../solana/spl-token/getTokenAmount';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { getTransactionHistory } from '../solana/spl-token/transactionHistory';
import { submitHex } from '../solana/spl-token/submitHex';
import { createSplToken } from '../solana/spl-token/createSpl';
import { CreateMemoDto } from './dto/create-memo.dto';
import { createMemo } from 'src/solana/spl-token/createMemo';
import { token } from '../solana/spl-token/token';

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

  async createSpl(createSplDto, file) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await createSplToken(
      createSplDto.totalAmount,
      createSplDto.decimals,
      ownerWalletAddress,
      ownerSecretKey,
      file.path
    );

    deleteUploadFile(file.path);

    const res = await createMemo(response, 'comment', ownerWalletAddress, ownerSecretKey);

    console.log('res', res);

    return response;
  }

  async createComment(createMemoDto: CreateMemoDto) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    // const spltoken = '5QZsKY9dHxUXzYJUrgPJgueKkS6GpEy9LbcgH4SV1GSb';

    const response = await createMemo(token, createMemoDto.comment, ownerWalletAddress, ownerSecretKey);

    console.log('response', response);

    return 'ok';
  }

  async transferSplToken() {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await transferSplToken(
      '2jm74gcmfZQJEXarPf1TVqVySmehM6xyHVRAkNsEinSp',
      ownerWalletAddress,
      'FtJ5RdwkrsLWgawAeLrPwdxgr6c4rqrbvFb6jPsxYgMF',
      ownerSecretKey,
      10,
      1
    );

    console.log('response', response);

    return 'ok';
  }
}
