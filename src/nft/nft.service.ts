import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from './solana/getMetadata';
import { submitHex } from './solana/submitHex';
import { filterOwnToken } from '../utils/filterOwnToken';
import { MintNftDto } from './dto/mint-nft-dto';

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

  // NFT生成機能
  async mint(mintNftDto: MintNftDto) {
    const imagePath = await decodeBase64(mintNftDto.image);

    const url = await uploadContents(mintNftDto.name, mintNftDto.description, imagePath);

    const ownerWalletAddress = this.config.get<string>('OWNER_WALLET_ADDRESS');

    const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');

    const response = await createNft(mintNftDto.name, url, mintNftDto.quantity, ownerWalletAddress, ownerSecretKey);

    // TODO: uploadsにあげられたファイルの削除 やらなくても問題はない

    return response;
  }
}
