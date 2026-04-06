import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';
import { getInitials } from '@/utils/avatar';

import type { ProfileHeaderProps } from './ProfileHeader.types';

/**
 * Reused PencilIcon from ClientDetailedCard.tsx
 */
const PencilIcon = (): ReactElement => (
  <Svg
    width={moderateScale(14)}
    height={moderateScale(14)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      stroke={colors.IconSecondaryDefault}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Custom CopyIcon (overlapping squares)
 */
const CopyIcon = (): ReactElement => (
  <Svg
    width={moderateScale(14)}
    height={moderateScale(14)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Rect
      x={9}
      y={9}
      width={13}
      height={13}
      rx={2}
      ry={2}
      stroke={colors.IconSecondaryDefault}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
      stroke={colors.IconSecondaryDefault}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileHeader = ({
  name,
  email,
  id,
  onEditPress,
  onCopyIdPress,
}: ProfileHeaderProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{getInitials(name)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.secondaryInfoRow}>
          <Text style={styles.secondaryText}>{email}</Text>
          <View style={styles.separator} />
          <View style={styles.idContainer}>
            <Text style={styles.secondaryText}>
              {`ID:${
                id.length > 12
                  ? `${id.substring(0, 5)}...${id.substring(id.length - 4)}`
                  : id
              }`}
            </Text>
            <Pressable
              onPress={onCopyIdPress}
              style={styles.copyButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CopyIcon />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
        onPress={onEditPress}
        style={styles.editButton}
        accessibilityLabel="Edit profile"
        accessibilityRole="button"
      >
        <PencilIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-2xl'],
    backgroundColor: colors.StatesWhite,
  },
  avatarContainer: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: radius.xs,
    backgroundColor: colors.PrimaryMain,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing['Spacing-3xl'],
  },
  avatarText: {
    ...typography.h8SemiBold,
    color: colors.StatesWhite,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    ...typography.h8SemiBold,
    color: colors.PrimaryMain,
    marginBottom: moderateScale(6),
  },
  secondaryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  separator: {
    width: 1,
    height: moderateScale(12),
    backgroundColor: colors.TextSecondaryDefault,
    marginHorizontal: spacing['Spacing-l'],
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-sm'],
  },
  copyButton: {
    padding: spacing['Spacing-xs'],
  },
  editButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: colors.BorderSecondaryDefault,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing['Spacing-xl'],
  },
});
