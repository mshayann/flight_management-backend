import { Flight } from "src/flights/flight.entity";
import { Payment } from "src/payments/payment.entity";
import { Ticket } from "src/tickets/ticket.entity";
import { User } from "src/users/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookings')
export class Booking {

    @PrimaryGeneratedColumn({name: 'booking_id'})
    bookingId: number;

    @ManyToOne(() => User, (user) => user.bookings) // ye btarha hy ke many bookings belong to one user
    @JoinColumn({name: 'user_id' }) //ye btarha hy ke bookings table me user_id FK hogi.
    user : User;

    @ManyToOne(() => Flight, (flight) => flight.bookings )
    @JoinColumn({name: 'flight_id'})
    flight : Flight;

    // one booking belong to one payment
    @OneToOne(() => Payment, (payment) => payment.booking)
    payment : Payment;

    // one booking belongs to multiple ticket
    @OneToMany(() => Ticket, (ticket) => ticket.booking)
    tickets : Ticket[];
}