import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Checkbox, Dropdown, Input } from '@/components';
import { spacing } from '@/theme';

import type { AddBankBottomSheetProps } from './AddBankBottomSheet.types';
import type { DropdownOption, DropdownValue } from '@/types/dropdown.types';

const BANK_OPTIONS: DropdownOption[] = [
  { label: 'Emirates NBD', value: 'emirates_nbd' },
  { label: 'Abu Dhabi Commercial Bank (ADCB)', value: 'adcb' },
  { label: 'First Abu Dhabi Bank (FAB)', value: 'fab' },
  { label: 'Mashreq Bank', value: 'mashreq' },
  { label: 'Dubai Islamic Bank', value: 'dib' },
  { label: 'HSBC', value: 'hsbc' },
  { label: 'Standard Chartered', value: 'sc' },
];

export const AddBankBottomSheet = ({
  visible,
  onClose,
  onAdd,
}: AddBankBottomSheetProps): React.ReactElement => {
  const [bankName, setBankName] = useState<DropdownValue>('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [iban, setIban] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleAdd = (): void => {
    onAdd({
      bankName: String(bankName),
      accountHolderName,
      iban,
      isDefault,
    });
    // Reset state after adding
    setBankName('');
    setAccountHolderName('');
    setIban('');
    setIsDefault(false);
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      variant="form"
      header={{ title: 'Add bank account' }}
      footer={{
        primaryLabel: 'Add bank account',
        onPrimaryPress: handleAdd,
        primaryDisabled: !bankName || !accountHolderName || !iban,
      }}
    >
      <View style={styles.form}>
        <Dropdown
          label="Bank Name"
          placeholder="Select your bank"
          options={BANK_OPTIONS}
          value={bankName}
          onChange={val => setBankName(val as DropdownValue)}
        />
        <Input
          label="Account Holder Name"
          placeholder="John Doe"
          value={accountHolderName}
          onChangeText={setAccountHolderName}
        />
        <Input
          label="IBAN / Account Number"
          placeholder="e.g. AE00 0000 0000 0000 0000 00"
          value={iban}
          onChangeText={setIban}
        />
        <Checkbox
          label="Make this the default account"
          checked={isDefault}
          onChange={setIsDefault}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-5xl'],
    gap: spacing['Spacing-6xl'],
  },
});
