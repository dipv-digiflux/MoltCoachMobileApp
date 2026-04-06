import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { bookCallThunk, logoutThunk } from '@/store/thunks';

import {
  accessRequestSchema,
  type AccessRequestFormData,
  type RequestAccessHook,
} from '../RequestAccessScreen.types';

import type { OnboardingNavigationProp } from '@/types/navigation.types';

export const useRequestAccess = (): RequestAccessHook => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const coach = useAppSelector(state => state.booking.coach);
  const isLoading = useAppSelector(
    state => state.auth.operations.bookCall.status === 'loading',
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccessRequestFormData>({
    resolver: zodResolver(accessRequestSchema),
    defaultValues: {
      fullName: '',
      email: coach?.email ?? '',
      phone: coach?.phone_number || '',
    },
    mode: 'onBlur',
  });

  // Update form values if coach data changes
  React.useEffect(() => {
    if (coach) {
      reset({
        fullName: '',
        email: coach.email ?? '',
        phone: coach.phone_number || '',
      });
    }
  }, [coach, reset]);

  const handleLogout = async (): Promise<void> => {
    await dispatch(logoutThunk());
  };

  const handleBookCall = async (data: AccessRequestFormData): Promise<void> => {
    if (!coach?._id) {
      console.warn('Coach ID missing');
      return;
    }

    try {
      const response = await dispatch(
        bookCallThunk({
          name: data.fullName,
          email: data.email,
          phone_number: data.phone,
          country_code: '+971',
        }),
      );

      if (response.status) {
        const bookingUrl: string =
          response.data?.url ??
          'https://calendly.com/molt-wellness/molt-coach-evaluation';

        navigation.navigate('BookSchedule', {
          url: bookingUrl,
        });
      }
    } catch (error) {
      console.error('Book call failed:', error);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    handleLogout,
    handleBookCall,
  };
};
