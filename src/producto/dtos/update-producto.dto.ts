import { IsNotEmpty,IsString, IsNumber, IsOptional} from "class-validator";

export class UpdateProductoDto{
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @IsOptional()
    stock: number;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsNumber()
    ratingCount?: number;

}