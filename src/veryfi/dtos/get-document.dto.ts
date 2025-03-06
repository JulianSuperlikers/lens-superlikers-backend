import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDocumentDto {
  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsNumber()
  @IsNotEmpty()
  documentId: number;
}
