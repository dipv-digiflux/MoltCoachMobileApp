import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import type { ScreenHeaderProps } from './ScreenHeader.types';

export const ScreenHeader = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: ScreenHeaderProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
      {subtitle ? (
        typeof subtitle === 'string' ? (
          <Text style={[styles.subtitleText, subtitleStyle]}>{subtitle}</Text>
        ) : (
          subtitle
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-2xl'], // 24px
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
    paddingBottom: spacing['Spacing-5xl'], // 16px
    gap: spacing['Spacing-m'], // 4px between title and subtitle
  },
  titleText: {
    ...typography.h0Bold,
    color: colors.TextPrimaryStrong,
  },
  subtitleText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
