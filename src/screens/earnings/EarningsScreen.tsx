import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EarningsEmptyStateCard } from '@/components/EarningsEmptyStateCard';
import { EarningsTotalCard } from '@/components/EarningsTotalCard';
import { HowToStartEarning } from '@/components/HowToStartEarning';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { moderateScale, spacing } from '@/theme';

const TAB_BAR_HEIGHT = moderateScale(72);

export const EarningsScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  return (
    <PageHeaderScrollView
      header={{ title: 'Earnings' }}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: scrollPaddingBottom }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.container}>
        <EarningsTotalCard />
        <EarningsEmptyStateCard />
        <HowToStartEarning />
      </View>
    </PageHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-11xl'],
    paddingBottom: spacing['Spacing-15xl'] + TAB_BAR_HEIGHT,
    rowGap: spacing['Spacing-10xl'],
  },
});
