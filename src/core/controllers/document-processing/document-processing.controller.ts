import { Body, Controller, Post, Query } from '@nestjs/common';

import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
import { WebhookDto } from '@veryfi/dtos/webhook.dto';
import { ProcessDocumentSaleDto } from '@core/dtos/process-document-sale.dto';
import { DocumentProcessingService } from '@core/services/document-processing/document-processing.service';
import { ProcessDocumentByIdDto } from '@core/dtos/process-document-by-id.dto';

@Controller('')
export class DocumentProcessingController {
  constructor(private readonly documentProcessingService: DocumentProcessingService) {}

  @Post('process_document')
  async processDocument(@Body() processDocumentDto: ProcessDocumentDto) {
    return this.documentProcessingService.processDocument(processDocumentDto);
  }

  @Post('process_document_by_id')
  async processDocumentById(@Body() processDocumentByIdDto: ProcessDocumentByIdDto) {
    return this.documentProcessingService.processDocumentById(processDocumentByIdDto);
  }

  @Post('process_document_sale')
  async processDocumentSale(@Body() processDocumentSaleDto: ProcessDocumentSaleDto) {
    return this.documentProcessingService.processDocumentSale(processDocumentSaleDto);
  }

  @Post('webhook')
  async webhook(@Query('campaign') campaign: string, @Body() webhookDto: WebhookDto) {
    return this.documentProcessingService.webhook(campaign, webhookDto);
  }
}
