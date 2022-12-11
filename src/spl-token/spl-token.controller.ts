import { SubmitHexDto } from './dto/tramsfer-hex-dto';
import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

import { SplTokenService } from './spl-token.service';
import { SplTokenOwnerInfo, TransferHistory } from '@solana-suite/core';
import { CreateSplTokenDto } from './dto/create-spl-token';

@Controller('spl-token')
export class SplTokenController {
  constructor(private readonly splTokenService: SplTokenService) {}

  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('get-token-amount')
  async getTokenAmount(@Body() getTokenAmountDto: GetTokenAmountDto): Promise<SplTokenOwnerInfo[]> {
    const userTokenAmount = await this.splTokenService.getTokenAmount(getTokenAmountDto);
    return userTokenAmount;
  }

  @HttpCode(HttpStatus.OK)
  @Post('history')
  async getSplHistory(@Body() getSplHistoryDto: GetSplHistoryDto): Promise<TransferHistory[]> {
    const userSplHistory = await this.splTokenService.getSplHistory(getSplHistoryDto);
    return userSplHistory;
  }

  @HttpCode(HttpStatus.OK)
  @Post('submit-hex')
  async getHex(@Body(new ValidationPipe()) submitrHexDto: SubmitHexDto) {
    const response = await this.splTokenService.submitHex(submitrHexDto);
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('create-spl-token')
  async createSpl(@Body(new ValidationPipe()) createSplTokenDto: CreateSplTokenDto) {
    const response = await this.splTokenService.createSpl(createSplTokenDto);
    return response;
  }
}
