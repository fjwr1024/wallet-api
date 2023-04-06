import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BaseDate } from './date-column.entity';
import { Metadata } from './metadata.entity';

@Entity({ name: 'NFT' })
export class Nft extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @Column({ name: 'mint', unique: true, nullable: false })
  mint: string;

  @Column({ name: 'uri', unique: true, nullable: false })
  uri: string;

  @Column({ name: 'update_authority', unique: false, nullable: false })
  updateAuthority: string;

  @Column({ name: 'royalty', unique: false, nullable: false })
  royalty: number;

  @Column({ name: 'edition_nonce', unique: false, nullable: false })
  editionNonce: number;

  @Column({ name: 'primary_sale_happened', unique: false, nullable: false })
  primarySaleHappened: boolean;

  @Column({ name: 'uses', unique: false, nullable: true })
  uses: boolean;

  @Column({ name: 'isMutable', unique: false, nullable: true })
  isMutable: boolean;

  @OneToOne(() => Metadata, metadata => metadata.mint)
  @JoinColumn()
  metadata: Metadata;
}
