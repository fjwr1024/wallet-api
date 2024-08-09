import { SubmitHexDto } from './dto/tramsfer-hex-dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

import { SplTokenService } from './spl-token.service';
import { CreateSplTokenDto } from './dto/create-spl-token.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateMemoDto } from './dto/create-memo.dto';
import { Response } from 'express';

@Controller('spl-token')
export class SplTokenController {
  constructor(private readonly splTokenService: SplTokenService) {}

  @HttpCode(HttpStatus.OK)
  @Post('get-token-amount')
  async getTokenAmount(@Body() getTokenAmountDto: GetTokenAmountDto): Promise<any> {
    const userTokenAmount = await this.splTokenService.getTokenAmount(getTokenAmountDto);
    return userTokenAmount;
  }

  @HttpCode(HttpStatus.OK)
  @Post('history')
  async getSplHistory(@Body() getSplHistoryDto: GetSplHistoryDto): Promise<any> {
    const userSplHistory = await this.splTokenService.getSplHistory(getSplHistoryDto);
    return userSplHistory;
  }

  // TODO: update後修正
  // @HttpCode(HttpStatus.OK)
  // @Post('submit-hex')
  // async getHex(@Body(new ValidationPipe()) submitrHexDto: SubmitHexDto) {
  //   const response = await this.splTokenService.submitHex(submitrHexDto);
  //   return response;
  // }

  @Post('create-spl-token')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async createSpl(
    @Body(new ValidationPipe()) createSplDto: CreateSplTokenDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    console.log('CreateSplTokenDto:', createSplDto);
    const response = await this.splTokenService.createSpl(createSplDto, file);

    console.log('Response:', response);

    res.send(response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('comment')
  async commentSplToken(@Body(new ValidationPipe()) createMemoDto: CreateMemoDto) {
    const response = await this.splTokenService.createComment(createMemoDto);
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Get('transfer')
  async transferSpl() {
    const response = await this.splTokenService.transferSplToken();
    return response;
  }
}
