import clientApi from "../../shared/api/base-api";
import { ShortenedUrlResponse } from "./types";

export interface ShortenUrlType {
  originalUrl: string;
  expiresAt?: Date | null;
  alias?: string | null;
}

export const shortenUrl = async (
  params: ShortenUrlType
): Promise<ShortenedUrlResponse> => {
  const response = await clientApi.post("shorten", params);
  return response.data;
};
