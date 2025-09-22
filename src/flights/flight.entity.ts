import { Airplane } from 'src/airplanes/airplane.entity';
import { Airport } from 'src/airports/airport.entity';
import { Booking } from 'src/bookings/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum FlightStatus {
  SCHEDULED = 'scheduled',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn({ name: 'flight_id' })
  flightId: number;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column({
    type: 'enum',
    enum: FlightStatus,
    default: FlightStatus.SCHEDULED,
  })
  status: FlightStatus;

  //first method tells which table's FK to be stored.
  //the second tells In the Airplane entity, there’s a property called
  //flights that represents all the flights belonging to this airplane.

  @ManyToOne(() => Airplane, (airplane) => airplane.flights)
  @JoinColumn({ name: 'airplane_id' })
  airplane: Airplane;

  // multiple flights can depart from an airport
  @ManyToOne(() => Airport, (airport) => airport.departingflights)
  @JoinColumn({name: 'departure_airport_id'})
  departureAirport : Airport;


  @ManyToOne(() => Airport, (airport) => airport.arrivingFlights)
  @JoinColumn({name: 'arrival_airport_id' })
  arrivalAirport : Airport;

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings : Booking[];
}
