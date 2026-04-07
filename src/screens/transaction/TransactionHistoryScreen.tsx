import React, {
  type ReactElement,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageHeaderScrollView, EmptyTransactionHistory } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';
import {
  type AppStackNavigationProp,
} from '@/types/navigation.types';

import { TransactionCard } from './components/TransactionCard';
import { TransactionTabs } from './components/TransactionTabs';

export const TransactionHistoryScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();

  const tabs = [
    translation.transactionHistoryTabAll,
    translation.transactionHistoryTabReferral,
    translation.transactionHistoryTabRedeemed,
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleCardPress = useCallback(() => {
    navigation.navigate('TransactionDetails');
  }, [navigation]);

  const referralTransactions = useMemo(
    () => [
      {
        id: '1',
        title: translation.transactionCardReferralBonus,
        amount: '500.00',
        date: 'Feb 18, 2026',
        type: 'credit' as const,
      },
      {
        id: '2',
        title: translation.transactionCardMealPlanOrder,
        amount: '150.00',
        date: 'Feb 15, 2026',
        type: 'credit' as const,
      },
      {
        id: '3',
        title: translation.transactionCardRedeemed,
        amount: '200',
        date: 'Feb 10, 2026',
        type: 'debit' as const,
      },
    ],
    [translation],
  );

  const isReferralTab = activeTab === translation.transactionHistoryTabReferral;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <PageHeaderScrollView
        header={{ title: translation.transactionHistoryHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
        extraStickyHeaderIndices={[0]}
      >
        <TransactionTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <View style={styles.content}>
          {isReferralTab ? (
            <>
              {referralTransactions.map(item => (
                <TransactionCard
                  key={item.id}
                  title={item.title}
                  amount={item.amount}
                  date={item.date}
                  type={item.type}
                  onPress={handleCardPress}
                />
              ))}

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {translation.transactionHistoryFooterHelp}{' '}
                </Text>
                <Pressable onPress={() => console.log('Contact support')}>
                  <Text style={styles.footerLink}>
                    {translation.transactionHistoryFooterContact}
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <EmptyTransactionHistory />
          )}
        </View>
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
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-16xl'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing['Spacing-16xl'],
    paddingBottom: spacing['Spacing-16xl'],
  },
  footerText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  footerLink: {
    ...typography.bodySmall1Regular, // In mockup it looks regular but underlined
    color: colors.TextSecondaryDefault,
    textDecorationLine: 'underline',
  },
});
