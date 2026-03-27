import { httpGet, httpPost } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
  AddClientPayload,
  FetchInviteLinksResponse,
  InviteWithOnboarding,
} from '@/types/api.types';

export const postCoachBulkInvite = async (
  request: InviteBulkClientsPayload,
): Promise<ApiResponse<unknown>> => {
  console.log('check25 1', request);

  return httpPost<InviteBulkClientsPayload, ApiResponse<unknown>>(
    ENDPOINTS.COACH_BULK_INVITE,
    request,
  );
};

export const postCoachInviteSms = async (
  request: InviteSmsPayload,
): Promise<ApiResponse<unknown>> => {
  console.log('check25', request);

  return httpPost<InviteSmsPayload, ApiResponse<unknown>>(
    ENDPOINTS.COACH_INVITE_SMS,
    request,
  );
};

export const postCoachInviteStore = async (
  request: AddClientPayload,
): Promise<ApiResponse<InviteWithOnboarding[]>> => {
  console.log('check25 2', request);

  return httpPost<AddClientPayload, ApiResponse<InviteWithOnboarding[]>>(
    ENDPOINTS.COACH_INVITE_STORE,
    request,
  );
};

export const getCoachFetchLinks = async (
  page: number = 1,
  limit: number = 10,
): Promise<FetchInviteLinksResponse> => {
  return httpGet<FetchInviteLinksResponse>(
    `${ENDPOINTS.COACH_FETCH_LINKS}?page=${page}&limit=${limit}`,
  );
};
export const postCoachUpdateLink = async (
  id: string,
  data: Record<string, unknown>,
): Promise<ApiResponse<unknown>> => {
  return httpPost<Record<string, unknown>, ApiResponse<unknown>>(
    `v1/coach/user-relationship/${id}/update_for`,
    data,
  );
};
