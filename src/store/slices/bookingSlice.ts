import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OperationState } from './authSlice';
import type { CoachProfile, Booking } from '@/types/api.types';

export type BookingState = {
  coach: CoachProfile | null;
  profile: CoachProfile | null;
  bookings: Booking[];
  operations: {
    getBookings: OperationState;
    getCoachProfile: OperationState;
  };
  notApprovedVisible: boolean;
};

const createInitialOperation = (): OperationState => ({
  status: 'idle',
  error: null,
});

const initialState: BookingState = {
  coach: null,
  profile: null,
  bookings: [],
  operations: {
    getBookings: createInitialOperation(),
    getCoachProfile: createInitialOperation(),
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
    setCoachProfile: (state, action: PayloadAction<CoachProfile>) => {
      state.profile = action.payload;
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
    setProfileLoading: state => {
      state.operations.getCoachProfile = { status: 'loading', error: null };
    },
    setProfileSuccess: state => {
      state.operations.getCoachProfile = { status: 'success', error: null };
    },
    setProfileError: (state, action: PayloadAction<string>) => {
      state.operations.getCoachProfile = {
        status: 'error',
        error: action.payload,
      };
    },
    setProfileIdle: state => {
      state.operations.getCoachProfile = { status: 'idle', error: null };
    },
    setNotApprovedVisible: (state, action: PayloadAction<boolean>) => {
      state.notApprovedVisible = action.payload;
    },
  },
});

export const {
  setBookingData,
  setCoachProfile,
  setOperationLoading,
  setOperationSuccess,
  setOperationError,
  setOperationIdle,
  setProfileLoading,
  setProfileSuccess,
  setProfileError,
  setProfileIdle,
  setNotApprovedVisible,
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
