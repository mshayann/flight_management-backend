import { Module } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { AirportsController } from './airports.controller';

@Module({

  imports: [TypeOrmModule.forFeature([Airport])],
  controllers: [AirportsController],
  providers: [AirportsService]

})
export class AirportsModule {

}
