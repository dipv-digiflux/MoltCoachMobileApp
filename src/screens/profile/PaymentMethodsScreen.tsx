import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CreditIconSvg } from '@/assets/images';
import {
  Button,
  EmptyState,
  LiquidFooter,
  PageHeaderScrollView,
} from '@/components';
import { colors, iconScale, spacing, typography } from '@/theme';

import {
  AddBankBottomSheet,
  // type AddBankData,
} from './components/AddBankBottomSheet';
import { AddBankData } from './components/AddBankBottomSheet.types';
import { BankActionsBottomSheet } from './components/BankActionsBottomSheet';
import { SavedAccountCard } from './components/SavedAccountCard';
import { type SavedAccount } from './PaymentMethods.types';

export const PaymentMethodsScreen = (): ReactElement => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [savedAccounts, setSavedAccounts] = React.useState<SavedAccount[]>([
    {
      id: '1',
      bankName: 'Emirates NBD',
      accountMask: '**** **** **** 4321',
      isPrimary: true,
    },
    {
      id: '2',
      bankName: 'Abu Dhabi Commercial Bank',
      accountMask: '**** **** **** 8765',
      isPrimary: false,
    },
    {
      id: '3',
      bankName: 'Dubai Islamic Bank',
      accountMask: '**** **** **** 1092',
      isPrimary: false,
    },
  ]);
  const [selectedAccount, setSelectedAccount] =
    React.useState<SavedAccount | null>(null);
  const [isActionsSheetVisible, setIsActionsSheetVisible] =
    React.useState(false);

  const handleAddBank = (data: AddBankData): void => {
    const newAccount = {
      id: Math.random().toString(),
      bankName: data.bankName,
      accountMask: `**** **** **** ${data.iban.slice(-4)}`,
      isPrimary: data.isDefault,
    };
    if (newAccount.isPrimary) {
      setSavedAccounts(prev =>
        prev.map(acc => ({ ...acc, isPrimary: false })).concat(newAccount),
      );
    } else {
      setSavedAccounts(prev => [...prev, newAccount]);
    }
    setIsBottomSheetVisible(false);
  };

  const handleAccountPress = (account: SavedAccount): void => {
    setSelectedAccount(account);
    setIsActionsSheetVisible(true);
  };

  const handleSetPrimary = (): void => {
    if (!selectedAccount) return;
    setSavedAccounts(prev =>
      prev.map(acc => ({
        ...acc,
        isPrimary: acc.id === selectedAccount.id,
      })),
    );
  };

  const handleRemove = (): void => {
    if (!selectedAccount) return;
    setSavedAccounts(prev => prev.filter(acc => acc.id !== selectedAccount.id));
  };
  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: 'Payment methods' }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          {savedAccounts.length > 0 ? (
            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>Saved Accounts</Text>
              {savedAccounts.map(account => (
                <SavedAccountCard
                  key={account.id}
                  bankName={account.bankName}
                  accountMask={account.accountMask}
                  isPrimary={account.isPrimary}
                  onPress={() => handleAccountPress(account)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              icon={
                <CreditIconSvg
                  width={iconScale(24)}
                  height={iconScale(24)}
                  color={colors.IconSecondaryDisabled}
                />
              }
              title="No payment method added"
              description="Add a payment method to place orders and manage subscriptions smoothly."
              buttonLabel="Add payment method"
              onButtonPress={() => setIsBottomSheetVisible(true)}
            />
          )}
        </View>
      </PageHeaderScrollView>

      <LiquidFooter showTopBorder>
        <Button
          label="+ Add New Account"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {}}
        />
      </LiquidFooter>

      <AddBankBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onAdd={handleAddBank}
      />

      <BankActionsBottomSheet
        visible={isActionsSheetVisible}
        onClose={() => setIsActionsSheetVisible(false)}
        bankName={selectedAccount?.bankName || ''}
        accountMask={selectedAccount?.accountMask || ''}
        isPrimary={selectedAccount?.isPrimary || false}
        onSetPrimary={handleSetPrimary}
        onRemove={handleRemove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    ...typography.h0Bold,
    color: colors.PrimaryMain,
    marginBottom: spacing['Spacing-xl'],
  },
  addBtn: {
    marginTop: spacing['Spacing-m'],
  },
});
