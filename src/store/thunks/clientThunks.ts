import {
  postCoachBulkInvite,
  postCoachInviteSms,
  postCoachInviteStore,
  getCoachFetchLinks,
  patchCoachUpdateRelationship,
  postSendNudge,
  getCoachWeeklySummary,
  getCoachUserRelationship,
  postCoachTaskStore,
  getCoachFetchTasks,
  deleteCoachTask,
  patchCoachUpdateTask,
  getCoachDateWiseTask,
  patchCoachUpdateFitnessPhase,
} from '@/api/clientApi';
import {
  setClientOperationError,
  setClientOperationLoading,
  setClientOperationSuccess,
  setInviteLinks,
  appendInviteLinks,
  setWeeklySummary,
  appendWeeklySummary,
  setUserRelationshipDetail,
  setTasks,
  setDateWiseTasks,
} from '@/store/slices/clientSlice';
import { getApiErrorMessage } from '@/utils/apiError';

import type { AppDispatch, AppThunk } from '@/store/store';
import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
  AddClientPayload,
  InviteWithOnboarding,
  SendNudgePayload,
  NudgeType,
  CreateTaskPayload,
  UpdateUserRelationshipPayload,
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

export const fetchWeeklySummaryThunk =
  (
    customerId: string,
    page: number = 1,
    limit: number = 10,
    type: string = 'task',
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('fetchWeeklySummary'));

    try {
      const response = await getCoachWeeklySummary(
        customerId,
        page,
        limit,
        type,
      );
      if (response && response.status) {
        if (page === 1) {
          dispatch(setWeeklySummary(response.data));
        } else {
          dispatch(appendWeeklySummary(response.data));
        }
        dispatch(setClientOperationSuccess('fetchWeeklySummary'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'fetchWeeklySummary',
            message: response?.message || 'Fetch failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'fetchWeeklySummary',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const fetchUserRelationshipThunk =
  (userId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('fetchUserRelationship'));

    try {
      const response = await getCoachUserRelationship(userId);
      if (response && response.status && response.data.length > 0) {
        dispatch(setUserRelationshipDetail(response.data[0]));
        dispatch(setClientOperationSuccess('fetchUserRelationship'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'fetchUserRelationship',
            message: response?.message || 'Fetch failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'fetchUserRelationship',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const createTaskThunk =
  (payload: CreateTaskPayload) =>
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
    dispatch(setClientOperationLoading('createTask'));

    try {
      const response = await postCoachTaskStore(payload);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('createTask'));
        // Refetch task list and weekly summary
        void dispatch(fetchTasksThunk(payload.customer_id));
        void dispatch(fetchWeeklySummaryThunk(payload.customer_id));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'createTask',
            message: response?.message || 'Create task failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'createTask',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const fetchTasksThunk =
  (customerId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('fetchTasks'));

    try {
      const response = await getCoachFetchTasks(customerId);
      if (response && response.status) {
        dispatch(setTasks(response.data.list));
        dispatch(setClientOperationSuccess('fetchTasks'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'fetchTasks',
            message: response?.message || 'Fetch tasks failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'fetchTasks',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const deleteTaskThunk =
  (taskId: string, customerId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('deleteTask'));

    try {
      const response = await deleteCoachTask(taskId);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('deleteTask'));
        // Refetch both
        void dispatch(fetchTasksThunk(customerId));
        void dispatch(fetchWeeklySummaryThunk(customerId));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'deleteTask',
            message: response?.message || 'Delete task failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'deleteTask',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const updateTaskThunk =
  (taskId: string, payload: CreateTaskPayload) =>
  async (dispatch: AppDispatch): Promise<ApiResponse<unknown>> => {
    dispatch(setClientOperationLoading('updateTask'));

    try {
      const response = await patchCoachUpdateTask(taskId, payload);
      if (response && response.status) {
        dispatch(setClientOperationSuccess('updateTask'));
        // Refetch both
        void dispatch(fetchTasksThunk(payload.customer_id));
        void dispatch(fetchWeeklySummaryThunk(payload.customer_id));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'updateTask',
            message: response?.message || 'Update task failed',
          }),
        );
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'updateTask',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const fetchDateWiseTaskThunk =
  (
    customerId: string,
    date: string,
    page: number = 1,
    limit: number = 50,
    type: string = 'task',
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setClientOperationLoading('fetchDateWiseTask'));

    try {
      const response = await getCoachDateWiseTask(
        customerId,
        date,
        page,
        limit,
        type,
      );
      if (response && response.status) {
        dispatch(setDateWiseTasks(response.data));
        dispatch(setClientOperationSuccess('fetchDateWiseTask'));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'fetchDateWiseTask',
            message: response?.message || 'Fetch failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'fetchDateWiseTask',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };

export const updateFitnessPhaseThunk =
  (
    userRelationshipId: string,
    customerId: string,
    healthStatus: string,
  ): AppThunk<Promise<void>> =>
  async dispatch => {
    dispatch(setClientOperationLoading('updateFitnessPhase'));

    try {
      const payload: UpdateUserRelationshipPayload = {
        health_status: healthStatus,
      };
      const response = await patchCoachUpdateFitnessPhase(
        userRelationshipId,
        payload,
      );

      if (response && response.status) {
        dispatch(setClientOperationSuccess('updateFitnessPhase'));
        // Fetch updated relationship details
        void dispatch(fetchUserRelationshipThunk(customerId));
      } else {
        dispatch(
          setClientOperationError({
            operation: 'updateFitnessPhase',
            message: response?.message || 'Update health status failed',
          }),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setClientOperationError({
          operation: 'updateFitnessPhase',
          message: errorMsg,
        }),
      );
      throw error;
    }
  };
