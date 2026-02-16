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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, OTPInput, PageHeaderScrollView } from '@/components';
import { colors, spacing, typography } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

const MOCK_DESTINATION = 'John.smith@newmail.com';
const OTP_LENGTH = 4;
const RESEND_SECONDS_START = 30;

export const OTPVerificationScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS_START);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
    navigation.goBack();
  }, [navigation]);

  const handleResendPress = useCallback((): void => {
    if (secondsLeft > 0) return;

    setSecondsLeft(RESEND_SECONDS_START);
  }, [secondsLeft]);

  const canVerify = code.length === OTP_LENGTH;
  const canResend = secondsLeft === 0;
  const bottomInset = insets.bottom;

  const footerBottom = useMemo((): number => {
    const offset = Math.max(bottomInset, spacing['Spacing-10xl']);
    const keyboardGap = spacing['Spacing-5xl'];
    return offset + keyboardHeight + (keyboardHeight > 0 ? keyboardGap : 0);
  }, [bottomInset, keyboardHeight]);

  const footerStyle = useMemo(
    () => [styles.footer, { bottom: footerBottom }],
    [footerBottom],
  );

  const formattedCountdown = useMemo(
    () =>
      secondsLeft > 0
        ? `Resend in 0:${secondsLeft.toString().padStart(2, '0')}`
        : 'Resend code',
    [secondsLeft],
  );

  const resendTextStyle = useMemo(
    () =>
      canResend
        ? styles.resendText
        : [styles.resendText, styles.resendTextDisabled],
    [canResend],
  );

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
              <Text style={styles.destinationText}>{MOCK_DESTINATION}</Text>
              <TouchableOpacity onPress={handleChangePress}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <OTPInput
            value={code}
            onChangeText={setCode}
            length={OTP_LENGTH}
            autoFocus
            style={styles.otpInput}
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
            disabled={!canVerify}
            onPress={handleVerify}
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
  otpInput: {
    marginBottom: spacing['Spacing-3xl'],
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
