import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ClientProfileHeader,
  CollapsibleTableCard,
  PageHeader,
  QuickActionsBottomSheet,
  Switch,
  TaskDetailsBottomSheet,
  ChangeFitnessPhaseBottomSheet,
  FitnessPhase,
  OverviewDetailBottomSheet,
} from '@/components';
import {
  TableColumn,
  TableSectionData,
} from '@/components/CollapsibleTableCard.types';
import { OverviewDetailTab } from '@/components/OverviewDetailBottomSheet.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearDateWiseTasks,
  clearWeeklySummary,
} from '@/store/slices/clientSlice';
import { RootState } from '@/store/store';
import {
  fetchWeeklySummaryThunk,
  fetchUserRelationshipThunk,
  fetchDateWiseTaskThunk,
  updateFitnessPhaseThunk,
} from '@/store/thunks/clientThunks';
import { colors, moderateScale, spacing, typography } from '@/theme';
import {
  DateWiseTaskItem,
  WeeklySummaryDay,
  WeeklySummaryWeek,
} from '@/types/api.types';

import { MenuDotsIcon } from './ClientDetailScreen.icons';
import { ClientDetailScreenProps, TaskData } from './ClientDetailScreen.types';
import { ClientFloatingActions } from './components/ClientFloatingActions';

const TASK_COLUMNS: TableColumn[] = [
  { id: 'period', label: 'PERIOD' },
  { id: 'completion', label: 'TASK COMPLETED', width: moderateScale(140) },
];

const ACTIVITIES_COLUMNS: TableColumn[] = [
  { id: 'duration', label: 'DURATION' },
  { id: 'steps', label: 'STEPS', flex: 1 },
  { id: 'weight', label: 'WEIGHT', flex: 1 },
  { id: 'kcal', label: 'KCAL', flex: 1 },
];

const ComplianceCard = ({
  title,
  value,
  subMetrics,
  warning,
}: {
  title: string;
  value: string;
  subMetrics?: { label: string; value: string; color: string }[];
  warning?: string;
}): React.ReactElement => (
  <View style={styles.complianceCard}>
    <Text style={styles.complianceTitle}>{title}</Text>
    <Text style={styles.complianceValue}>{value}</Text>
    {subMetrics ? (
      <View style={styles.subMetricsContainer}>
        {subMetrics.map((sm, index) => (
          <View key={index} style={styles.subMetricItem}>
            <Text style={[styles.subMetricLabel, { color: sm.color }]}>
              {sm.label}:
            </Text>
            <Text style={styles.subMetricValue}>{sm.value}</Text>
          </View>
        ))}
      </View>
    ) : (
      warning && <Text style={styles.complianceWarning}>{warning}</Text>
    )}
  </View>
);

