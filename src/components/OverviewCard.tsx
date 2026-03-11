import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, spacing, moderateScale } from '@/theme';

import type {
  MetricLayout,
  OverviewCardMetric,
  OverviewCardProps,
} from '@/types/components.types';

export type { MetricLayout, OverviewCardMetric, OverviewCardProps };

export const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  subtitle,
  metrics = [],
  metricsLayout = 'row',
  footerText,
  footerTextColor,
  actionText,
  actionColor,
  variant = 'light',
  style,
}: OverviewCardProps) => {
  const isDark = variant === 'dark';
  const bgColor = isDark ? colors.PrimaryMain : colors.StatesWhite;
  const textColorPrimary = isDark
    ? colors.StatesWhite
    : colors.TextPrimaryDefault;
  const textColorSecondary = isDark
    ? colors.TextSecondaryDisabled
    : colors.TextSecondaryDefault;
  const borderColor = isDark ? colors.Transparent : colors.StatesOutline;

  return (
    <View
      style={[styles.card, { backgroundColor: bgColor, borderColor }, style]}
    >
      {isDark ? (
        <View style={styles.darkBgPattern}>
          <View style={styles.circleDecoration} />
        </View>
      ) : null}
      <View style={styles.topSection}>
        <Text
          style={[styles.title, { color: textColorSecondary }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[styles.value, { color: textColorPrimary }]}
          numberOfLines={1}
        >
          {value}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: textColorSecondary }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.bottomSection}>
        {metrics.length > 0 && metricsLayout === 'column' ? (
          <View style={styles.metricsColumnContainer}>
            {metrics.map((m, i) => (
              <React.Fragment key={i}>
                <View style={styles.metricColumnItem}>
                  <Text
                    style={[
                      styles.metricColumnLabel,
                      { color: m.color || textColorSecondary },
                    ]}
                  >
                    {m.label}
                  </Text>
                  {m.value ? (
                    <Text
                      style={[
                        styles.metricColumnValue,
                        { color: textColorSecondary },
                      ]}
                    >
                      {m.value}
                    </Text>
                  ) : null}
                </View>
                {i < metrics.length - 1 ? (
                  <View style={styles.verticalSeparator} />
                ) : null}
              </React.Fragment>
            ))}
          </View>
        ) : null}

        {metrics.length > 0 && metricsLayout === 'row' ? (
          <View style={styles.metricsRowContainer}>
            {metrics.map((m, i) => (
              <View key={i} style={styles.metricRowItem}>
                {m.type === 'dot' ? (
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: m.color || textColorSecondary },
                    ]}
                  />
                ) : null}
                {m.type === 'arrow' ? (
                  <Text
                    style={[
                      styles.arrow,
                      { color: m.color || textColorSecondary },
                    ]}
                  >
                    ↗
                  </Text>
                ) : null}
                <Text
                  style={[
                    styles.metricRowLabel,
                    {
                      color:
                        m.type === 'dot' || m.type === 'arrow'
                          ? textColorPrimary
                          : m.color || textColorSecondary,
                    },
                  ]}
                >
                  {m.label}
                </Text>
                {i < metrics.length - 1 ? (
                  <Text style={styles.inlineSeparator}> </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {footerText ? (
          <Text
            style={[
              styles.footerText,
              { color: footerTextColor || textColorSecondary },
            ]}
          >
            {footerText}
          </Text>
        ) : null}

        {actionText ? (
          <Text
            style={[
              styles.actionText,
              { color: actionColor || colors.FeedbackWarningText },
            ]}
          >
            {actionText}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: moderateScale(260),
    minHeight: moderateScale(150),
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
    paddingVertical: spacing['Spacing-5xl'], // 16px
    borderRadius: moderateScale(12),
    borderWidth: 1,
    marginRight: spacing['Spacing-5xl'], // 16px
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: colors.ShadowDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  darkBgPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderRadius: moderateScale(12),
  },
  circleDecoration: {
    position: 'absolute',
    top: -moderateScale(20),
    right: -moderateScale(20),
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    borderColor: colors.BorderSubtleWhite,
  },
  topSection: {
    marginBottom: spacing['Spacing-5xl'], // 16px
  },
  title: {
    ...typography.bodySmall1Regular, // Body small 1 is 14px
    marginBottom: spacing['Spacing-sm'], // 2px
  },
  value: {
    ...typography.h3Bold, // 36px
    marginBottom: spacing['Spacing-sm'], // 2px
  },
  subtitle: {
    ...typography.bodySmall2Regular, // 12px
  },
  bottomSection: {
    marginTop: 'auto' as const,
  },
  metricsColumnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricColumnItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  metricColumnLabel: {
    ...typography.bodySmall3Regular, // 10px
    marginBottom: spacing['Spacing-sm'], // 2px
  },
  metricColumnValue: {
    ...typography.bodySmall2Regular, // 12px
  },
  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: colors.StatesOutline,
    marginHorizontal: spacing['Spacing-xl'], // 8px
  },
  metricsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metricRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing['Spacing-sm'], // 2px
    marginBottom: spacing['Spacing-sm'], // 2px
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    marginRight: spacing['Spacing-m'], // 4px
  },
  arrow: {
    marginRight: spacing['Spacing-m'], // 4px
    fontSize: moderateScale(12),
    lineHeight: moderateScale(12),
  },
  metricRowLabel: {
    ...typography.bodySmall3Regular, // 10px
  },
  inlineSeparator: {
    ...typography.bodySmall3Regular,
    color: colors.Transparent,
  },
  footerText: {
    ...typography.bodySmall3Regular, // 10px
  },
  actionText: {
    ...typography.bodySmall2Regular, // 12px
    marginTop: spacing['Spacing-xl'], // 8px
  },
});
