import { Test, TestingModule } from '@nestjs/testing';
import { VeryfiService } from './veryfi.service';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';
import { GetDocumentDto } from './dtos/get-document.dto';
import { UploadDocumentDto } from './dtos/upload-document.dto';
import { DeviceDataDto } from './dtos/device-data.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { AddTagToDocumentDto } from './dtos/add-tag-document.dto';
import { approvedReceiptMock } from '@shared/mocks/veryfiDocument.mock';
import { handleHttpError } from '@shared/utils/http-error-handler';

jest.mock('@shared/utils/http-error-handler', () => ({
  handleHttpError: jest.fn(),
}));

const mockHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'CLIENT-ID': 'mockClientId',
  AUTHORIZATION: 'apikey mockUsername:mockApiKey',
};

const mockConfig = {
  VERYFI_USERNAME: 'mock-username',
  VERYFI_CLIENT_ID: 'mock-client_id',
  VERYFI_API_KEY: 'mock-api_key',
};

describe('VeryfiService', () => {
  let service: VeryfiService;
  let envService: EnvService;
  let httpClient: HttpClientBase;

  let getVeryfiHeadersSpy: jest.SpyInstance;
  let getConfigSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeryfiService,
        {
          provide: HttpClientBase,
          useValue: {
            get: jest.fn().mockResolvedValue(approvedReceiptMock),
            post: jest.fn().mockResolvedValue(approvedReceiptMock),
            put: jest.fn().mockResolvedValue(approvedReceiptMock),
          },
        },
        {
          provide: EnvService,
          useValue: {
            getConfig: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VeryfiService>(VeryfiService);
    envService = module.get(EnvService);
    httpClient = module.get(HttpClientBase);

    getVeryfiHeadersSpy = jest.spyOn(service as any, 'getVeryfiHeaders').mockReturnValue(mockHeaders);
    getConfigSpy = jest.spyOn(envService as any, 'getConfig').mockReturnValue(mockConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadDocument', () => {
    const deviceDataMock: DeviceDataDto = {
      browser_fingerprint: {},
      uuid: '12345',
      source: 'mock-source',
      user_uuid: 'user123',
    };

    const uploadDocumentDtoMock: UploadDocumentDto = {
      deviceData: deviceDataMock,
      document: 'testDocument',
      campaign: 'testCampaign',
    };

    const expectedUrl = `https://api.veryfi.com/api/v8/partner/documents`;

    const expectedBody = {
      file_data: 'testDocument',
      device_data: deviceDataMock,
    };

    it('should return a veryfiReceipt when http.post succeeds', async () => {
      const result = await service.uploadDocument(uploadDocumentDtoMock);

      expect(httpClient['post']).toHaveBeenCalledTimes(1);
      expect(httpClient['post']).toHaveBeenCalledWith(expectedUrl, expectedBody, mockHeaders);

      expect(getVeryfiHeadersSpy).toHaveBeenCalledTimes(1);
      expect(getVeryfiHeadersSpy).toHaveBeenCalledWith('mock-client_id', 'mock-username', 'mock-api_key');

      expect(getConfigSpy).toHaveBeenCalledTimes(1);
      expect(getConfigSpy).toHaveBeenCalledWith(uploadDocumentDtoMock.campaign);

      expect(result).toEqual(approvedReceiptMock);
    });

    it('should throw an error when http.post fails', async () => {
      const error = new Error('Network error');
      (httpClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.uploadDocument(uploadDocumentDtoMock)).rejects.toThrow(
        'Failed to upload document to Veryfi',
      );

      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });

  describe('getDocument', () => {
    const getDocumentDtoMock: GetDocumentDto = {
      campaign: 'campaign',
      documentId: 12345,
    };

    const expectedUrl = `https://api.veryfi.com/api/v8/partner/documents/${getDocumentDtoMock.documentId}`;

    it('should return a valid VeryfiReceipt when http.get succeeds', async () => {
      const result = await service.getDocument(getDocumentDtoMock);

      expect(httpClient['get']).toHaveBeenCalledTimes(1);
      expect(httpClient['get']).toHaveBeenCalledWith(expectedUrl, {}, mockHeaders);

      expect(getVeryfiHeadersSpy).toHaveBeenCalledTimes(1);
      expect(getVeryfiHeadersSpy).toHaveBeenCalledWith('mock-client_id', 'mock-username', 'mock-api_key');

      expect(getConfigSpy).toHaveBeenCalledTimes(1);
      expect(getConfigSpy).toHaveBeenCalledWith(getDocumentDtoMock.campaign);

      expect(result).toEqual(approvedReceiptMock);
    });

    it('should throw an error when http.get fails', async () => {
      const error = new Error('Network error');
      (httpClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.getDocument(getDocumentDtoMock)).rejects.toThrow('Failed to get document in Veryfi');
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });

  describe('updateDocument', () => {
    const updateDocumentDtoMock: UpdateDocumentDto = {
      documentId: 98765,
      campaign: 'testCampaign',
      data: { field: 'value' },
    };

    const expectedUrl = `https://api.veryfi.com/api/v8/partner/documents/${updateDocumentDtoMock.documentId}`;

    it('should return a veryfiReceipt when http.put succeeds', async () => {
      const result = await service.updateDocument(updateDocumentDtoMock);

      expect(httpClient['put']).toHaveBeenCalledTimes(1);
      expect(httpClient['put']).toHaveBeenCalledWith(expectedUrl, updateDocumentDtoMock.data, mockHeaders);

      expect(getVeryfiHeadersSpy).toHaveBeenCalledTimes(1);
      expect(getVeryfiHeadersSpy).toHaveBeenCalledWith('mock-client_id', 'mock-username', 'mock-api_key');

      expect(getConfigSpy).toHaveBeenCalledTimes(1);
      expect(getConfigSpy).toHaveBeenCalledWith(updateDocumentDtoMock.campaign);

      expect(result).toEqual(approvedReceiptMock);
    });

    it('should throw an error when http.put fails', async () => {
      const error = new Error('Network error');
      (httpClient.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.updateDocument(updateDocumentDtoMock)).rejects.toThrow(
        'Failed to update document to Veryfi',
      );
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });

  describe('addTagToDocument', () => {
    const addTagToDocumentDtoMock: AddTagToDocumentDto = {
      documentId: 54321,
      campaign: 'testCampaign',
      tag: 'urgent',
    };

    const expectedUrl = `https://api.veryfi.com/api/v8/partner/documents/${addTagToDocumentDtoMock.documentId}/tags`;
    const expectedBody = { name: addTagToDocumentDtoMock.tag };

    it('should return a veryfiReceipt when http.put succeeds', async () => {
      const result = await service.addTagToDocument(addTagToDocumentDtoMock);

      expect(httpClient['put']).toHaveBeenCalledTimes(1);
      expect(httpClient['put']).toHaveBeenCalledWith(expectedUrl, expectedBody, mockHeaders);

      expect(getVeryfiHeadersSpy).toHaveBeenCalledTimes(1);
      expect(getVeryfiHeadersSpy).toHaveBeenCalledWith('mock-client_id', 'mock-username', 'mock-api_key');

      expect(getConfigSpy).toHaveBeenCalledTimes(1);
      expect(getConfigSpy).toHaveBeenCalledWith(addTagToDocumentDtoMock.campaign);

      expect(result).toEqual(approvedReceiptMock);
    });

    it('should throw an error when http.put fails', async () => {
      const error = new Error('Network error');
      (httpClient.put as jest.Mock).mockRejectedValueOnce(error);

      await service.addTagToDocument(addTagToDocumentDtoMock);
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });
});
