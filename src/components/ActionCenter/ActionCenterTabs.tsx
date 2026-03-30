import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { colors, spacing, typography } from '@/theme';

import { ActionCenterTabsProps } from './ActionCenter.types';

export const ActionCenterTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: ActionCenterTabsProps): ReactElement => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <View style={styles.tabContent}>
              <Text
                style={[styles.tabLabel, isActive && styles.activeTabLabel]}
              >
                {tab.label}
              </Text>
              <Badge
                label={tab.count.toString()}
                backgroundColor={'MatrixMain'}
                textColor={'StatesWhite'}
                padding="Spacing-xs"
                paddingHorizontal="Spacing-m"
                radius="pill"
                typographyToken="bodySmall3SemiBold"
              />
            </View>
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
    marginBottom: spacing['Spacing-xl'],
  },
  tabButton: {
    paddingTop: spacing['Spacing-xl'],
    paddingRight: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-3xl'],
    paddingLeft: spacing['Spacing-5xl'],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomColor: colors.PrimaryMain,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  tabLabel: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  activeTabLabel: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
  },
});
