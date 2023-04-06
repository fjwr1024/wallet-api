import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseDate } from './date-column.entity';
import { Nft } from './nft.entity';

@Entity({ name: 'metadata' })
export class Metadata extends BaseDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'symbol', unique: false, nullable: false })
  symbol: string;

  @Column({ name: 'description', unique: false, nullable: false })
  description: string;

  @Column({ name: 'image', unique: false, nullable: false })
  image: string;

  @Column({ name: 'seller_fee_basis_points', unique: false, nullable: false })
  sellerFeeBasisPoints: number;

  @Column({ name: 'mint', unique: true, nullable: false })
  mint: string;

  @OneToOne(() => Nft, nft => nft.mint)
  nft: Nft;
}
