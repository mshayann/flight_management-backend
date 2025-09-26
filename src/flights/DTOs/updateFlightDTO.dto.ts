import { IsInt, IsDateString, IsString, IsEnum, IsOptional } from 'class-validator';
import { FlightStatus } from '../flight.entity';

// In the entity, airplane is an Airplane object.
// But when a client calls your API (POST /flights), they don’t know (or shouldn’t send) the entire Airplane JSON object.
// They only know which airplane to use → so they send the ID.

export class UpdateFlightDTO {
    @IsOptional()
  @IsInt()
  airplaneId?: number;

  @IsOptional()
  @IsInt()
  departureAirportId?: number;
@IsOptional()
  @IsInt()
  arrivalAirportId?: number;

  @IsOptional()
  @IsDateString()
  departureTime?: string;  

  @IsOptional()
  @IsDateString()
  arrivalTime?: string;

  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus;
}