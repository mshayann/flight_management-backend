import { isNotEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAirportDTO{

    @IsOptional()
    @IsNotEmpty({message: "Name cannot be empty"})
    name?: string;

    @IsOptional()
    @IsNotEmpty({message: "City cannot be empty"})
    city?: string;

    @IsOptional()
    @IsNotEmpty({message: "Country cannot be empty"})
    country?: string;

    @IsOptional()
    @IsNotEmpty({message: "Code cannot be empty"})
    code?: string;
    
}