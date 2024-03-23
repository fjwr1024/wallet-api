import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArweaveService } from './arweave.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('arweave')
export class ArweaveController {
  constructor(private readonly arweaveService: ArweaveService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    })
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const response = await this.arweaveService.upload(file);
    return response;
  }
}
