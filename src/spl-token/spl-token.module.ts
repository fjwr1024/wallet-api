import { Module } from '@nestjs/common';
import { SplTokenController } from './spl-token.controller';
import { SplTokenService } from './spl-token.service';

@Module({
  providers: [SplTokenService],
  controllers: [SplTokenController],
  exports: [SplTokenService],
})
export class SplTokenModule {}