export const ClientDetailScreen = ({
  navigation,
  route,
}: ClientDetailScreenProps): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const { clientId, clientName } = route.params;

  const {
    userRelationshipDetail,
    weeklySummary,
    summaryPage,
    summaryTotalPages,
    operations,
    dateWiseTasks,
  } = useAppSelector((state: RootState) => state.client);
  const isFetchingSummary = operations.fetchWeeklySummary.status === 'loading';
  const isFetchingDateWiseTasks =
    operations.fetchDateWiseTask.status === 'loading';
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAllDates, setShowAllDates] = useState(false);
  const [isTaskDetailsVisible, setIsTaskDetailsVisible] = useState(false);
  const [isQuickActionsVisible, setIsQuickActionsVisible] = useState(false);
  const [isFitnessPhaseVisible, setIsFitnessPhaseVisible] = useState(false);
  const [selectedTaskDate, setSelectedTaskDate] = useState('');
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedDetailTab] = useState<OverviewDetailTab>('Steps');
  const [selectedDetailDate, setSelectedDetailDate] =
    useState('Sun, 22 Mar 2026');

  useEffect(() => {
    if (activeTab === 'Tasks') {
      if (!weeklySummary || weeklySummary.customer_id !== clientId) {
        void dispatch(fetchWeeklySummaryThunk(clientId, 1, 10));
      }
    }
  }, [activeTab, clientId, dispatch, weeklySummary]);

  useEffect(() => {
    if (clientId) {
      void dispatch(fetchUserRelationshipThunk(clientId));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearWeeklySummary());
      dispatch(clearDateWiseTasks());
    };
  }, [dispatch]);

  useEffect(() => {
    if (showAllDates && summaryPage < summaryTotalPages) {
      void dispatch(fetchWeeklySummaryThunk(clientId, summaryPage + 1, 10));
    }
  }, [showAllDates, summaryPage, summaryTotalPages, clientId, dispatch]);

  useEffect(() => {
    if (dateWiseTasks.length > 0) {
      const mappedTasks = dateWiseTasks[0].tasks.map((t: DateWiseTaskItem) => ({
        name: t.task,
        description: t.reminder_time ? `Reminder: ${t.reminder_time}` : '',
        completed: t.status,
      }));
      setTasks(mappedTasks);
    } else {
      setTasks([]);
    }
  }, [dateWiseTasks]);

  const tableSections = useMemo(() => {
    if (!weeklySummary) return [];

    const sections: TableSectionData[] = weeklySummary.weeks.map(
      (week: WeeklySummaryWeek, index: number) => {
        const startDate = format(parseISO(week.week_start), 'dd');
        const endDate = format(parseISO(week.week_end), 'dd MMM');
        const weekSubLabel = `${startDate} - ${endDate}`.toUpperCase();

        const weekTotalCompleted = week.days.reduce(
          (acc, day) => acc + day.completed_tasks,
          0,
        );
        const weekTotalTasks = week.days.reduce(
          (acc, day) => acc + day.total_tasks,
          0,
        );

        return {
          id: `week-${week.week_start}`,
          label: `WEEK ${weeklySummary.totalPages - index}`,
          subLabel: weekSubLabel,
          values: [`${weekTotalCompleted}/${weekTotalTasks}`],
          rows: week.days.map((day: WeeklySummaryDay) => {
            const dayName = format(parseISO(day.date), 'EEE').toUpperCase();
            const dayDate = format(parseISO(day.date), 'dd MMM').toUpperCase();
            return {
              id: day.date,
              label: dayName,
              subLabel: dayDate,
              values: [`${day.completed_tasks}/${day.total_tasks}`],
            };
          }),
        };
      },
    );

    return sections;
  }, [weeklySummary]);

  const handlePressValue = (
    id: string,
    colId: string,
    value: string,
    rowLabel: string,
  ): void => {
    const formattedDate = `${
      rowLabel.charAt(0) + rowLabel.slice(1).toLowerCase()
    }, ${id.split('-').slice(1).reverse().join(' ')} 2026`; // Rough date formatting from ID (assuming YYYY-MM-DD)
    setSelectedTaskDate(formattedDate);
    setIsTaskDetailsVisible(true);

    dispatch(clearDateWiseTasks());
    void dispatch(fetchDateWiseTaskThunk(clientId, id));
  };

  const handlePressRow = (id: string, label: string): void => {
    setSelectedDetailDate(`${label} MAR 2026`);
    setIsDetailVisible(true);
  };

  const handleToggleTask = (taskName: string): void => {
    setTasks(prev =>
      prev.map(task =>
        task.name === taskName ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const DUMMY_STEPS_DATA = {
    current: 1271,
    target: 10000,
    lastSynced: '9:40 pm',
    onTrackMessage: 'On Track : Walk 10 minutes after lunch (+14%)',
    dailyAverage: '9,000',
    time: '1h 40m',
    distance: '24km',
    activities: [
      {
        id: '1',
        type: 'Running',
        time: 'Today, 8:00 AM',
        duration: '45 min',
        steps: '5.4k',
      },
      {
        id: '2',
        type: 'Swimming',
        time: 'Yesterday, 8:00 AM',
        duration: '65 min',
        steps: '5.4k',
      },
    ],
    activitiesSummary: {
      totalTime: '1h 20m',
      caloriesBurned: '2,450',
      stepsConverted: '18,000',
    },
  };

  const DUMMY_WEIGHT_DATA = {
    current: 79.0,
    unit: 'Kg',
    updatedAt: '2 days ago',
    status: 'Off Track' as const,
    statusMessage: 'Update your weight to track results',
    targetWeight: '68kg',
    startedWith: '82kg',
    avgWeeklyChange: '-0.3kg',
    logs: [
      {
        id: '1',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.5 kg',
        change: '-0.3',
        changeColor: colors.MatrixMain,
      },
      {
        id: '2',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.7 kg',
        change: '-0.2',
        changeColor: colors.MatrixMain,
      },
      {
        id: '3',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.7 kg',
        change: '+0.4',
        changeColor: '#EA580C',
      },
      {
        id: '4',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.5 kg',
        change: '-0.3',
        changeColor: colors.MatrixMain,
      },
      {
        id: '5',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.7 kg',
        change: '+0.2',
        changeColor: '#EA580C',
      },
      {
        id: '6',
        date: 'Mon 19 mar',
        time: '7:14 am',
        value: '71.7 kg',
        change: '-0.2',
        changeColor: colors.MatrixMain,
      },
      {
        id: '7',
        date: 'Mon 19 mar',
        time: '-',
        value: 'No logged',
        change: '',
        changeColor: '',
      },
    ],
  };

  const DUMMY_KCAL_DATA = {
    consumed: 1241,
    target: 1670,
    left: 123,
    lastSynced: '9:40 pm',
    macros: [
      {
        label: 'Pro',
        current: 32,
        target: 80,
        status: 'Need +28g',
        statusColor: colors.MatrixMain,
        statusMessage: 'Need more protein',
      },
      {
        label: 'Carbs',
        current: 67,
        target: 60,
        status: '+7g excess',
        statusColor: '#EA580C',
        statusMessage: 'Limit carbs',
      },
      {
        label: 'Fat',
        current: 48,
        target: 60,
        status: 'On track',
        statusColor: colors.MatrixMain,
        statusMessage: 'Good fat intake',
      },
    ],
    insightMessage:
      'They need to do 10 minute walk or increase protein to your dinner',
    meals: [
      {
        category: 'Breakfast',
        items: [
          {
            id: 'm1',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged Molt meal',
          },
          {
            id: 'm2',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged External meal',
          },
        ],
      },
    ],
  };

  const ACTIVITIES_SECTIONS: TableSectionData[] = [
    {
      id: 'week-22',
      label: 'WEEK 22',
      subLabel: '19 - 22 Mar',
      values: ['10,245', '71.5 KG', '2,100'],
      rows: [
        {
          id: 'mon-19',
          label: 'Mon',
          subLabel: '19 Mar',
          values: ['10,245', '71.5 KG', '2,100'],
        },
        {
          id: 'sun-18',
          label: 'Sun',
          subLabel: '18 Mar',
          values: ['10,245', '71.5 KG', '2,100'],
        },
      ],
    },
  ];

  const tabs = ['Overview', 'Tasks', 'Nutrition', 'Profile'];

  const handleScrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleNudge = (): void => {
    navigation.navigate('SendNudge', {
      clientId: clientId,
    });
  };

  const handleUpdateFitnessPhase = (phase: FitnessPhase): void => {
    if (userRelationshipDetail?._id && clientId) {
      void dispatch(
        updateFitnessPhaseThunk(userRelationshipDetail._id, clientId, phase),
      );
    }
  };

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
              : userRelationshipDetail?.subscription?.number_of_month &&
                userRelationshipDetail?.subscription?.start_date
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

        {activeTab === 'Overview' && (
          <View style={styles.overviewContent}>
            <View style={styles.complianceCardsRow}>
              <ComplianceCard
                title="Plan Compliance"
                value="78%"
                subMetrics={[
                  {
                    label: 'Steps',
                    value: '82%',
                    color: colors.MatrixMain,
                  },
                  { label: 'Food', value: '74%', color: colors.MatrixMain },
                  {
                    label: 'Data sync',
                    value: '88%',
                    color: colors.MatrixMain,
                  },
                ]}
              />
              <ComplianceCard
                title="Goal Velocity"
                value="74%"
                warning="Needs review"
              />
            </View>

            <View style={styles.tasksHeader}>
              <Text style={styles.tasksTitle}>Activities</Text>
              <View style={styles.tasksActions}>
                <Pressable
                  style={styles.manageButtonBox}
                  onPress={() =>
                    navigation.navigate('ManageData', { clientId, clientName })
                  }
                >
                  <Text style={styles.manageButtonText}>Manage data</Text>
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
              columns={ACTIVITIES_COLUMNS}
              sections={ACTIVITIES_SECTIONS}
              onPressRow={handlePressRow}
              isAllDatesSelected={showAllDates}
            />
          </View>
        )}

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
              columns={TASK_COLUMNS}
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

      <ClientFloatingActions
        onScrollToTop={handleScrollToTop}
        onNudge={handleNudge}
      />

      <QuickActionsBottomSheet
        isVisible={isQuickActionsVisible}
        onClose={() => setIsQuickActionsVisible(false)}
        onChangeFitnessPhase={() => setIsFitnessPhaseVisible(true)}
        onChangeSessions={() => console.log('Change number of sessions')}
        onDeleteUser={() => console.log('Delete user')}
      />

      <TaskDetailsBottomSheet
        isVisible={isTaskDetailsVisible}
        onClose={() => setIsTaskDetailsVisible(false)}
        isLoading={isFetchingDateWiseTasks}
        date={selectedTaskDate}
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onNudge={() => {
          console.log('Nudge pressed');
          setIsTaskDetailsVisible(false);
        }}
      />

      <ChangeFitnessPhaseBottomSheet
        isVisible={isFitnessPhaseVisible}
        onClose={() => setIsFitnessPhaseVisible(false)}
        currentPhase={userRelationshipDetail?.health_status as FitnessPhase}
        onUpdate={handleUpdateFitnessPhase}
      />

      <OverviewDetailBottomSheet
        isVisible={isDetailVisible}
        onClose={() => setIsDetailVisible(false)}
        date={selectedDetailDate}
        initialTab={selectedDetailTab}
        stepsData={DUMMY_STEPS_DATA}
        weightData={DUMMY_WEIGHT_DATA}
        caloriesData={DUMMY_KCAL_DATA}
        onNudge={() => {}}
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
    color: colors.TextSecondaryDefault,
  },
  complianceCard: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-xl'],
    minHeight: moderateScale(110),
  },
  complianceTitle: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-xs'],
  },
  complianceValue: {
    ...typography.h2SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-m'],
  },
  subMetricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing['Spacing-sm'],
  },
  subMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-sm'],
  },
  subMetricLabel: {
    ...typography.bodySmall3SemiBold,
  },
  subMetricValue: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextSecondaryDefault,
  },
  complianceWarning: {
    ...typography.bodySmall2Medium,
    color: colors.AccentGoldenDark || '#D97706',
  },
  overviewContent: {
    paddingTop: spacing['Spacing-xl'],
  },
  complianceCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-3xl'],
  },
  activitiesHeader: {
    marginBottom: spacing['Spacing-xl'],
  },
});
