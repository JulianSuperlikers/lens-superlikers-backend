import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class FieldsDataDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsArray()
  @IsString({ each: true })
  changed_fields: string[];
}

export class WebhookDto {
  @IsNotEmpty()
  @IsString()
  event: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldsDataDto)
  data: FieldsDataDto[];

  @IsString()
  @IsOptional()
  start?: string;

  @IsString()
  @IsOptional()
  end?: string;
}
