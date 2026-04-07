import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { TransactionTabsProps } from './TransactionTabs.types';

export const TransactionTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: TransactionTabsProps): ReactElement => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  tabButton: {
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomColor: colors.PrimaryMain,
  },
  tabLabel: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  activeTabLabel: {
    ...typography.bodySmall1Bold, // H10 semi-bold style
    color: colors.TextPrimaryDefault,
  },
});
