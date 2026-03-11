import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

const FILTER_TAB_KEYS = [
  'addClientFilterExistingClient',
  'addClientFilterPotentialLead',
] as const;

export type AddClientFilterTabId = (typeof FILTER_TAB_KEYS)[number];

interface AddClientFilterProps {
  activeTab: AddClientFilterTabId;
  onTabChange: (tab: AddClientFilterTabId) => void;
}

export const AddClientFilter = ({
  activeTab,
  onTabChange,
}: AddClientFilterProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.outer}>
      {FILTER_TAB_KEYS.map(tabId => {
        const isActive = tabId === activeTab;
        const label = translation[tabId];
        return (
          <Pressable
            key={tabId}
            onPress={() => onTabChange(tabId)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, isActive && styles.tabTextActive]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: spacing['Spacing-m'],
    borderRadius: radius.xs,
    backgroundColor: colors.SurfaceSecondaryDisabled,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xs,
  },
  tabActive: {
    backgroundColor: colors.StatesWhite,
  },
  tabText: {
    ...typography.bodySmall1SemiBold,
    textAlign: 'center',
    color: colors.IconTertiarySubtle,
  },
  tabTextActive: {
    color: colors.TextPrimaryStrong,
  },
});
