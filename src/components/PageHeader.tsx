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
import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import type { PageHeaderProps } from '@/types/components.types';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

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
  variant = 'default',
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
      paddingTop: insets.top + spacing['Spacing-6xl'],
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
          variant === 'stacked'
            ? styles.headerRowStacked
            : alignTitleLeft
            ? styles.headerRowAlignLeft
            : styles.headerRowCenter,
        ]}
      >
        <View
          style={[
            styles.leftSection,
            variant === 'stacked'
              ? styles.leftSectionStacked
              : styles.leftSectionDefault,
          ]}
        >
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

          <View
            style={[
              styles.titleBlock,
              variant !== 'stacked' && styles.titleBlockDefault,
            ]}
          >
            {subtitle !== undefined &&
            subtitle.length > 0 &&
            subtitlePosition === 'top' ? (
              <Text style={styles.subtitleText} numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
            <Text
              style={[
                styles.titleText,
                variant === 'stacked' && styles.titleTextStacked,
              ]}
              numberOfLines={variant === 'stacked' ? 0 : 1}
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
    paddingHorizontal: spacing['Spacing-5xl'],
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
    gap: spacing['Spacing-3xl'],
  },
  leftSectionDefault: {
    flex: 1,
  },
  rightSection: {
    marginLeft: spacing['Spacing-3xl'],
  },
  backButton: {
    backgroundColor: colors.StatesWhite,
    borderColor: colors.StatesFill1,
    borderWidth: 1,
    borderRadius: radius.xs, // Square-ish with rounded corners to match image
    padding: spacing['Spacing-l'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    ...typography.bodySmall1Medium,
    color: colors.IconPrimaryDefault,
  },
  titleBlock: {
    justifyContent: 'center',
    gap: spacing['Spacing-m'], // Increased gap to match image
  },
  titleBlockDefault: {
    flex: 1,
  },
  titleText: {
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
  },
  subtitleText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  headerRowStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftSectionStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing['Spacing-5xl'], // More space between back button and title
  },
  titleTextStacked: {
    ...typography.h7Bold,
  },
});
