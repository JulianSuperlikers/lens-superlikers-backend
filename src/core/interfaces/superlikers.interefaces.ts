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
}
