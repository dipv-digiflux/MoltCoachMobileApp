import React, { useCallback, useState, type ReactElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppleIconSvg from '@/assets/images/svg/apple-icon.svg';
import BackIconSvg from '@/assets/images/svg/back-icon.svg';
import GoogleIconSvg from '@/assets/images/svg/google-icon.svg';
import { Button, Input, CurvedHeader } from '@/components';
import {
  colors,
  typography,
  spacing,
  moderateScale,
  spacingScale,
  iconScale,
} from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

const SOCIAL_ICON_SIZE = iconScale(20);
const BACK_ICON_SIZE = iconScale(24);

const PLACEHOLDER_TERMS_URL = 'https://example.com/terms';
const PLACEHOLDER_PRIVACY_URL = 'https://example.com/privacy';

export const GetStartedScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

  const [inputValue, setInputValue] = useState('');

  const canContinue = inputValue.trim().length > 0;

  const handleBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const enterAppStack = useCallback((): void => {
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
  }, [navigation]);

  const handleSkip = useCallback((): void => {
    enterAppStack();
  }, [enterAppStack]);

  const handleContinue = useCallback((): void => {
    // navigation.navigate('OTPVerification');
    enterAppStack();
  }, [enterAppStack]);

  const handleTermsPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_TERMS_URL).catch(() => {});
  }, []);

  const handlePrivacyPress = useCallback((): void => {
    Linking.openURL(PLACEHOLDER_PRIVACY_URL).catch(() => {});
  }, []);

  const bottomInset = insets.bottom;
  const scrollBottomPadding = bottomInset + spacing['Spacing-15xl'];

  return (
    <View style={styles.container}>
      <CurvedHeader statusBarStyle="dark-content">
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <BackIconSvg width={BACK_ICON_SIZE} height={BACK_ICON_SIZE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSkip}
            style={styles.skipButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: scrollBottomPadding },
            ]}
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
              />
            </View>

            {/* Or continue with */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google & Apple */}
            <View style={styles.socialRow}>
              <Button
                label="Google"
                variant="minimal"
                size="default"
                onPress={() => {}}
                style={styles.socialButton}
                iconLeft={
                  <GoogleIconSvg
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                  />
                }
              />
              <Button
                label="Apple"
                variant="minimal"
                size="default"
                onPress={() => {}}
                style={styles.socialButton}
                iconLeft={
                  <AppleIconSvg
                    width={SOCIAL_ICON_SIZE}
                    height={SOCIAL_ICON_SIZE}
                  />
                }
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
          </ScrollView>

          {/* Footer legal — fixed at bottom (Figma 640-12507), above safe area */}
          <View style={[styles.footer, { bottom: bottomInset }]}>
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
      </CurvedHeader>
    </View>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-15xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-5xl'],
  },
  backButton: {
    padding: spacing['Spacing-m'],
    marginLeft: -spacing['Spacing-m'],
  },
  skipButton: {
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(42),
    paddingHorizontal: spacingScale(18),
    paddingVertical: spacingScale(10),
  },
  skipText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-3xl'],
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
    marginBottom: spacing['Spacing-15xl'],
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
