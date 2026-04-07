import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FlagIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import type { TransactionDetailsReportFooterProps } from './TransactionDetails.types';

export const TransactionDetailsReportFooter = ({
  onReportPress,
}: TransactionDetailsReportFooterProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onReportPress}
      >
        <FlagIconSvg
          width={iconScale(18)}
          height={iconScale(18)}
          color={colors.FeedbackWarningIcon}
        />
        <Text style={styles.reportText}>
          {translation.transactionDetailsButtonReport}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-3xl'],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['Spacing-4xl'],
    gap: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.BorderCardDefault,
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: colors.StatesFill1,
  },
  reportText: {
    ...typography.b2SemiBold,
    color: colors.FeedbackWarningText,
  },
});
