import { DocumentProcessingService } from '@core/services/document-processing/document-processing.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';

@Controller('process_document')
export class DocumentProcessingController {
  constructor(private readonly documentProcessingService: DocumentProcessingService) {}

  @Post()
  async processDocument(@Body() processDocumentDto: ProcessDocumentDto) {
    return this.documentProcessingService.processDocument(processDocumentDto);
  }
}
