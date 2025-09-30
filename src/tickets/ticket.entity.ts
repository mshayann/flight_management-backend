import { Booking } from 'src/bookings/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column()
  issuedAt: Date;

  //multiple tickets belong to one booking
    //deleting the booking will also delete the ticket
  @ManyToOne(() => Booking, (booking) => booking.tickets, {
    onDelete: 'CASCADE',    //the side that holds the FK gets the onDelete.
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
