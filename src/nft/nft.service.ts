import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from './solana/getMetadata';
import { submitHex } from './solana/submitHex';
import { filterOwnToken } from '../utils/filterOwnToken';

@Injectable()
export class NftService {
  config: ConfigService;

  async getNftList(getNftListDto: GetNftListDto) {
    const ownedNftList = await getTokenInfoOwned(getNftListDto.walletAddress);
    const filteredOwnToken = await filterOwnToken(ownedNftList);
    const response = await getNftMetadata(filteredOwnToken);
    return response;
  }

  async submitHex(submitHexDto) {
    const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');
    console.log('hex data', submitHexDto.hex);
    const response = submitHex(submitHexDto.hex, ownerSecretKey);
    return response;
  }
}
