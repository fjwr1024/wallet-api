import { transferNft } from './../solana/nft/transferNft';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { MintAdminNftDto } from './dto/mint-admin-nft-dto';
import { MintUserNftDto } from './dto/mint-user-nft-dto';
import { SubmitHexDto } from './dto/submit-hex-dto';
import { NftService } from './nft.service';
import { MintAttributeDto } from './dto/mint-attribute-nft-dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @HttpCode(HttpStatus.OK)
  @Post('get-list')
  async getNftList(@Body(new ValidationPipe()) getNftListDto: GetNftListDto) {
    const response = await this.nftService.getNftList(getNftListDto);
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('submit-hex')
  async getHex(@Body(new ValidationPipe()) submitHexDto: SubmitHexDto) {
    const response = await this.nftService.submitHex(submitHexDto);
    return response;
  }

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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async mintNftAttribute(
    @Body(new ValidationPipe()) attributeMintDto: MintAttributeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('file', file);
    const response = await this.nftService.attributeMint(attributeMintDto, file);
    return response;
  }

  @Post('transfer-nft')
  async transferNft(@Body(new ValidationPipe()) getNftListDto: GetNftListDto) {
    const response = await this.nftService.transferNft(
      'FjxVcnqwLzX6u4Hk5CvAMnKgLgy3ikfLyuYQ6zWMb5Zu',
      getNftListDto.walletAddress
    );
    return response;
  }
}
