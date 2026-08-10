import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('banners')
export class BannerEntity extends BaseEntity {
  @Column()
  sortOrder!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  link!: string;

  @Column()
  status!: string;
}
