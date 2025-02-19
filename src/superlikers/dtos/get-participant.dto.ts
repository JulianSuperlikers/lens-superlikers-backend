import { IsNotEmpty, IsString } from 'class-validator';

export class GetParticipantDto {
  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsString()
  @IsNotEmpty()
  uid: string;
}
