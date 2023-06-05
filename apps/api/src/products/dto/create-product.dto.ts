import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;


    image: string;
}
