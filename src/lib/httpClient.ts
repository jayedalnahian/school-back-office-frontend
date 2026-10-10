import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import type { ApiResponse, ApiRequestOptions } from "@/types/api.types";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: handles runtime environment headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Authentication is currently disabled on the backend.
    // Auth token injection will be connected here once enabled.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: bypasses token refresh loops while backend auth is disabled
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Since backend authentication is disabled, token refresh is bypassed so
    // unauthenticated and error responses pass through cleanly without retry loops.
    return Promise.reject(error);
  }
);

export const httpClient = {
  instance: axiosInstance,

  async get<TData = unknown>(
    url: string,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.get<ApiResponse<TData>>(url, options);
    return response.data;
  },

  async post<TData = unknown>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.post<ApiResponse<TData>>(url, data, options);
    return response.data;
  },

  async put<TData = unknown>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.put<ApiResponse<TData>>(url, data, options);
    return response.data;
  },

  async patch<TData = unknown>(
    url: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.patch<ApiResponse<TData>>(url, data, options);
    return response.data;
  },

  async delete<TData = unknown>(
    url: string,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.delete<ApiResponse<TData>>(url, options);
    return response.data;
  },
};

export default httpClient;
