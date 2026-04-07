import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CircleCheckIconSvg, UserPlusIconSvg } from '@/assets/images';
import { Badge } from '@/components/Badge/Badge';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  iconScale,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type { TransactionDetailsStatusHeaderProps } from './TransactionDetails.types';

export const TransactionDetailsStatusHeader = ({
  amount,
  unit,
  status,
}: TransactionDetailsStatusHeaderProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <UserPlusIconSvg
          width={iconScale(32)}
          height={iconScale(32)}
          color={colors.PrimaryMain}
        />
      </View>

      <Text style={styles.amountText}>
        {translation.transactionDetailsHeaderAmount
          .replace('{{amount}}', amount.toString())
          .replace('MOLT', unit)}
      </Text>

      <Badge
        icon={
          <CircleCheckIconSvg
            width={iconScale(14)}
            height={iconScale(14)}
            color={colors.FeedbackSuccessText}
          />
        }
        iconGap="Spacing-sm"
        label={status}
        paddingHorizontal="Spacing-2xl"
        paddingVertical="Spacing-sm"
        radius="xs"
        backgroundColor="FeedbackSuccessSurface"
        textColor="FeedbackSuccessText"
        typographyToken="bodySmall2Bold"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
    paddingTop: spacing['Spacing-3xl'],
  },
  iconCircle: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: radius.full,
    backgroundColor: colors.StatesFill1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    ...typography.h5Bold,
    color: colors.PrimaryMain,
  },
});
