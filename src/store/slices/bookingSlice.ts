import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OperationState } from './authSlice';
import type { CoachProfile, Booking } from '@/types/api.types';

export type BookingState = {
  coach: CoachProfile | null;
  bookings: Booking[];
  operations: {
    getBookings: OperationState;
  };
  notApprovedVisible: boolean;
};

const createInitialOperation = (): OperationState => ({
  status: 'idle',
  error: null,
});

const initialState: BookingState = {
  coach: null,
  bookings: [],
  operations: {
    getBookings: createInitialOperation(),
  },
  notApprovedVisible: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingData: (
      state,
      action: PayloadAction<{ coach: CoachProfile; bookings: Booking[] }>,
    ) => {
      state.coach = action.payload.coach;
      state.bookings = action.payload.bookings;
    },
    setOperationLoading: state => {
      state.operations.getBookings = { status: 'loading', error: null };
    },
    setOperationSuccess: state => {
      state.operations.getBookings = { status: 'success', error: null };
    },
    setOperationError: (state, action: PayloadAction<string>) => {
      state.operations.getBookings = { status: 'error', error: action.payload };
    },
    setOperationIdle: state => {
      state.operations.getBookings = { status: 'idle', error: null };
    },
    setNotApprovedVisible: (state, action: PayloadAction<boolean>) => {
      state.notApprovedVisible = action.payload;
    },
  },
});

export const {
  setBookingData,
  setOperationLoading,
  setOperationSuccess,
  setOperationError,
  setOperationIdle,
  setNotApprovedVisible,
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
