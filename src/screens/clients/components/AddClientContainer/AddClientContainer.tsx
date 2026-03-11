import React, { useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Input } from '@/components/Input';
import { AddSessionsPackageContainer } from '@/screens/clients/components/AddSessionsPackageContainer';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import { AddClientFilter, type AddClientFilterTabId } from './AddClientFilter';

export const AddClientContainer = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [activeTab, setActiveTab] = useState<AddClientFilterTabId>(
    'addClientFilterExistingClient',
  );
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const labelStyle = [
    typography.bodySmall4TallSemiBold,
    { color: colors.TextLabelDefault },
  ];
  const inputStyle = [
    typography.b2Regular,
    {
      color: colors.TextPrimaryStrong,
      paddingVertical: spacing['Spacing-xl'],
      paddingHorizontal: spacing['Spacing-3xl'],
    },
  ];

  return (
    <View style={styles.container}>
      <AddClientFilter activeTab={activeTab} onTabChange={setActiveTab} />

      <Input
        label={translation.addClientNameLabel}
        value={clientName}
        onChangeText={setClientName}
        labelTextStyle={labelStyle}
        textInputStyle={inputStyle}
      />

      <Input
        label={translation.addClientPhoneNumberLabel}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        labelTextStyle={labelStyle}
        textInputStyle={inputStyle}
        keyboardType="phone-pad"
      />

      <AddSessionsPackageContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius['xs'],
    borderWidth: 1,
    padding: spacing['Spacing-4xl'],
    gap: spacing['Spacing-6xl'],
    backgroundColor: colors.StatesWhite,
    borderColor: colors.DividerSubtleOverlay,
  },
});
