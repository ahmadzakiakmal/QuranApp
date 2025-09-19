import type { NextApiRequest, NextApiResponse } from "next";
import { tokenManager } from "@/lib/tokenManager";
import axios, { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET":
      return await GetHandler(req, res);
    default:
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function GetHandler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = await tokenManager.getValidToken();
  const clientId = process.env.API_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: "API_CLIENT_ID not configured" });
  }

  if (!accessToken) {
    return res.status(500).json({ error: "Failed to obtain access token" });
  }

  const apiUrl = process.env.API_BASE_URL + "/content/api/v4/chapters";
  console.log("Fetching from API URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
    headers: {
      "x-auth-token": accessToken,
      "x-client-id": clientId,
    }});
    
    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("API request error:", axiosError.response?.data || axiosError.message);
      return res.status(axiosError.response?.status || 500).json({
        error: axiosError.response?.data || "Failed to fetch data from API",
      });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}

