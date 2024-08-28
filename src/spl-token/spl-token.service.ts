import { clientCreateHex } from './../solana/spl-token/clientCreateHex';
import { transferSplToken } from './../solana/spl-token/transfer-spl-token';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getTokenAmount } from '../solana/spl-token/getTokenAmount';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { getTransactionHistory } from '../solana/spl-token/spl-find';
import { createSplToken } from '../solana/spl-token/createSpl';
import { CreateMemoDto } from './dto/create-memo.dto';
import { createMemo } from 'src/solana/spl-token/createMemo';
import { submitHex } from 'src/solana/spl-token/submitHex';

@Injectable()
export class SplTokenService {
  constructor(private readonly config: ConfigService) {}

  async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    return tokenAmount;
  }

  async getSplHistory(getSplTokenHistoryDto: GetSplHistoryDto) {
    const splHistory = await getTransactionHistory(getSplTokenHistoryDto.walletAddress);
    return splHistory;
  }

  // async submitHex(transferHexDto) {
  //   const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
  //   console.log('hex data', transferHexDto.hex);
  //   const response = submitHex(transferHexDto.hex, ownerSecretKey);
  //   return response;
  // }

  async createSpl(createSplDto, file) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await createSplToken(createSplDto.totalAmount, createSplDto.decimals, ownerSecretKey, file.path);

    deleteUploadFile(file.path);

    // const res = await createMemo(response, 'comment', ownerWalletAddress, ownerSecretKey);

    // console.log('res', res);

    return response;
  }

  async createComment(createMemoDto: CreateMemoDto) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const spltoken = '5QZsKY9dHxUXzYJUrgPJgueKkS6GpEy9LbcgH4SV1GSb';

    const response = await createMemo(spltoken, createMemoDto.comment, ownerWalletAddress, ownerSecretKey);

    console.log('response', response);

    return 'ok';
  }

  async transferSplToken() {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await transferSplToken(
      'qDWh96s44G7qys26UsRmnHDtvS4Szhkune5NY9oa4kr',
      ownerWalletAddress,
      'FtJ5RdwkrsLWgawAeLrPwdxgr6c4rqrbvFb6jPsxYgMF',
      ownerSecretKey,
      10,
      1
    );

    console.log('response', response);

    return 'ok';
  }

  async clientCreateHex() {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await clientCreateHex(
      'qDWh96s44G7qys26UsRmnHDtvS4Szhkune5NY9oa4kr',
      ownerWalletAddress,
      ownerSecretKey,
      'FtJ5RdwkrsLWgawAeLrPwdxgr6c4rqrbvFb6jPsxYgMF'
    );

    console.log('response', response);

    return response;
  }

  async submitHex() {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const hex =
      '015c7723be8c7cab70d4007401389ae4c8160f4de3ccf168215ceade406d0871d37a5a4817ae9ecbb52d6201754e7c5424f1467381cbc2f155d21dfc13ebad3c0701000306a3dfd31c854d054204c76a3accefabbc84a1f15a7373ffe40f902ee34f1193da79a82094498474882384aeb12a49c4a97e13a0574b8b453b64db115f4af4d859bace71ac16660f49500f2f341a61af27c2d0ad71e975d7a419850d0383b74e300306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a400000000c5a06aff4790e76dbf72687b217854daafaf235c5f4e59c2a1d17e76ec85ea306ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a99497a45494367c0f19d47decc62fedf5653a6a6b92599e541ff51e295b3dd59302030005029e130000050502040100000a0ce80300000000000001';
    const response = submitHex(hex, ownerSecretKey);
    return response;
  }
}
