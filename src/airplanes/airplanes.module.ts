import { Module } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';
import { AirplanesController } from './airplanes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airplane } from './airplane.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Airplane])], //Register the Airplane entity in the current module's scope so that I can inject its repository
  providers: [AirplanesService],
  controllers: [AirplanesController]
})
export class AirplanesModule {}
