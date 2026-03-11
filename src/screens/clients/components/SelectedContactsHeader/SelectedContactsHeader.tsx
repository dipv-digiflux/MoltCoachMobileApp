import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export const SelectedContactsHeader = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Selected Contacts</Text>
      <Text style={styles.subtitleText}>
        Configure as leads or clients before sending requests.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-10xl'], // 24px
    paddingRight: spacing['Spacing-5xl'], // 16px
    paddingBottom: spacing['Spacing-5xl'], // 16px
    paddingLeft: spacing['Spacing-5xl'], // 16px
    gap: spacing['Spacing-m'], // 4px between title and subtitle
  },
  titleText: {
    ...typography.h0Bold,
    color: colors.TextPrimaryStrong,
  },
  subtitleText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
