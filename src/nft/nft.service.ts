import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from './solana/getMetadata';
import { submitHex } from './solana/submitHex';
import { filterOwnToken } from '../utils/filterOwnToken';

@Injectable()
export class NftService {
  configService: ConfigService;
  // 指定したウォレットアドレスの所有NFTを取得
  async getNftList(getNftListDto: GetNftListDto) {
    const ownedNftList = await getTokenInfoOwned(getNftListDto.walletAddress);
    const filteredOwnToken = await filterOwnToken(ownedNftList);
    const response = await getNftMetadata(filteredOwnToken);
    return response;
  }

  // hex取得
  async getHex(transferHexDto) {
    const ownerSecretKey = this.configService.get<string>('OWNER_SECRET_KEY');
    console.log('hex data', transferHexDto.hex);
    const response = submitHex(transferHexDto.hex, ownerSecretKey);
    return response;
  }
}
