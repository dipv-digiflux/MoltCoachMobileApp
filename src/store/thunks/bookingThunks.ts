import { CommonActions } from '@react-navigation/native';

import { getCoachBookings, postBookCall, getCoachProfile } from '@/api/authApi';
import {
  setBookingData,
  setOperationError,
  setOperationLoading,
  setOperationSuccess,
  setNotApprovedVisible,
  setCoachProfile,
  setProfileError,
  setProfileLoading,
  setProfileSuccess,
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
        country_code: '+971',
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
        const { is_request_access, is_booking_confirmed, is_verified, status } =
          response.data.coach;

        if (rootNavigationRef.isReady()) {
          const state = rootNavigationRef.getState();
          const currentRoute = state?.routes[state.index]?.name;

          // Stage 0: Rejection (Global override)
          if (status?.toLowerCase() === 'reject') {
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
            return response;
          }

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
          else if (is_booking_confirmed === true) {
            const lastBooking = response.data.bookings[0];
            const bookingStatus = lastBooking?.status?.toLowerCase();

            if (bookingStatus === 'pending') {
              if (currentRoute !== 'BookingConfirmed') {
                rootNavigationRef.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'OnboardingStack',
                      state: {
                        index: 0,
                        routes: [{ name: 'BookingConfirmed' }],
                      },
                    },
                  ],
                });
              }
            } else if (bookingStatus === 'rejected') {
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
            } else {
              // Default fallback if status is something else
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
          // Default Stage: Should not happen normally if above conditions cover all stages
          else {
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

export const getCoachProfileThunk =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setProfileLoading());
    try {
      const response = await getCoachProfile();
      if (response.status) {
        console.log('Coach Profile Data:', response.data);
        dispatch(setCoachProfile(response.data));
        dispatch(setProfileSuccess());
      } else {
        dispatch(
          setProfileError(response.message || 'Failed to fetch coach profile'),
        );
      }
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(setProfileError(errorMsg));
    }
  };
