import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsService {
  async getNews(): Promise<News[]> {
    const res = await AppDataSource.manager.find(News);
    return res;
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

  async postNews(): Promise<object> {
    const news = new News();

    AppDataSource.manager.insert(News, news);
    return { message: 'ok' };
  }
}
