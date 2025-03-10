jest.mock('@core/constants/campaigns.constants', () => ({
  getMicrositeConfig: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from './env.service';
import { ConfigService } from '@nestjs/config';
import * as campaignsConstants from '@core/constants/campaigns.constants';
import { MicrositeDetails } from '@core/interfaces/campaigns.interfaces';

const getMicrositeConfigMockData: MicrositeDetails = {
  name: 'mock-test',
  url: 'https://mock-url.com',
  uid: 'mock-uid',
  additionalProductsFields: { provider: 'mock-provider', line: 'mock-line' },
  tags: ['NO_PRODUCT_FOUND', 'REJECTED', 'MANUAL_REVIEW'],
  validationMessages: {
    NO_PRODUCT_FOUND: 'mock-message no_product_found',
    REJECTED: 'mock-message rejected',
    MANUAL_REVIEW: 'mock-message manual_review',
  },
  category: 'mock-category',
};

describe('EnvService', () => {
  let service: EnvService;
  let configService: ConfigService;

  beforeEach(async () => {
    (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue(getMicrositeConfigMockData);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => `${key}_value`),
          },
        },
      ],
    }).compile();

    service = module.get<EnvService>(EnvService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getConfig', () => {
    const campaign = 'mock-test';

    it('should return env variables', () => {
      const config = service.getConfig(campaign);
      const variablesAmount = Object.keys(config).length;

      expect(campaignsConstants.getMicrositeConfig).toHaveBeenCalledWith(campaign);
      expect(configService['get']).toHaveBeenCalledTimes(variablesAmount);
    });

    it('should return the correct config object', () => {
      const campaign = 'mock-test';
      const config = service.getConfig(campaign);
      expect(campaignsConstants.getMicrositeConfig).toHaveBeenCalledWith(campaign);

      expect(config).toEqual({
        SUPERLIKERS_URL: 'SUPERLIKERS_URL_value',
        VERYFI_VALIDATE_URL: 'VERYFI_VALIDATE_URL_value',
        VERYFI_BASE_URL: 'VERYFI_BASE_URL_value',
        SUPERLIKERS_CAMPAIGN_ID: 'mock-test_CAMPAIGN_ID_value',
        SUPERLIKERS_API_KEY: 'mock-test_API_KEY_value',
        VERYFI_CLIENT_ID: 'mock-test_VERYFI_CLIENT_ID_value',
        VERYFI_CLIENT_SECRET: 'mock-test_VERYFI_CLIENT_SECRET_value',
        VERYFI_API_KEY: 'mock-test_VERYFI_API_KEY_value',
        VERYFI_USERNAME: 'mock-test_VERYFI_USERNAME_value',
      });
    });
  });

  it('should call configService.get with the correct keys', () => {
    const campaign = 'mock-test';
    service.getConfig(campaign);

    const expectedKeys = [
      'SUPERLIKERS_URL',
      'VERYFI_VALIDATE_URL',
      'VERYFI_BASE_URL',
      'mock-test_CAMPAIGN_ID',
      'mock-test_API_KEY',
      'mock-test_VERYFI_CLIENT_ID',
      'mock-test_VERYFI_CLIENT_SECRET',
      'mock-test_VERYFI_API_KEY',
      'mock-test_VERYFI_USERNAME',
    ];

    expectedKeys.forEach((key) => {
      expect(configService['get']).toHaveBeenCalledWith(key);
    });
  });

  it('should handle undefined values from configService.get gracefully', () => {
    (configService.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'SUPERLIKERS_URL') {
        return undefined;
      }
      return `${key}_value`;
    });

    const campaign = 'mock-test';
    const config = service.getConfig(campaign);

    expect(config.SUPERLIKERS_URL).toBeUndefined();
  });
});
