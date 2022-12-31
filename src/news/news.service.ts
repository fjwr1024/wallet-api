import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsService {
  async getNews(): Promise<News[]> {
    const res = await AppDataSource.manager.find(News);
    return res;
  }

  public async getNewsInfo(id): Promise<News> {
    const res = await AppDataSource.manager.findOneBy(News, {
      id,
    });

    if (!res) {
      throw new NotFoundException('This id News is not found');
    }
    return res;
  }
}
