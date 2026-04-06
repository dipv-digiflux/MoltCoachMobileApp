import React, { useState, type ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { ActionCenterProps, ActionCenterTabType } from './ActionCenter.types';
import { ActionCenterCard } from './ActionCenterCard';
import { ActionCenterHeader } from './ActionCenterHeader';
import { ActionCenterTabs } from './ActionCenterTabs';

export const ActionCenter = ({
  tabs,
  actions,
  onViewAll,
  style,
}: ActionCenterProps): ReactElement => {
  const [activeTab, setActiveTab] = useState<ActionCenterTabType>('All');

  return (
    <View style={[styles.container, style]}>
      <ActionCenterHeader title="Action center" onViewAll={onViewAll} />
      <ActionCenterTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map(action => (
          <ActionCenterCard key={action.id} action={action} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  scrollContent: {
    gap: spacing['Spacing-xl'],
    padding: spacing['Spacing-4xl'],
  },
});
