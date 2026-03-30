import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import type { InfoCardProps } from '@/types/components.types';

export const InfoCard = ({
  title,
  description,
  icon,
  variant = 'default',
  style,
}: InfoCardProps): ReactElement => {
  const isSimple = variant === 'simple';

  return (
    <View style={[styles.container, isSimple && styles.containerSimple, style]}>
      <View style={[styles.contentRow, isSimple && styles.contentRowSimple]}>
        {icon !== undefined ? (
          <View style={styles.icon}>{icon}</View>
        ) : (
          <View style={styles.dot} />
        )}
        <View style={styles.textContainer}>
          {title !== undefined && !isSimple && (
            <Text style={styles.title}>{title}</Text>
          )}
          <Text
            style={[styles.description, isSimple && styles.descriptionSimple]}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
    alignSelf: 'stretch',
  },
  containerSimple: {
    paddingVertical: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: 0,
    minHeight: moderateScale(40),
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  contentRowSimple: {
    gap: spacing['Spacing-xl'],
  },
  textContainer: {
    flex: 1,
    gap: spacing['Spacing-xs'],
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
    color: colors.TextPrimaryStrong,
    flex: 1,
  },
  description: {
    ...typography.bodySmall4TallRegular,
    color: colors.IconTertiarySubtle,
  },
  descriptionSimple: {
    ...typography.bodySmall1Regular,
    color: colors.TextPrimaryDefault,
  },
});
