import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import type { InfoCardProps } from '@/types/components.types';

export const InfoCard = ({
  title,
  description,
  icon,
  style,
}: InfoCardProps): ReactElement => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        {icon !== undefined ? (
          <View style={styles.icon}>{icon}</View>
        ) : (
          <View style={styles.dot} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.BorderSecondaryDefault,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
    alignSelf: 'stretch',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: radius.full,
    backgroundColor: colors.MatrixMain,
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    flex: 1,
  },
  description: {
    ...typography.bodySmall4TallRegular,
    color: colors.IconTertiarySubtle,
  },
});
