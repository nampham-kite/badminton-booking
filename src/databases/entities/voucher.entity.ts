import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('vouchers')
export class VoucherEntity extends BaseEntity {
  @Column({ unique: true })
  code!: string;

  @Column()
  type!: string;

  @Column()
  value!: number;

  @Column({ default: 0 })
  minOrderAmount!: number;

  @Column({ default: 0 })
  usedCount!: number;

  @Column()
  maxUsage!: number;

  @Column({ type: 'timestamptz' })
  startDate!: Date;

  @Column({ type: 'timestamptz' })
  endDate!: Date;

  @Column()
  status!: string;
}
