import { Test, TestingModule } from '@nestjs/testing';
import { DocumentProcessingService } from './document-processing.service';
import { SuperlikersService } from '@superlikers/superlikers.service';
import { VeryfiService } from '@veryfi/veryfi.service';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
import { WebhookDto } from '@veryfi/dtos/webhook.dto';
import { handleHttpError } from '@shared/utils/http-error-handler';
import { validateData } from '@veryfi/utils/validateDocument';
import { getSaleBody } from '@superlikers/utils/process-products';
import { DeviceDataDto } from '@veryfi/dtos/device-data.dto';

jest.mock('@shared/utils/http-error-handler', () => ({
  handleHttpError: jest.fn(),
}));

jest.mock('@veryfi/utils/validateDocument', () => ({
  validateData: jest.fn(),
}));

jest.mock('@superlikers/utils/process-products', () => ({
  getSaleBody: jest.fn(),
}));

describe('DocumentProcessingService', () => {
  let service: DocumentProcessingService;
  let superlikersService: SuperlikersService;
  let veryfiService: VeryfiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentProcessingService,
        {
          provide: SuperlikersService,
          useValue: {
            registerSale: jest.fn(),
          },
        },
        {
          provide: VeryfiService,
          useValue: {
            uploadDocument: jest.fn(),
            updateDocument: jest.fn(),
            addTagToDocument: jest.fn(),
            getDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentProcessingService>(DocumentProcessingService);
    superlikersService = module.get<SuperlikersService>(SuperlikersService);
    veryfiService = module.get<VeryfiService>(VeryfiService);

    jest.clearAllMocks();
  });

  describe('processDocument', () => {
    const deviceDataMock: DeviceDataDto = {
      browser_fingerprint: {},
      uuid: '12345',
      source: 'mock-source',
    };

    const processDocumentDto: ProcessDocumentDto = {
      deviceData: deviceDataMock,
      document: 'sampleDocument',
      campaign: 'testCampaign',
      uid: 'user123',
    };

    it('should process document successfully', async () => {
      const uploadResponse = { id: 1, tags: [] };
      (veryfiService.uploadDocument as jest.Mock).mockResolvedValue(uploadResponse);
      (veryfiService.updateDocument as jest.Mock).mockResolvedValue({});

      const dummySale = {
        campaign: processDocumentDto.campaign,
        uid: processDocumentDto.uid,
        ref: 'ref1',
        products: [],
      };
      (getSaleBody as jest.Mock).mockReturnValue(dummySale);

      const registerSaleResponse = { points: 10 };
      (superlikersService.registerSale as jest.Mock).mockResolvedValue(registerSaleResponse);

      (veryfiService.addTagToDocument as jest.Mock).mockResolvedValue({});

      const result = await service.processDocument(processDocumentDto);

      expect(veryfiService['uploadDocument']).toHaveBeenCalledWith({
        deviceData: processDocumentDto.deviceData,
        document: processDocumentDto.document,
        campaign: processDocumentDto.campaign,
      });

      expect(veryfiService['updateDocument']).toHaveBeenCalledWith({
        documentId: uploadResponse.id,
        campaign: processDocumentDto.campaign,
        data: { notes: processDocumentDto.uid },
      });

      expect(validateData).toHaveBeenCalledWith(uploadResponse, processDocumentDto.campaign);

      expect(getSaleBody).toHaveBeenCalledWith('user123', uploadResponse, processDocumentDto.campaign);

      expect(superlikersService['registerSale']).toHaveBeenCalledWith(dummySale);

      expect(veryfiService['addTagToDocument']).toHaveBeenCalledWith({
        documentId: uploadResponse.id,
        campaign: processDocumentDto.campaign,
        tag: 'points:10',
      });

      expect(result).toEqual({ ok: true, message: 'La factura se subió correctamente.' });
    });

    it('should handle errors and call handleHttpError', async () => {
      const error = new Error('Test error');
      (veryfiService.uploadDocument as jest.Mock).mockRejectedValue(error);

      const result = await service.processDocument(processDocumentDto);
      expect(handleHttpError).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });

  describe('webhook', () => {
    const webhookDto: WebhookDto = {
      event: 'someEvent',
      data: [
        { id: 1, changed_fields: [] },
        { id: 2, changed_fields: [] },
      ],
      start: new Date(),
      end: new Date(),
    };
    const campaign = 'testCampaign';

    it('should process webhook and return summary', async () => {
      const doc1 = { id: 1, tags: [{ name: 'APPROVED' }], notes: 'user1' };
      const doc2 = { id: 2, tags: [{ name: 'REJECTED' }], notes: 'user2' };
      (veryfiService.getDocument as jest.Mock).mockResolvedValueOnce(doc1);
      (veryfiService.getDocument as jest.Mock).mockResolvedValueOnce(doc2);

      const dummySale = { campaign, uid: 'user1', ref: 'ref1', products: [] };
      (getSaleBody as jest.Mock).mockReturnValue(dummySale);
      (superlikersService.registerSale as jest.Mock).mockResolvedValue({ points: 5 });
      (veryfiService.addTagToDocument as jest.Mock).mockResolvedValue({});

      const result = await service.webhook(campaign, webhookDto);

      expect(veryfiService['getDocument']).toHaveBeenCalledTimes(2);
      expect(superlikersService['registerSale']).toHaveBeenCalledTimes(1);
      expect(veryfiService['addTagToDocument']).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        ok: true,
        message: 'Webhook processed successfully',
        summary: [
          {
            state: 'fulfilled',
            error: '',
            document: doc1.id,
            uid: doc1.notes,
          },
        ],
      });
    });

    it('should handle errors in webhook and call handleHttpError', async () => {
      const error = new Error('Webhook error');
      (veryfiService.getDocument as jest.Mock).mockRejectedValue(error);

      const result = await service.webhook(campaign, webhookDto);
      expect(handleHttpError).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });
});
