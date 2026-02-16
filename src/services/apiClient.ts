import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

import type { ApiErrorResponse } from '@/types/api.types';

const baseURL = Config.API_BASE_URL;

const defaultTimeoutMs = 15000;

const createClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: defaultTimeoutMs,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.response?.status === 401) {
        // TODO: dispatch a logout or token refresh action here if needed
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const client = createClient();

export const httpGet = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await client.get<TResponse>(url, config);

  return response.data;
};

export const httpPost = async <TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await client.post<TResponse>(url, body, config);

  return response.data;
};

export const httpPut = async <TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await client.put<TResponse>(url, body, config);

  return response.data;
};

export const httpDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await client.delete<TResponse>(url, config);

  return response.data;
};
