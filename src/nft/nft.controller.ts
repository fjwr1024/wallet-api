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
import { imageFileFilter } from 'src/utils/file-upload-util';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { MintNftDto } from './dto/mint-nft-dto';
import { SubmitHexDto } from './dto/submit-hex-dto';
import { NftService } from './nft.service';

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

  @HttpCode(HttpStatus.OK)
  @Post('test-mint')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async testCreateNft(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const response = await this.nftService.testMint(file);
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('mint')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createNft(@Body(new ValidationPipe()) mintNftDto: MintNftDto, @UploadedFile() file: Express.Multer.File) {
    const response = await this.nftService.mint(mintNftDto, file);
    return response;
  }
}
