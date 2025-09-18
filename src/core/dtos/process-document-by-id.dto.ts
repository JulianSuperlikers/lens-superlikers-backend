import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProcessDocumentByIdDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsNotEmpty()
  @IsNumber()
  documentId: number;
}
