export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ExchangeTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}