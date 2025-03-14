import { Test, TestingModule } from '@nestjs/testing';
import { SuperlikersService } from './superlikers.service';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';
import { GetParticipantDto } from './dtos/get-participant.dto';
import { SendExternalDto } from './dtos/send-external.dto';
import { RegisterSaleDto } from './dtos/register-sale.dto';
import { handleHttpError } from '@shared/utils/http-error-handler';
import { Config } from '@core/interfaces/config.interfaces';

jest.mock('@shared/utils/http-error-handler', () => ({
  handleHttpError: jest.fn(),
}));

const mockConfig = {
  SUPERLIKERS_URL: 'https://mock.superlikers.com',
  SUPERLIKERS_CAMPAIGN_ID: 'mockCampaignId',
  SUPERLIKERS_API_KEY: 'mockApiKey',
};

describe('SuperlikersService', () => {
  let service: SuperlikersService;
  let envService: EnvService;
  let httpClient: HttpClientBase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperlikersService,
        {
          provide: HttpClientBase,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
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

    service = module.get<SuperlikersService>(SuperlikersService);
    envService = module.get(EnvService);
    httpClient = module.get(HttpClientBase);

    jest.spyOn(envService, 'getConfig').mockReturnValue(mockConfig as Config);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getParticipant', () => {
    const getParticipantDtoMock: GetParticipantDto = {
      campaign: 'testCampaign',
      uid: 'testUser123',
    };

    const expectedUrl = `${mockConfig.SUPERLIKERS_URL}/participants/info`;
    const expectedParams = {
      campaign: mockConfig.SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: getParticipantDtoMock.uid,
    };
    const expectedHeaders = {
      Authorization: `Bearer ${mockConfig.SUPERLIKERS_API_KEY}`,
    };

    it('should return participant object when http.get succeeds', async () => {
      const mockResponse = { object: { id: 'participant1', name: 'Test Participant' } };
      (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.getParticipant(getParticipantDtoMock);

      expect(httpClient['get']).toHaveBeenCalledWith(expectedUrl, expectedParams, expectedHeaders);
      expect(result).toEqual(mockResponse.object);
    });

    it('should throw an error when http.get fails', async () => {
      const error = new Error('Network error');
      (httpClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.getParticipant(getParticipantDtoMock)).rejects.toThrow();
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });

  describe('sendExternal', () => {
    const sendExternalDtoMock: SendExternalDto = {
      campaign: 'testCampaign',
      uid: 'testUser123',
      event: 'testEvent',
      properties: { key: 'value' },
    };

    const expectedUrl = `${mockConfig.SUPERLIKERS_URL}/events`;
    const expectedBody = {
      event: sendExternalDtoMock.event,
      api_key: mockConfig.SUPERLIKERS_API_KEY,
      campaign: mockConfig.SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: sendExternalDtoMock.uid,
      properties: sendExternalDtoMock.properties,
    };

    it('should return response when http.post succeeds', async () => {
      const mockResponse = { success: true };
      (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.sendExternal(sendExternalDtoMock);

      expect(httpClient['post']).toHaveBeenCalledWith(expectedUrl, expectedBody);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when http.post fails', async () => {
      const error = new Error('Network error');
      (httpClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.sendExternal(sendExternalDtoMock)).rejects.toThrow();
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });
  });

  describe('registerSale', () => {
    const registerSaleDtoMock: RegisterSaleDto = {
      campaign: 'testCampaign',
      uid: 'testUser123',
      ref: 'saleRef1',
      products: [
        {
          ref: 'prod1',
          price: 10,
          quantity: 2,
          provider: 'provider1',
          type: 'type1',
          line: 'line1',
        },
      ],
      date: 1234567890,
      properties: { prop: 'value' },
      discount: 5,
      category: 'category1',
    };

    const expectedUrl = `${mockConfig.SUPERLIKERS_URL}/retail/buy`;
    const expectedBody = {
      api_key: mockConfig.SUPERLIKERS_API_KEY,
      campaign: mockConfig.SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: registerSaleDtoMock.uid,
      ref: registerSaleDtoMock.ref,
      products: registerSaleDtoMock.products,
      date: registerSaleDtoMock.date,
      properties: registerSaleDtoMock.properties,
      discount: registerSaleDtoMock.discount,
      category: registerSaleDtoMock.category,
    };

    it('should return invoice when http.post succeeds', async () => {
      const mockResponse = { invoice: { invoiceId: 'invoice123' } };
      (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.registerSale(registerSaleDtoMock);

      expect(httpClient['post']).toHaveBeenCalledWith(expectedUrl, expectedBody);
      expect(result).toEqual(mockResponse.invoice);
    });

    it('should throw an error when http.post fails', async () => {
      const error = new Error('Network error');
      (httpClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(service.registerSale(registerSaleDtoMock)).rejects.toThrow();
      expect(handleHttpError).toHaveBeenCalledWith(error);
    });

    it('should correctly handle missing optional fields', async () => {
      const minimalRegisterSaleDto: RegisterSaleDto = {
        campaign: 'testCampaign',
        uid: 'testUser123',
        ref: 'saleRef2',
        products: [
          {
            ref: 'prod2',
            price: 20,
            quantity: 1,
            provider: 'provider2',
          },
        ],
      };

      const expectedMinimalBody = {
        api_key: mockConfig.SUPERLIKERS_API_KEY,
        campaign: mockConfig.SUPERLIKERS_CAMPAIGN_ID,
        distinct_id: minimalRegisterSaleDto.uid,
        ref: minimalRegisterSaleDto.ref,
        products: minimalRegisterSaleDto.products,
      };

      const mockResponse = { invoice: { invoiceId: 'invoice456' } };
      (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.registerSale(minimalRegisterSaleDto);

      expect(httpClient['post']).toHaveBeenCalledWith(expectedUrl, expectedMinimalBody);
      expect(result).toEqual(mockResponse.invoice);
    });
  });
});
