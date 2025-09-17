import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class BillToDto {
  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  parsed_address?: string | null;

  @IsOptional()
  @IsString()
  vat_number?: string | null;
}

export class PaymentDto {
  @IsOptional()
  @IsString()
  card_number?: string | null;

  @IsOptional()
  @IsString()
  display_name?: string | null;

  @IsOptional()
  @IsString()
  terms?: string | null;

  @IsString()
  type: string;
}

export class ShipToDto {
  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  parsed_address?: string | null;
}

export class VeryfiProductDetailsDto {
  @IsOptional()
  @IsNumber()
  avg_price?: number | null;

  @IsOptional()
  @IsString()
  brand?: string | null;

  @IsOptional()
  @IsString()
  ean?: string | null;

  @IsOptional()
  @IsObject()
  extra_fields?: Record<string, any>;

  @IsOptional()
  @IsString()
  gtin_14?: string | null;

  @IsOptional()
  @IsString()
  image?: string | null;

  @IsOptional()
  @IsString()
  image_url?: string | null;

  @IsOptional()
  @IsNumber()
  match_score?: number | null;

  @IsOptional()
  @IsString()
  product_name?: string | null;

  @IsOptional()
  @IsString()
  segment?: string | null;

  @IsOptional()
  @IsString()
  veryn?: string | null;
}

export class VeryfiProductDto {
  @IsOptional()
  @IsObject()
  custom_fields?: Record<string, any>;

  @IsOptional()
  @IsString()
  date?: string | null;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  discount?: number | null;

  @IsOptional()
  @IsNumber()
  discount_rate?: number | null;

  @IsOptional()
  @IsString()
  end_date?: string | null;

  @IsOptional()
  @IsString()
  full_description?: string;

  @IsOptional()
  @IsString()
  hsn?: string | null;

  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  lot?: string | null;

  @IsOptional()
  @IsString()
  normalized_description?: string | null;

  @IsInt()
  order: number;

  @IsOptional()
  @IsNumber()
  price?: number | null;

  @IsOptional()
  @IsObject()
  product_info?: {
    brand?: string | null;
    category?: string[];
    expanded_description?: string | null;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiProductDetailsDto)
  product_details: VeryfiProductDetailsDto[];

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  reference?: string | null;

  @IsOptional()
  @IsString()
  section?: string | null;

  @IsOptional()
  @IsString()
  sku?: string | null;

  @IsOptional()
  @IsString()
  start_date?: string | null;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsNumber()
  tax?: number | null;

  @IsOptional()
  @IsNumber()
  tax_rate?: number | null;

  @IsString()
  text: string;

  @IsNumber()
  total: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  unit_of_measure?: string | null;

  @IsOptional()
  @IsString()
  upc?: string | null;

  @IsOptional()
  @IsString()
  weight?: string | null;
}

export class VeryfiMetaFraudImageDto {
  @IsBoolean()
  is_lcd: boolean;

  @IsNumber()
  score: number;
}

export class VeryfiMetaFraudPdfDto {
  @IsNumber()
  score: number;
}

export class VeryfiMetaFraudPageDto {
  @IsObject()
  is_lcd: { score: number; value: boolean };
}

export class VeryfiMetaFraudDto {
  @IsOptional()
  @IsString()
  attribution?: string | null;

  @IsString()
  color: string;

  @IsString()
  decision: string;

  @ValidateNested()
  @Type(() => VeryfiMetaFraudPdfDto)
  fraudulent_pdf: VeryfiMetaFraudPdfDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiMetaFraudImageDto)
  images: VeryfiMetaFraudImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiMetaFraudPageDto)
  pages: VeryfiMetaFraudPageDto[];

  @IsNumber()
  score: number;

  @IsObject()
  submissions: Record<string, any>;

  @IsArray()
  @IsString({ each: true })
  types: string[];

  @IsOptional()
  @IsString()
  version?: string | null;
}

export class VeryfiMetaFraudReviewDto {
  @IsOptional()
  @IsString()
  decision?: string | null;

  @IsArray()
  @IsString({ each: true })
  types: string[];
}

export class VeryfiMetaPageDto {
  @IsNumber()
  height: number;

  @IsObject()
  @Transform(({ value }): { score: number; value: boolean } =>
    typeof value === 'boolean' ? { score: 0, value } : (value as { score: number; value: boolean }),
  )
  is_blurry: { score: number; value: boolean };

  @IsArray()
  @IsString({ each: true })
  language: string[];

  @IsOptional()
  @IsObject()
  screenshot?: { score: number; type: string | null };

  @IsNumber()
  width: number;
}

export class VeryfiMetaSourceDocumentDto {
  @IsNumber()
  height: number;

  @IsNumber()
  size_kb: number;

  @IsNumber()
  width: number;
}

export class VeryfiMetaWarningDto {
  @IsString()
  message: string;

  @IsString()
  type: string;
}

export class VeryfiMetaDto {
  @IsString()
  device_id: string;

  @IsOptional()
  @IsString()
  device_user_uuid: string | null;

  @IsArray()
  duplicates: any[];

  @ValidateNested()
  fraud: Record<string, any>;

  @ValidateNested()
  fraud_review: Record<string, any>;

  @IsArray()
  @IsString({ each: true })
  language: string[];

