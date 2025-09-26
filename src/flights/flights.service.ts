import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { Airplane } from 'src/airplanes/airplane.entity';
import { Airport } from 'src/airports/airport.entity';
import { CreateFlightDto } from './DTOs/createFlight.dto';
import { UpdateFlightDTO } from './DTOs/updateFlightDTO.dto';

@Injectable()
export class FlightsService {

  constructor(
  
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
      @InjectRepository(Airplane)
    private airplanesRepository: Repository<Airplane>,

    @InjectRepository(Airport)
    private airportsRepository: Repository<Airport>
  ) {}

  async showFlights() {
    const flights = await this.flightsRepository.find({
      relations: ['airplane', 'departureAirport', 'arrivalAirport'],
    });
    return flights;
  }

  async showSpecificFlight(flightId: number) {    // it is a better practise to name the parameter as the name in the entity so, flightId
    const flight = await this.flightsRepository.findOne({
      where: { flightId },
      relations: ['airplane', 'departureAirport', 'arrivalAirport'],
    });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${flightId} not found`);
    }
    return flight;
  }
async addFlight(createFlightDTO: CreateFlightDto) {
  const {
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    departureTime,
    arrivalTime,
    status,
  } = createFlightDTO;
  // konsa jahaz hy nikaal lo id se
  const airplane = await this.airplanesRepository.findOneBy({ airplaneId });
  if (!airplane) throw new NotFoundException(`Airplane with id ${airplaneId} not found`);
  // konsa airport hy nikaal lo id se
  const departureAirport = await this.airportsRepository.findOneBy({ airportId: departureAirportId });  
//   SELECT * FROM airports WHERE airport_id = departureAirportId LIMIT 1;
  if (!departureAirport) throw new NotFoundException(`Departure airport with id ${departureAirportId} not found`);

  const arrivalAirport = await this.airportsRepository.findOneBy({ airportId: arrivalAirportId });
//   SELECT * FROM airports WHERE airport_id = arrivalAirportId LIMIT 1;
  if (!arrivalAirport) throw new NotFoundException(`Arrival airport with id ${arrivalAirportId} not found`);

  const flight = this.flightsRepository.create({
    airplane,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    status,
  });

  return await this.flightsRepository.save(flight);
}


async updateFlight(flightId : number, updateFlightDTO: UpdateFlightDTO){  // it is a better practise to name the parameter as the name in the entity so, flightId

    const flight = await this.flightsRepository.findOneBy({flightId})

    if(!flight){
        throw new NotFoundException(`Flight with id ${flightId} not found`);
    }
    
}
}
