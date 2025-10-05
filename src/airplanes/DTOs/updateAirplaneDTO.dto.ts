import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAirplaneDTO {
    
        @IsOptional()
        @IsNotEmpty({message: "Model field cannot be empty"})
        model?: string;
    
        
    
        @IsOptional()
        @IsNotEmpty({message: "Capacity field cannot be empty"})
        capacity?: number;
    
        @IsOptional()
        @IsNotEmpty({message: "Manufacturer field cannot be empty"})
        manufacturer?: string;
}