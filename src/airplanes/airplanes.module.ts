import { Module } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';
import { AirplanesController } from './airplanes.controller';

@Module({
  providers: [AirplanesService],
  controllers: [AirplanesController]
})
export class AirplanesModule {}
