import React, { type ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import {
  Button,
  Input,
  RequestAccessHeader,
  RequestAccessStatus,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { bookCallThunk } from '@/store/thunks';
import { colors, spacing } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

const accessRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 digits'),
});

type AccessRequestFormData = z.infer<typeof accessRequestSchema>;

export const RequestAccessScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
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
      phone: coach?.phone_number
        ? `${coach.country_code ?? ''}${coach.phone_number}`
        : '',
    },
    mode: 'onBlur',
  });

  // Update form values if coach data changes (e.g. after fetch)
  React.useEffect(() => {
    if (coach) {
      reset({
        fullName: '',
        email: coach.email ?? '',
        phone: coach.phone_number
          ? `${coach.country_code ?? ''}${coach.phone_number}`
          : '',
      });
    }
  }, [coach, reset]);

  const handleBookCall = async (data: AccessRequestFormData): Promise<void> => {
    if (!coach?._id) {
      console.warn('Coach ID missing');
      return;
    }

    try {
      const response = await dispatch(
        bookCallThunk({
          coach_id: coach._id,
          name: data.fullName,
          email: data.email,
          phone_number: data.phone,
        }),
      );

      if (response.status) {
        // Use the URL from the response if available, otherwise use placeholder fallback
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

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <RequestAccessHeader />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="e.g. Sarah Miller"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="name@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
                keyboardType="phone-pad"
                required
              />
            )}
          />
          <RequestAccessStatus />
        </ScrollView>

        <Button
          label="Book a call"
          onPress={() => {
            void handleSubmit(handleBookCall)();
          }}
          variant="primary"
          size="large"
          loading={isLoading}
          style={{ alignSelf: 'stretch', marginTop: spacing['Spacing-5xl'] }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  headerWrap: {
    // Fixed at top; no flex
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-11xl'],
    gap: spacing['Spacing-11xl'],
  },
  footer: {
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-5xl'],
  },
});
