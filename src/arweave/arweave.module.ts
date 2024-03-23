import { Module } from '@nestjs/common';
import { ArweaveService } from './arweave.service';
import { ArweaveController } from './arweave.controller';

@Module({
  providers: [ArweaveService],
  controllers: [ArweaveController]
})
export class ArweaveModule {}
