import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing } from '@/theme';

import type { ImportContactsButtonGroupProps } from './ImportContactsButtonGroup.types';

export const ImportContactsButtonGroup = ({
  onAllowAccess,
  onNotNow,
}: ImportContactsButtonGroupProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <Button
        label={translation.importContactsAllowAccess}
        variant="primary"
        size="large"
        fullWidth
        onPress={onAllowAccess}
      />
      <Button
        label={translation.importContactsNotNow}
        variant="minimal"
        size="large"
        fullWidth
        onPress={onNotNow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
    alignSelf: 'stretch',
    // backgroundColor: colors.StatesWhite,
  },
});
