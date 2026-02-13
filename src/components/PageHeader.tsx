import React, { type ReactElement, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography, moderateScale } from '@/theme';

import type { NavigationProp, ParamListBase } from '@react-navigation/native';

type PageHeaderProps = {
  title: string;
  subtitle?: string;

  /** Optional custom left icon (back button). */
  leftIcon?: ReactElement;

  /** Optional custom right icon (e.g., Skip, Settings). */
  rightIcon?: ReactElement;

  /** Called when back button is pressed. Falls back to navigation.goBack(). */
  onPressBack?: () => void;

  /** Hide the back button entirely. @default false */
  hideBackButton?: boolean;

  /** Align title/start content to the left instead of center. @default true */
  alignTitleLeft?: boolean;

  /** Show a subtle bottom border under the header. @default false */
  showBottomBorder?: boolean;

  /** Optional background color when LiquidGlass is not supported. */
  fallbackBackgroundColor?: string;

  /** Extra styles on the container. */
  style?: StyleProp<ViewStyle>;
};

/**
 * PageHeader
 *
 * Header component matching the onboarding header from Figma:
 * - Back button on the left in a pill
 * - Title (h6) and optional subtitle
 * - Optional right action (e.g., Skip)
 * - Uses LiquidGlassView when supported, falls back to solid background otherwise
 */
export const PageHeader = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPressBack,
  hideBackButton = false,
  alignTitleLeft = true,
  showBottomBorder = false,
  fallbackBackgroundColor,
  style,
}: PageHeaderProps): ReactElement => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const insets = useSafeAreaInsets();

  const handleBackPress = useCallback((): void => {
    if (onPressBack !== undefined) {
      onPressBack();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, onPressBack]);

  const shouldShowBackButton =
    !hideBackButton && (leftIcon !== undefined || navigation.canGoBack());

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      paddingTop: insets.top + spacing['Spacing-xl'],
    },
    showBottomBorder && styles.bottomBorder,
    !isLiquidGlassSupported && {
      backgroundColor: fallbackBackgroundColor ?? 'rgba(255,255,255,0.9)',
    },
    style,
  ];

  return (
    <LiquidGlassView style={containerStyle}>
      <View
        style={[
          styles.headerRow,
          alignTitleLeft ? styles.headerRowAlignLeft : styles.headerRowCenter,
        ]}
      >
        <View style={styles.leftSection}>
          {shouldShowBackButton && (
            <Pressable
              onPress={handleBackPress}
              hitSlop={spacing['Spacing-xl']}
              style={styles.backButton}
            >
              {leftIcon ?? (
                <Text style={styles.backIconText} accessibilityLabel="Back">
                  {'\u2039'}
                </Text>
              )}
            </Pressable>
          )}

          <View style={styles.titleBlock}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              accessibilityRole="header"
            >
              {title}
            </Text>
            {subtitle !== undefined && subtitle.length > 0 && (
              <Text style={styles.subtitleText} numberOfLines={2}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {rightIcon !== undefined && (
          <View style={styles.rightSection}>{rightIcon}</View>
        )}
      </View>
    </LiquidGlassView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing['Spacing-3xl'], // 12px from Figma
    paddingBottom: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BorderPrimaryDisabled,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRowAlignLeft: {
    justifyContent: 'space-between',
  },
  headerRowCenter: {
    justifyContent: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing['Spacing-3xl'],
  },
  rightSection: {
    marginLeft: spacing['Spacing-3xl'],
  },
  backButton: {
    backgroundColor: colors.StatesFill1,
    borderColor: colors.StatesFill1,
    borderWidth: 1,
    borderRadius: moderateScale(42),
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-m'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    ...typography.bodySmall1Medium,
    color: colors.IconPrimaryDefault,
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing['Spacing-sm'],
  },
  titleText: {
    ...typography.h6SemiBold,
    color: colors.TextPrimaryDefault,
  },
  subtitleText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
