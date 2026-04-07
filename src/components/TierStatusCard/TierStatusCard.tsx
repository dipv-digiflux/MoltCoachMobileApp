import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoIconSvg, MedalIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import type { TierStatusCardProps } from './TierStatusCard.types';

export const TierStatusCard = ({
  tierName,
  encashmentLimit = 50,
  credits = '0',
  progress = 0,
  remainingToNext = '0',
  nextTierName = 'Platinum',
  nextTierLimit = 80,
  style,
  onPressInfo,
  onPress,
}: TierStatusCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const displayTierName = tierName || translation.tierStatusGoldTier;
  const limitText = translation.tierStatusEncashmentLimit.replace(
    '{{limit}}',
    encashmentLimit.toString(),
  );
  const creditsText = translation.tierStatusMoltCredit.replace(
    '{{credits}}',
    credits,
  );
  const nextTierInfoText = translation.tierStatusNextTierInfo
    .replace('{{remaining}}', remainingToNext)
    .replace('{{nextTier}}', nextTierName)
    .replace('{{nextLimit}}', nextTierLimit.toString());

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.tierInfo}>
          <View style={styles.iconWrapper}>
            <MedalIconSvg
              width={iconScale(24)}
              height={iconScale(24)}
              color={colors.AccentGoldenDark}
            />
          </View>
          <View style={styles.textColumn}>
            <View style={styles.titleRow}>
              <Text style={styles.tierName}>{displayTierName}</Text>
              <Pressable
                onPress={() => {
                  console.log('TierStatusCard: onPressInfo called');
                  onPressInfo?.();
                }}
                hitSlop={12}
                style={({ pressed }) => [
                  styles.infoButton,
                  pressed && styles.infoButtonPressed,
                ]}
              >
                <InfoIconSvg
                  width={iconScale(16)}
                  height={iconScale(16)}
                  color={colors.IconSecondaryDefault}
                />
              </Pressable>
            </View>
            <Text style={styles.limitText}>{limitText}</Text>
          </View>
        </View>

        <View style={styles.creditBadge}>
          <Text style={styles.creditBadgeText}>{creditsText}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(100, Math.max(0, progress * 100))}%` },
            ]}
          />
        </View>
        <Text style={styles.nextTierText}>{nextTierInfoText}</Text>
      </View>

      {onPress && (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            StyleSheet.absoluteFill,
            pressed && styles.pressed,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    marginHorizontal: spacing['Spacing-5xl'],
  },
  pressed: {
    backgroundColor: colors.StatesFill1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconWrapper: {
    width: iconScale(56),
    height: iconScale(56),
    borderRadius: radius.full,
    backgroundColor: '#FFF9E6', // Very light gold/cream
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    gap: spacing['Spacing-xs'],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-sm'],
  },
  tierName: {
    ...typography.b1Bold,
    color: colors.TextPrimaryHover,
  },
  limitText: {
    ...typography.bodySmall2Medium,
    color: colors.BorderPrimaryActive,
  },
  creditBadge: {
    backgroundColor: colors.StatesFill1,
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-sm'],
    borderRadius: radius.xs,
  },
  creditBadgeText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryHover,
  },
  progressContainer: {
    gap: spacing['Spacing-xl'],
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.StatesFill1,
    borderRadius: radius.full,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.FeedbackSuccessText,
    borderRadius: radius.full,
  },
  nextTierText: {
    ...typography.bodySmall2Regular,
    color: colors.BorderPrimaryActive,
  },
  infoButton: {
    padding: spacing['Spacing-xs'],
  },
  infoButtonPressed: {
    opacity: 0.6,
  },
});
