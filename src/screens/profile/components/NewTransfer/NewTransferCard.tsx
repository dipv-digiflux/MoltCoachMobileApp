import { ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { UserSvg, RightIndicationArrowSvg } from '@/assets/images';
import {
  iconScale,
  moderateScale,
  colors,
  radius,
  spacing,
  typography,
} from '@/theme';

export const NewTransferCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): ReactElement => (
  <View style={styles.selectCardWrapper}>
    <Text style={styles.label}>{label}</Text>

    <Pressable
      style={({ pressed }) => [styles.selectBox, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={styles.leftSection}>
        <UserSvg width={iconScale(40)} height={iconScale(40)} />
        <Text style={styles.selectText}>{value}</Text>
      </View>
      <RightIndicationArrowSvg
        width={moderateScale(20)}
        height={moderateScale(20)}
        color={colors.IconSecondaryDisabled}
      />
    </Pressable>
  </View>
);
const styles = StyleSheet.create({
  selectCardWrapper: { marginBottom: spacing['Spacing-4xl'] },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDisabled,
    marginBottom: spacing['Spacing-5xl'],
  },
  selectBox: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    padding: spacing['Spacing-5xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    ...typography.bodySmall1Medium,
    color: colors.PrimaryMain,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
  },
  pressed: {
    backgroundColor: colors.StatesFill1,
  },
});
