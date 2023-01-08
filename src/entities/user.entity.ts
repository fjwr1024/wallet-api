import { Exclude } from 'class-transformer';
import { UserStatus } from '../auth/user-status.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  role: UserStatus;

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
}
