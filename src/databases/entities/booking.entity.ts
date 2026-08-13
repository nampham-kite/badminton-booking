import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CourtEntity } from './court.entity';
import { VoucherEntity } from './voucher.entity';
import { BaseEntity } from './base.entity';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
  @ManyToOne(() => CourtEntity, (court) => court.bookings)
  court!: CourtEntity;
  @Column()
  start!: number;
  @Column()
  end!: number;
  @Column()
  orderDate!: Date;
  @Column()
  name!: string;
  @Column()
  phoneNumber!: string;
  @Column()
  note!: string;

  @OneToMany(() => VoucherEntity, (voucher) => voucher.bookings)
  voucher!: VoucherEntity;
  @Column()
  totalPrice!: number;
}
