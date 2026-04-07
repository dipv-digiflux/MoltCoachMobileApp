import { ReactElement } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

import { TransferTabsProps } from '../../NewTransferScreen.types';

export const TransferTabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
}: TransferTabsProps<T>): ReactElement => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => {
        const isActive = tab.value === activeTab;

        return (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(tab.value)}
          >
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: radius.xs,
    padding: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-5xl'],
  },
  tab: {
    flex: 1,
    paddingVertical: spacing['Spacing-l'],
    paddingHorizontal: spacing['Spacing-5xl'],
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  tabLabel: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryHover,
  },
  activeTabLabel: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
  },
});
