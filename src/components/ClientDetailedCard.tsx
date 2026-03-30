import React, { type ReactElement } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
  NotificationBellSvg,
  StarIconSvg,
  ChevronDownIconSvg,
} from '@/assets/images';
import { Button } from '@/components/Button';
import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';
import { ClientDetailedCardProps } from '@/types/components.types';
import { getInitials } from '@/utils/avatar';

const PencilIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(14)}
    height={moderateScale(14)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      stroke={colors.IconSecondaryDefault}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClientDetailedCard = ({
  name,
  score,
  avatarUrl: _avatarUrl,
  lastSyncedText,
  detailsText,
  tags,
  onNudgePress,
  onEditSessions,
  onPress,
  style,
}: ClientDetailedCardProps): ReactElement => {
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
          <Pressable style={styles.detailsRow} onPress={onEditSessions}>
            <Text style={styles.detailsText}>{detailsText}</Text>
            <View style={styles.editIconContainer}>
              <PencilIcon />
            </View>
          </Pressable>
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
          const isWarning = tag.type === 'warning';

          const tagBgColor = isPositive
            ? colors.TagSuccessSurface
            : isWarning
            ? colors.FeedbackWarningSurface
            : colors.TagWarningSurface;

          const tagTextColor = isWarning
            ? colors.FeedbackWarningText
            : colors.PrimarySecondary;

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
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-xl'],
    marginHorizontal: spacing['Spacing-5xl'],
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
    top: moderateScale(-4),
    left: moderateScale(-4),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: colors.AccentDeepBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.StatesWhite,
    zIndex: 1,
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
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  editIconContainer: {
    padding: spacing['Spacing-m'],
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
    height: moderateScale(44),
    borderRadius: moderateScale(8),
    borderColor: colors.StatesOutline,
  },
});
