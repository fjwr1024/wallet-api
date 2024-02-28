import { CompressedNft } from '@solana-suite/compressed-nft';
import { spaceCost } from '../solana/compress-nft/caluculateSpaceCost';
import { compressMint } from '../solana/compress-nft/compressMint';
import { createSpace } from '../solana/compress-nft/createSpace';
import { burnNft } from './../solana/nft/burnNft';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getCompressTokenList, getOwnedTokenInfo } from '../solana/nft/getMetadata';
import { MintAdminNftDto } from './dto/mint-admin-nft-dto';
import { mintNft } from '../solana/nft/mintNft';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { MintUserNftDto } from './dto/mint-user-nft-dto';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';
import { MintAttributeDto } from './dto/mint-attribute-nft-dto';
import { attributeMint } from 'src/solana/nft/attributeMint';
import { transferNft } from 'src/solana/nft/transferNft';
import { createCollection } from 'src/solana/compress-nft/createCollection';
import { MintCnftDto } from './dto/mint-cnft-dto';

@Injectable()
export class NftService {
  constructor(private readonly config: ConfigService) {}

  async getNftList(getNftListDto: GetNftListDto) {
    const res = await getCompressTokenList(getNftListDto.walletAddress);
    console.log('res', res);
    return res;
  }

  // async submitHex(submitHexDto) {
  //   const ownerSecretKey = this.config.get<string>('OWNER_SECRET_KEY');
  //   console.log('hex data', submitHexDto.hex);
  //   const res = submitHex(submitHexDto.hex, ownerSecretKey);
  //   return res;
  // }

  async testMint(file) {
    // const url = await uploadTestContents('name', 'description', file);
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await mintNft('name', file.path, 1, 'description', ownerSecretKey);
    deleteUploadFile(file.path);

    return res;
  }

  async mint(mintNftDto: MintAdminNftDto, file) {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await mintNft(mintNftDto.name, file.path, mintNftDto.quantity, mintNftDto.description, ownerSecretKey);
    deleteUploadFile(file.path);

    return res;
  }

  async attributeMint(attributeMintDto: MintAttributeDto, image, video?) {
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

    console.log('file', image);
    console.log('file', video);

    const res = await attributeMint(
      image.path,
      attributeMintDto.name,
      attributeMintDto.description,
      ownerSecretKey,
      attributes,
      video
    );
    deleteUploadFile(image.path);

    return res;
  }

  async transferNft(mint, receiptWalletAddress) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await transferNft(mint, ownerWalletAddress, receiptWalletAddress, ownerSecretKey);
    return res;
  }

  async burnNft() {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await burnNft('6YKFb8RLtMfhfLLnBJHD4JBA6oE8Aj2QrurwvNg538GV', ownerWalletAddress, ownerSecretKey);
    return res;
  }

  async mintCompressNft(attributeMintDto: MintAttributeDto, file) {
    const ownerWalletAddress = this.config.get<string>('SYSTEM_WALLET_ADDRESS');
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const createSpaceRes = await createSpace(ownerSecretKey, 8);
    console.log('createSpaceRes', createSpaceRes);

    const createCollectionRes = await createCollection(ownerSecretKey, file.path);
    console.log('createCollectionRes', createCollectionRes);

    const compressMintRes = await compressMint(
      ownerSecretKey,
      file.path,
      createSpaceRes,
      createCollectionRes,
      '2X2u2DUYVNpGw2VxAWoB3Jh2biwicPkfGox8q7BaqHNi'
    );

    deleteUploadFile(file.path);

    console.log('compressMintRes', compressMintRes);

    return compressMintRes;
  }

  async createSpace(abountMintTotal: number) {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const createSpaceRes = await createSpace(ownerSecretKey, abountMintTotal);
    console.log('createSpaceRes', createSpaceRes);
    return createSpaceRes;
  }

  async createCollection(file) {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const createCollectionRes = await createCollection(ownerSecretKey, file.path);
    console.log('createCollectionRes', createCollectionRes);

    return createCollectionRes;
  }

  async compressedNft(mintCnftDto: MintCnftDto, file) {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');
    const res = await compressMint(ownerSecretKey, file.path, mintCnftDto.treeOwner, mintCnftDto.mintCollection);
    return res;
  }

  async getSpaceCost(spaceNumber: number) {
    const spaceCostRes = await spaceCost(spaceNumber);
    return spaceCostRes;
  }
}
