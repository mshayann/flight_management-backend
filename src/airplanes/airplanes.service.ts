import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airplane } from './airplane.entity';
import { Repository } from 'typeorm';
import { addAirportDTO } from './DTOs/addAirplaneDTO.dto';

@Injectable()
export class AirplanesService {


    constructor (
        @InjectRepository(Airplane)
        private airplaneRepository : Repository<Airplane>

    ){}

    async addAirplane (addAirplaneDTO : addAirportDTO){
        
    }
}
