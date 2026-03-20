import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ClientOperation = 'inviteBulkClients' | 'sendInviteSms' | 'idle';

export interface ClientState {
  operation: ClientOperation;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ClientState = {
  operation: 'idle',
  loading: false,
  error: null,
  success: false,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientOperationLoading(state, action: PayloadAction<ClientOperation>) {
      state.operation = action.payload;
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    setClientOperationSuccess(state, action: PayloadAction<ClientOperation>) {
      if (state.operation === action.payload) {
        state.loading = false;
        state.error = null;
        state.success = true;
      }
    },
    setClientOperationError(
      state,
      action: PayloadAction<{ operation: ClientOperation; message: string }>,
    ) {
      if (state.operation === action.payload.operation) {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      }
    },
    setClientOperationIdle(state, action: PayloadAction<ClientOperation>) {
      if (state.operation === action.payload) {
        state.operation = 'idle';
        state.loading = false;
        state.error = null;
        state.success = false;
      }
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
  resetClientState,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;
