import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import type { FilterTabsProps } from '@/types/components.types';

export type { FilterTabsProps };

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
  rightElement,
  tabsWrapperStyle,
  tabButtonStyle,
  activeTabButtonStyle,
  tabTextStyle,
  activeTabTextStyle,
  variant = 'pill',
}) => {
  const isOutlined = variant === 'outlined';

  return (
    <View
      style={[styles.container, isOutlined && styles.containerOutlined, style]}
    >
      <View
        style={[
          styles.tabsWrapper,
          isOutlined && styles.tabsWrapperOutlined,
          tabsWrapperStyle,
        ]}
      >
        {tabs.map(tab => {
          const isActive = tab === activeTab;
          return (
            <Pressable
              key={tab}
              onPress={() => onTabChange(tab)}
              style={[
                styles.tabButton,
                isOutlined && styles.tabButtonOutlined,
                tabButtonStyle,
                isActive && styles.activeTabButton,
                isActive && isOutlined && styles.activeTabButtonOutlined,
                isActive && activeTabButtonStyle,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  tabTextStyle,
                  isActive && styles.activeTabText,
                  isActive && activeTabTextStyle,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {rightElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.StatesWhite,
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: spacing['Spacing-m'],
    marginHorizontal: spacing['Spacing-5xl'],
    borderWidth: 1,
    borderColor: colors.StatesDivider, // Very light border
  },
  containerOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(6),
    padding: moderateScale(2),
    gap: spacing['Spacing-m'],
  },
  tabsWrapperOutlined: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    gap: spacing['Spacing-l'],
  },
  tabButton: {
    paddingHorizontal: spacing['Spacing-2xl'], // 10px
    paddingVertical: spacing['Spacing-l'], // 6px
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonOutlined: {
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(4),
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
  },
  activeTabButton: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    // Add subtle shadow
    shadowColor: colors.ShadowDefault,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTabButtonOutlined: {
    borderColor: colors.TextPrimaryDefault,
    borderWidth: 1.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  tabText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  activeTabText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
});
