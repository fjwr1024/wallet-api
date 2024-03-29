import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserStatus } from 'src/auth/user-status.enum';
import { News } from 'src/entities/news.entity';
import { Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PostNewsDto } from './dto/post-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles(UserStatus.Admin)
  @Get()
  async getAllNews(): Promise<News[]> {
    const res = await this.newsService.getAllNews();
    return res;
  }

  @Get('published')
  async getPublishedNews(): Promise<News[]> {
    const res = await this.newsService.getPublishedNews();
    return res;
  }

  @Get('/:id')
  async getNewsInfo(@Param('id', ParseIntPipe) id: number): Promise<News> {
    const res = await this.newsService.getNewsInfo(id);
    return res;
  }

  @Roles(UserStatus.Admin)
  @UseGuards(RolesGuard)
  @Post('post')
  async postNews(@Body() postNewsDto: PostNewsDto): Promise<string> {
    const res = await this.newsService.postNews(postNewsDto);
    console.log('res', res);
    return 'ok';
  }

  @Roles(UserStatus.Admin)
  @UseGuards(RolesGuard)
  @Patch('/update/:id')
  updateNews(@Param('id', ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto): Promise<string> {
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @Roles(UserStatus.Admin)
  @UseGuards(RolesGuard)
  @Delete('/delete/:id')
  deleteNews(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.newsService.deleteNews(id);
  }
}
