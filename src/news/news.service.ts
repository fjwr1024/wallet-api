import { UpdateNewsDto } from './dto/update-news.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsService {
  async getAllNews(): Promise<News[]> {
    const res = await AppDataSource.manager.find(News);
    return res;
  }

  async getPublishedNews(): Promise<News[]> {
    const res = await AppDataSource.manager.find(News);
    console.log('res', res);
    const isPublishedNews = res.filter(item => {
      if (item.isPublished === true) return true;
    });

    return isPublishedNews;
  }

  async getNewsInfo(id: number): Promise<News> {
    const res = await AppDataSource.manager.findOneBy(News, {
      id,
    });

    if (!res) {
      throw new NotFoundException('This News ID is not found');
    }
    return res;
  }

  async postNews(postNewsDto): Promise<string> {
    const news = new News();
    news.title = postNewsDto.title;
    news.body = postNewsDto.body;

    AppDataSource.manager.insert(News, news);
    return 'ok';
  }

  async updateNews(id, updateNewsDto): Promise<string> {
    const news = await AppDataSource.manager.findOneBy(News, {
      id,
    });

    if (!news) {
      throw new NotFoundException('News is not found');
    }

    await AppDataSource.manager.update(News, id, {
      title: updateNewsDto.title,
      body: updateNewsDto.body,
      isPublished: updateNewsDto.isPublished,
    });

    return 'ok';
  }

  async deleteNews(id): Promise<string> {
    const news = await AppDataSource.manager.delete(News, {
      id,
    });

    if (!news) {
      throw new NotFoundException('News is not found');
    }

    return 'ok';
  }
}
