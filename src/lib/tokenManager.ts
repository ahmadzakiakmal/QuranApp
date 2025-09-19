import { ExchangeTokenResponse } from "@/types/api";
import axios from "axios";

class TokenManager {
  private accessToken: string | null = null;
  private expiresAt: number | null = null;

  async getValidToken(): Promise<string> {
    if (this.accessToken && this.expiresAt && this.expiresAt > Date.now()) {
      return this.accessToken;
    }

    return await this.refreshToken();
  }

  async refreshToken(): Promise<string> {
    const clientId = process.env.API_CLIENT_ID;
    const clientSecret = process.env.API_CLIENT_SECRET;
    const tokenUrl = process.env.OAUTH_URL;

    if (!clientId || !clientSecret || !tokenUrl) {
      throw new Error("Missing OAuth2 credentials");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    try {
      const response = await axios.post(tokenUrl, "grant_type=client_credentials&scope=content", {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data as ExchangeTokenResponse;
      this.accessToken = data.access_token;
      this.expiresAt = Date.now() + data.expires_in * 1000 - 5 * 60 * 1000;

      return this.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Token refresh error:", error.response?.data || error.message);
        throw new Error("Failed to refresh token");
      }
      throw new Error("Failed to refresh token");
    }
  }
}

export const tokenManager = new TokenManager();
