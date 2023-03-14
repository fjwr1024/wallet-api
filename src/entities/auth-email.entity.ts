import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';

@Entity({ name: 'auth_email' })
export class AuthEmail extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'email', unique: false, nullable: false })
  email: string;

  @Column({ name: 'sent_code', unique: false, nullable: false })
  sentCode: number;

  @CreateDateColumn({
    name: 'sent_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  sentAt: boolean;

  @Column({ name: 'limit_time', type: 'timestamp', nullable: true })
  limitTime: Date;
}
