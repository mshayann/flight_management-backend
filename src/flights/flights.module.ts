import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './flight.entity';
import { Airplane } from 'src/airplanes/airplane.entity';
import { Airport } from 'src/airports/airport.entity';


//import is what i will be needing for myself i.e. flightRepository to be used in flightService
//export is what i am willing to share with others.
@Module({
  imports: [TypeOrmModule.forFeature([Flight,Airplane,Airport])],  //NestJS will create a flightRepository that you can inject in your services.
  controllers: [FlightsController],
  providers: [FlightsService],
  //If OrdersModule or any other module wants to use flightRepository, it can’t.
  //you need to do this:
  exports: [TypeOrmModule] // now any module can import FlightsModule and then use flightsService in their service.
})
export class FlightsModule {}
