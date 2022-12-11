import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from './solana/getMetadata';
import { submitHex } from './solana/submitHex';
import { MintNftDto } from './dto/mint-nft-dto';
import { decodeBase64 } from 'src/utils/decodeBase64';
import { mintNft, uploadContents } from './solana/mintNft';
import { KeypairStr } from '@solana-suite/core';
import { uploadTestContents } from './solana/testMint';

@Injectable()
export class NftService {
  config: ConfigService;

  async getNftList(getNftListDto: GetNftListDto) {
    const ownedNftList = await getTokenInfoOwned(getNftListDto.walletAddress);
    const response = await getNftMetadata(ownedNftList);
    return response;
  }

  async submitHex(submitHexDto) {
    const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');
    console.log('hex data', submitHexDto.hex);
    const response = submitHex(submitHexDto.hex, ownerSecretKey);
    return response;
  }

  async testMint(file) {
    const url = await uploadTestContents('name', 'description', file);
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const response = await mintNft('name', url, 1, ownerWalletAddress, ownerSecretKey);

    return response;
  }

  async mint(mintNftDto: MintNftDto) {
    const imagePath = await decodeBase64(mintNftDto.image);
    const url = await uploadContents(mintNftDto.name, mintNftDto.description, imagePath);
    const ownerWalletAddress = this.config.get<KeypairStr>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<KeypairStr>('SYSTEM_WALLET_SECRET');
    const response = await mintNft(mintNftDto.name, url, mintNftDto.quantity, ownerWalletAddress, ownerSecretKey);

    return response;
  }
}
