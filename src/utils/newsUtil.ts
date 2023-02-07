import { NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { News } from 'src/entities/news.entity';

export const getNewsById = async (id: number): Promise<News> => {
  const news = await AppDataSource.manager.findOneBy(News, {
    id,
  });

  if (!news) {
    throw new NotFoundException('News is not found');
  }

  return news;
};
