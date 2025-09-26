import { IsInt, IsDateString, IsString, IsEnum } from 'class-validator';
import { FlightStatus } from '../flight.entity';

// In the entity, airplane is an Airplane object.
// But when a client calls your API (POST /flights), they don’t know (or shouldn’t send) the entire Airplane JSON object.
// They only know which airplane to use → so they send the ID.

export class CreateFlightDto {
  @IsInt()
  airplaneId: number;

  @IsInt()
  departureAirportId: number;

  @IsInt()
  arrivalAirportId: number;

  @IsDateString()
  departureTime: string;  

  @IsDateString()
  arrivalTime: string;

  @IsEnum(FlightStatus)
  status: FlightStatus;
}