import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { News } from 'src/entities/news.entity';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews(): Promise<News[]> {
    const res = await this.newsService.getNews();
    return res;
  }

  @Get('/:id')
  async getNewsInfo(@Param('id', ParseIntPipe) id: number): Promise<News> {
    const res = await this.newsService.getNewsInfo(id);
    return res;
  }

  @Post()
  async postNews(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const res = await this.newsService.getNewsInfo(id);
    return { message: 'ok' };
  }
}
