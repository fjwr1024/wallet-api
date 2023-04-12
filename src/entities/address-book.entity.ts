import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseDate } from './date-column.entity';

@Entity()
export class AddressBook extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column()
  addressName: string;

  @ManyToOne(() => User, user => user.addressBookEntries)
  user: User;
}
