import { checkTagsErrors, validateData } from './validateDocument';
import { ValidationError } from '@shared/utils/validation-error';
import { MicrositeDetails } from '@core/interfaces/campaigns.interfaces';
import {
  noProductFoundReceiptMock,
  duplicatedReceiptMock,
  noDateReceiptMock,
  notValidDateReceiptMock,
  notVendorReceiptMock,
  fraudReceiptMock,
  rejectedReceiptMock,
  manualReviewReceiptMock,
  approvedReceiptMock,
  receiptWithNoProductFoundMock,
  receiptWithValidProductsMock,
} from '@shared/mocks/veryfiDocument.mock';
import { getMicrositeConfig } from '@core/constants/campaigns.constants';

jest.mock('@core/constants/campaigns.constants', () => ({
  getMicrositeConfig: jest.fn(),
}));

describe('validateDocument', () => {
  const micrositeConfig: MicrositeDetails = {
    name: 'test-microsite',
    url: 'http://example.com',
    uid: 'uid-123',
    additionalProductsFields: { provider: 'provider', line: 'line' },
    tags: [
      'NO_PRODUCT_FOUND',
      'DUPLICATED',
      'NO_DATE',
      'NOT_VALID_DATE',
      'NO_VENDOR',
      'FRAUD',
      'REJECTED',
      'MANUAL_REVIEW',
    ],
    validationMessages: {
      NO_PRODUCT_FOUND: 'Product not found error',
      DUPLICATED: 'Duplicated error',
      NO_DATE: 'Date missing error',
      NOT_VALID_DATE: 'Invalid date error',
      NO_VENDOR: 'Vendor missing error',
      FRAUD: 'Fraud detected error',
      REJECTED: 'Rejected error',
      MANUAL_REVIEW: 'Manual review required',
    },
    category: 'category-test',
  };

  describe('checkTagsErrors', () => {
    it('should throw a ValidationError for noProductFoundReceiptMock', () => {
      expect(() => checkTagsErrors(noProductFoundReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(noProductFoundReceiptMock, micrositeConfig)).toThrow(
        'Product not found error Ref: 292672510',
      );
    });

    it('should throw a ValidationError for duplicatedReceiptMock', () => {
      expect(() => checkTagsErrors(duplicatedReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(duplicatedReceiptMock, micrositeConfig)).toThrow('Duplicated error Ref: 292672510');
    });

    it('should throw a ValidationError for noDateReceiptMock', () => {
      expect(() => checkTagsErrors(noDateReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(noDateReceiptMock, micrositeConfig)).toThrow('Date missing error Ref: 292672510');
    });

    it('should throw a ValidationError for notValidDateReceiptMock', () => {
      expect(() => checkTagsErrors(notValidDateReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(notValidDateReceiptMock, micrositeConfig)).toThrow(
        'Invalid date error Ref: 292672510',
      );
    });

    it('should throw a ValidationError for notVendorReceiptMock', () => {
      expect(() => checkTagsErrors(notVendorReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(notVendorReceiptMock, micrositeConfig)).toThrow(
        'Vendor missing error Ref: 292672510',
      );
    });

    it('should throw a ValidationError for fraudReceiptMock', () => {
      expect(() => checkTagsErrors(fraudReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(fraudReceiptMock, micrositeConfig)).toThrow('Fraud detected error Ref: 292672510');
    });

    it('should throw a ValidationError for rejectedReceiptMock', () => {
      expect(() => checkTagsErrors(rejectedReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(rejectedReceiptMock, micrositeConfig)).toThrow('Rejected error Ref: 292672510');
    });

    it('should throw a ValidationError for manualReviewReceiptMock', () => {
      expect(() => checkTagsErrors(manualReviewReceiptMock, micrositeConfig)).toThrow(ValidationError);
      expect(() => checkTagsErrors(manualReviewReceiptMock, micrositeConfig)).toThrow(
        'Manual review required Ref: 292672510',
      );
    });

    it('should not throw a ValidationError for approvedReceiptMock', () => {
      expect(() => checkTagsErrors(approvedReceiptMock, micrositeConfig)).not.toThrow(ValidationError);
    });
  });

  describe('validateData', () => {
    beforeEach(() => {
      (getMicrositeConfig as jest.Mock).mockReturnValue(micrositeConfig);
    });

    it('should throw a ValidationError when no valid line items are found', () => {
      expect(() => validateData(receiptWithNoProductFoundMock, 'sz')).toThrow(ValidationError);
      expect(() => validateData(receiptWithNoProductFoundMock, 'sz')).toThrow(
        `No se encontraron productos en esta factura. Ref 292672510`,
      );
    });

    it('should not throw an error when valid line items exist and no problematic tag is found', () => {
      expect(() => validateData(receiptWithValidProductsMock, 'sz')).not.toThrow();
    });
  });
});
