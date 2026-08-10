import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('foods')
export class FoodEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @Column()
  stock!: number;

  @Column()
  status!: string;
}
