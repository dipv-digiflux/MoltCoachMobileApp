import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components';
import { colors, radius, spacing, typography } from '@/theme';

import type { EarningsHeaderCardProps } from './EarningsHeaderCard.types';

export const EarningsHeaderCard = ({
  title,
  rateText,
  credits,
  creditsLabel,
  aedText,
  style,
}: EarningsHeaderCardProps): ReactElement => (
  <View style={[styles.card, style]}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rateText}>{rateText}</Text>
    </View>

    <View style={styles.earningsInfo}>
      <View style={styles.creditsRow}>
        <Text style={styles.creditsValue}>{credits}</Text>
        <Text style={styles.creditsLabel}>{creditsLabel}</Text>
      </View>

      <Badge
        label={`= ${aedText} AED`}
        backgroundColor="StatesFill1"
        textColor="TextPrimaryDefault"
        typographyToken="bodySmall1SemiBold"
        paddingHorizontal="Spacing-xl"
        paddingVertical="Spacing-m"
        radius="xs"
        style={styles.badge}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  rateText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  earningsInfo: {
    gap: spacing['Spacing-xl'],
    alignItems: 'flex-start',
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing['Spacing-xl'],
  },
  creditsValue: {
    ...typography.h7SemiBold,
    color: colors.PrimaryMain,
  },
  creditsLabel: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
});
