import { IsNotEmpty, IsString } from 'class-validator';

export class AddTagToDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentId: number;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;
}
