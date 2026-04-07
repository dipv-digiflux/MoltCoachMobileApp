import React, { type ReactElement, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  EarningsHeaderCard,
  LiquidFooter,
  PageHeaderScrollView,
  RedeemAmountCard,
  RedeemSummaryCard,
  RedeemTransferAccounts,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { spacing } from '@/theme';

import type { AppStackParamList } from '@/navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const RedeemEarningScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [selectedAccountId, setSelectedAccountId] = useState('1');

  const handleRedeemPress = useCallback(() => {
    navigation.navigate('RequestDetails');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translation.earningsRedeemLabel }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.content}>
          <EarningsHeaderCard
            title={translation.earningsTotalEarningsTitle}
            rateText={translation.earningsCreditRate}
            credits={450}
            creditsLabel={translation.earningsCreditsLabel}
            aedText="45.00"
          />

          <RedeemAmountCard
            credits={200}
            aedValue={45.0}
            tierLimitTotal={400}
            tierLimitApplied={200}
            tierPercentage={50}
            onWithdrawAll={() => console.log('Withdraw All pressed')}
          />

          <RedeemSummaryCard
            conversionRateText="10 Credits = 1 AED"
            transferFeeText={translation.redeemSummaryFree}
            receiveAmount={20.0}
          />

          <RedeemTransferAccounts
            accounts={[
              { id: '1', name: 'Emirates NBD', number: '**** **** **** 4321' },
              { id: '2', name: 'Mashreq Bank', number: '**** **** **** 5678' },
            ]}
            selectedId={selectedAccountId}
            onSelect={setSelectedAccountId}
            onManageAccounts={() => console.log('Manage Accounts pressed')}
          />
        </View>
      </PageHeaderScrollView>

      <LiquidFooter showTopBorder>
        <Button
          label={translation.earningsRedeemLabel}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleRedeemPress}
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    // paddingBottom: spacing['Spacing-20xl'],
  },
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
  },
});
