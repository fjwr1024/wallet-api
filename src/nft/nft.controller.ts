import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { TransferHexDto } from './dto/tramsfer-hex-dto';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('get-list')
  async getNftList(@Body(new ValidationPipe()) getNftListDto: GetNftListDto) {
    const response = await this.nftService.getNftList(getNftListDto);
    return response;
  }

  @Post('transfer-hex')
  async getHex(@Body(new ValidationPipe()) transferHexDto: TransferHexDto) {
    const response = await this.nftService.getHex(transferHexDto);
    return response;
  }
}
