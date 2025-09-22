import { Flight } from "src/flights/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('airports')
export class Airport {
    @PrimaryGeneratedColumn({name: 'airport_id'})  //table ke andar airport_id naam rkhna wese airportId typeORM me use krna. agar ye naa don to table me bhi airportId hi ajayega.
    airportId: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    code: string;
    //one airport can have many departing flights
    @OneToMany(() => Flight, (flight) => flight.departureAirport)
    departingflights: Flight[];


    @OneToMany(() => Flight, (flight) => flight.arrivalAirport)
    arrivingFlights: Flight[]
}