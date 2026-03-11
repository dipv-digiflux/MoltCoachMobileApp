import React, { useCallback, useMemo, type ReactElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import AppleIconSvg from '@/assets/images/svg/apple-icon.svg';
import GoogleIconSvg from '@/assets/images/svg/google-icon.svg';
import { Button, Input, PageHeaderScrollView } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestOTPThunk, signInWithGoogleThunk } from '@/store/thunks';
import { colors, typography, spacing, iconScale } from '@/theme';
import { getApiErrorMessage } from '@/utils/apiError';
import { showErrorToast } from '@/utils/toast';

import type {
  OnboardingNavigationProp,
  OTPVerificationParams,
} from '@navigation/types';

const SOCIAL_ICON_SIZE = iconScale(20);
const COUNTRY_CODE = '+971';

const PLACEHOLDER_TERMS_URL = 'https://example.com/terms';
const PLACEHOLDER_PRIVACY_URL = 'https://example.com/privacy';

const isPhoneInput = (value: string): boolean => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^\d+$/.test(trimmed);
};

const getStartedSchema = z
  .object({
    inputValue: z.string().min(1, 'Required'),
  })
  .superRefine((data, ctx) => {
    const value = data.inputValue.trim();
    if (isPhoneInput(value)) {
      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inputValue'],
          message: 'Phone number must be at least 8 digits',
        });
      }
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inputValue'],
          message: 'Invalid email',
        });
      }
    }
  });

type GetStartedFormData = z.infer<typeof getStartedSchema>;

const enterAppStack = (navigation: OnboardingNavigationProp): void => {
  const root = navigation.getParent();
  root?.dispatch(
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
};

export const GetStartedScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const googleSignInStatus = useAppSelector(
    state => state.auth.operations.googleSignIn.status,
  );
  const requestOTPStatus = useAppSelector(
    state => state.auth.operations.requestOTP.status,
  );

  const { control, handleSubmit, setError } = useForm<GetStartedFormData>({
    resolver: zodResolver(getStartedSchema),
    defaultValues: { inputValue: '' },
  });

  const isGoogleSigningIn = googleSignInStatus === 'loading';

  const handleContinue = useCallback(
    (data: GetStartedFormData) => {
      Keyboard.dismiss();
      void (async (): Promise<void> => {
        try {
          const value = data.inputValue.trim();
          const isPhone = isPhoneInput(value);
          const request = isPhone
            ? {
                type: 'normal' as const,
                phone_number: value,
                country_code: COUNTRY_CODE,
              }
            : { type: 'normal' as const, email: value };
          const response = await dispatch(requestOTPThunk(request));
          if (response.show_otp) {
            const params: OTPVerificationParams = isPhone
              ? {
                  mode: 'phone',
                  phone_number: value,
                  country_code: COUNTRY_CODE,
                }
              : { mode: 'email', email: value };
            navigation.navigate('OTPVerification', params);
          } else {
            setError('inputValue', {
              message:
                response.message || 'Something went wrong. Please try again.',
            });
          }
        } catch (error) {
          setError('inputValue', {
            message: getApiErrorMessage(error),
          });
        }
      })();
    },
    [dispatch, navigation],
  );

  const handleTermsPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_TERMS_URL).catch(() => {});
  }, []);

  const handlePrivacyPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_PRIVACY_URL).catch(() => {});
  }, []);

  const handleGoogleSignIn = useCallback((): void => {
    Keyboard.dismiss();
    void (async (): Promise<void> => {
      try {
        const result = await dispatch(signInWithGoogleThunk());
        if (result != null && result.status && result.customer) {
          if (
            result?.customer?.status?.on_boarding ||
            result?.customer?.status?.on_boarding_skip
          ) {
            enterAppStack(navigation);
          } else {
            navigation.navigate('YourDetails');
          }
        }
      } catch {
        showErrorToast('Unable to sign in with Google. Please try again.');
      }
    })();
  }, [dispatch, navigation]);

  const handleSocialPress = useCallback((): void => {
    // Placeholder for Apple sign-in
  }, []);

  const bottomInset = insets.bottom;
  const footerBottomOffset = useMemo(
    () => Math.max(bottomInset, spacing['Spacing-10xl']),
    [bottomInset],
  );
  const scrollBottomPadding = useMemo(
    () => bottomInset + spacing['Spacing-15xl'],
    [bottomInset],
  );

  const scrollContentStyle = useMemo(
    () => [styles.scrollContent, { paddingBottom: scrollBottomPadding }],
    [scrollBottomPadding],
  );

  const footerStyle = useMemo(
    () => [styles.footer, { bottom: footerBottomOffset }],
    [footerBottomOffset],
  );

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: '' }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={scrollContentStyle}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Get started</Text>
            <Text style={styles.description}>
              Enter your details to access your personal{'\n'}fitness plan.
            </Text>

            <Controller
              control={control}
              name="inputValue"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputWrapper}>
                  <Input
                    leftText={isPhoneInput(value) ? '+971' : undefined}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter number or email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={!!error}
                    errorMessage={error?.message}
                    autoFocus
                    maxLength={isPhoneInput(value) ? 9 : undefined}
                  />
                </View>
              )}
            />

            <Button
              label="Continue"
              variant="primary"
              size="large"
              loading={requestOTPStatus === 'loading'}
              onPress={() => {
                void handleSubmit(handleContinue)();
              }}
              style={styles.continueButton}
            />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <Button
                label="Sign in with Google"
                variant="minimal"
                size="default"
                onPress={handleGoogleSignIn}
                disabled={isGoogleSigningIn || requestOTPStatus === 'loading'}
                style={styles.socialButton}
                iconLeft={
                  <GoogleIconSvg
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                  />
                }
              />
              <Button
                label="Sign in with Apple"
                variant="minimal"
                size="default"
                onPress={handleSocialPress}
                disabled={requestOTPStatus === 'loading'}
                style={styles.socialButton}
                iconLeft={
                  <AppleIconSvg
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                  />
                }
              />
            </View>
          </ScrollView>

          <View style={footerStyle}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink} onPress={handleTermsPress}>
                Terms of Service
              </Text>{' '}
              and{'\n'}
              <Text style={styles.footerLink} onPress={handlePrivacyPress}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </KeyboardAvoidingView>
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-15xl'],
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-5xl'],
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.PrimarySecondary,
    marginBottom: spacing['Spacing-11xl'],
  },
  inputWrapper: {
    marginBottom: spacing['Spacing-10xl'],
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-10xl'],
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.StatesDivider,
  },
  dividerText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-10xl'],
  },
  socialButton: {
    flex: 1,
  },
  continueButton: {
    width: '100%',
    marginBottom: spacing['Spacing-10xl'],
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-8xl'],
  },
  footerText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
  },
  footerLink: {
    ...typography.bodySmall2Regular,
    color: colors.TextPrimaryDefault,
  },
});
