import { SubmitHexDto } from './dto/tramsfer-hex-dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GetSplHistoryDto } from './dto/get-spl-history.dto';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

import { SplTokenService } from './spl-token.service';
import { SplTokenOwnerInfo } from '@solana-suite/core';

@Controller('spl-token')
export class SplTokenController {
  constructor(private readonly splTokenService: SplTokenService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('get-token-amount')
  async getTokenAmount(@Body() getTokenAmountDto: GetTokenAmountDto): Promise<SplTokenOwnerInfo[]> {
    const userTokenAmount = await this.splTokenService.getTokenAmount(getTokenAmountDto);
    return userTokenAmount;
  }

  @Post('spl-history')
  async getSplHistory(@Body() getSplHistoryDto: GetSplHistoryDto): Promise<void> {
    const userSplHistory = await this.splTokenService.getSplHistory(getSplHistoryDto);
    return userSplHistory;
  }

  @Post('submit-hex')
  async getHex(@Body(new ValidationPipe()) submitrHexDto: SubmitHexDto) {
    const response = await this.splTokenService.submitHex(submitrHexDto);
    return response;
  }
}
