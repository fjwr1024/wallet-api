import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'auth_email' })
export class AuthEmail {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'email', unique: false, nullable: false })
  email: string;

  @Column({ name: 'sent_code', unique: false, nullable: false })
  sentCode: number;

  @Column({ name: 'sent_at', default: true })
  sentAt: boolean;

  @Column({ name: 'limit_time', type: 'timestamp', nullable: true })
  limitTime: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
