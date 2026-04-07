import { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoIconSvg } from '@/assets/images';
import { iconScale, spacing, colors, radius, typography } from '@/theme';

export const InstructionsCard = ({ text }: { text: string }): ReactElement => (
  <View style={styles.infoBox}>
    <InfoIconSvg width={iconScale(16)} height={iconScale(16)} color="#9A3412" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);
const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
    backgroundColor: colors.AccentOrangeLight,
    borderWidth: 1,
    borderColor: '#FFEDD5',
    borderRadius: radius.xs,
    padding: spacing['Spacing-3xl'],
    marginTop: spacing['Spacing-4xl'],
  },
  infoText: {
    ...typography.bodySmall4Regular,
    color: '#9A3412',
  },
});
