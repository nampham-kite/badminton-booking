import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TimeSlotEntity } from './time-slot.entity';

@Entity('courts')
export class CourtEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  courtCode!: string;

  @Column({})
  status!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ nullable: true })
  description!: string;
  @Column({ type: 'float' })
  width!: number;
  @Column({ type: 'float' })
  height!: number;
  @Column()
  peopleCapacity!: number;
  @Column()
  surface!: string;
  @Column({ type: 'float' })
  roofHeight!: number;
  @Column()
  isIndoor!: boolean;
  @Column()
  hasConditioning!: boolean;
  @Column()
  hasFans!: boolean;
  @Column()
  isActive!: boolean;
  @Column()
  isMaintenance!: boolean;
  @Column()
  openingHours!: string;
  @Column()
  endingHours!: string;
  @Column({ nullable: true })
  reasonForMaintenance!: string;
  @OneToMany(() => TimeSlotEntity, (timeSlot) => timeSlot.court)
  timeSlots!: TimeSlotEntity[]; // Assuming timeSlots is an array of TimeSlotEntity
}
