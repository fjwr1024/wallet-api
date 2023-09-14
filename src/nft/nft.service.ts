import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getOwnedTokenInfo } from '../solana/nft/getMetadata';
import { submitHex } from '../solana/nft/submitHex';
import { MintAdminNftDto } from './dto/mint-admin-nft-dto';
import { mintNft } from '../solana/nft/mintNft';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { MintUserNftDto } from './dto/mint-user-nft-dto';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';
import { MintAttributeDto } from './dto/mint-attribute-nft-dto';
import { attributeMint } from 'src/solana/nft/attributeMint';
import { transferNft } from 'src/solana/nft/transferNft';
import { Metaplex } from '@solana-suite/nft';

@Injectable()
export class NftService {
  constructor(private readonly config: ConfigService) {}

  async getNftList(getNftListDto: GetNftListDto) {
    const res = await getOwnedTokenInfo(getNftListDto.walletAddress);
    console.log('res', res);
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

  async attributeMint(attributeMintDto: MintAttributeDto, file) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const attributes = [
      {
        trait_type: 'hair',
        value: 'brown',
      },
      {
        trait_type: 'eye',
        value: 'blue',
      },
    ];

    console.log('file', file);

    const res = await attributeMint(
      file.path,
      attributeMintDto.name,
      attributeMintDto.description,
      ownerWalletAddress,
      ownerSecretKey,
      attributes
    );
    deleteUploadFile(file.path);

    return res;
  }

  async transferNft(mint, receiptWalletAddress) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await transferNft(mint, ownerWalletAddress, receiptWalletAddress, ownerSecretKey);
    return res;
  }
}
