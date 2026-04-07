import React, { ReactElement, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

import { TabItem, TransferType } from '../../NewTransferScreen.types';

import { DayInputs } from './DayInputs';
import { TransferTabs } from './TransferTabs';

const tabs: readonly TabItem<TransferType>[] = [
  { label: 'Temporary', value: 'temporary' },
  { label: 'Permanent', value: 'permanent' },
];

export const TransferTermsCard = (): ReactElement => {
  const [type, setType] = useState<TransferType>('temporary');
  const [fromDays, setFromDays] = useState('2');
  const [toDays, setToDays] = useState('2');
  return (
    <View style={styles.transferTermsCard}>
      <Text style={styles.label}>Transfer Terms</Text>

      <TransferTabs tabs={tabs} activeTab={type} onChange={setType} />

      <DayInputs
        fromDays={fromDays}
        toDays={toDays}
        setFromDays={setFromDays}
        setToDays={setToDays}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDisabled,
    marginBottom: spacing['Spacing-5xl'],
  },
  transferTermsCard: {
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-5xl'],
  },
});
