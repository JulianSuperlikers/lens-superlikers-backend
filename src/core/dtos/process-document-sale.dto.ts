import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { VeryfiReceiptDto } from '@veryfi/dtos/document.dto';

export class ProcessDocumentSaleDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  campaign: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VeryfiReceiptDto)
  document: VeryfiReceiptDto;
}
