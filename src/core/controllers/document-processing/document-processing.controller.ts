import { DocumentProcessingService } from '@core/services/document-processing/document-processing.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
import { WebhookDto } from '@veryfi/dtos/webhook.dto';

@Controller('')
export class DocumentProcessingController {
  constructor(private readonly documentProcessingService: DocumentProcessingService) {}

  @Post('process_document')
  async processDocument(@Body() processDocumentDto: ProcessDocumentDto) {
    return this.documentProcessingService.processDocument(processDocumentDto);
  }

  @Post('webhook')
  async webhook(@Query('campaign') campaign: string, @Body() webhookDto: WebhookDto) {
    return this.documentProcessingService.webhook(campaign, webhookDto);
  }
}
