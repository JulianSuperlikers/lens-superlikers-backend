import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class SendExternalDto {
  @IsString()
  @IsNotEmpty()
  event: string;

  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsObject()
  @IsNotEmpty()
  properties: Record<string, any>;

  @IsString()
  @IsOptional()
  category?: string;
}
