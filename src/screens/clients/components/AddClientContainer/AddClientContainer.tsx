import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { Input } from '@/components/Input';
import { AddHealthFitnessDataContainer } from '@/screens/clients/components/AddHealthFitnessDataContainer/AddHealthFitnessDataContainer';
import { AddSessionsPackageContainer } from '@/screens/clients/components/AddSessionsPackageContainer';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import { AddClientContainerProps } from './AddClientContainer.types';
import { AddClientFilter } from './AddClientFilter';

export const AddClientContainer = ({
  control,
  errors,
}: AddClientContainerProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

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
      <Controller
        control={control}
        name="clientType"
        render={({ field: { value, onChange } }) => (
          <AddClientFilter activeTab={value} onTabChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <Input
            label={translation.addClientNameLabel}
            value={value}
            onChangeText={onChange}
            labelTextStyle={labelStyle}
            textInputStyle={inputStyle}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { value, onChange } }) => (
          <Input
            label={translation.addClientPhoneNumberLabel}
            value={value}
            onChangeText={onChange}
            labelTextStyle={labelStyle}
            textInputStyle={inputStyle}
            keyboardType="phone-pad"
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        )}
      />

      <AddSessionsPackageContainer control={control} errors={errors} />

      <AddHealthFitnessDataContainer control={control} errors={errors} />
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
