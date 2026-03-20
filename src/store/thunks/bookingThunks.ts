import { CommonActions } from '@react-navigation/native';

import { getCoachBookings, postBookCall } from '@/api/authApi';
import {
  setBookingData,
  setOperationError,
  setOperationLoading,
  setOperationSuccess,
  setNotApprovedVisible,
} from '@/store/slices/bookingSlice';
import { getApiErrorMessage } from '@/utils/apiError';
import { rootNavigationRef } from '@navigation/navigationRef';

import type { AppDispatch, RootState } from '@/store/store';
import type {
  BookCallRequest,
  GetCoachBookingsResponse,
} from '@/types/api.types';
import type { CalendlyEvent } from '@/types/calendly.types';

export const bookCallThunk =
  (calendlyData: CalendlyEvent) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setOperationLoading());
    try {
      const state = getState();
      const coach = state.booking.coach;

      if (!coach) {
        throw new Error('Coach data not found in state');
      }

      const bookingPayload: BookCallRequest = {
        coach_id: coach._id,
        email: (
          calendlyData.payload?.invitee?.email ??
          coach.email ??
          ''
        ).trim(),
        name: (
          calendlyData.payload?.invitee?.name ??
          coach.first_name ??
          ''
        ).trim(),
        phone_number: coach.phone_number ?? '',
        event_uuid: calendlyData.payload?.event?.uuid,
        invitee_uuid: calendlyData.payload?.invitee?.uuid,
        timezone: calendlyData.payload?.invitee?.timezone,
        url: calendlyData.payload?.event?.uri,
        status: 'scheduled',
      };

      const response = await postBookCall(bookingPayload);

      if (response.status) {
        // Refetch bookings to update global state and handle redirection
        await dispatch(getCoachBookingsThunk());
        dispatch(setOperationSuccess());
      } else {
        dispatch(
          setOperationError(response.message || 'Failed to store booking'),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(setOperationError(errorMsg));
      throw error;
    }
  };

export const getCoachBookingsThunk =
  () =>
  async (dispatch: AppDispatch): Promise<GetCoachBookingsResponse | void> => {
    dispatch(setOperationLoading());
    try {
      const response = await getCoachBookings();
      if (response.status) {
        dispatch(
          setBookingData({
            coach: response.data.coach,
            bookings: response.data.bookings,
          }),
        );
        dispatch(setOperationSuccess());

        // Global Redirection Logic
        const { is_request_access, is_booking_confirmed, is_verified } =
          response.data.coach;

        if (rootNavigationRef.isReady()) {
          const state = rootNavigationRef.getState();
          const currentRoute = state?.routes[state.index]?.name;

          // Stage 4: Onboarding complete (Prioritize verified state)
          if (is_verified) {
            if (currentRoute !== 'AppStack' && currentRoute !== 'BottomTabs') {
              rootNavigationRef.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AppStack',
                      params: {
                        screen: 'BottomTabs',
                        params: {
                          screen: 'HomeTab',
                          params: { screen: 'HomeDashboard' },
                        },
                      },
                    },
                  ],
                }),
              );
            }
          }
          // Stage 1: Request Access
          else if (is_request_access === false) {
            if (currentRoute !== 'RequestAccessScreen') {
              rootNavigationRef.reset({
                index: 0,
                routes: [
                  {
                    name: 'OnboardingStack',
                    state: {
                      index: 0,
                      routes: [{ name: 'RequestAccessScreen' }],
                    },
                  },
                ],
              });
            }
          }
          // Stage 2: Booking (Schedule)
          else if (is_booking_confirmed === false) {
            if (currentRoute !== 'BookSchedule') {
              rootNavigationRef.reset({
                index: 0,
                routes: [
                  {
                    name: 'OnboardingStack',
                    state: {
                      index: 0,
                      routes: [
                        {
                          name: 'BookSchedule',
                          params: {
                            url: 'https://calendly.com/molt-wellness/molt-coach-evaluation',
                          },
                        },
                      ],
                    },
                  },
                ],
              });
            }
          }
          // Stage 3: Verification (Approval)
          else {
            dispatch(setNotApprovedVisible(true));
            if (currentRoute !== 'GetStarted') {
              rootNavigationRef.reset({
                index: 0,
                routes: [
                  {
                    name: 'OnboardingStack',
                    state: {
                      index: 0,
                      routes: [{ name: 'GetStarted' }],
                    },
                  },
                ],
              });
            }
          }
        }

        return response;
      }
      dispatch(
        setOperationError(response.message || 'Failed to fetch bookings'),
      );
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(setOperationError(errorMsg));
      throw error;
    }
  };
