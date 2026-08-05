import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('devices')
export class DeviceEntity extends BaseEntity {
  @Column({ unique: true })
  sku!: string;
  @Column()
  name!: string;
  @Column()
  category!: string;
  @Column()
  stock!: number;
  @Column()
  price!: number;
  @Column()
  status!: string;
}
