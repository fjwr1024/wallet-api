import { spaceCost } from '../solana/compress-nft/caluculateSpaceCost';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { MintAdminNftDto } from './dto/mint-admin-nft-dto';
import { MintUserNftDto } from './dto/mint-user-nft-dto';
import { SubmitHexDto } from './dto/submit-hex-dto';
import { NftService } from './nft.service';
import { MintAttributeDto } from './dto/mint-attribute-nft-dto';
import { TransferNftDto } from './dto/transfer-nft-dto';
import { SpaceCostDto } from './dto/space-cost.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { MintCnftDto } from './dto/mint-cnft-dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @HttpCode(HttpStatus.OK)
  @Post('get-list')
  async getNftList(@Body(new ValidationPipe()) getNftListDto: GetNftListDto) {
    const response = await this.nftService.getNftList(getNftListDto);
    return response;
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('submit-hex')
  // async getHex(@Body(new ValidationPipe()) submitHexDto: SubmitHexDto) {
  //   const response = await this.nftService.submitHex(submitHexDto);
  //   return response;
  // }

  @Post('test-mint')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async testCreateNft(@UploadedFile() file: Express.Multer.File) {
    const response = await this.nftService.testMint(file);
    return response;
  }

  @Post('admin-mint')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createNftByAdmin(
    @Body(new ValidationPipe()) mintNftDto: MintAdminNftDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.nftService.mint(mintNftDto, file);
    return response;
  }

  @Post('attribute-mint')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
        }),
      }
    )
  )
  async mintNftAttribute(
    @Body(new ValidationPipe()) attributeMintDto: MintAttributeDto,
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] }
  ) {
    console.log('file', files);
    const image = files.image ? files.image[0] : null;
    const video = files.video ? files.video[0] : null;
    const response = await this.nftService.attributeMint(attributeMintDto, image, video);
    // const response = await this.nftService.getImageFromS3();
    return response;
  }

  @Post('transfer-nft')
  async transferNft(@Body(new ValidationPipe()) transferNftDto: TransferNftDto) {
    const response = await this.nftService.transferNft(transferNftDto.mintId, transferNftDto.walletAddress);
    return response;
  }

  @Get('burn-nft')
  async burnNft() {
    const response = await this.nftService.burnNft();
    return response;
  }

  @Post('mint-cnft')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createCompressNft(
    @Body(new ValidationPipe()) attributeMintDto: MintAttributeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.nftService.mintCompressNft(attributeMintDto, file);
    return response;
  }

  @Post('create-space')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createSpace(@Body(new ValidationPipe()) createSpaceDto: CreateSpaceDto) {
    const response = await this.nftService.createSpace(createSpaceDto.aboutMintTotal);
    return response;
  }

  @Post('create-collection')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createCollection(
    @Body(new ValidationPipe()) attributeMintDto: MintAttributeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.nftService.createCollection(file);
    return response;
  }

  @Post('mint-specific-cnft')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createCompressNftSpecificOwner(
    @Body(new ValidationPipe()) mintCnftDto: MintCnftDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.nftService.compressedNft(mintCnftDto, file);
    return response;
  }

  @Post('space-cost')
  async spaceCost(@Body(new ValidationPipe()) spaceCostDto: SpaceCostDto) {
    const response = await this.nftService.getSpaceCost(spaceCostDto.spaceCost);
    return response;
  }
}
