import { Controller, Get } from '@nestjs/common';
import { News } from 'src/entities/news.entity';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // react admin get list用apiK
  @Get()
  async getNews(): Promise<News[]> {
    const res = await this.newsService.getNews();
    return res;
  }
}
