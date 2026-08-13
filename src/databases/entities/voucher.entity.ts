import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookingEntity } from './booking.entity';

@Entity('vouchers')
export class VoucherEntity extends BaseEntity {
  @ManyToOne(() => BookingEntity, (booking) => booking.voucher)
  bookings!: BookingEntity[];

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