  @IsNumber()
  ocr_score: number;

  @IsString()
  owner: string;

  @IsArray()
  pages: Record<string, any>[];

  @IsNumber()
  processed_pages: number;

  @IsString()
  source: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiMetaSourceDocumentDto)
  source_documents: VeryfiMetaSourceDocumentDto[];

  @IsNumber()
  total_pages: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiMetaWarningDto)
  warnings: VeryfiMetaWarningDto[];
}

export class VeryfiTagDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class VeryfiTaxLineDto {
  @IsOptional()
  @IsNumber()
  base?: number | null;

  @IsString()
  name: string;

  @IsInt()
  order: number;

  @IsOptional()
  @IsNumber()
  rate?: number | null;

  @IsNumber()
  total: number;
}

export class VeryfiVendorDto {
  @IsOptional()
  @IsString()
  abn_number?: string | null;

  @IsOptional()
  @IsString()
  account_number?: string | null;

  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsString()
  bank_name?: string | null;

  @IsOptional()
  @IsString()
  bank_number?: string | null;

  @IsOptional()
  @IsString()
  bank_swift?: string | null;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  email?: string | null;

  @IsOptional()
  @IsString()
  fax_number?: string | null;

  @IsOptional()
  @IsString()
  iban?: string | null;

  @IsOptional()
  @IsNumber()
  lat?: number | null;

  @IsOptional()
  @IsNumber()
  lng?: number | null;

  @IsOptional()
  @IsString()
  logo?: string | null;

  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  parsed_address?: Record<string, any>;

  @IsOptional()
  @IsString()
  phone_number?: string | null;

  @IsOptional()
  @IsString()
  raw_address?: string | null;

  @IsOptional()
  @IsString()
  raw_name?: string | null;

  @IsOptional()
  @IsString()
  reg_number?: string | null;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  vat_number?: string | null;

  @IsOptional()
  @IsString()
  web?: string | null;
}

export class VeryfiReceiptDto {
  @IsOptional()
  @IsString()
  account_number?: string | null;

  @IsArray()
  @Transform(({ value }): string[] => {
    if (Array.isArray(value)) {
      return (value as unknown[]).filter((v): v is string | number | boolean => v != null).map((v) => String(v));
    }
    return [];
  })
  @IsString({ each: true })
  barcodes: string[];

  @ValidateNested()
  @Type(() => BillToDto)
  bill_to: BillToDto;

  @IsOptional()
  @IsNumber()
  cashback?: number | null;

  @IsString()
  category: string;

  @IsString()
  created_date: string;

  @IsString()
  currency_code: string;

  @IsOptional()
  @IsObject()
  custom_fields?: Record<string, string>;

  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  delivery_date?: string | null;

  @IsOptional()
  @IsNumber()
  discount?: number | null;

  @IsString()
  document_reference_number: string;

  @IsOptional()
  @IsString()
  document_title?: string | null;

  @IsString()
  document_type: string;

  @IsOptional()
  @IsString()
  due_date?: string | null;

  @IsOptional()
  @IsString()
  duplicate_of?: string | null;

  @IsOptional()
  @IsString()
  external_id?: string | null;

  @IsOptional()
  @IsNumber()
  guest_count?: number | null;

  @IsInt()
  id: number;

  @IsString()
  img_file_name: string;

  @IsString()
  img_thumbnail_url: string;

  @IsString()
  img_url: string;

  @IsOptional()
  @IsString()
  insurance?: string | null;

  @IsString()
  invoice_number: string;

  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  is_blurry?: boolean[];

  @IsBoolean()
  @IsOptional()
  is_document?: boolean;

  @IsBoolean()
  is_duplicate: boolean;

  @IsBoolean()
  is_money_in: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiProductDto)
  line_items: VeryfiProductDto[];

  @ValidateNested()
  @Type(() => VeryfiMetaDto)
  meta: VeryfiMetaDto;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  ocr_text: string;

  @IsOptional()
  @IsString()
  order_date?: string | null;

  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @IsString()
  pdf_url: string;

  @IsOptional()
  @IsString()
  purchase_order_number?: string | null;

  @IsOptional()
  @IsString()
  reference_number?: string | null;

  @IsOptional()
  @IsNumber()
  rounding?: number | null;

  @IsOptional()
  @IsString()
  server_name?: string | null;

  @IsOptional()
  @IsString()
  service_end_date?: string | null;

  @IsOptional()
  @IsString()
  service_start_date?: string | null;

  @IsOptional()
  @IsString()
  ship_date?: string | null;

  @ValidateNested()
  @Type(() => ShipToDto)
  ship_to: ShipToDto;

  @IsOptional()
  @IsNumber()
  shipping?: number | null;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  store_number?: string | null;

  @IsNumber()
  subtotal: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiTagDto)
  tags: VeryfiTagDto[];

  @IsOptional()
  tax?: number | Record<string, any> | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeryfiTaxLineDto)
  tax_lines: VeryfiTaxLineDto[];

  @IsOptional()
  @IsNumber()
  tip?: number | null;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsNumber()
  total_weight?: number | null;

  @IsOptional()
  @IsString()
  tracking_number?: string | null;

  @IsString()
  updated_date: string;

  @ValidateNested()
  @Type(() => VeryfiVendorDto)
  vendor: VeryfiVendorDto;
}
