import { IsString, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1, { message: 'Product name must not be empty' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsOptional()
  @IsString()
  image?: string | null;
}
