import { httpGet, httpPost, httpPatch, httpDelete } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  InviteBulkClientsPayload,
  InviteSmsPayload,
  ApiResponse,
  AddClientPayload,
  FetchInviteLinksResponse,
  InviteWithOnboarding,
  NudgeType,
  SendNudgePayload,
  WeeklyTaskSummaryResponse,
  UserRelationshipDetailResponse,
  CreateTaskPayload,
  FetchTasksResponse,
  DateWiseTaskResponse,
  UpdateUserRelationshipPayload,
} from '@/types/api.types';

export const deleteCoachTask = async (
  taskId: string,
): Promise<ApiResponse<unknown>> => {
  return httpDelete<ApiResponse<unknown>>(
    `${ENDPOINTS.COACH_DELETE_TASK}/${taskId}`,
  );
};

export const getCoachFetchTasks = async (
  customerId: string,
): Promise<FetchTasksResponse> => {
  return httpGet<FetchTasksResponse>(
    `${ENDPOINTS.COACH_FETCH_TASKS}?customer_id=${customerId}`,
  );
};

export const postCoachTaskStore = async (
  payload: CreateTaskPayload,
): Promise<ApiResponse<unknown>> => {
  return httpPost<CreateTaskPayload, ApiResponse<unknown>>(
    ENDPOINTS.COACH_TASK_STORE,
    payload,
  );
};

export const patchCoachUpdateTask = async (
  taskId: string,
  payload: CreateTaskPayload,
): Promise<ApiResponse<unknown>> => {
  return httpPatch<CreateTaskPayload, ApiResponse<unknown>>(
    `${ENDPOINTS.COACH_UPDATE_TASK}/${taskId}`,
    payload,
  );
};

export const getCoachUserRelationship = async (
  userId: string,
): Promise<UserRelationshipDetailResponse> => {
  return httpGet<UserRelationshipDetailResponse>(
    `${ENDPOINTS.COACH_USER_RELATIONSHIP}/${userId}`,
  );
};

export const postCoachBulkInvite = async (
  request: InviteBulkClientsPayload,
): Promise<ApiResponse<unknown>> => {
  return httpPost<InviteBulkClientsPayload, ApiResponse<unknown>>(
    ENDPOINTS.COACH_BULK_INVITE,
    request,
  );
};

export const postCoachInviteSms = async (
  request: InviteSmsPayload,
): Promise<ApiResponse<unknown>> => {
  return httpPost<InviteSmsPayload, ApiResponse<unknown>>(
    ENDPOINTS.COACH_INVITE_SMS,
    request,
  );
};

export const postCoachInviteStore = async (
  request: AddClientPayload,
): Promise<ApiResponse<InviteWithOnboarding[]>> => {
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
export const patchCoachUpdateRelationship = async (
  id: string,
  update_for: 'user_relationship' | 'invite_link',
  data: Record<string, unknown>,
): Promise<ApiResponse<unknown>> => {
  return httpPatch<Record<string, unknown>, ApiResponse<unknown>>(
    `${ENDPOINTS.COACH_USER_RELATIONSHIP}/${id}?update_for=${update_for}`,
    data,
  );
};

export const postSendNudge = async (
  payload: SendNudgePayload,
  type: NudgeType,
): Promise<ApiResponse<unknown>> => {
  return httpPost<SendNudgePayload, ApiResponse<unknown>>(
    `${ENDPOINTS.COACH_NUDGE}?type=${type}`,
    payload,
  );
};

export const getCoachWeeklySummary = async (
  customerId: string,
  page: number = 1,
  limit: number = 10,
  type: string = 'task',
): Promise<WeeklyTaskSummaryResponse> => {
  return httpGet<WeeklyTaskSummaryResponse>(
    `${ENDPOINTS.COACH_WEEKLY_SUMMARY}?page=${page}&limit=${limit}&type=${type}&customer_id=${customerId}`,
  );
};

export const getCoachDateWiseTask = async (
  customerId: string,
  date: string,
  page: number = 1,
  limit: number = 50,
  type: string = 'task',
): Promise<DateWiseTaskResponse> => {
  return httpGet<DateWiseTaskResponse>(
    `${ENDPOINTS.COACH_DATE_WISE_TASK}/${customerId}/${date}?page=${page}&limit=${limit}&type=${type}&customer_id=${customerId}&date=${date}`,
  );
};

export const patchCoachUpdateFitnessPhase = async (
  userRelationshipId: string,
  payload: UpdateUserRelationshipPayload,
): Promise<ApiResponse<unknown>> => {
  return httpPatch<UpdateUserRelationshipPayload, ApiResponse<unknown>>(
    `${ENDPOINTS.COACH_USER_RELATIONSHIP}/${userRelationshipId}`,
    payload,
  );
};
