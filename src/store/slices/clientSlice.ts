import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OperationState } from './authSlice';
import type {
  InviteLink,
  WeeklyTaskSummaryData,
  UserRelationshipDetail,
  TaskDetail,
} from '@/types/api.types';

export type ClientOperationKey =
  | 'inviteBulkClients'
  | 'sendInviteSms'
  | 'inviteClient'
  | 'fetchInviteLinks'
  | 'updateInviteLink'
<<<<<<< HEAD
  | 'sendNudge';
=======
  | 'fetchWeeklySummary'
  | 'fetchUserRelationship'
  | 'createTask'
  | 'fetchTasks'
  | 'deleteTask'
  | 'updateTask';
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)

export interface ClientState {
  inviteLinks: InviteLink[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  weeklySummary: WeeklyTaskSummaryData | null;
  userRelationshipDetail: UserRelationshipDetail | null;
  tasks: TaskDetail[];
  summaryPage: number;
  summaryTotalPages: number;
  operations: Record<ClientOperationKey, OperationState>;
}

const createInitialOperation = (): OperationState => ({
  status: 'idle',
  error: null,
});

const initialOperations: Record<ClientOperationKey, OperationState> = {
  inviteBulkClients: createInitialOperation(),
  sendInviteSms: createInitialOperation(),
  inviteClient: createInitialOperation(),
  fetchInviteLinks: createInitialOperation(),
  updateInviteLink: createInitialOperation(),
<<<<<<< HEAD
  sendNudge: createInitialOperation(),
=======
  fetchWeeklySummary: createInitialOperation(),
  fetchUserRelationship: createInitialOperation(),
  createTask: createInitialOperation(),
  fetchTasks: createInitialOperation(),
  deleteTask: createInitialOperation(),
  updateTask: createInitialOperation(),
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)
};

const initialState: ClientState = {
  inviteLinks: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  weeklySummary: null,
  userRelationshipDetail: null,
  tasks: [],
  summaryPage: 1,
  summaryTotalPages: 1,
  operations: initialOperations,
};

interface InviteLinksPayload {
  list: InviteLink[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientOperationLoading(
      state,
      action: PayloadAction<ClientOperationKey>,
    ) {
      state.operations[action.payload] = { status: 'loading', error: null };
    },
    setClientOperationSuccess(
      state,
      action: PayloadAction<ClientOperationKey>,
    ) {
      state.operations[action.payload] = { status: 'success', error: null };
    },
    setClientOperationError(
      state,
      action: PayloadAction<{ operation: ClientOperationKey; message: string }>,
    ) {
      state.operations[action.payload.operation] = {
        status: 'error',
        error: action.payload.message,
      };
    },
    setClientOperationIdle(state, action: PayloadAction<ClientOperationKey>) {
      state.operations[action.payload] = { status: 'idle', error: null };
    },
    // Reset list (first page fetch)
    setInviteLinks(state, action: PayloadAction<InviteLinksPayload>) {
      state.inviteLinks = action.payload.list;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItems = action.payload.totalItems;
    },
    // Append to list (page 2+)
    appendInviteLinks(state, action: PayloadAction<InviteLinksPayload>) {
      const existingIds = new Set(
        state.inviteLinks.map((item: InviteLink) => item._id),
      );
      const newItems = action.payload.list.filter(
        (item: InviteLink) => !existingIds.has(item._id),
      );
      state.inviteLinks = [...state.inviteLinks, ...newItems];
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItems = action.payload.totalItems;
    },
    setWeeklySummary(state, action: PayloadAction<WeeklyTaskSummaryData>) {
      state.weeklySummary = action.payload;
      state.summaryPage = action.payload.page;
      state.summaryTotalPages = action.payload.totalPages;
    },
    appendWeeklySummary(state, action: PayloadAction<WeeklyTaskSummaryData>) {
      if (state.weeklySummary) {
        state.weeklySummary.weeks = [
          ...state.weeklySummary.weeks,
          ...action.payload.weeks,
        ];
        state.weeklySummary.page = action.payload.page;
        state.summaryPage = action.payload.page;
      } else {
        state.weeklySummary = action.payload;
        state.summaryPage = action.payload.page;
        state.summaryTotalPages = action.payload.totalPages;
      }
    },
    setUserRelationshipDetail(
      state,
      action: PayloadAction<UserRelationshipDetail>,
    ) {
      state.userRelationshipDetail = action.payload;
    },
    setTasks(state, action: PayloadAction<TaskDetail[]>) {
      state.tasks = action.payload;
    },
    resetClientOperation(state, action: PayloadAction<ClientOperationKey>) {
      state.operations[action.payload] = createInitialOperation();
    },
    resetClientState() {
      return initialState;
    },
  },
});

export const {
  setClientOperationLoading,
  setClientOperationSuccess,
  setClientOperationError,
  setClientOperationIdle,
  setInviteLinks,
  appendInviteLinks,
  setWeeklySummary,
  appendWeeklySummary,
  setUserRelationshipDetail,
  setTasks,
  resetClientOperation,
  resetClientState,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
