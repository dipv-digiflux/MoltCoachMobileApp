import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button/Button';
import { colors, radius, spacing, typography } from '@/theme';

export const EarningsEmptyStateCard = (): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>No earnings yet</Text>
        <Text style={styles.subtitle}>
          Once your clients start purchasing Molt meals, your credits and
          transactions will appear here.
        </Text>
      </View>

      <Button label="Invite your first client" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.sm, // moderateScale(4)
    borderWidth: 1,
    borderColor: colors.StatesOutline, // '#EBEBEB'
    padding: spacing['Spacing-7xl'], // spacingScale(20)
    gap: spacing['Spacing-5xl'], // spacingScale(16)
    backgroundColor: colors.StatesWhite, // '#FFFFFF'
  },
  button: {
    alignSelf: 'stretch',
  },
  textContainer: {
    alignItems: 'center',
    rowGap: spacing['Spacing-xl'], // spacingScale(8)
  },
  title: {
    ...typography.b2SemiBold, // fontScale(14), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.TextPrimaryStrong, // '#0F1720'
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall4Regular, // fontScale(12), lineHeightScale(16), 'Inter-Regular'
    color: colors.IconTertiarySubtle, // '#919191'
    textAlign: 'center',
  },
});
