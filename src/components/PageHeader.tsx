import React, { type ReactElement, useCallback } from 'react';
import {
  TouchableOpacity,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackIconSvg } from '@/assets/images';
import { colors, moderateScale, spacing, typography } from '@/theme';

import type { PageHeaderProps } from '@/types/components.types';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

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
  subtitlePosition = 'bottom',
  style,
  children,
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
      backgroundColor: fallbackBackgroundColor ?? colors.OverlayLight,
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
          {shouldShowBackButton ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <BackIconSvg
                width={moderateScale(16)}
                height={moderateScale(16)}
                color={colors.IconPrimaryDefault}
              />
            </TouchableOpacity>
          ) : null}

          <View style={styles.titleBlock}>
            {subtitle !== undefined &&
            subtitle.length > 0 &&
            subtitlePosition === 'top' ? (
              <Text style={styles.subtitleText} numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
            <Text
              style={styles.titleText}
              numberOfLines={1}
              accessibilityRole="header"
            >
              {title}
            </Text>
            {subtitle !== undefined &&
            subtitle.length > 0 &&
            subtitlePosition === 'bottom' ? (
              <Text style={styles.subtitleText} numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        {rightIcon !== undefined ? (
          <View style={styles.rightSection}>{rightIcon}</View>
        ) : null}
      </View>
      {children}
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
    backgroundColor: colors.StatesWhite,
    borderColor: colors.StatesFill1,
    borderWidth: 1,
    borderRadius: moderateScale(42),
    padding: spacing['Spacing-l'],
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
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
  },
  subtitleText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
