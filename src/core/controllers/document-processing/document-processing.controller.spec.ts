import { Test, TestingModule } from '@nestjs/testing';
import { DocumentProcessingController } from './document-processing.controller';
import { DocumentProcessingService } from '@core/services/document-processing/document-processing.service';
import { ProcessDocumentDto } from '@veryfi/dtos/process-document.dto';
import { WebhookDto } from '@veryfi/dtos/webhook.dto';

describe('DocumentProcessingController', () => {
  let controller: DocumentProcessingController;
  let service: DocumentProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentProcessingController],
      providers: [
        {
          provide: DocumentProcessingService,
          useValue: {
            processDocument: jest.fn(),
            webhook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DocumentProcessingController>(DocumentProcessingController);
    service = module.get<DocumentProcessingService>(DocumentProcessingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processDocument', () => {
    const processDocumentDto: ProcessDocumentDto = {
      document: 'sampleDocumentData',
    } as ProcessDocumentDto;

    it('should call processDocument from documentProcessingService and return its result', async () => {
      const serviceResult = { success: true };
      (service.processDocument as jest.Mock).mockResolvedValueOnce(serviceResult);

      const result = await controller.processDocument(processDocumentDto);

      expect(service['processDocument']).toHaveBeenCalledTimes(1);
      expect(service['processDocument']).toHaveBeenCalledWith(processDocumentDto);
      expect(result).toEqual(serviceResult);
    });

    it('should propagate errors from service.processDocument', async () => {
      const errorMessage = 'Processing failed';
      (service.processDocument as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(controller.processDocument(processDocumentDto)).rejects.toThrow(errorMessage);
    });
  });

  describe('webhook', () => {
    const campaign = 'testCampaign';
    const webhookDto: WebhookDto = {
      event: 'sampleEvent',
    } as WebhookDto;

    it('should call webhook from documentProcessingService with campaign and webhookDto and return its result', async () => {
      const serviceResult = { acknowledged: true };
      (service.webhook as jest.Mock).mockResolvedValueOnce(serviceResult);

      const result = await controller.webhook(campaign, webhookDto);

      expect(service['webhook']).toHaveBeenCalledTimes(1);
      expect(service['webhook']).toHaveBeenCalledWith(campaign, webhookDto);
      expect(result).toEqual(serviceResult);
    });

    it('should propagate errors from service.webhook', async () => {
      const errorMessage = 'Webhook error';
      (service.webhook as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(controller.webhook(campaign, webhookDto)).rejects.toThrow(errorMessage);
    });
  });
});
