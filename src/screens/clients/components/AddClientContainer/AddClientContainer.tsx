import React, { useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { FilterTabs } from '@/components';
import { colors, radius, spacing } from '@/theme';

export const AddClientContainer = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<string>('Existing Client');

  return (
    <View style={styles.container}>
      <FilterTabs
        tabs={['Existing Client', 'Potential Lead']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <View>
        {/* TODO: Replace with actual tab content once forms are implemented */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing['Spacing-4xl'],
    gap: spacing['Spacing-6xl'],
    backgroundColor: colors.StatesWhite,
    borderColor: colors.DividerSubtleOverlay,
  },
});
