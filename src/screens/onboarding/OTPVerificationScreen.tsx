import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, CurvedHeader, OnboardingHeader } from '@/components';
import { colors, spacing, typography, moderateScale } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

const MOCK_DESTINATION = 'John.smith@newmail.com';
const OTP_LENGTH = 4;
const RESEND_SECONDS_START = 30;

export const OTPVerificationScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS_START);
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [secondsLeft]);

  const handleVerify = useCallback((): void => {
    if (code.length === OTP_LENGTH) {
      navigation.navigate('YourDetails');
    }
  }, [code.length, navigation]);

  const handleChangePress = useCallback((): void => {
    navigation.navigate('GetStarted');
  }, [navigation]);

  const handleCodeChange = useCallback((value: string): void => {
    const numericOnly = value.replace(/[^0-9]/g, '');
    setCode(numericOnly.slice(0, OTP_LENGTH));
  }, []);

  const handleOtpPress = useCallback((): void => {
    inputRef.current?.focus();
  }, []);

  const canVerify = code.length === OTP_LENGTH;
  const bottomInset = insets.bottom;
  const footerBottomOffset = Math.max(bottomInset, spacing['Spacing-10xl']);

  const formattedCountdown =
    secondsLeft > 0
      ? `Resend in 0:${secondsLeft.toString().padStart(2, '0')}`
      : 'Resend code';

  return (
    <View style={styles.container}>
      <CurvedHeader statusBarStyle="dark-content">
        <OnboardingHeader />

        <View style={styles.content}>
          <View style={styles.headingBlock}>
            <Text style={styles.title}>Enter 4 digit code sent to</Text>
            <View style={styles.destinationRow}>
              <Text style={styles.destinationText}>{MOCK_DESTINATION}</Text>
              <TouchableOpacity onPress={handleChangePress}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.otpWrapper}
            onPress={handleOtpPress}
          >
            <View style={styles.otpRow}>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const char = code[index] ?? '';

                return (
                  <View style={styles.otpCell} key={String(index)}>
                    <Text style={styles.otpCellText}>{char || '-'}</Text>
                  </View>
                );
              })}
            </View>
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={OTP_LENGTH}
              style={styles.hiddenInput}
              autoFocus
            />
          </TouchableOpacity>

          <Text style={styles.resendText}>{formattedCountdown}</Text>
        </View>

        <View style={[styles.footer, { bottom: footerBottomOffset }]}>
          <Button
            label="Verify"
            variant="primary"
            size="large"
            disabled={!canVerify}
            onPress={handleVerify}
            style={styles.verifyButton}
          />
        </View>
      </CurvedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
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
    ...typography.bodySmall1Medium,
    color: colors.PrimaryMain,
  },
  otpWrapper: {
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(2),
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-3xl'],
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpCell: {
    flex: 1,
    alignItems: 'center',
  },
  otpCellText: {
    ...typography.h6SemiBold,
    color: colors.TextPrimaryDefault,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  resendText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-3xl'],
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
