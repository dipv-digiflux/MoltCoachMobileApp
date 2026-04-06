import React, { type ReactElement } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { SquareCheckbox } from '@/components/SquareCheckbox';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { getInitials } from '@/utils/avatar';

import { type ClientListItemProps } from './SearchClientBottomSheet.types';

export const ClientListItem = ({
  client,
  isSelected,
  onPress,
}: ClientListItemProps): ReactElement => {
  const { name, avatarUrl, status } = client;

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(client)}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.leftSection}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.statusText} numberOfLines={1}>
            {status}
          </Text>
        </View>
      </View>
      <SquareCheckbox checked={isSelected} onPress={() => onPress(client)} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-4xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing['Spacing-xl'],
  },
  avatar: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: colors.StatesDivider,
  },
  avatarPlaceholder: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: colors.AccentBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDefault,
  },
  infoContainer: {
    flex: 1,
    gap: moderateScale(2),
  },
  nameText: {
    ...typography.bodySmall1Medium,
    color: colors.PrimaryMain,
  },
  statusText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
});
