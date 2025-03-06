import { VeryfiReceipt } from './veryfi.interfaces';

export interface MicrositeConfig {
  [key: string]: MicrositeDetails;
}

export interface MicrositeDetails {
  name: string;
  url: string;
  uid: string;
  additionalProductsFields: AdditionalFields;
  tags: string[];
  validationMessages: Record<string, string>;
  category?: string;
  properties?: (data: VeryfiReceipt) => Record<string, any>;
}

export interface AdditionalFields {
  provider: string;
  line: string;
}
