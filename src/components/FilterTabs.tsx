import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  style?: StyleProp<ViewStyle>;
  rightElement?: React.ReactNode;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
  rightElement,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabsWrapper}>
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
    borderColor: '#F3F3F3', // Very light border
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(6),
    padding: moderateScale(2),
    gap: spacing['Spacing-m'],
  },
  tabButton: {
    paddingHorizontal: spacing['Spacing-2xl'], // 10px
    paddingVertical: spacing['Spacing-l'], // 6px
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    // Add subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
