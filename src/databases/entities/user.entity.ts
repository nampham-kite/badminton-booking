import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;
  @Column()
  name!: string;
  @Column()
  passwordHash!: string;
}
