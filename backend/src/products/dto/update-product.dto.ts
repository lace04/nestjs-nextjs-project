import { IsString, IsNumber, IsOptional, IsPositive, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Product name must not be empty' })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price?: number;

  @IsOptional()
  @IsString()
  image?: string | null;
}
