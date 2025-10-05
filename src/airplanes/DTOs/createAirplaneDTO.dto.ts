import { IsInt, IsNotEmpty } from "class-validator";

export class CreateAirplaneDTO {

    @IsNotEmpty({message:"Model is required"})
    model : string;

    @IsNotEmpty({message : "Capacity is required"})
    @IsInt()
    capacity : number;

    @IsNotEmpty({message : "Manufacturer is required"})
    manufacturer : string;

}