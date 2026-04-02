import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ClientProfileHeader,
  CollapsibleTableCard,
  PageHeader,
  Switch,
} from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { MenuDotsIcon } from './ClientDetailScreen.icons';
import { ClientDetailScreenProps } from './ClientDetailScreen.types';

export const ClientDetailScreen = ({
  navigation,
  route,
}: ClientDetailScreenProps): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const { clientName } = route.params;
  const [activeTab, setActiveTab] = useState('Tasks');
  const [showAllDates, setShowAllDates] = useState(false);

  const tabs = ['Overview', 'Tasks', 'Nutrition', 'Profile'];

  // Mock data for the table
  const tableSections = [
    {
      id: 'week22',
      period: 'Week 22',
      dateRange: '19 - 22 Mar',
      completion: '40/50',
      rows: [
        { id: 'sun', label: 'SUN', subLabel: '22 MAR', value: '3/5' },
        { id: 'sat', label: 'SAT', subLabel: '21 MAR', value: '4/5' },
        { id: 'fri', label: 'FRI', subLabel: '20 MAR', value: '4/4' },
        { id: 'thu', label: 'THUR', subLabel: '19 MAR', value: '5/6' },
        { id: 'wed', label: 'WED', subLabel: '18 MAR', value: '4/4' },
        { id: 'tue', label: 'TUE', subLabel: '17 MAR', value: '2/2' },
        { id: 'mon', label: 'MON', subLabel: '16 MAR', value: '3/4' },
      ],
    },
    {
      id: 'week21',
      period: 'Week 21',
      dateRange: '12 - 19 Mar',
      completion: '50/60',
      rows: [
        { id: 'w21_sun', label: 'SUN', subLabel: '19 MAR', value: '7/7' },
        { id: 'w21_sat', label: 'SAT', subLabel: '18 MAR', value: '8/8' },
      ],
    },
    {
      id: 'week20',
      period: 'Week 20',
      dateRange: '6 - 12 Mar',
      completion: '38/40',
      rows: [{ id: 'w20_sun', label: 'SUN', subLabel: '12 MAR', value: '5/5' }],
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader
        title="Client detail page"
        onPressBack={() => navigation.goBack()}
        fallbackBackgroundColor={colors.StatesWhite}
        style={{
          paddingTop: insets.top + spacing['Spacing-m'],
          paddingBottom: spacing['Spacing-m'],
        }}
        rightIcon={
          <Pressable style={styles.moreButton}>
            <MenuDotsIcon />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + spacing['Spacing-15xl'],
        }}
      >
        <ClientProfileHeader
          name={clientName}
          status="Fat Loss Phase"
          sessionsInfo="Sessions: 12/24 • In person sessions"
        />

        <View style={styles.tabBar}>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, isActive && styles.activeTabItem]}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {activeTab === 'Tasks' && (
          <View style={styles.tasksContent}>
            <View style={styles.tasksHeader}>
              <Text style={styles.tasksTitle}>TASK</Text>
              <View style={styles.tasksActions}>
                <Pressable
                  style={styles.manageButtonBox}
                  onPress={() =>
                    navigation.navigate('ManageTasks', { clientName })
                  }
                >
                  <Text style={styles.manageButtonText}>Manage tasks</Text>
                </Pressable>
                <View style={styles.allDatesBox}>
                  <Text style={styles.allDatesText}>All Dates</Text>
                  <Switch
                    on={showAllDates}
                    onChange={setShowAllDates}
                    size="small"
                  />
                </View>
              </View>
            </View>

            <CollapsibleTableCard sections={tableSections} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  moreButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.StatesFill1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  tabItem: {
    paddingVertical: spacing['Spacing-xl'],
    marginRight: spacing['Spacing-10xl'],
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: colors.TextPrimaryDefault,
  },
  tabText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  activeTabText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  tasksContent: {
    flex: 1,
    paddingTop: spacing['Spacing-5xl'],
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-5xl'],
  },
  tasksTitle: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(14),
    color: colors.TextPrimaryDefault,
  },
  tasksActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  manageButtonBox: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-m'],
    backgroundColor: colors.StatesWhite,
  },
  manageButtonText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  allDatesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-m'],
    backgroundColor: colors.StatesWhite,
  },
  allDatesText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
});
