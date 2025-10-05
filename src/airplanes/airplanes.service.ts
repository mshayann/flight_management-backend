import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Airplane } from './airplane.entity';
import { Repository } from 'typeorm';
import { CreateAirplaneDTO } from './DTOs/createAirplaneDTO.dto';
import { UpdateAirplaneDTO } from './DTOs/updateAirplaneDTO.dto';

@Injectable()
export class AirplanesService {


    constructor (
        @InjectRepository(Airplane)
        private airplaneRepository : Repository<Airplane>

    ){}

    async showAirplanes(){
        const airplanes = this.airplaneRepository.find();

        return airplanes
    }

    async addAirplane (createAirplaneDTO : CreateAirplaneDTO){


        const {
            model,
            capacity,
            manufacturer
        } = createAirplaneDTO;

        const airplane = this.airplaneRepository.create({model, capacity, manufacturer});

        const createdAirplane = await this.airplaneRepository.save(airplane);
        return {
            message:"aiplane created successfully",
            airplane : createdAirplane,
        }
    }
    async updateAirplaneDetails(id : number, updateAirplaneDTO : UpdateAirplaneDTO ){
        const airplane = this.airplaneRepository.findOne({where: {airplaneId : id}});
        const {model, capacity, manufacturer} = updateAirplaneDTO;

        const updatedAirplane = await this.airplaneRepository.update(id, {model, capacity, manufacturer});

        return {
            message: "Airplane details updated successfully",
            airplane : updatedAirplane,
        }
    }

    async showSpecificAirplane(airplaneId: number){

        const airplane = this.airplaneRepository.findOne({where : {airplaneId}});
        return airplane;

    }
}
