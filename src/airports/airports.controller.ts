import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { Roles } from 'roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'roles.guard';
import { CreateAirportDTO } from './DTOs/createAirportDTO.dto';
import { UpdateAirportDTO } from './DTOs/updateAirportDTO.dto';

@Controller('airports')
export class AirportsController {
    constructor(private readonly airportsService: AirportsService){}

    
    @Post('addAirport')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    addAirport(@Body() createAirportDTO : CreateAirportDTO ){
        return this.airportsService.addAirport(createAirportDTO);
    }

    @Get('getAirports')
    getAirports(){
        return this.airportsService.showAirports();
    }

    @Patch('updateAirport/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    updateFlight (@Param('id') id : number, @Body() updateAirportDTO: UpdateAirportDTO ){
        return this.airportsService.updateAirportDetails(id, updateAirportDTO);
    }
}
