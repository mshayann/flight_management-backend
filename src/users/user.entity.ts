import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  PASSENGER = 'passenger',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PASSENGER, // default role for signup users
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
