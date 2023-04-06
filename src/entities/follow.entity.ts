import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseDate } from './date-column.entity';
import { User } from './user.entity';

@Entity()
export class Follow extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.followers)
  follower: User;

  @ManyToOne(() => User, user => user.followings)
  followed: User;
}
