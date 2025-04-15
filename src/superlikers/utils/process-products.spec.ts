import { VeryfiProduct, VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { baseReceipt } from '@shared/mocks/veryfiDocument.mock';
import { calculateDiscount, extractProductsFromDocument, getSaleBody } from '@superlikers/utils/process-products';
import * as campaignsConstants from '@core/constants/campaigns.constants';
import * as processProducts from '@superlikers/utils/process-products';
import { MicrositeDetails } from '@core/interfaces/campaigns.interfaces';

jest.mock('@core/constants/campaigns.constants', () => ({
  getMicrositeConfig: jest.fn(),
}));

describe('ProcessProducts', () => {
  const campaignMock = 'sz';

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

  describe('getSaleBody', () => {
    const products: Partial<VeryfiProduct>[] = [
      {
        discount: -10,
        quantity: 3,
        tags: ['PRODUCT_FOUND'],
        total: 150,
        description: 'mock-description1',
        product_details: [
          {
            product_name: 'mock-name1',
          },
        ],
      },
    ];

    const document = { ...baseReceipt, line_items: products } as VeryfiReceipt;

    beforeEach(() => {
      (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue(getMicrositeConfigMockData);

      jest.spyOn(processProducts, 'extractProductsFromDocument');
      jest.spyOn(processProducts, 'calculateDiscount');
    });

    it('should return sale without properties', () => {
      const result = getSaleBody('mock-uid', document, campaignMock);

      expect(processProducts.extractProductsFromDocument).toHaveBeenCalledWith(document, campaignMock);
      expect(processProducts.calculateDiscount).toHaveBeenCalledWith(products);

      expect(result).toEqual({
        campaign: 'sz',
        category: 'mock-category',
        discount: 10,
        products: [
          {
            line: 'mock-line',
            price: 50,
            provider: 'mock-provider',
            quantity: 3,
            ref: 'mock-name1',
            type: 'Bodega Aurrera',
          },
        ],
        ref: '292672510',
        uid: 'mock-uid',
      });
    });

    it('should include properties when micrositeConfig.properties is defined', () => {
      const propertiesValue = { customProp: 'value' };

      const micrositeConfigWithProps = {
        ...getMicrositeConfigMockData,
        properties: () => propertiesValue,
      };
      (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue(micrositeConfigWithProps);

      const result = getSaleBody('mock-uid', document, 'sz');
      expect(result).toHaveProperty('properties', propertiesValue);
    });
  });

  describe('extractProductsFromDocument', () => {
    beforeEach(() => {
      (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue(getMicrositeConfigMockData);
    });

    it('should extract product details correctly when microsite config does not include additionalProductsFields', () => {
      (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue({
        name: 'mock-test',
        url: 'https://mock-url.com',
        uid: 'mock-uid',
        tags: ['NO_PRODUCT_FOUND', 'REJECTED', 'MANUAL_REVIEW'],
        validationMessages: {
          NO_PRODUCT_FOUND: 'mock-message no_product_found',
          REJECTED: 'mock-message rejected',
          MANUAL_REVIEW: 'mock-message manual_review',
        },
        category: 'mock-category',
      });

      const products: Partial<VeryfiProduct>[] = [
        {
          discount: -10,
          quantity: 3,
          tags: ['PRODUCT_FOUND'],
          total: 150,
          description: 'mock-description1',
          product_details: [
            {
              product_name: 'mock-name1',
            },
          ],
        },
      ];

      const document = { ...baseReceipt, line_items: products } as VeryfiReceipt;

      const result = extractProductsFromDocument(document, campaignMock);
      expect(result).toEqual([
        {
          price: 50,
          quantity: 3,
          ref: 'mock-name1',
          type: 'Bodega Aurrera',
        },
      ]);
    });

    it('should merge additionalProductsFields into product details when provided by the microsite config', () => {
      (campaignsConstants.getMicrositeConfig as jest.Mock).mockReturnValue(getMicrositeConfigMockData);

      const products: Partial<VeryfiProduct>[] = [
        {
          discount: -10,
          quantity: 3,
          tags: ['PRODUCT_FOUND'],
          total: 150,
          description: 'mock-description1',
          product_details: [
            {
              product_name: 'mock-name1',
            },
          ],
        },
      ];

      const document = { ...baseReceipt, line_items: products } as VeryfiReceipt;

      const result = extractProductsFromDocument(document, campaignMock);
      expect(result).toEqual([
        {
          line: 'mock-line',
          price: 50,
          provider: 'mock-provider',
          quantity: 3,
          ref: 'mock-name1',
          type: 'Bodega Aurrera',
        },
      ]);
    });

    it('should default to the description when product_details is empty or missing product_name', () => {
      const products: Partial<VeryfiProduct>[] = [
        {
          discount: -10,
          quantity: 3,
          tags: ['PRODUCT_FOUND'],
          total: 150,
          description: 'mock-description1',
          product_details: [],
        },
      ];

      const document = { ...baseReceipt, line_items: products } as VeryfiReceipt;

      const result = extractProductsFromDocument(document, campaignMock);
      expect(result).toEqual([
        {
          line: 'mock-line',
          price: 50,
          provider: 'mock-provider',
          quantity: 3,
          ref: 'mock-description1',
          type: 'Bodega Aurrera',
        },
      ]);
    });

    it('should return a price of 0 when the product quantity is 0', () => {
      const products: Partial<VeryfiProduct>[] = [
        {
          discount: -10,
          quantity: 0,
          tags: ['PRODUCT_FOUND'],
          total: 150,
          description: 'mock-description1',
          product_details: [],
        },
      ];

      const document = { ...baseReceipt, line_items: products } as VeryfiReceipt;

      const result = extractProductsFromDocument(document, campaignMock);
      expect(result).toEqual([
        {
          line: 'mock-line',
          price: 0,
          provider: 'mock-provider',
          quantity: 0,
          ref: 'mock-description1',
          type: 'Bodega Aurrera',
        },
      ]);
    });
  });

  describe('calculateDiscount', () => {
    it('should correctly calculate discount from product items with direct discount values', () => {
      const products: Partial<VeryfiProduct>[] = [
        { discount: -10, tags: ['PRODUCT_FOUND'], total: 200 },
        { discount: -50, tags: ['PRODUCT_FOUND'], total: 200 },
      ];

      const result = calculateDiscount(products as VeryfiProduct[]);
      expect(result).toBe(60);
    });

    it('should correctly calculate discount when discount values are provided as separate line items', () => {
      const products: Partial<VeryfiProduct>[] = [
        { discount: -10, price: 100, quantity: 2, tags: ['PRODUCT_FOUND'], total: 200 },
        { tags: ['PRODUCT_FOUND'], total: -200 },
        { tags: [], total: -20 },
      ];

      const result = calculateDiscount(products as VeryfiProduct[]);
      expect(result).toBe(210);
    });

    it('should return 0 when no product items are provided', () => {
      const products: VeryfiProduct[] = [];
      const result = calculateDiscount(products);
      expect(result).toBe(0);
    });

    it('should ignore non-product items (missing "PRODUCT_FOUND" tag) when calculating discount', () => {
      const products: Partial<VeryfiProduct>[] = [
        { discount: -20, tags: ['OTHER_TAG'], total: 100 },
        { total: -100, tags: ['OTHER_TAG'] },
      ];
      const result = calculateDiscount(products as VeryfiProduct[]);
      expect(result).toBe(0);
    });

    it('should only sum discounts that are defined and non-zero for product items', () => {
      const products: Partial<VeryfiProduct>[] = [
        { tags: ['PRODUCT_FOUND'], total: 100 },
        { discount: 0, tags: ['PRODUCT_FOUND'], total: 150 },
        { discount: -30, tags: ['PRODUCT_FOUND'], total: 200 },
        { tags: ['PRODUCT_FOUND'], total: -50 },
      ];

      const result = calculateDiscount(products as VeryfiProduct[]);
      expect(result).toBe(80);
    });
  });
});
