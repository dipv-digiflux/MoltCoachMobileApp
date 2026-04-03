import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OperationState } from './authSlice';
import type { InviteLink } from '@/types/api.types';

export type ClientOperationKey =
  | 'inviteBulkClients'
  | 'sendInviteSms'
  | 'inviteClient'
  | 'fetchInviteLinks'
  | 'updateInviteLink'
  | 'sendNudge';

export interface ClientState {
  inviteLinks: InviteLink[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
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
  sendNudge: createInitialOperation(),
};

const initialState: ClientState = {
  inviteLinks: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
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
  resetClientState,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
