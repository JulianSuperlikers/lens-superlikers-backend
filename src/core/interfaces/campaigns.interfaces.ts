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
}

export interface AdditionalFields {
  provider: string;
  line: string;
}
