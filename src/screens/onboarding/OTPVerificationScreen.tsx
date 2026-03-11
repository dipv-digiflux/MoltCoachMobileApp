import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button, OTPInput, PageHeaderScrollView } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestOTPThunk, verifyOTPThunk } from '@/store/thunks';
import { colors, spacing, typography } from '@/theme';
import { getApiErrorMessage } from '@/utils/apiError';

import type {
  OnboardingNavigationProp,
  OnboardingStackParamList,
  OTPVerificationParams,
} from '@navigation/types';

const OTP_LENGTH = 4;
const RESEND_SECONDS_START = 300;

const otpSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, `Enter ${OTP_LENGTH} digit code`)
    .regex(/^\d+$/, 'Code must be digits only'),
});

type OTPFormData = z.infer<typeof otpSchema>;

const formatDestination = (params: OTPVerificationParams): string => {
  if (params.mode === 'email') {
    return params.email;
  }
  return `${params.country_code} ${params.phone_number}`;
};

export const OTPVerificationScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const route =
    useRoute<RouteProp<OnboardingStackParamList, 'OTPVerification'>>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const verifyOTPStatus = useAppSelector(
    state => state.auth.operations.verifyOTP.status,
  );

  const rawParams = route.params;
  const params: OTPVerificationParams = rawParams || {
    mode: 'phone' as const,
    phone_number: '1234567890',
    country_code: '+1',
  };

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS_START);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const destination = useMemo(
    () => (params ? formatDestination(params) : ''),
    [params],
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: 'onBlur',
    defaultValues: { otp: '' },
  });

  const otpValue = watch('otp');

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timerId = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const handleVerify = useCallback(
    (data: OTPFormData) => {
      if (!params) {
        navigation.goBack();
        return;
      }
      void (async (): Promise<void> => {
        try {
          const request =
            params.mode === 'email'
              ? {
                  type: 'normal' as const,
                  email: params.email,
                  otp: data.otp,
                }
              : {
                  type: 'normal' as const,
                  phone_number: params.phone_number,
                  country_code: params.country_code,
                  otp: data.otp,
                };
          const result = await dispatch(verifyOTPThunk(request));
          if (result.status) {
            navigation.navigate('RequestAccessScreen');
          }
        } catch (error) {
          const message = getApiErrorMessage(error);
          setError('otp', { message });
        }
      })();
    },
    [params, dispatch, navigation, setError],
  );

  const handleChangePress = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const handleResendPress = useCallback((): void => {
    if (secondsLeft > 0 || !params) return;
    void (async (): Promise<void> => {
      clearErrors('otp');
      try {
        const request =
          params.mode === 'email'
            ? { type: 'normal' as const, email: params.email }
            : {
                type: 'normal' as const,
                phone_number: params.phone_number,
                country_code: params.country_code,
              };
        await dispatch(requestOTPThunk(request));
        setSecondsLeft(RESEND_SECONDS_START);
      } catch {
        Alert.alert(
          'Resend failed',
          'Could not resend code. Please try again.',
          [{ text: 'OK' }],
        );
      }
    })();
  }, [secondsLeft, params, dispatch, clearErrors]);

  const canVerify = otpValue.length === OTP_LENGTH;
  const canResend = secondsLeft === 0;

  const footerBottom = useMemo((): number => {
    const offset = Math.max(insets.bottom, spacing['Spacing-10xl']);
    const keyboardGap = spacing['Spacing-5xl'];
    return offset + keyboardHeight + (keyboardHeight > 0 ? keyboardGap : 0);
  }, [insets.bottom, keyboardHeight]);

  const footerStyle = useMemo(
    () => [styles.footer, { bottom: footerBottom }],
    [footerBottom],
  );

  const formattedCountdown = useMemo(() => {
    if (secondsLeft <= 0) return 'Resend code';
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `Resend in ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [secondsLeft]);

  const resendTextStyle = useMemo(
    () =>
      canResend
        ? styles.resendText
        : [styles.resendText, styles.resendTextDisabled],
    [canResend],
  );

  if (!params) {
    return (
      <View style={styles.container}>
        <Button label="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: '' }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.content}>
          <View style={styles.headingBlock}>
            <Text style={styles.title}>Enter 4 digit code sent to</Text>
            <View style={styles.destinationRow}>
              <Text style={styles.destinationText} numberOfLines={1}>
                {destination}
              </Text>
              <TouchableOpacity onPress={handleChangePress}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Controller
            control={control}
            name="otp"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={styles.otpWrap}>
                <OTPInput
                  value={value}
                  onChangeText={text => {
                    const prevLen = value.length;
                    onChange(text);
                    setValue('otp', text, {
                      shouldValidate:
                        (prevLen === OTP_LENGTH && text.length < OTP_LENGTH) ||
                        text.length === OTP_LENGTH,
                    });
                  }}
                  onBlur={() => {
                    onBlur();
                    void trigger('otp');
                  }}
                  length={OTP_LENGTH}
                  autoFocus
                  style={[
                    styles.otpInput,
                    error?.message && {
                      borderColor: colors.FeedbackWarningBorder,
                    },
                  ]}
                />
                {error?.message != null ? (
                  <Text style={styles.otpError}>{error.message}</Text>
                ) : null}
              </View>
            )}
          />

          <View style={styles.resendRow}>
            <TouchableOpacity
              onPress={handleResendPress}
              disabled={!canResend}
              activeOpacity={canResend ? 0.7 : 1}
              style={styles.resendTouchable}
            >
              <Text style={resendTextStyle}>{formattedCountdown}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={footerStyle}>
          <Button
            label="Verify"
            variant="primary"
            size="large"
            loading={verifyOTPStatus === 'loading'}
            disabled={!canVerify}
            onPress={() => {
              void handleSubmit(handleVerify)();
            }}
            style={styles.verifyButton}
          />
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  headingBlock: {
    marginBottom: spacing['Spacing-11xl'],
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-5xl'],
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing['Spacing-m'],
  },
  destinationText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    flex: 1,
  },
  changeText: {
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
    textDecorationLine: 'underline',
  },
  otpWrap: {
    marginBottom: spacing['Spacing-3xl'],
  },
  otpInput: {
    marginBottom: spacing['Spacing-xl'],
  },
  otpError: {
    ...typography.bodySmall1Regular,
    color: colors.FeedbackWarningText,
  },
  resendRow: {
    alignItems: 'center',
    marginTop: spacing['Spacing-3xl'],
  },
  resendTouchable: {
    alignSelf: 'center',
  },
  resendText: {
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
  },
  resendTextDisabled: {
    color: colors.TextSecondaryDefault,
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
  verifyButton: {
    width: '100%',
  },
});
