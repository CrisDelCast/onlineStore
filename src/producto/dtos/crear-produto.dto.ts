import { IsNotEmpty,IsString, IsNumber, IsOptional} from "class-validator";

export class CrearProductoDto{
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    stock: number;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsNumber()
    ratingCount?: number;

}