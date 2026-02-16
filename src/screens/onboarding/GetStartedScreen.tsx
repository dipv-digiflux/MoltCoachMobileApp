import React, {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppleIconSvg from '@/assets/images/svg/apple-icon.svg';
import GoogleIconSvg from '@/assets/images/svg/google-icon.svg';
import { Button, Input, PageHeaderScrollView } from '@/components';
import { colors, typography, spacing, iconScale } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

const SOCIAL_ICON_SIZE = iconScale(20);

const PLACEHOLDER_TERMS_URL = 'https://example.com/terms';
const PLACEHOLDER_PRIVACY_URL = 'https://example.com/privacy';

export const GetStartedScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

  const [inputValue, setInputValue] = useState('');

  const canContinue = inputValue.trim().length > 0;

  // const enterAppStack = useCallback((): void => {
  //   const root = navigation.getParent();
  //   root?.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'AppStack',
  //           params: {
  //             screen: 'BottomTabs',
  //             params: {
  //               screen: 'HomeTab',
  //               params: { screen: 'HomeDashboard' },
  //             },
  //           },
  //         },
  //       ],
  //     }),
  //   );
  // }, [navigation]);

  // const handleSkip = useCallback((): void => {
  //   enterAppStack();
  // }, [enterAppStack]);

  const handleContinue = useCallback((): void => {
    Keyboard.dismiss();
    navigation.navigate('OTPVerification');
  }, [navigation]);

  const handleTermsPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_TERMS_URL).catch(() => {});
  }, []);

  const handlePrivacyPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_PRIVACY_URL).catch(() => {});
  }, []);

  const handleSocialPress = useCallback((): void => {
    // Placeholder for social sign-in
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

            {/* Input */}
            <View style={styles.inputWrapper}>
              <Input
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Enter number or email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
              />
            </View>

            {/* Continue */}
            <Button
              label="Continue"
              variant="primary"
              size="large"
              disabled={!canContinue}
              onPress={handleContinue}
              style={styles.continueButton}
            />

            {/* Or continue with */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google & Apple */}
            <View style={styles.socialRow}>
              <Button
                label="Sign in with Google"
                variant="minimal"
                size="default"
                onPress={handleSocialPress}
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

          {/* Footer legal — aligned with Intro carousel CTA bottom */}
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

// ─── Styles ─────────────────────────────────────────────────────────────

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
    ...typography.bodySmall3SemiBold,
    color: colors.TextPrimaryDefault,
  },
});
