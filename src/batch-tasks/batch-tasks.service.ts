import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { compressMint } from 'src/solana/compress-nft/compressMint';
import { createCollection } from 'src/solana/compress-nft/createCollection';
import { createSpace } from 'src/solana/compress-nft/createSpace';
import { deleteUploadFile } from 'src/utils/file-util/deleteUploadFile';
import { downloadBinary, saveFileToTemporary } from 'src/utils/file-util/s3';

@Injectable()
export class BatchTasksService {
  constructor(private readonly config: ConfigService) {}

  // X分ごとに実行
  // @Cron('*/2 * * * *')
  // 毎日3時に実行
  //   @Cron('0 3 * * *')
  async handleCron() {
    try {
      const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

      const imageBuffer = await downloadBinary('test-image.png');
      const S3Image = saveFileToTemporary(imageBuffer, 'test.png');

      const compressMintRes = await compressMint(
        ownerSecretKey,
        S3Image,
        // treeowner
        'V1JrYKdE4w5mNqq6kyyHk3JA2zU4ATQWMzYE5RWsk4K',
        // mintCollection
        '8LHr5dx49ypiTCN4rEKX9VpMn3jzwTdxYZJYnBG8r8Rv',
        // nft reciever
        '2X2u2DUYVNpGw2VxAWoB3Jh2biwicPkfGox8q7BaqHNi'
      );

      console.log('compressMintRes', compressMintRes);
    } catch (error) {
      console.error('Error in compressMint: ' + error);
      throw new InternalServerErrorException('Mint failed');
    }

    const tokenTransferBatch = () => {
      console.log('tokenTransferBatch');
    };
  }
}
