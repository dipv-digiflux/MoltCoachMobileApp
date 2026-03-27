import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  ChevronDownIconSvg,
  NotificationBellSvg,
  StarIconSvg,
} from '@/assets/images';
import { Button } from '@/components/Button';
import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';
import { getInitials } from '@/utils/avatar';

import type {
  ClientCardProps,
  ClientTag,
  ClientTagType,
} from '@/types/components.types';

export type { ClientCardProps, ClientTag, ClientTagType };

export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  score,
  avatarUrl: _avatarUrl,
  lastSyncedText,
  detailsText,
  tags,
  onNudgePress,
  onPress,
  style,
}) => {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.avatarContainer}>
          {_avatarUrl ? (
            <Image source={{ uri: _avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
            </View>
          )}
          <View style={styles.starBadge}>
            <StarIconSvg
              width={iconScale(10)}
              height={iconScale(10)}
              color={colors.StatesWhite}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.scorePill}>
              <Text style={styles.scoreText}>Molt score: {score}%</Text>
            </View>
          </View>
          <Text style={styles.syncText}>{lastSyncedText}</Text>
          <Text style={styles.detailsText}>{detailsText}</Text>
        </View>

        <View style={styles.chevronContainer}>
          <View style={styles.chevronRotate}>
            <ChevronDownIconSvg
              width={iconScale(16)}
              height={iconScale(16)}
              color={colors.IconSecondaryDefault}
            />
          </View>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => {
          const isPositive = tag.type === 'positive';
          const tagBgColor = isPositive
            ? colors.TagSuccessSurface
            : colors.TagWarningSurface;
          const tagTextColor = colors.PrimarySecondary;

          return (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: tagBgColor }]}
            >
              <Text style={[styles.tagText, { color: tagTextColor }]}>
                {tag.label}
              </Text>
            </View>
          );
        })}
      </View>

      <Button
        variant="outline"
        style={styles.nudgeButton}
        iconRight={
          <NotificationBellSvg
            width={iconScale(18)}
            height={iconScale(18)}
            color={colors.TextPrimaryDefault}
          />
        }
        label="Nudge"
        onPress={onNudgePress}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(12),
    padding: spacing['Spacing-5xl'], // 16px
    marginBottom: spacing['Spacing-xl'], // 16px
    marginHorizontal: spacing['Spacing-5xl'], // 16px
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['Spacing-xl'],
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing['Spacing-xl'],
  },
  avatar: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    backgroundColor: colors.StatesDivider,
  },
  avatarPlaceholder: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    backgroundColor: colors.AccentBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(18),
    color: colors.TextSecondaryDefault,
  },
  starBadge: {
    position: 'absolute',
    top: moderateScale(2),
    left: moderateScale(2),
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: colors.AccentDeepBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.StatesWhite,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(2),
    gap: spacing['Spacing-m'],
  },
  nameText: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(18),
    color: colors.TextPrimaryDefault,
  },
  scorePill: {
    backgroundColor: colors.SurfaceSubtleDisabled,
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  scoreText: {
    ...typography.bodySmall1Medium,
    fontSize: moderateScale(10),
    color: colors.TextSecondaryDefault,
  },
  syncText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  detailsText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  chevronContainer: {
    paddingLeft: spacing['Spacing-m'],
  },
  chevronRotate: {
    transform: [{ rotate: '-90deg' }],
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  tag: {
    paddingHorizontal: spacing['Spacing-l'],
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(2),
  },
  tagText: {
    ...typography.tagLabel,
  },
  nudgeButton: {
    alignSelf: 'stretch',
  },
});
