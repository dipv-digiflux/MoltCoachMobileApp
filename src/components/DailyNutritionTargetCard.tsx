import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoCard } from '@/components/InfoCard';
import { colors, spacing, typography, radius, moderateScale } from '@/theme';

import type { DailyNutritionTargetCardProps } from '@/types/components.types';

const PROGRESS_BAR_HEIGHT = 8;

export const DailyNutritionTargetCard = ({
  title,
  actionLabel,
  kcal,
  subValue,
  tags,
  macroTargets,
  lifestyleTitle,
  lifestyleActionLabel,
  lifestyleTargets,
  planTip,
}: DailyNutritionTargetCardProps): ReactElement => {
  const proteinShare = macroTargets.protein.percent / 100;
  const fatShare = macroTargets.fat.percent / 100;
  const carbShare = macroTargets.carb.percent / 100;

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        {/* Section 1: Daily nutrition target */}
        <View style={styles.section}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.cardAction}>{actionLabel}</Text>
          </View>
          <Text style={styles.cardKcal}>{kcal}</Text>
          {subValue ? (
            <Text style={styles.cardSubValue}>{subValue}</Text>
          ) : null}
          <View style={styles.cardTagRow}>
            {tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section 2: Macro targets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macro targets</Text>
          <View style={styles.macroRow}>
            <View style={styles.macroColumn}>
              <Text style={styles.macroLabel}>Protein</Text>
              <View style={styles.macroValueRow}>
                <Text style={styles.macroValue}>
                  {macroTargets.protein.value}
                </Text>
                <Text style={styles.macroPercent}>
                  {macroTargets.protein.percent}%
                </Text>
              </View>
            </View>
            <View style={styles.macroColumn}>
              <Text style={styles.macroLabel}>Fat</Text>
              <View style={styles.macroValueRow}>
                <Text style={styles.macroValue}>{macroTargets.fat.value}</Text>
                <Text style={styles.macroPercent}>
                  {macroTargets.fat.percent}%
                </Text>
              </View>
            </View>
            <View style={styles.macroColumn}>
              <Text style={styles.macroLabel}>Carb</Text>
              <View style={styles.macroValueRow}>
                <Text style={styles.macroValue}>{macroTargets.carb.value}</Text>
                <Text style={styles.macroPercent}>
                  {macroTargets.carb.percent}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressSegment,
                styles.progressProtein,
                { flex: proteinShare },
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                styles.progressFat,
                { flex: fatShare },
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                styles.progressCarb,
                { flex: carbShare },
              ]}
            />
          </View>
        </View>

        {/* Section 3: Lifestyle targets */}
        <View style={styles.section}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.lifestyleTitle}>{lifestyleTitle}</Text>
            <Text style={styles.cardAction}>{lifestyleActionLabel}</Text>
          </View>
          <View style={styles.lifestyleRow}>
            <View style={styles.lifestyleColumn}>
              <Text style={styles.lifestyleLabel}>Water Intake</Text>
              <Text style={styles.lifestyleValue}>
                {lifestyleTargets.waterIntake}
              </Text>
            </View>
            <View style={styles.lifestyleColumn}>
              <Text style={styles.lifestyleLabel}>Steps</Text>
              <Text style={styles.lifestyleValue}>
                {lifestyleTargets.steps}
              </Text>
            </View>
            <View style={styles.lifestyleColumn}>
              <Text style={styles.lifestyleLabel}>Active calorie burn</Text>
              <Text style={styles.lifestyleValue}>
                {lifestyleTargets.activeCalorieBurn}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <InfoCard description={planTip} variant="simple" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: spacing['Spacing-2xl'],
  },
  card: {
    paddingVertical: spacing['Spacing-6xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    borderRadius: radius.md,
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    gap: spacing['Spacing-4xl'],
    alignSelf: 'stretch',
  },
  section: {
    gap: spacing['Spacing-3xl'],
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  lifestyleTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  cardAction: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
    textDecorationLine: 'underline',
  },
  cardKcal: {
    ...typography.h10SemiBold,
    color: colors.TextPrimaryDefault,
  },
  cardSubValue: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-xs'],
  },
  cardTagRow: {
    flexDirection: 'row',
    columnGap: spacing['Spacing-3xl'],
  },
  tag: {
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-sm'],
    borderRadius: radius.sm,
    backgroundColor: colors.FeedbackSuccessSurface,
  },
  tagText: {
    ...typography.bodySmall2Medium,
    color: colors.MatrixMain,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  macroValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    columnGap: spacing['Spacing-m'],
    marginTop: spacing['Spacing-m'],
  },
  macroValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  macroLabel: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-xs'],
  },
  macroPercent: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  progressBarTrack: {
    flexDirection: 'row',
    height: moderateScale(PROGRESS_BAR_HEIGHT),
    borderRadius: radius.full,
    overflow: 'hidden',
    backgroundColor: colors.StatesFill1,
  },
  progressSegment: {
    minWidth: 2,
  },
  progressProtein: {
    backgroundColor: colors.FeedbackSuccessSurface,
  },
  progressFat: {
    backgroundColor: colors.AccentBlueLight,
  },
  progressCarb: {
    backgroundColor: colors.AccentGoldenLight,
  },
  lifestyleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lifestyleColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  lifestyleLabel: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  lifestyleValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    marginTop: spacing['Spacing-m'],
  },
});
