import {
  postCoachBulkInvite,
  postCoachInviteSms,
  postCoachInviteStore,
  getCoachFetchLinks,
  patchCoachUpdateRelationship,
  postSendNudge,
} from '@/api/clientApi';
import {
  setClientOperationError,
  setClientOperationLoading,
  setClientOperationSuccess,
  setInviteLinks,
  appendInviteLinks,
} from '@/store/slices/clientSlice';
import { getApiErrorMessage } from '@/utils/apiError';

import type { AppDispatch } from '@/store/store';
import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
  AddClientPayload,
  InviteWithOnboarding,
  SendNudgePayload,
  NudgeType,
} from '@/types/api.types';

export const inviteBulkClientsThunk =
  (request: InviteBulkClientsPayload) =>
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
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
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
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

export const inviteClientThunk =
  (request: AddClientPayload) =>
  async (
    dispatch: AppDispatch,
  ): Promise<ApiResponse<InviteWithOnboarding[]>> => {
    dispatch(setClientOperationLoading('inviteClient'));

    try {
      const response = await postCoachInviteStore(request);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('inviteClient'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'inviteClient',
            message: response?.message || 'Invite failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'inviteClient',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const fetchInviteLinksThunk =
  (page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('fetchInviteLinks'));

    try {
      const response = await getCoachFetchLinks(page, limit);
      if (response && response.status) {
        const payload = {
          list: response.data.list,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
        };
        if (page === 1) {
          dispatch(setInviteLinks(payload));
        } else {
          dispatch(appendInviteLinks(payload));
        }
        dispatch(setClientOperationSuccess('fetchInviteLinks'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'fetchInviteLinks',
            message: response?.message || 'Fetch failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'fetchInviteLinks',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };
export const updateInviteLinkThunk =
  (payload: {
    id: string;
    update_for: 'user_relationship' | 'invite_link';
    data: Record<string, unknown>;
  }) =>
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
    dispatch(setClientOperationLoading('updateInviteLink'));

    try {
      const response = await patchCoachUpdateRelationship(
        payload.id,
        payload.update_for,
        payload.data,
      );
      if (response && response.status) {
        dispatch(setClientOperationSuccess('updateInviteLink'));
        // Refresh the list after update
        void dispatch(fetchInviteLinksThunk(1, 10));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'updateInviteLink',
            message: response?.message || 'Update failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'updateInviteLink',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };
export const sendNudgeThunk =
  (payload: SendNudgePayload, type: NudgeType) =>
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
    dispatch(setClientOperationLoading('sendNudge'));

    try {
      const response = await postSendNudge(payload, type);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('sendNudge'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'sendNudge',
            message: response?.message || 'Failed to send nudge',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'sendNudge',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };
