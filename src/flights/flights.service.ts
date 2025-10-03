import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { Repository } from 'typeorm';

import { Airplane } from '../airplanes/airplane.entity';
import { Airport } from '../airports/airport.entity';
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
    private airportsRepository: Repository<Airport>,
  ) {}

  async showFlights() {
    const flights = await this.flightsRepository.find({
      relations: ['airplane', 'departureAirport', 'arrivalAirport'],
    });
    return flights;
  }

  async showSpecificFlight(flightId: number) {
    // it is a better practise to name the parameter as the name in the entity so, flightId
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
    if (!airplane)
      throw new NotFoundException(`Airplane with id ${airplaneId} not found`);
    // konsa airport hy nikaal lo id se
    const departureAirport = await this.airportsRepository.findOneBy({
      airportId: departureAirportId,
    });
    //   SELECT * FROM airports WHERE airport_id = departureAirportId LIMIT 1;
    if (!departureAirport)
      throw new NotFoundException(
        `Departure airport with id ${departureAirportId} not found`,
      );

    const arrivalAirport = await this.airportsRepository.findOneBy({
      airportId: arrivalAirportId,
    });
    //   SELECT * FROM airports WHERE airport_id = arrivalAirportId LIMIT 1;
    if (!arrivalAirport)
      throw new NotFoundException(
        `Arrival airport with id ${arrivalAirportId} not found`,
      );

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

  async updateFlight(flightId: number, updateFlightDTO: UpdateFlightDTO) {
    const flight = await this.flightsRepository.findOne({
      where: { flightId },
    });

    if (!flight) {
      throw new NotFoundException(`Flight with id ${flightId} not found`);
    }

    const updateData: any = {};

    if (updateFlightDTO.airplaneId !== undefined) {
      updateData.airplane = { airplaneId: updateFlightDTO.airplaneId };
    }
    if (updateFlightDTO.departureAirportId !== undefined) {
      updateData.departureAirport = {
        airportId: updateFlightDTO.departureAirportId,
      };
    }
    if (updateFlightDTO.arrivalAirportId !== undefined) {
      updateData.arrivalAirport = {
        airportId: updateFlightDTO.arrivalAirportId,
      };
    }
    if (updateFlightDTO.departureTime !== undefined) {
      updateData.departureTime = updateFlightDTO.departureTime;
    }
    if (updateFlightDTO.arrivalTime !== undefined) {
      updateData.arrivalTime = updateFlightDTO.arrivalTime;
    }
    if (updateFlightDTO.status !== undefined) {
      updateData.status = updateFlightDTO.status;
    }

    // If you only need to update something simple like status, update() is totally fine.

    // If you need to update relations (airplane, airports), merge() + save() is the safer way because it maps objects like { airportId: 2 } into proper relations.

    this.flightsRepository.merge(flight, updateData);
    const updatedFlight = await this.flightsRepository.save(flight);

    return {
      message: 'Flight updated successfully',
      flight: updatedFlight,
    };
  }

  async deleteFlight(flightId: number) {
    const flight = await this.flightsRepository.findOne({
      where: { flightId },
    });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${flightId} not found`);
    }

    await this.flightsRepository.delete(flightId);
    //abhi on delete cascade db me nhe lga hua to flight deleten hone pe bookings delete nhe hongi.
    //ye meine entities me kaam krdiya hy lekin DB me show nhe hoga. uske liye pehle FKs drop krni hongi phr manually migration file me likhna prega aur run krna prega.
    //isse behtar phpmyadmin me jake khud se krdo change sql queries se.

    return {
      message: 'Flight deleted successfully',
    };
  }
}
