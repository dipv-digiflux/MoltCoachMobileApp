import { useNavigation } from '@react-navigation/native';
import { format, parseISO, differenceInMinutes } from 'date-fns';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/thunks';

import { BookingConfirmedHook } from '../BookingConfirmedScreen.types';

import type { OnboardingNavigationProp } from '@/types/navigation.types';

export const useBookingConfirmed = (): BookingConfirmedHook => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const dispatch = useAppDispatch();
  const translation = useAppSelector(state => state.translation);
  const bookings = useAppSelector(state => state.booking.bookings);
  const lastBooking = bookings[0];

  const getFormattedDate = (): string => {
    if (!lastBooking?.start_time) return 'Wednesday, Oct 15';
    try {
      return format(parseISO(lastBooking.start_time), 'EEEE, MMM d');
    } catch {
      return 'Wednesday, Oct 15';
    }
  };

  const getFormattedTimeRange = (): string => {
    if (!lastBooking?.start_time || !lastBooking?.end_time)
      return '10:00 AM – 10:15 AM (15 min)';
    try {
      const start = parseISO(lastBooking.start_time);
      const end = parseISO(lastBooking.end_time);
      const duration = differenceInMinutes(end, start);
      return `${format(start, 'h:mm a')} – ${format(
        end,
        'h:mm a',
      )} (${duration} min)`;
    } catch {
      return '10:00 AM – 10:15 AM (15 min)';
    }
  };

  const getLocationLabel = (): string => {
    if (lastBooking?.location === 'google_conference') return 'Google Meet';
    return lastBooking?.location || 'Google Meet';
  };

  const handleLogout = async (): Promise<void> => {
    await dispatch(logoutThunk());
  };

  return {
    navigation,
    translation,
    getFormattedDate,
    getFormattedTimeRange,
    getLocationLabel,
    handleLogout,
  };
};
