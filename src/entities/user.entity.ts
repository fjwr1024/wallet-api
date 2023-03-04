import { Exclude } from 'class-transformer';
import { UserStatus } from '../auth/user-status.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column({ name: 'age', nullable: true })
  age: number;

  @Column({ name: 'profile_text', nullable: true })
  profileText: string;

  @Column({ name: 'tickets', unique: false, nullable: true, default: 0 })
  tickets: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.User,
  })
  role: UserStatus;

  @Column({ name: 'stripe_customer_id', unique: true, nullable: true })
  stripeCustomerId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;

  @OneToMany(() => Orders, order => order.user, {
    cascade: true,
  })
  orders: Orders[];
}
