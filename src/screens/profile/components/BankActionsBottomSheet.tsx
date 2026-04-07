import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CheckCircleIconSvg } from '@/assets/images';
import { BottomSheet, Button } from '@/components';
import { colors, iconScale, spacing, typography } from '@/theme';

import { type BankActionsBottomSheetProps } from './BankActionsBottomSheet.types';

export const BankActionsBottomSheet = ({
  visible,
  onClose,
  bankName,
  accountMask,
  isPrimary,
  onSetPrimary,
  onRemove,
}: BankActionsBottomSheetProps): React.ReactElement => {
  return (
    <BottomSheet visible={visible} onClose={onClose} variant="form">
      <View style={styles.header}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.accountMask}>{accountMask}</Text>
      </View>

      <View style={styles.actions}>
        {!isPrimary && (
          <Button
            label="Set as Primary Account"
            variant="secondary"
            size="large"
            iconLeft={
              <CheckCircleIconSvg
                width={iconScale(20)}
                height={iconScale(20)}
                color={colors.IconPrimaryDefault}
              />
            }
            fullWidth
            onPress={() => {
              onSetPrimary();
              onClose();
            }}
            style={styles.actionButton}
          />
        )}

        <Button
          label="Remove Account"
          variant="destructive"
          size="large"
          iconLeft={
            <CheckCircleIconSvg
              width={iconScale(20)}
              height={iconScale(20)}
              color={colors.FeedbackWarningText}
            />
          }
          fullWidth
          onPress={() => {
            onRemove();
            onClose();
          }}
          style={styles.actionButton}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing['Spacing-3xl'],
    gap: spacing['Spacing-xs'],
  },
  bankName: {
    ...typography.h10TightSemiBold,
    color: colors.TextPrimaryDefault,
  },
  accountMask: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  actions: {
    paddingBottom: spacing['Spacing-7xl'],
    gap: spacing['Spacing-xl'],
  },
  actionButton: {
    justifyContent: 'flex-start',
  },
});
