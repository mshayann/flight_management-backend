import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Roles } from 'roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { CreateFlightDto } from './DTOs/createFlight.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'roles.guard';
import { UpdateFlightDTO } from './DTOs/updateFlightDTO.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('getFlights')
  getFlights() {
    return this.flightsService.showFlights();
  }

  @Get(':id')
  findOne(@Param() params: any) {
    
    return this.flightsService.showSpecificFlight(params.id);
  }

  @Post('addFlight')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  addFlight(@Body() createFlightDTO: CreateFlightDto){
    return this.flightsService.addFlight(createFlightDTO);
  }

  @Patch('updateFlight/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateFlight(@Param('id') id : number, @Body() updateFlightDTO: UpdateFlightDTO){
    
    return this.flightsService.updateFlight(id, updateFlightDTO);
  }


  @Delete('deleteFlight/:id')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteFlight(@Param('id') id : number){
    return this.flightsService.deleteFlight(id);
  }

}
