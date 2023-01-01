import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { News } from 'src/entities/news.entity';
import { PostNewsDto } from './dto/post-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
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

  @HttpCode(HttpStatus.OK)
  @Post()
  async postNews(@Body() postNewsDto: PostNewsDto): Promise<string> {
    const res = await this.newsService.postNews(postNewsDto);
    console.log('res', res);
    return 'ok';
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update-news/:id')
  updateNews(@Param('id', ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto): Promise<string> {
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete-news/:id')
  deleteNews(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.newsService.deleteNews(id);
  }
}
