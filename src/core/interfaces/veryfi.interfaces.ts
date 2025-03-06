export interface VeryfiReceipt {
  account_number?: string | null;
  bill_to: {
    address?: string | null;
    name?: string | null;
    parsed_address?: string | null;
    vat_number?: string | null;
  };
  cashback?: number | null;
  category: string;
  created_date: string;
  currency_code: string;
  custom_fields?: Record<string, string>;
  date: string;
  delivery_date?: string | null;
  discount?: number | null;
  document_reference_number: string;
  document_title?: string | null;
  document_type: string;
  due_date?: string | null;
  duplicate_of?: string | null;
  external_id?: string | null;
  guest_count?: number | null;
  id: number;
  img_file_name: string;
  img_thumbnail_url: string;
  img_url: string;
  insurance?: string | null;
  invoice_number: string;
  is_blurry?: boolean[];
  is_document: boolean;
  is_duplicate: boolean;
  is_money_in: boolean;
  line_items: VeryfiProduct[];
  meta: VeryfiMeta;
  notes?: string;
  ocr_text: string;
  order_date?: string | null;
  payment: {
    card_number?: string | null;
    display_name?: string | null;
    terms?: string | null;
    type: string;
  };
  pdf_url: string;
  purchase_order_number?: string | null;
  reference_number?: string | null;
  rounding?: number | null;
  server_name?: string | null;
  service_end_date?: string | null;
  service_start_date?: string | null;
  ship_date?: string | null;
  ship_to: {
    address?: string | null;
    name?: string | null;
    parsed_address?: string | null;
  };
  shipping?: number | null;
  status: string;
  store_number?: string | null;
  subtotal: number;
  tags: VeryfiTag[];
  tax: number;
  tax_lines: VeryfiTaxLine[];
  tip?: number | null;
  total: number;
  total_weight?: number | null;
  tracking_number?: string | null;
  updated_date: string;
  vendor: VeryfiVendor;
}

export interface VeryfiProduct {
  custom_fields?: Record<string, any>;
  date?: string | null;
  description: string;
  discount?: number | null;
  discount_rate?: number | null;
  end_date?: string | null;
  full_description?: string;
  hsn?: string | null;
  id: number;
  lot?: string | null;
  normalized_description?: string | null;
  order: number;
  price?: number | null;
  product_details: VeryfiProductDetails[];
  quantity: number;
  reference?: string | null;
  section?: string | null;
  sku?: string | null;
  start_date?: string | null;
  tags: string[];
  tax?: number | null;
  tax_rate?: number | null;
  text: string;
  total: number;
  type: string;
  unit_of_measure?: string | null;
  upc?: string | null;
  weight?: string | null;
}

export interface VeryfiProductDetails {
  avg_price?: number | null;
  brand?: string | null;
  ean?: string | null;
  extra_fields?: Record<string, any>;
  gtin_14?: string | null;
  image?: string | null;
  image_url?: string | null;
  match_score?: number | null;
  product_name?: string | null;
  segment?: string | null;
  veryn?: string | null;
}

export interface VeryfiMeta {
  device_id: string;
  device_user_uuid: string;
  fraud: {
    attribution?: string | null;
    color: string;
    decision: string;
    fraudulent_pdf: { score: number };
    images: { is_lcd: boolean; score: number }[];
    pages: { is_lcd: { score: number; value: boolean } }[];
    score: number;
    submissions: Record<string, any>;
    types: string[];
    version?: string | null;
  };
  fraud_review: {
    decision?: string | null;
    types: string[];
  };
  language: string[];
  ocr_score: number;
  owner: string;
  pages: {
    height: number;
    is_blurry: { score: number; value: boolean };
    language: string[];
    width: number;
  }[];
  processed_pages: number;
  source: string;
  source_documents: {
    height: number;
    size_kb: number;
    width: number;
  }[];
  total_pages: number;
  warnings: { message: string; type: string }[];
}

export interface VeryfiTag {
  id: number;
  name: string;
}

export interface VeryfiTaxLine {
  base?: number | null;
  name: string;
  order: number;
  rate?: number | null;
  total: number;
}

export interface VeryfiVendor {
  abn_number?: string | null;
  account_number?: string | null;
  address?: string | null;
  bank_name?: string | null;
  bank_number?: string | null;
  bank_swift?: string | null;
  category: string;
  email?: string | null;
  fax_number?: string | null;
  iban?: string | null;
  lat?: number | null;
  lng?: number | null;
  logo?: string | null;
  name: string;
  parsed_address?: Record<string, any>;
  phone_number?: string | null;
  raw_address?: string | null;
  raw_name?: string | null;
  reg_number?: string | null;
  type: string;
  vat_number?: string | null;
  web?: string | null;
}

export interface DeviceData {
  browser_fingerprint: {
    ua: string;
    browser_name?: string;
    browser_version?: string;
    browser_major?: string;
    engine_name?: string;
    engine_version?: string;
    os_name?: string;
    os_version?: string;
    device_vendor?: string;
    device_model?: string;
    timeZone?: string;
    tzOffset?: number;
    screenSize?: string;
    isCookiesEnabled?: boolean;
    domLocalStorage?: boolean;
    domSessionStorage?: boolean;
    indexedDB?: boolean;
    canvasFingerprint?: string;
    webglRenderer?: string;
    isDntHeaderEnabled?: boolean;
    language?: string;
    platform?: string;
    maxTouchpoints?: number;
    hardwareConcurrency?: number;
    deviceMemory?: number;
  };
  uuid: string;
  source: string;
}

export interface WebhookResponse {
  event: string;
  data: FieldsData[];
  start: Date;
  end: Date;
}

export interface FieldsData {
  id: number;
  changed_fields: string[];
}
