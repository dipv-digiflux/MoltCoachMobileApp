import React, { type ReactElement, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MealIconSvg, ShopIconSvg, UserSvg } from '@/assets/images';
import {
  EarningsOverview,
  EarningsSummary,
  RecentTransactions,
  TierLimitsBottomSheet,
  TierStatusCard,
} from '@/components';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { useAppSelector } from '@/store/hooks';
import { iconScale, colors, moderateScale, spacing } from '@/theme';

import type { TransactionItemProps } from '@/components/RecentTransactions/RecentTransactions.types';
import type {
  AppStackParamList,
  EarningStackParamList,
} from '@/navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const TAB_BAR_HEIGHT = moderateScale(72);

export const EarningsScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<EarningStackParamList>>();
  const appNavigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const translation = useAppSelector(state => state.translation);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  const handleTransactionPress = useCallback(
    (item: TransactionItemProps) => {
      if (item.type === 'transfer') {
        appNavigation.navigate('TransferRequestTransactionDetails');
      } else {
        navigation.navigate('TransactionDetailsScreen');
      }
    },
    [appNavigation, navigation],
  );

  const handleRedeemPress = useCallback(() => {
    appNavigation.navigate('RedeemEarning');
  }, [appNavigation]);

  return (
    <View style={{ flex: 1 }}>
      <PageHeaderScrollView
        header={{ title: 'Earnings' }}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: scrollPaddingBottom }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <EarningsOverview
            credits={450}
            aedValue={45.0}
            onRedeem={handleRedeemPress}
          />
          <TierStatusCard
            progress={0.8}
            credits="32k"
            remainingToNext="24K"
            onPressInfo={() => setIsBottomSheetVisible(true)}
          />
          <EarningsSummary
            items={[
              {
                title: translation.earningsSummaryReferral,
                credits: 850,
                aedValue: 45.0,
                icon: (
                  <UserSvg
                    width={iconScale(20)}
                    height={iconScale(20)}
                    color={colors.IconPrimaryActive}
                  />
                ),
              },
              {
                title: translation.earningsSummaryMoltMeals,
                credits: 850,
                aedValue: 45.0,
                icon: (
                  <MealIconSvg
                    width={iconScale(20)}
                    height={iconScale(20)}
                    color={colors.IconPrimaryActive}
                  />
                ),
              },
              {
                title: translation.earningsSummarySelfPurchase,
                credits: 850,
                aedValue: 45.0,
                icon: (
                  <ShopIconSvg
                    width={iconScale(20)}
                    height={iconScale(20)}
                    color={colors.IconPrimaryActive}
                  />
                ),
              },
            ]}
          />
          <RecentTransactions
            onTransactionPress={handleTransactionPress}
            data={[
              {
                type: 'incoming',
                title: 'Referral bonus',
                date: 'Feb 18, 2026',
                amount: 500.0,
                aedValue: 50,
              },
              {
                type: 'transfer',
                title: 'Transfer request',
                date: 'Feb 16, 2026',
                amount: 300.0,
                aedValue: 30,
              },
              {
                type: 'incoming',
                title: 'Meal referral',
                date: 'Feb 15, 2026',
                amount: 150.0,
                aedValue: 50,
              },
              {
                type: 'outgoing',
                title: 'Redeemed',
                date: 'Feb 10, 2026',
                amount: 200,
                aedValue: 50,
              },
            ]}
          />
        </View>
      </PageHeaderScrollView>
      <TierLimitsBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: spacing['Spacing-10xl'],
  },
});
