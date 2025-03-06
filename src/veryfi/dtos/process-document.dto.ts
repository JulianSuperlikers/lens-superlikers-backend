import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { DeviceDataDto } from './device-data.dto';

export class ProcessDocumentDto {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => DeviceDataDto)
  deviceData: DeviceDataDto;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsString()
  @IsNotEmpty()
  uid: string;
}
