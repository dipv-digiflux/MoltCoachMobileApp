import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { InfoIconSvg } from '@/assets/images';
import { colors, iconScale, spacing, typography, moderateScale } from '@/theme';

import type { ConditionCardProps } from './ConditionCard.types';

export const ConditionCard = ({
  condition,
  onRemove,
}: ConditionCardProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <InfoIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.StatesWhite}
        />
        <Text style={styles.name}>{condition.name}</Text>
      </View>
      <Pressable
        onPress={() => onRemove(condition.id)}
        style={styles.removeButton}
        hitSlop={spacing['Spacing-xl']}
      >
        <View style={styles.closeIconContainer}>
          <View style={[styles.closeLine, styles.closeLineLeft]} />
          <View style={[styles.closeLine, styles.closeLineRight]} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.FeedbackWarningBorder, // Coral red
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    borderRadius: moderateScale(4),
    marginBottom: spacing['Spacing-xl'],
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  name: {
    ...typography.bodySmall1SemiBold,
    color: colors.StatesWhite,
  },
  removeButton: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconContainer: {
    width: iconScale(12),
    height: iconScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: iconScale(10),
    height: moderateScale(1.5),
    backgroundColor: colors.StatesWhite,
    borderRadius: moderateScale(1),
  },
  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
});
