import { VeryfiReceipt, VeryfiProduct } from '@core/interfaces/veryfi.interfaces';

export const baseReceipt: VeryfiReceipt = {
  account_number: '414289',
  bill_to: {
    address: null,
    name: null,
    parsed_address: null,
    vat_number: null,
  },
  cashback: null,
  category: 'Meals & Entertainment',
  created_date: '2025-03-11 18:11:36',
  currency_code: 'MXN',
  custom_fields: { date: 'true' },
  date: '2025-03-11 12:02:00',
  delivery_date: null,
  discount: 211.97,
  document_reference_number: '740463769046975802576',
  document_title: null,
  document_type: 'receipt',
  due_date: null,
  duplicate_of: null,
  external_id: '67d07cdcb6ec5c59db5d8cfc',
  guest_count: null,
  id: 292672510,
  img_file_name: '292672510.jpg',
  img_thumbnail_url: 'https://example.com/thumb.jpg',
  img_url: 'https://example.com/img.jpg',
  insurance: null,
  invoice_number: '08458',
  is_blurry: [false],
  is_document: true,
  is_duplicate: false,
  is_money_in: false,
  line_items: [],
  meta: {
    device_id: '123',
    device_user_uuid: 'abc',
    fraud: {
      attribution: null,
      color: 'green',
      decision: 'Not Fraud',
      fraudulent_pdf: { score: 0 },
      images: [{ is_lcd: false, score: 0.95 }],
      pages: [{ is_lcd: { score: 0.95, value: false } }],
      score: 0.05,
      submissions: {},
      types: [],
      version: null,
    },
    fraud_review: {
      decision: null,
      types: [],
    },
    language: ['es', 'en'],
    ocr_score: 0.97,
    owner: 'eduardo.herrera',
    pages: [
      {
        height: 3180,
        is_blurry: { score: 0.96, value: false },
        language: ['es', 'en'],
        width: 1058,
      },
    ],
    processed_pages: 1,
    source: 'lens.web',
    source_documents: [
      {
        height: 3180,
        size_kb: 546,
        width: 1058,
      },
    ],
    total_pages: 1,
    warnings: [
      {
        message: "Subtotal for Line Items doesn't match subtotal on document",
        type: 'totals_missmatch',
      },
    ],
  },
  notes: 'Sample note',
  ocr_text: 'Receipt OCR text',
  order_date: null,
  payment: {
    card_number: null,
    display_name: 'Visa',
    terms: null,
    type: 'visa',
  },
  pdf_url: 'https://example.com/pdf.pdf',
  purchase_order_number: null,
  reference_number: 'VCHEG-72510',
  rounding: null,
  server_name: null,
  service_end_date: null,
  service_start_date: null,
  ship_date: null,
  ship_to: {
    address: null,
    name: null,
    parsed_address: null,
  },
  shipping: null,
  status: 'reviewed',
  store_number: '3764',
  subtotal: 416.43,
  tags: [],
  tax: 158.6,
  tax_lines: [
    { base: 495.73, name: 'IVA', order: 0, rate: 16, total: 79.3 },
    { base: null, name: 'IVA', order: 1, rate: null, total: 79.3 },
  ],
  tip: null,
  total: 575.03,
  total_weight: null,
  tracking_number: null,
  updated_date: '2025-03-11 18:11:41',
  vendor: {
    abn_number: null,
    account_number: null,
    address:
      'NEXTENGO 78 STA. CRUZ ACAYUCAN 02776\nAZCAPOTZALCO MEX CDMX\nUNIDAD VILLA COAPA .\nAV CANAL DE MIRAMONTES 7620 CP14390',
    bank_name: null,
    bank_number: null,
    bank_swift: null,
    category: 'Grocery',
    email: null,
    fax_number: null,
    iban: null,
    lat: null,
    lng: null,
    logo: 'https://example.com/logo.png',
    name: 'Bodega Aurrera',
    parsed_address: {},
    phone_number: '8000000022',
    raw_address:
      'NEXTENGO 78 STA. CRUZ ACAYUCAN 02770\nAZCAPOTZALCO MEX CDMX\nUNIDAD IZTAPALAPA\nE.IZTAPALAPA # 875 CP. 09820 MEX. CDMX',
    raw_name: 'Bodega Aurrera NUEVA WAL MART DE MEXICO S DE RL DE CV',
    reg_number: null,
    type: 'Grocery',
    vat_number: 'NWM9709244W4',
    web: 'https://example.com',
  },
};

export const baseProduct: VeryfiProduct = {
  custom_fields: {},
  date: null,
  description: 'Sample Product',
  discount: -10,
  discount_rate: null,
  end_date: null,
  full_description: 'Sample full description',
  hsn: null,
  id: 12345,
  lot: null,
  normalized_description: null,
  order: 1,
  price: 100,
  product_details: [],
  quantity: 2,
  reference: null,
  section: null,
  sku: '7501019052392',
  start_date: null,
  tags: [],
  tax: null,
  tax_rate: null,
  text: 'Product text',
  total: 200,
  type: 'product',
  unit_of_measure: null,
  upc: null,
  weight: null,
};

export const approvedReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'APPROVED' }],
};

export const noProductFoundReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'NO_PRODUCT_FOUND' }],
};

export const duplicatedReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'DUPLICATED' }],
};

export const noDateReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'NO_DATE' }],
};

export const notValidDateReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'NOT_VALID_DATE' }],
};

export const notVendorReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'NO_VENDOR' }],
};

export const fraudReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'FRAUD' }],
};

export const rejectedReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'REJECTED' }],
};

export const manualReviewReceiptMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 12952400, name: 'MANUAL_REVIEW' }],
};

export const receiptWithNoProductFoundMock: VeryfiReceipt = {
  ...baseReceipt,
  line_items: [
    {
      ...baseProduct,
      tags: ['NO_PRODUCT_FOUND'],
    },
  ],
};

export const receiptWithValidProductsMock: VeryfiReceipt = {
  ...baseReceipt,
  line_items: [
    {
      ...baseProduct,
      tags: ['PRODUCT_FOUND'],
    },
  ],
};

export const receiptWithDifferentTagMock: VeryfiReceipt = {
  ...baseReceipt,
  tags: [{ id: 9479575, name: 'REJECTED' }],
};
