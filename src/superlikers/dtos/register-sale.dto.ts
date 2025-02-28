import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductDto } from './product.dto';

export class RegisterSaleDto {
  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  ref: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsOptional()
  @IsInt()
  date?: number;

  @IsOptional()
  properties?: Record<string, any>;

  @IsOptional()
  @IsInt()
  discount?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
