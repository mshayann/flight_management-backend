import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateAirportDTO {
    
    @IsNotEmpty({message: 'Name is required'})
    name : string;

    @IsNotEmpty({message: 'City is required'})
    city : string;

    
    @IsNotEmpty({message: 'Country is required'})
    country : string;

    
    @IsNotEmpty({message: 'Code is required'})
    @Length(3, 10, { message: 'Code must be between 3 and 10 characters' })
    code : string;





}