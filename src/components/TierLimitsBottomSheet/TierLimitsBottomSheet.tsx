import React, { type ReactElement, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MedalIconSvg } from '@/assets/images';
import { Badge, BottomSheet } from '@/components';
import { useAppSelector } from '@/store/hooks';
import {
  borderWidth,
  colors,
  iconScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type {
  TierData,
  TierLimitsBottomSheetProps,
} from './TierLimitsBottomSheet.types';

export const TierLimitsBottomSheet = ({
  visible,
  currentTier = 'Gold',
  onClose,
}: TierLimitsBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const tiers: TierData[] = useMemo(
    () => [
      {
        id: 'Silver',
        name: translation.tierLimitSilver,
        credits: '12k',
        limit: '20%',
        iconBgColor: colors.StatesFill1,
        iconColor: colors.IconPrimaryDisabled,
      },
      {
        id: 'Gold',
        name: translation.tierLimitGold,
        credits: '22k',
        limit: '50%',
        iconBgColor: colors.AccentYellowMustard,
        iconColor: colors.StatesWhite,
      },
      {
        id: 'Platinum',
        name: translation.tierLimitPlatinum,
        credits: '32k',
        limit: '80%',
        iconBgColor: colors.StatesFill1,
        iconColor: colors.IconPrimaryDisabled,
      },
    ],
    [translation],
  );

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: translation.tierLimitsTitle,
        subtitle: translation.tierLimitsDescription,
      }}
      footer={{
        primaryLabel: translation.tierLimitGotItButton,
        onPrimaryPress: onClose,
      }}
    >
      <View style={styles.content}>
        {tiers.map(tier => {
          const isCurrent = tier.id === currentTier;
          return (
            <View
              key={tier.id}
              style={[styles.tierCard, isCurrent && styles.currentTierCard]}
            >
              <View style={styles.tierHeader}>
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: tier.iconBgColor },
                  ]}
                >
                  <MedalIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={tier.iconColor}
                  />
                </View>

                <View style={styles.tierNameColumn}>
                  <View style={styles.nameRow}>
                    <Text
                      style={[
                        styles.tierName,
                        isCurrent && styles.currentTierNameText,
                      ]}
                    >
                      {tier.name}
                    </Text>
                    {isCurrent && (
                      <Badge
                        label={translation.tierLimitCurrentTag}
                        paddingHorizontal="Spacing-xl"
                        paddingVertical="Spacing-xs"
                        radius="full"
                        backgroundColor="PrimaryMain"
                        textColor="StatesWhite"
                        typographyToken="bodySmall3SemiBold"
                      />
                    )}
                  </View>
                  <View style={styles.limitRow}>
                    <Text style={styles.limitLabel}>Encashment limit:</Text>
                    <View style={styles.limitBadge}>
                      <Text style={styles.limitBadgeText}>{tier.limit}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.creditInfo}>
                  <Text style={styles.creditText}>
                    Molt credit: {tier.credits}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    ...typography.h10SemiBold,
    color: colors.TextPrimaryHover,
  },
  headerSubtitle: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
  },
  content: {
    paddingVertical: spacing['Spacing-4xl'],
    gap: spacing['Spacing-xl'],
  },
  tierCard: {
    borderWidth: borderWidth.hairline,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    padding: spacing['Spacing-3xl'],
    backgroundColor: colors.StatesWhite,
  },
  currentTierCard: {
    borderColor: colors.MatrixMain,
    borderWidth: borderWidth.medium,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconWrapper: {
    width: iconScale(48),
    height: iconScale(48),
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierNameColumn: {
    flex: 1,
    gap: spacing['Spacing-sm'],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  tierName: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryHover,
  },
  currentTierNameText: {
    color: colors.PrimaryMain,
  },
  limitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-sm'],
  },
  limitLabel: {
    ...typography.bodySmall4Regular,
    color: colors.TextPrimaryHover,
  },
  limitBadge: {
    backgroundColor: colors.StatesFill1,
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-xs'],
    borderRadius: radius.xs,
  },
  limitBadgeText: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextPrimaryHover,
  },
  creditInfo: {
    alignSelf: 'flex-start',
    paddingTop: spacing['Spacing-xs'],
  },
  creditText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
});
