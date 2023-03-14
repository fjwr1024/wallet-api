import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';

@Entity({ name: 'user_tmp' })
export class UserTmp extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'email', unique: false, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;
}
