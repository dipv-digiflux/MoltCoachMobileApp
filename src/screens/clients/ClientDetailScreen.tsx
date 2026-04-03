<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
=======
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { format, parseISO } from 'date-fns';
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ClientProfileHeader,
  CollapsibleTableCard,
  PageHeader,
  QuickActionsBottomSheet,
  Switch,
  TaskDetailsBottomSheet,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchWeeklySummaryThunk,
  fetchUserRelationshipThunk,
} from '@/store/thunks/clientThunks';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { WeeklySummaryDay } from '@/types/api.types';

import { MenuDotsIcon } from './ClientDetailScreen.icons';
<<<<<<< HEAD
import { ClientDetailScreenProps } from './ClientDetailScreen.types';
import { ClientFloatingActions } from './components/ClientFloatingActions';
=======
import { ClientDetailScreenProps, TaskData } from './ClientDetailScreen.types';
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)

export const ClientDetailScreen = ({
  navigation,
  route,
}: ClientDetailScreenProps): React.ReactElement => {
  const insets = useSafeAreaInsets();
<<<<<<< HEAD
  const scrollViewRef = useRef<ScrollView>(null);
  const { clientName, clientId } = route.params;
=======
  const dispatch = useAppDispatch();
  const { clientId, clientName } = route.params;

  const {
    userRelationshipDetail,
    weeklySummary,
    summaryPage,
    summaryTotalPages,
    operations,
  } = useAppSelector(state => state.client);
  const isFetchingSummary = operations.fetchWeeklySummary.status === 'loading';

>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)
  const [activeTab, setActiveTab] = useState('Tasks');
  const [showAllDates, setShowAllDates] = useState(false);
  const [isTaskDetailsVisible, setIsTaskDetailsVisible] = useState(false);
  const [isQuickActionsVisible, setIsQuickActionsVisible] = useState(false);
  const [selectedTaskDate, setSelectedTaskDate] = useState('');
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    if (activeTab === 'Tasks' && !weeklySummary) {
      void dispatch(fetchWeeklySummaryThunk(clientId, 1, 10));
    }
  }, [activeTab, clientId, dispatch, weeklySummary]);

  useEffect(() => {
    if (clientId) {
      void dispatch(fetchUserRelationshipThunk(clientId));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    if (showAllDates && summaryPage < summaryTotalPages) {
      void dispatch(fetchWeeklySummaryThunk(clientId, summaryPage + 1, 10));
    }
  }, [showAllDates, summaryPage, summaryTotalPages, clientId, dispatch]);

  const handlePressValue = (label: string, subLabel: string): void => {
    // Label is "SUN", subLabel is "22 MAR" -> format to "Sun, 22 Mar 2026"
    // We can find the task data from the weeklySummary if needed, or API for daily tasks
    const formattedDate = `${
      label.charAt(0) + label.slice(1).toLowerCase()
    }, ${subLabel} 2026`;
    setSelectedTaskDate(formattedDate);
    setIsTaskDetailsVisible(true);
    // For now keeping empty tasks until the daily API is ready
    setTasks([]);
  };

  const handleToggleTask = (taskName: string): void => {
    setTasks(prev =>
      prev.map(task =>
        task.name === taskName ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const tableSections = useMemo(() => {
    if (!weeklySummary) return [];

    const sections = weeklySummary.weeks.map((week, index) => {
      const startDate = parseISO(week.week_start);
      const endDate = parseISO(week.week_end);

      const totalWeekTasks = week.days.reduce(
        (acc: number, day: WeeklySummaryDay) => acc + day.total_tasks,
        0,
      );
      const completedWeekTasks = week.days.reduce(
        (acc: number, day: WeeklySummaryDay) => acc + day.completed_tasks,
        0,
      );

      return {
        id: `week-${index}-${week.week_start}`,
        period: `Week ${weeklySummary.weeks.length - index}`,
        dateRange: `${format(startDate, 'd')} - ${format(endDate, 'd MMM')}`,
        completion: `${completedWeekTasks}/${totalWeekTasks}`,
        rows: week.days
          .map(day => {
            const d = parseISO(day.date);
            let dayLabel = format(d, 'EEE').toUpperCase();
            if (dayLabel === 'THU') dayLabel = 'THUR';

            return {
              id: day.date,
              label: dayLabel,
              subLabel: format(d, 'd MMM').toUpperCase(),
              value: `${day.completed_tasks}/${day.total_tasks}`,
            };
          })
          .reverse(), // Show latest days first within the week
      };
    });

    if (!showAllDates) {
      // If not "All Dates", maybe just show the latest week
      return sections.slice(0, 1);
    }

    return sections;
  }, [weeklySummary, showAllDates]);

  const tabs = ['Overview', 'Tasks', 'Nutrition', 'Profile'];

<<<<<<< HEAD
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

  const handleScrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleNudge = (): void => {
    navigation.navigate('SendNudge', {
      clientId: clientId,
    });
  };

=======
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)
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
          <Pressable
            style={styles.moreButton}
            onPress={() => setIsQuickActionsVisible(true)}
          >
            <MenuDotsIcon />
          </Pressable>
        }
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + spacing['Spacing-16xl'] * 2,
        }}
      >
        <ClientProfileHeader
          name={
            userRelationshipDetail
              ? `${userRelationshipDetail.customer.first_name} ${userRelationshipDetail.customer.last_name}`.trim()
              : clientName
          }
          status={userRelationshipDetail?.health_status || 'Fat Loss Phase'}
          sessionsInfo={
            userRelationshipDetail?.session_package?.total_sessions
              ? `Sessions: ${userRelationshipDetail.session_package.sessions_left}/${userRelationshipDetail.session_package.total_sessions} • ${userRelationshipDetail.mode} sessions`
              : userRelationshipDetail?.subscription?.number_of_month
              ? `Subscription: ${
                  userRelationshipDetail.subscription.number_of_month
                } months • Starting ${format(
                  parseISO(userRelationshipDetail.subscription.start_date),
                  'dd/MM/yyyy',
                )}`
              : `Sessions: 0/0 • ${
                  userRelationshipDetail?.mode || 'Online'
                } sessions`
          }
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
                    navigation.navigate('ManageTasks', { clientId, clientName })
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

            <CollapsibleTableCard
              sections={tableSections}
              onPressValue={handlePressValue}
              isAllDatesSelected={showAllDates}
            />
            {isFetchingSummary && (
              <ActivityIndicator
                color={colors.MatrixMain}
                style={{ marginTop: spacing['Spacing-xl'] }}
              />
            )}
          </View>
        )}
      </ScrollView>

<<<<<<< HEAD
      <ClientFloatingActions
        onScrollToTop={handleScrollToTop}
        onNudge={handleNudge}
=======
      <QuickActionsBottomSheet
        isVisible={isQuickActionsVisible}
        onClose={() => setIsQuickActionsVisible(false)}
        onChangeFitnessPhase={() => console.log('Change fitness phase')}
        onChangeSessions={() => console.log('Change number of sessions')}
        onDeleteUser={() => console.log('Delete user')}
      />

      <TaskDetailsBottomSheet
        isVisible={isTaskDetailsVisible}
        onClose={() => setIsTaskDetailsVisible(false)}
        date={selectedTaskDate}
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onNudge={() => {
          console.log('Nudge pressed');
          setIsTaskDetailsVisible(false);
        }}
>>>>>>> 481f38a (feat: implement task management system with CRUD and UI components)
      />
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
