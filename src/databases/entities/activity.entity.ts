import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('activities')
export class ActivityEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'timestamptz' })
  startDate!: Date;

  @Column({ type: 'timestamptz' })
  endDate!: Date;

  @Column()
  status!: string;
}
