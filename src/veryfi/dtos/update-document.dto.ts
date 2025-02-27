import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsInt()
  @IsNotEmpty()
  documentId: number;

  @IsNotEmpty()
  data: Record<string, any>;
}
