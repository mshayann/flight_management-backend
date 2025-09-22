import { Flight } from "src/flights/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('airplanes')
export class Airplane {

    @PrimaryGeneratedColumn({name: 'airplane_id'})  //taake table jb bnay to airplane_id aye aur code me hm airplaneId use krein.
    airplaneId: number;

    @Column()
    model: string;

    @Column()
    capacity: string;

    @Column()
    manufacturer: string;

    @OneToMany(() => Flight, (flight) => flight.airplane)
    flights: Flight[];

    
}