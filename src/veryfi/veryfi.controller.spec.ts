import { Test, TestingModule } from '@nestjs/testing';
import { VeryfiController } from './veryfi.controller';
import { VeryfiService } from './veryfi.service';
import { UploadDocumentDto } from './dtos/upload-document.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { AddTagToDocumentDto } from './dtos/add-tag-document.dto';
import { GetDocumentDto } from './dtos/get-document.dto';

describe('VeryfiController', () => {
  let controller: VeryfiController;
  let service: VeryfiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeryfiController],
      providers: [
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

    controller = module.get<VeryfiController>(VeryfiController);
    service = module.get<VeryfiService>(VeryfiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadDocument', () => {
    const uploadDocumentDto: UploadDocumentDto = {
      deviceData: {
        browser_fingerprint: {},
        uuid: '12345',
        source: 'mock-source',
        user_uuid: 'user123',
      },
      document: 'testDocument',
      campaign: 'testCampaign',
    };

    it('should call uploadDocument from veryfi service', () => {
      const expectedResult = { success: true };
      (service.uploadDocument as jest.Mock).mockReturnValue(expectedResult);

      const result = controller.uploadDocument(uploadDocumentDto);

      expect(service['uploadDocument']).toHaveBeenCalledTimes(1);
      expect(service['uploadDocument']).toHaveBeenCalledWith(uploadDocumentDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from service.uploadDocument', () => {
      const errorMessage = 'Upload failed';
      (service.uploadDocument as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.uploadDocument(uploadDocumentDto)).toThrow(errorMessage);
    });
  });

  describe('updateDocument', () => {
    const updateDocumentDto: UpdateDocumentDto = {
      campaign: 'testCampaign',
      documentId: 12345,
      data: {},
    };

    it('should call updateDocument from veryfi service', () => {
      const expectedResult = { success: true };
      (service.updateDocument as jest.Mock).mockReturnValue(expectedResult);

      const result = controller.updateDocument(updateDocumentDto);

      expect(service['updateDocument']).toHaveBeenCalledTimes(1);
      expect(service['updateDocument']).toHaveBeenCalledWith(updateDocumentDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from service.updateDocument', () => {
      const errorMessage = 'Update failed';
      (service.updateDocument as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.updateDocument(updateDocumentDto)).toThrow(errorMessage);
    });
  });

  describe('addTagToDocument', () => {
    const addTagToDocumentDto: AddTagToDocumentDto = {
      documentId: 12345,
      tag: 'important',
      campaign: 'testCampaign',
    };

    it('should call addTagToDocument from veryfi service', () => {
      const expectedResult = { success: true };
      (service.addTagToDocument as jest.Mock).mockReturnValue(expectedResult);

      const result = controller.addTagToDocument(addTagToDocumentDto);

      expect(service['addTagToDocument']).toHaveBeenCalledTimes(1);
      expect(service['addTagToDocument']).toHaveBeenCalledWith(addTagToDocumentDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from service.addTagToDocument', () => {
      const errorMessage = 'Add tag failed';
      (service.addTagToDocument as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.addTagToDocument(addTagToDocumentDto)).toThrow(errorMessage);
    });
  });

  describe('getDocument', () => {
    const getDocumentDto: GetDocumentDto = {
      campaign: 'testCampaign',
      documentId: 12345,
    };

    it('should call getDocument from veryfi service', () => {
      const expectedResult = { success: true };
      (service.getDocument as jest.Mock).mockReturnValue(expectedResult);

      const result = controller.getDocument(getDocumentDto);

      expect(service['getDocument']).toHaveBeenCalledTimes(1);
      expect(service['getDocument']).toHaveBeenCalledWith(getDocumentDto);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from service.getDocument', () => {
      const errorMessage = 'Get document failed';
      (service.getDocument as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.getDocument(getDocumentDto)).toThrow(errorMessage);
    });
  });
});
