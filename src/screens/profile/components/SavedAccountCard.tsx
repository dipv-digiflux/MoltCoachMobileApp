import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CreditIconSvg } from '@/assets/images';
import { Badge } from '@/components/Badge';
import {
  colors,
  iconScale,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type { SavedAccountCardProps } from './SavedAccountCard.types';

const MoreVerticalIcon = ({
  color = colors.IconPrimaryDefault,
}: {
  color?: string;
}): React.ReactElement => (
  <View style={styles.moreIconContainer}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <View style={[styles.dot, { backgroundColor: color }]} />
    <View style={[styles.dot, { backgroundColor: color }]} />
  </View>
);

export const SavedAccountCard = ({
  bankName,
  accountMask,
  isPrimary = false,
  onPress,
  onPressMenu,
}: SavedAccountCardProps): React.ReactElement => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <CreditIconSvg
          width={iconScale(24)}
          height={iconScale(24)}
          color={colors.IconPrimaryDefault}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.bankName} numberOfLines={1}>
            {bankName}
          </Text>
          {isPrimary && (
            <Badge
              label="PRIMARY"
              backgroundColor="TagSuccessSurface"
              textColor="FeedbackSuccessText"
              paddingHorizontal="Spacing-m"
              paddingVertical="Spacing-xs"
            />
          )}
        </View>
        <Text style={styles.accountMask}>{accountMask}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={onPressMenu ?? onPress}
        hitSlop={spacing['Spacing-xl']}
      >
        <MoreVerticalIcon color={colors.IconSecondaryDefault} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
    borderRadius: radius.md,
    padding: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  iconWrapper: {
    width: moderateScale(48),
    height: moderateScale(48),
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing['Spacing-xl'],
    gap: spacing['Spacing-xs'],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  bankName: {
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
  },
  accountMask: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  menuButton: {
    padding: spacing['Spacing-m'],
  },
  moreIconContainer: {
    gap: spacing['Spacing-1'],
    alignItems: 'center',
  },
  dot: {
    width: spacing['Spacing-1'],
    height: spacing['Spacing-1'],
    borderRadius: radius.full,
  },
});
