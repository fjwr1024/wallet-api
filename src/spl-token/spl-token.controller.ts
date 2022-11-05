import { Body, Controller, Post } from '@nestjs/common';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

import { SplTokenService } from './spl-token.service';

@Controller('spl-token')
export class SplTokenController {
  constructor(private readonly splTokenService: SplTokenService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('get-token-amount')
  // TODO: any修正
  async getTokenAmount(@Body() getTokenAmountDto: GetTokenAmountDto): Promise<any> {
    const userTokenAmount = await this.splTokenService.getTokenAmount(getTokenAmountDto);
    return userTokenAmount;
  }
}
