import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import {
  type AddClientFilterProps,
  FILTER_TAB_KEYS,
} from './AddClientFilter.types';

export { type AddClientFilterTabId } from './AddClientFilter.types';

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
