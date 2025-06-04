import clientApi from "../../shared/api/base-api";
import { AnalyticsResponse } from "./types";

export const fetchAnalytics = async (
  shortUrl: string
): Promise<AnalyticsResponse> => {
  const response = await clientApi.get(`analytics/${shortUrl}`);
  return response.data;
};
