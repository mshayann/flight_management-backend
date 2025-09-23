import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

@Entity('payments')
export class Payment {

    @PrimaryGeneratedColumn({name: 'payment_id'})
    paymentId : number;

    @Column()
    amount : number;

    @Column({name: 'payment_method'})
    paymentMethod : string;

    @Column()
    createdAt : Date;

    

    @OneToOne(() => Booking, (booking) => booking.payment)
    @JoinColumn({name : 'booking_id'})
    booking : Booking;

}