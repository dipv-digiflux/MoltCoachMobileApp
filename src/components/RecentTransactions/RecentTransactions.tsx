import React, { type ReactElement, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FilterTabs } from '@/components/FilterTabs';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { TransactionItem } from './TransactionItem';

import type { RecentTransactionsProps } from './RecentTransactions.types';

export const RecentTransactions = ({
  initialFilterIndex = 0,
  data,
}: RecentTransactionsProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const filters = [
    translation.earningsFilterAllHistory,
    translation.earningsFilterReferrals,
    translation.earningsFilterMoltMeals,
    translation.earningsFilterSelfPurchase,
  ];

  const [activeFilter, setActiveFilter] = useState(filters[initialFilterIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {translation.earningsRecentTransactionsTitle}
      </Text>

      <View style={styles.whiteCard}>
        <FilterTabs
          tabs={filters}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
          style={styles.filterTabsOverride}
          tabsWrapperStyle={styles.tabsWrapperOverride}
          tabButtonStyle={styles.tabButtonOverride}
        />

        <View style={styles.list}>
          {data.map((item, index) => (
            <TransactionItem
              key={index}
              {...item}
              isLast={index === data.length - 1}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {translation.earningsNeedHelp}{' '}
          <Text style={styles.link}>{translation.earningsContactSupport}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-10xl'],
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  whiteCard: {
    backgroundColor: colors.StatesWhite,
    marginHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
  },
  filterTabsOverride: {
    marginHorizontal: 0,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-xl'],
    borderWidth: 0,
    borderRadius: 0,
  },
  tabsWrapperOverride: {
    borderRadius: 2,
  },
  tabButtonOverride: {
    borderRadius: 2,
  },
  list: {
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  footer: {
    alignItems: 'center',
    // marginTop: spacing['Spacing-5xl'],
  },
  footerText: {
    ...typography.bodySmall2Regular,
    color: colors.PrimarySecondary,
    textAlign: 'center',
  },
  link: {
    color: colors.TextSecondaryDefault,
    textDecorationLine: 'underline',
  },
});
