import { Injectable } from '@nestjs/common';
import { handleHttpError } from '@shared/utils/http-error-handler';
import { ProductDto } from '@superlikers/dtos/product.dto';
import { SuperlikersService } from '@superlikers/superlikers.service';
import { extractProductsFromDocument } from '@superlikers/utils/process-products';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
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
      const { id, is_duplicate, duplicate_of } = uploadDocumentResponse;

      // Update document with uid
      const notesData = { notes: uid };
      await this.veryfiService.updateDocument({ documentId: id, campaign, data: notesData });

      // Validate tags
      validateData(uploadDocumentResponse, campaign);

      // Get sale information and register sale
      const { products, discount } = extractProductsFromDocument(uploadDocumentResponse, campaign);
      const ref = is_duplicate ? duplicate_of! : String(id);

      const formattedProducts: ProductDto[] = products.map((p) => ({
        ref: p.ref,
        quantity: p.quantity,
        price: p.price,
        type: p.type,
        provider: p.provider ?? '',
        line: p.line ?? '',
      }));

      const saleResponse = await this.superlikersService.registerSale({
        campaign,
        uid,
        ref,
        products: formattedProducts,
        discount,
        category: 'fisica',
      });

      // Add point tag to document
      const points = saleResponse?.points ?? 0;
      const tag = `points:${points}`;

      await this.veryfiService.addTagToDocument({ documentId: id, campaign, tag });

      return { ok: true, message: 'La factura se subió ccorrectamente.' };
    } catch (err) {
      handleHttpError(err);
    }
  }
}
