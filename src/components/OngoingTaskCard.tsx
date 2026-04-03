import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DeleteIconSvg, EditIconSvg } from '@/assets/images';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { OngoingTaskCardProps } from './OngoingTaskCard.types';

export const OngoingTaskCard = ({
  title,
  subtitle,
  onEdit,
  onDelete,
}: OngoingTaskCardProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onEdit} style={styles.iconButton}>
          <EditIconSvg width={moderateScale(22)} height={moderateScale(22)} />
        </Pressable>
        <Pressable onPress={onDelete} style={styles.iconButton}>
          <DeleteIconSvg width={moderateScale(22)} height={moderateScale(22)} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    backgroundColor: colors.StatesWhite,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: moderateScale(2),
  },
  subtitle: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconButton: {
    padding: spacing['Spacing-m'],
  },
});
