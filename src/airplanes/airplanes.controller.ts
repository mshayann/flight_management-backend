import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';
import { Roles } from '../../roles.decorator';
import { UserRole } from '../users/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../roles.guard';
import { addAirportDTO } from './DTOs/addAirplaneDTO.dto';

@Controller('airplanes')
export class AirplanesController {
    constructor( private readonly airplanesService: AirplanesService){}

    @Post('addAirplane')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addAirplane (@Body() addAirplaneDTO : addAirportDTO){
        return this.airplanesService.addAirplane(addAirplaneDTO);
    }

}
