import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';
import { Roles } from '../../roles.decorator';
import { UserRole } from '../users/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../roles.guard';
import { CreateAirplaneDTO } from './DTOs/createAirplaneDTO.dto';
import { UpdateAirplaneDTO } from './DTOs/updateAirplaneDTO.dto';

@Controller('airplanes')
export class AirplanesController {
    constructor( private readonly airplanesService: AirplanesService){}

    @Post('addAirplane')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addAirplane (@Body() createAirplaneDTO : CreateAirplaneDTO){
        return this.airplanesService.addAirplane(createAirplaneDTO);
    }

    @Patch('updateAirplane/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateAiplane (@Param('id') id : number , @Body() updateAirplaneDTO : UpdateAirplaneDTO){
        return this.airplanesService.updateAirplaneDetails(id, updateAirplaneDTO);
    }

    @Get('showAirplanes')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    showAirplanes (){
        return this.airplanesService.showAirplanes();
    }

    @Get('showSpecificAirplane/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    showSpecificAirplane(@Param('id') id : number){
        return this.airplanesService.showSpecificAirplane(id);
    }

}
