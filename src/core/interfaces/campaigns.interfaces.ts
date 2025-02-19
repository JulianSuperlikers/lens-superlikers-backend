export interface MicrositeConfig {
  [key: string]: MicrositeDetails;
}

export interface MicrositeDetails {
  name: string;
  url: string;
  uid: string;
  additionalProductsFields: {
    provider: string;
    line: string;
  };
  tags: string[];
  validationMessages: Record<string, string>;
}
