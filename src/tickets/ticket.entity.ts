import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tickets')
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketId : number;

    

    @Column()
    issuedAt : Date;

    //multiple tickets belong to one booking
    @ManyToOne(() => Booking, (booking) => booking.tickets)
    @JoinColumn({name : 'booking_id'})
    booking : Booking;
}