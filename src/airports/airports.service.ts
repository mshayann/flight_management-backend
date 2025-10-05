import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { Repository } from 'typeorm';
import { CreateAirportDTO } from './DTOs/createAirportDTO.dto';
import { UpdateAirportDTO } from './DTOs/updateAirportDTO.dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private airportRepository: Repository<Airport>,
  ) {}

  async addAirport(createAirportDTO: CreateAirportDTO) {
    const { name, city, country, code } = createAirportDTO;
    const airport = this.airportRepository.create({
      name,
      city,
      country,
      code,
    });
    const createdAirport = await this.airportRepository.save(airport);
    return {
      aiport: createdAirport,
      message: 'Airport created successfully',
    };
  }

  async showAirports(){
    return this.airportRepository.find();
  }

  async showSpecificAirport(airportId : number){
    const airport = this.airportRepository.findOne({where : {airportId}});
    return airport;
  }

  async updateAirportDetails(airportId: number, updateAirportDTO : UpdateAirportDTO ){


    const {name, city, country, code} = updateAirportDTO;

    const airport = await this.airportRepository.findOne({where: {airportId}});

    if(!airport){
        throw new NotFoundException(`Flight with id ${airportId} not found`);
    }

//     update(id, data)
// Updates one record, by its primary key (or unique criteria).
// Doesn’t load the entity from the database → just runs an UPDATE SQL.

// updateAll(criteria, data) (can look like "updateAll")
// Updates all rows that match a condition.

// You’d use update(criteria, dto) only if you ever want to do something like:
// "Update all airports in Pakistan to country code PK".

    const updatedAirport = await this.airportRepository.update(airportId, {name, city, country, code});

    return {
        airport: updatedAirport,
        message: 'Airport details updated successfully'
    };
  }


  async deleteAirport(airportId : number){

    await this.airportRepository.delete(airportId);
    return {
        message: "Airport deleted successfully"
    }
  }
}
