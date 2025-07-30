import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceDataDto {
  @IsNotEmpty()
  browser_fingerprint: Record<string, string | number | boolean | undefined>;

  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  user_uuid: string;
}
