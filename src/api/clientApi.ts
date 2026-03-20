import { httpPost } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
} from '@/types/api.types';

export const postCoachBulkInvite = async (
  request: InviteBulkClientsPayload,
): Promise<ApiResponse> => {
  console.log('check12', request);

  return httpPost<InviteBulkClientsPayload, ApiResponse>(
    ENDPOINTS.COACH_BULK_INVITE,
    request,
  );
};

export const postCoachInviteSms = async (
  request: InviteSmsPayload,
): Promise<ApiResponse> => {
  return httpPost<InviteSmsPayload, ApiResponse>(
    ENDPOINTS.COACH_INVITE_SMS,
    request,
  );
};
