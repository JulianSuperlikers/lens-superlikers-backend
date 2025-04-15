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
      await this.processApprovedDocument(uid, uploadDocumentResponse, campaign);

      return { ok: true, message: 'La factura se subió correctamente.' };
    } catch (err) {
      handleHttpError(err);
    }
  }

  async webhook(campaign: string, webhookDto: WebhookDto) {
    try {
      const documentPromises = webhookDto.data.map((item) =>
        this.veryfiService.getDocument({ campaign, documentId: item.id }),
      );

      const documentsResponses = await Promise.all(documentPromises);
      const documents = documentsResponses.filter((document) => document.tags.some((tag) => tag.name === 'APPROVED'));

      // Process each approved document using Promise.allSettled
      const results = await Promise.allSettled(
        documents.map((document) => {
          const uid = document.notes!;
          return this.processApprovedDocument(uid, document, campaign);
        }),
      );

      const summary = results.map((result, index) => {
        const error = result.status === 'rejected' ? (result.reason as Error).message : '';
        const document = documents[index].id;
        const uid = documents[index].notes;

        return {
          state: result.status,
          error,
          document,
          uid,
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
  private async processApprovedDocument(uid: string, document: VeryfiReceipt, campaign: string) {
    try {
      const sale = getSaleBody(uid, document, campaign);
      const saleResponse = await this.superlikersService.registerSale(sale);

      // Add points tag to document
      const points = saleResponse?.points ?? 0;
      const tag = `points:${points}`;
      await this.veryfiService.addTagToDocument({ documentId: document.id, campaign, tag });
    } catch (err) {
      handleHttpError(err);
    }
  }
}
