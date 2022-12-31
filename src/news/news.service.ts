import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { News } from 'src/entities/news.entity';

@Injectable()
export class NewsService {
  async getNews(): Promise<News[]> {
    const res = await AppDataSource.manager.find(News);
    return res;
  }
}
