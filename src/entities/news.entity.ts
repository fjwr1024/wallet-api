import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';

@Entity({ name: 'news' })
export class News extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'title', unique: false, nullable: false })
  title: string;

  @Column({ name: 'body', unique: false, nullable: false })
  body: string;

  @Column({ name: 'is_published', default: true })
  isPublished: boolean;
}
