import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { upload } from 'src/solana/arweave/upload';

@Injectable()
export class ArweaveService {
  constructor(private readonly config: ConfigService) {}

  async upload(file) {
    const ownerSecretKey = this.config.get<string>('SYSTEM_WALLET_SECRET');

    const res = await upload(file.path, ownerSecretKey);
    console.log('upload res', res);
    return res;
  }
}
