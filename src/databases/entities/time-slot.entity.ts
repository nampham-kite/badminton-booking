import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourtEntity } from './court.entity';
@Entity('time_slots')
export class TimeSlotEntity extends BaseEntity {
  @Column()
  start!: number;

  @Column()
  end!: number;

  @Column()
  price!: number;

  @ManyToOne(() => CourtEntity, (court) => court.timeSlots)
  court!: CourtEntity;
}
