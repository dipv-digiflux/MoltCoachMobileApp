import React, { type ReactElement } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { EarningsSummaryCard } from './EarningsSummaryCard';

import type { EarningsSummaryProps } from './EarningsSummary.types';

export const EarningsSummary = ({
  items,
}: EarningsSummaryProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translation.earningsSummaryTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {items.map((item, index) => (
          <EarningsSummaryCard key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-xl'],
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
  },
});
