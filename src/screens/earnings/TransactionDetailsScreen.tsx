import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  PageHeaderScrollView,
  TransactionDetailsCard,
  TransactionDetailsReportFooter,
  TransactionDetailsStatusHeader,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing } from '@/theme';

export const TransactionDetailsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.transactionDetailsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* <View style={styles.scrollContent}> */}
        <TransactionDetailsStatusHeader
          amount={50}
          unit="MOLT"
          status={translation.transactionDetailsStatusCompleted}
        />

        <TransactionDetailsCard
          transactionType="Referral Bonus"
          from="Molt"
          dateTime="Oct 24, 2023, 10:42 AM"
          note="Bonus credited for referring a new client who successfully downloaded the app and completed their profile."
        />

        <TransactionDetailsReportFooter
          onReportPress={() => console.log('Report Issue pressed')}
        />
        {/* </View> */}
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    paddingBottom: spacing['Spacing-16xl'],
    gap: spacing['Spacing-10xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-16xl'],
  },
});
