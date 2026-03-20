import { postCoachBulkInvite, postCoachInviteSms } from '@/api/clientApi';
import {
  setClientOperationError,
  setClientOperationLoading,
  setClientOperationSuccess,
} from '@/store/slices/clientSlice';
import { getApiErrorMessage } from '@/utils/apiError';

import type { AppDispatch } from '@/store/store';
import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
} from '@/types/api.types';

export const inviteBulkClientsThunk =
  (request: InviteBulkClientsPayload) =>
  async (dispatch: AppDispatch): Promise<ApiResponse> => {
    dispatch(setClientOperationLoading('inviteBulkClients'));

    try {
      const response = await postCoachBulkInvite(request);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('inviteBulkClients'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'inviteBulkClients',
            message: response?.message || 'Bulk invite failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'inviteBulkClients',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const sendInviteSmsThunk =
  (request: InviteSmsPayload) =>
  async (dispatch: AppDispatch): Promise<ApiResponse> => {
    dispatch(setClientOperationLoading('sendInviteSms'));

    try {
      const response = await postCoachInviteSms(request);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('sendInviteSms'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'sendInviteSms',
            message: response?.message || 'Send SMS failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'sendInviteSms',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };
