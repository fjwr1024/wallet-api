import { Exclude } from 'class-transformer';
import { UserStatus } from '../auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { BaseDate } from './date-column.entity';
import { AddressBook } from './address-book.entity';

@Entity({ name: 'users' })
export class User extends BaseDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ name: 'wallet_address', nullable: true })
  walletAddress: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.User,
  })
  role: UserStatus;

  @Column({ name: 'stripe_customer_id', unique: true, nullable: true })
  stripeCustomerId: string;

  @Column({ name: 'block_flag', default: false })
  blockFlag: boolean;

  @OneToMany(() => Orders, order => order.user, {
    cascade: true,
  })
  orders: Orders[];

  @OneToMany(() => AddressBook, addressBook => addressBook.user)
  addressBook: AddressBook[];
}
