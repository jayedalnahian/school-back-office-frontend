import type { AxiosRequestConfig } from "axios";

export interface ApiResponse<TData = unknown> {
  success: boolean;
  message: string;
  data?: TData;
  error?: unknown;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiRequestOptions extends Omit<AxiosRequestConfig, "url" | "method"> {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}
