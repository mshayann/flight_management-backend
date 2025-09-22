import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Booking } from 'src/bookings/booking.entity';

export enum UserRole {
  ADMIN = 'admin',
  PASSENGER = 'passenger',
}


//entity is just a blueprint of the table in our DB.
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

  @OneToMany(() => Booking, (booking) => booking.user ) // ye btarha hy one user has many bookings.
  bookings: Booking[];
}
