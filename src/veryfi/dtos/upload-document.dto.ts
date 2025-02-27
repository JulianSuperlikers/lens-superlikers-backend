import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { DeviceDataDto } from './device-data.dto';

export class UploadDocumentDto {
  @ValidateNested()
  @Type(() => DeviceDataDto)
  deviceData: DeviceDataDto;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;
}
