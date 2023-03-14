import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';

@Entity({ name: 'products' })
export class Products extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price', unique: false, nullable: false })
  price: number;

  @Column({ name: 'description', unique: false, nullable: false })
  description: string;

  @Column({ name: 'ticket_amount', unique: false, nullable: true })
  ticketAmount: number;
}
