import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Orders extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'amount', unique: false, nullable: false })
  amount: number;

  @Column({ name: 'user_id' })
  userId?: string;

  @Column({ name: 'charge_id' })
  chargeId?: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
