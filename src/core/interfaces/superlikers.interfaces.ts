export interface GetParticipantResponse {
  ok: string;
  object: Participant;
}

export interface Participant {
  uid: string;
  uid_type: string | null;
  email: string;
  points: number;
  total_points: number;
  state: string;
  bad_email: boolean;
  email_verified: boolean;
  cellphone_verified: boolean;
  unconfirmed_email: boolean;
  unconfirmed_cellphone: boolean;
  avatar: string;
  last_activity_at: string;
  accumulated_points?: number;
  available_points?: number;
  redeemed_points?: number;
  points_to_expire?: number;
  expiration_date?: string;
  expired_points?: number;
}

export interface SaleResponse {
  ok: boolean;
  invoice: Invoice;
  participant: Partial<Participant>;
  message: string;
}

export interface Invoice {
  total: number;
  ref: string;
  products: Product[];
  quantity: number;
  points: number;
  promotions: Record<string, any>;
  promotions_points: number;
  refunds: Record<string, any>;
  category?: string | null;
  discount: number;
}

export interface Product {
  ref: string;
  price: number;
  quantity: number;
  points?: number;
  type?: string;
  provider?: string;
  line?: string;
}

export interface SaleSummary {
  products: Product[];
  discount: number;
}
