import React from 'react';
import { ScrollView, StyleSheet, Text, Pressable } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import type { StatusTabsProps } from '@/types/components.types';

export type { StatusTabsProps };

export const StatusTabs: React.FC<StatusTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
    >
      {tabs.map(tab => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
    gap: spacing['Spacing-xl'], // 8px
  },
  tabButton: {
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
    paddingVertical: spacing['Spacing-xl'], // 4px
    borderRadius: moderateScale(6),
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.TextPrimaryDefault, // Black background
    borderColor: colors.TextPrimaryDefault,
  },
  tabText: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDefault,
  },
  activeTabText: {
    color: colors.StatesWhite, // White text for active tab
  },
});
