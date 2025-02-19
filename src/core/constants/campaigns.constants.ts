import { MicrositeConfig, MicrositeDetails } from '@core/interfaces/campaigns.interfaces';

export const MICROSITE_CONFIG: MicrositeConfig = {
  sz: {
    name: 'TENA',
    url: 'https://www.circulotena.com.mx/',
    uid: 'nickname',
    additionalProductsFields: {
      provider: 'TENA',
      line: 'TENA',
    },
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
      NO_PRODUCT_FOUND: 'No se encontraron productos TENA en esta factura.',
      DUPLICATED: 'Parece que esta factura ya ha sido registrada. Sube una factura diferente.',
      NOT_VALID_DATE: 'La fecha de la factura supera el periodo permitido. Por favor, sube una factura más reciente.',
      NO_DATE: 'No esta la fecha del ticket en la foto',
      NO_VENDOR: 'No pudimos identificar el nombre de la tienda. Intenta con una factura más legible.',
      FRAUD: 'Hemos detectado inconsistencias en la información proporcionada.',
      REJECTED: 'La factura no cumple con los criterios necesarios y ha sido rechazada.',
      MANUAL_REVIEW: 'La factura ha sido marcada para revisión manual.',
    },
  },
  ua: {
    name: 'SABA',
    url: 'https://sabaclub.com.mx/',
    uid: 'email',
    additionalProductsFields: {
      provider: 'SABA',
      line: 'SABA',
    },
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
      NO_PRODUCT_FOUND: 'No se encontraron productos SABA en esta factura.',
      DUPLICATED: 'Parece que esta factura ya ha sido registrada. Sube una factura diferente.',
      NOT_VALID_DATE: 'La fecha de la factura supera el periodo permitido. Por favor, sube una factura más reciente.',
      NO_DATE: 'No esta la fecha del ticket en la foto',
      NO_VENDOR: 'No pudimos identificar el nombre de la tienda. Intenta con una factura más legible.',
      FRAUD: 'Hemos detectado inconsistencias en la información proporcionada.',
      REJECTED: 'La factura no cumple con los criterios necesarios y ha sido rechazada.',
      MANUAL_REVIEW: 'La factura ha sido marcada para revisión manual.',
    },
  },
};

export const getMicrositeConfig = (campaignId: string): MicrositeDetails => {
  const key = campaignId as keyof typeof MICROSITE_CONFIG;
  return MICROSITE_CONFIG[key];
};
