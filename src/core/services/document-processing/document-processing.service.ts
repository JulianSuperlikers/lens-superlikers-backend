import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { Injectable } from '@nestjs/common';

import { handleHttpError } from '@shared/utils/http-error-handler';
import { SuperlikersService } from '@superlikers/superlikers.service';
import { getSaleBody } from '@superlikers/utils/process-products';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
import { WebhookDto } from '@veryfi/dtos/webhook.dto';
import { validateData } from '@veryfi/utils/validateDocument';
import { VeryfiService } from '@veryfi/veryfi.service';

@Injectable()
export class DocumentProcessingService {
  constructor(
    private readonly superlikersService: SuperlikersService,
    private readonly veryfiService: VeryfiService,
  ) {}

  async processDocument(processDocumentDto: ProcessDocumentDto) {
    const { deviceData, document, campaign, uid } = processDocumentDto;

    try {
      // Upload document
      const uploadDocumentResponse = await this.veryfiService.uploadDocument({ deviceData, document, campaign });
      const { id } = uploadDocumentResponse;

      // Update document with uid
      const notesData = { notes: uid };
      await this.veryfiService.updateDocument({ documentId: id, campaign, data: notesData });

      // Validate tags
      validateData(uploadDocumentResponse, campaign);

      // Get sale information and register it in Superlikers
      await this.processApprovedDocument(uploadDocumentResponse, campaign);

      return { ok: true, message: 'La factura se subió ccorrectamente.' };
    } catch (err) {
      handleHttpError(err);
    }
  }

  async webhook(campaign: string, webhookDto: WebhookDto) {
    try {
      // Fetch and filter approved documents
      const documents = await this.getApprovedDocuments(campaign, webhookDto);

      // Process each approved document using Promise.allSettled
      const results = await Promise.allSettled(
        documents.map((document) => this.processApprovedDocument(document, campaign)),
      );

      const summary = results.map((result, index) => {
        const error = result.status === 'rejected' ? (result.reason as Error).message : '';
        const document = documents[index].id;

        return {
          state: result.status,
          error,
          document,
        };
      });

      return {
        ok: true,
        message: 'Webhook processed successfully',
        summary,
      };
    } catch (err) {
      handleHttpError(err);
    }
  }

  /**
   * Processes an approved document:
   * - Extracts sale details
   * - Registers the sale in Superlikers
   * - Adds points tag in Veryfi
   */
  private async processApprovedDocument(document: VeryfiReceipt, campaign: string) {
    try {
      const sale = getSaleBody(document, campaign);
      const saleResponse = await this.superlikersService.registerSale(sale);

      // Add points tag to document
      const points = saleResponse?.points ?? 0;
      const tag = `points:${points}`;
      await this.veryfiService.addTagToDocument({ documentId: document.id, campaign, tag });
    } catch (err) {
      handleHttpError(err);
    }
  }

  /**
   * Fetches and filters approved documents from Veryfi.
   */
  private async getApprovedDocuments(campaign: string, webhookDto: WebhookDto) {
    const documentPromises = webhookDto.data.map((item) =>
      this.veryfiService.getDocument({ campaign, documentId: item.id }),
    );

    const documents = await Promise.all(documentPromises);
    return documents.filter((document) => document.tags.some((tag) => tag.name === 'APPROVED'));
  }
}
