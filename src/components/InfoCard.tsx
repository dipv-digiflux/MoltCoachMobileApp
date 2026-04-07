import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  borderWidth,
  colors,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

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
    borderRadius: radius.xs,
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderInfoDefault,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
    backgroundColor: colors.SurfaceInfoDefault,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: radius.full,
    backgroundColor: colors.MatrixMain,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryStrong,
    flex: 1,
  },
  description: {
    ...typography.bodySmall4TallMedium,
    color: colors.TextInfoDefault,
  },
  descriptionSimple: {
    ...typography.bodySmall1Regular,
    color: colors.TextPrimaryDefault,
  },
});
