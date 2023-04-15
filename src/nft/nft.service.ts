import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from '../solana/nft/getMetadata';
import { submitHex } from '../solana/nft/submitHex';
import { MintAdminNftDto } from './dto/mint-admin-nft-dto';
import { mintNft } from '../solana/nft/mintNft';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { MintUserNftDto } from './dto/mint-user-nft-dto';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';

@Injectable()
export class NftService {
  constructor(private readonly config: ConfigService) {}

  async getNftList(getNftListDto: GetNftListDto) {
    const ownedNftList = await getTokenInfoOwned(getNftListDto.walletAddress);
    const res = await getNftMetadata(ownedNftList);
    return res;
  }

  async submitHex(submitHexDto) {
    const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');
    console.log('hex data', submitHexDto.hex);
    const res = submitHex(submitHexDto.hex, ownerSecretKey);
    return res;
  }

  async testMint(file) {
    // const url = await uploadTestContents('name', 'description', file);
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await mintNft('name', file.path, 1, 'description', ownerWalletAddress, ownerSecretKey);
    deleteUploadFile(file.path);

    return res;
  }

  async mint(mintNftDto: MintAdminNftDto, file) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await mintNft(
      mintNftDto.name,
      file.path,
      mintNftDto.quantity,
      mintNftDto.description,
      ownerWalletAddress,
      ownerSecretKey
    );
    deleteUploadFile(file.path);

    return res;
  }
}
