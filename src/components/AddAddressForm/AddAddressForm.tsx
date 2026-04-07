import React, { type ReactElement, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Dropdown, Input } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { spacing } from '@/theme';

import type { AddAddressFormProps } from './AddAddressForm.types';
import type { DropdownValue } from '@/types/dropdown.types';

export const AddAddressForm = ({
  style,
}: AddAddressFormProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  // ── State ─────────────────────────────────────────────────────────
  const [address, setAddress] = useState('');
  const [area, setArea] = useState<DropdownValue>('');
  const [county, setCounty] = useState<DropdownValue>('');
  const [emirate, setEmirate] = useState<DropdownValue>('');
  const [postalCode, setPostalCode] = useState('');

  // ── Handlers ──────────────────────────────────────────────────────
  const handleAreaChange = useCallback(
    (value: DropdownValue | ReadonlyArray<DropdownValue>): void => {
      if (!Array.isArray(value)) {
        setArea(value as DropdownValue);
      }
    },
    [],
  );

  const handleCountyChange = useCallback(
    (value: DropdownValue | ReadonlyArray<DropdownValue>): void => {
      if (!Array.isArray(value)) {
        setCounty(value as DropdownValue);
      }
    },
    [],
  );

  const handleEmirateChange = useCallback(
    (value: DropdownValue | ReadonlyArray<DropdownValue>): void => {
      if (!Array.isArray(value)) {
        setEmirate(value as DropdownValue);
      }
    },
    [],
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, style]}>
      <Input
        value={address}
        placeholder={translation.addAddressAddressPlaceholder}
        onChangeText={setAddress}
      />
      <Dropdown
        placeholder={translation.addAddressAreaPlaceholder}
        options={[]}
        value={area}
        onChange={handleAreaChange}
      />
      <Dropdown
        placeholder={translation.addAddressCountyPlaceholder}
        options={[]}
        value={county}
        onChange={handleCountyChange}
      />
      <Dropdown
        placeholder={translation.addAddressEmiratePlaceholder}
        options={[]}
        value={emirate}
        onChange={handleEmirateChange}
      />
      <Input
        value={postalCode}
        placeholder={translation.addAddressPostalCodePlaceholder}
        onChangeText={setPostalCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-5xl'],
  },
});
