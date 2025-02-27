import { Body, Controller, Post } from '@nestjs/common';
import { VeryfiService } from './veryfi.service';
import { ProcessDocumentDto } from './dtos/process-document.dto';

@Controller('veryfi')
export class VeryfiController {
  constructor(private readonly veryfiService: VeryfiService) {}

  @Post('upload')
  uploadDocument(@Body() processDocumentDto: ProcessDocumentDto) {
    return this.veryfiService.processDocument(processDocumentDto);
  }
}
