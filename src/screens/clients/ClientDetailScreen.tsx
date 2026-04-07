import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowDownIconSvg,
  ArrowRightIconSvg,
  MealsImage,
} from '@/assets/images';
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
  MealCard,
  MealStatusType,
  MacroItem,
  StatusDot,
  CommonCard,
  ProfileStatItem,
  StatusChip,
  AddSessionsModal,
  AdjustGoalModal,
  AdjustBodyMetricsModal,
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
import { colors, moderateScale, spacing } from '@/theme';
import {
  DateWiseTaskItem,
  WeeklySummaryDay,
  WeeklySummaryWeek,
} from '@/types/api.types';


import { MenuDotsIcon } from './ClientDetailScreen.icons';
import { getStyles } from './ClientDetailScreen.styles';
import {
  NutritionDayLog,
} from './ClientDetailScreen.types';
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
  styles,
}: {
  title: string;
  value: string;
  subMetrics?: { label: string; value: string; color: string }[];
  warning?: string;
  styles: ReturnType<typeof getStyles>;
}): React.ReactElement => {
  return (
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
};

const DUMMY_NUTRITION_DATA = {
  week: {
    label: 'Week 22',
    dateRange: '19-24 Mar',
    kcal: '1241/1670 Kcal',
    macros: [
      {
        label: 'PRO',
        current: 32,
        target: 80,
        status: '28g Less',
        statusColor: colors.MatrixMain,
      },
      {
        label: 'CARBS',
        current: 67,
        target: 60,
        status: '+7g excess',
        statusColor: colors.AccentOrangeDark,
      },
      {
        label: 'FAT',
        current: 48,
        target: 60,
        status: 'On track',
        statusColor: colors.MatrixMain,
      },
    ],
    insight: 'On track.',
  },
  dailyLogs: [
    {
      id: 'd1',
      date: 'MON, 20 MAR',
      kcal: 1850,
      kcalTarget: 2000,
      pro: 145,
      proTarget: 150,
      carbs: 180,
      carbsTarget: 200,
      fat: 65,
      fatTarget: 60,
      meals: [
        {
          id: 'm1',
          name: 'Chicken Quinoa Bowl',
          kcal: 1280,
          macros: '42g P • 58g C • 18g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Lunch', '12:30 PM'],
          image: MealsImage,
        },
        {
          id: 'm1_2',
          name: 'Greek Yogurt with Berries',
          kcal: 250,
          macros: '15g P • 20g C • 5g F',
          status: 'Logged External meal',
          statusType: 'logged_external' as MealStatusType,
          tags: ['Snack', '4:30 PM'],
          image: MealsImage,
        },
        {
          id: 'm1_3',
          name: 'Grilled Salmon',
          kcal: 320,
          macros: '35g P • 5g C • 18g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Dinner', '8:00 PM'],
          image: MealsImage,
        },
      ],
    },
    {
      id: 'd2',
      date: 'TUE, 21 MAR',
      kcal: 1150,
      kcalTarget: 1300,
      pro: 105,
      proTarget: 130,
      carbs: 65,
      carbsTarget: 70,
      fat: 22,
      fatTarget: 20,
      meals: [
        {
          id: 'm2',
          name: 'Egg White Omelette',
          kcal: 200,
          macros: '40g P • 5g C • 2g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Breakfast', '8:30 AM'],
          image: MealsImage,
        },
        {
          id: 'm3',
          name: 'Grilled Salmon',
          kcal: 650,
          macros: '45g P • 10g C • 25g F',
          status: 'Logged External meal',
          statusType: 'logged_external' as MealStatusType,
          tags: ['Dinner', '7:00 PM'],
          image: MealsImage,
        },
      ],
    },
    {
      id: 'd3',
      date: 'WED, 22 MAR',
      kcal: 1400,
      kcalTarget: 1300,
      pro: 135,
      proTarget: 130,
      carbs: 80,
      carbsTarget: 70,
      fat: 25,
      fatTarget: 20,
      meals: [
        {
          id: 'm4',
          name: 'Classic Burger',
          kcal: 850,
          macros: '40g P • 45g C • 35g F',
          status: 'Logged External meal',
          statusType: 'logged_external' as MealStatusType,
          tags: ['Lunch', '1:00 PM'],
          image: MealsImage,
        },
        {
          id: 'm4_2',
          name: 'Protein Shake',
          kcal: 150,
          macros: '25g P • 5g C • 2g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Snack', '5:00 PM'],
          image: MealsImage,
        },
      ],
    },
    {
      id: 'd4',
      date: 'THU, 23 MAR',
      kcal: 1600,
      kcalTarget: 1700,
      pro: 120,
      proTarget: 125,
      carbs: 150,
      carbsTarget: 160,
      fat: 45,
      fatTarget: 50,
      meals: [
        {
          id: 'm5',
          name: 'Avocado Toast',
          kcal: 450,
          macros: '10g P • 35g C • 25g F',
          status: 'Logged External meal',
          statusType: 'logged_external' as MealStatusType,
          tags: ['Breakfast', '9:30 AM'],
          image: MealsImage,
        },
        {
          id: 'm6',
          name: 'Steak & Broccoli',
          kcal: 750,
          macros: '55g P • 15g C • 35g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Dinner', '7:30 PM'],
          image: MealsImage,
        },
      ],
    },
    {
      id: 'd5',
      date: 'FRI, 24 MAR',
      kcal: 1450,
      kcalTarget: 1500,
      pro: 110,
      proTarget: 120,
      carbs: 130,
      carbsTarget: 140,
      fat: 35,
      fatTarget: 40,
      meals: [
        {
          id: 'm7',
          name: 'Smoothie Bowl',
          kcal: 350,
          macros: '10g P • 55g C • 8g F',
          status: 'Logged Molt meal',
          statusType: 'logged_molt' as MealStatusType,
          tags: ['Snack', '11:00 AM'],
          image: MealsImage,
        },
      ],
    },
  ],
};

const DUMMY_PROFILE_DATA = {
  sessions: {
    total: '7',
    left: '2',
    type: 'In person',
  },
  goals: {
    primary: 'Fat Loss',
    timeline: '12 Weeks',
    startingWeight: '75.0 kg',
    currentWeight: '71.5 kg',
  },
  metrics: {
    height: '168 cm',
    bodyFat: '28%',
    muscleMass: '45 kg',
    restingHR: '62 bpm',
  },
  nutritionPlan: {
    kcal: '2,450 kcal',
    tag: 'Low carb',
    macros: [
      { label: 'Protein', value: '180g' },
      { label: 'Fat', value: '120g' },
      { label: 'Carb', value: '140g' },
    ],
  },
  activityTargets: {
    steps: '10,000',
    workouts: '4 / Week',
    water: '2.5L',
    sleep: '7-8 hrs',
  },
  health: [
    { label: 'Mild Knee Pain', type: 'warning' as const },
    { label: 'Lactose Intolerant', type: 'warning' as const },
  ],
};

const RECENT_ACTIVITY_DATA = [
  {
    label: 'Nutrition Plan',
    value: 'Weight Loss 1500 kcal',
    previousValue: 'Weight Loss 1800 kcal',
    timestamp: 'Today, 12:40 PM',
  },
  {
    label: 'Total Sessions',
    value: '4 Months',
    previousValue: '3 Months',
    timestamp: 'Yesterday, 10:15 AM',
  },
];

const RECENT_GOAL_ACTIVITY = [
  {
    label: 'Target changed',
    value: '80',
    previousValue: '78',
    timestamp: 'Today, 8:00 AM',
  },
  {
    label: 'Primary goal',
    value: 'Gain muscle',
    previousValue: 'fat loss',
    timestamp: 'Today, 8:00 AM',
  },
];

const RECENT_BODY_METRICS_ACTIVITY = [
  {
    label: 'Body fat',
    value: '28%',
    previousValue: '32%',
    timestamp: 'Today, 8:00 AM',
  },
  {
    label: 'Resting HR',
    value: '62',
    previousValue: '68',
    timestamp: 'Today, 8:00 AM',
  },
];

const ProfileTabContent = ({
  onEditSessions,
  onAdjustGoals,
  onAdjustMetrics,
  styles,
}: {
  onEditSessions: () => void;
  onAdjustGoals: () => void;
  onAdjustMetrics: () => void;
  styles: ReturnType<typeof getStyles>;
}): React.ReactElement => {
  return (
    <View style={styles.profileContent}>
      <CommonCard
        title="Sessions"
        actionText="Edit"
        onActionPress={onEditSessions}
      >
        <View style={styles.profileStatsRow}>
          <ProfileStatItem
            label="Total Session"
            value={DUMMY_PROFILE_DATA.sessions.total}
          />
          <ProfileStatItem
            label="Session left"
            value={DUMMY_PROFILE_DATA.sessions.left}
          />
          <ProfileStatItem
            label="Client type"
            value={DUMMY_PROFILE_DATA.sessions.type}
          />
        </View>
      </CommonCard>

      <CommonCard
        title="Goal & Progress"
        actionText="Adjust"
        onActionPress={onAdjustGoals}
      >
        <View style={styles.profileStatsGrid}>
          <ProfileStatItem
            label="Primary Goal"
            value={DUMMY_PROFILE_DATA.goals.primary}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Target Timeline"
            value={DUMMY_PROFILE_DATA.goals.timeline}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Starting Weight"
            value={DUMMY_PROFILE_DATA.goals.startingWeight}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Current Weight"
            value={DUMMY_PROFILE_DATA.goals.currentWeight}
            containerStyle={styles.profileStatGridItem}
          />
        </View>
      </CommonCard>

      <CommonCard
        title="Body Metrics"
        actionText="Adjust"
        onActionPress={onAdjustMetrics}
      >
        <View style={styles.profileStatsGrid}>
          <ProfileStatItem
            label="Height"
            value={DUMMY_PROFILE_DATA.metrics.height}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Body Fat"
            value={DUMMY_PROFILE_DATA.metrics.bodyFat}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Muscle Mass"
            value={DUMMY_PROFILE_DATA.metrics.muscleMass}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Resting HR"
            value={DUMMY_PROFILE_DATA.metrics.restingHR}
            containerStyle={styles.profileStatGridItem}
          />
        </View>
      </CommonCard>

      <CommonCard
        title="Nutrition Plan"
        actionText="Fine tune"
        onActionPress={() => console.log('Fine tune nutrition')}
      >
        <View style={styles.nutritionPlanHeader}>
          <Text style={styles.nutritionPlanKcal}>
            {DUMMY_PROFILE_DATA.nutritionPlan.kcal}
          </Text>
          <StatusChip
            label={DUMMY_PROFILE_DATA.nutritionPlan.tag}
            type="success"
          />
        </View>
        <View style={styles.profileStatsRow}>
          {DUMMY_PROFILE_DATA.nutritionPlan.macros.map((macro, idx) => (
            <ProfileStatItem
              key={idx}
              label={macro.label}
              value={macro.value}
            />
          ))}
        </View>
      </CommonCard>

      <CommonCard
        title="Activity Targets"
        actionText="Adjust"
        onActionPress={() => console.log('Adjust activity targets')}
      >
        <View style={styles.profileStatsGrid}>
          <ProfileStatItem
            label="Daily Steps"
            value={DUMMY_PROFILE_DATA.activityTargets.steps}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Workouts"
            value={DUMMY_PROFILE_DATA.activityTargets.workouts}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Water Intake"
            value={DUMMY_PROFILE_DATA.activityTargets.water}
            containerStyle={styles.profileStatGridItem}
          />
          <ProfileStatItem
            label="Sleep Target"
            value={DUMMY_PROFILE_DATA.activityTargets.sleep}
            containerStyle={styles.profileStatGridItem}
          />
        </View>
      </CommonCard>

      <CommonCard
        title="Health"
        actionText="Change"
        onActionPress={() => console.log('Change health')}
      >
        <View style={styles.healthTagsRow}>
          {DUMMY_PROFILE_DATA.health.map((h, idx) => (
            <StatusChip
              key={idx}
              label={h.label}
              type={h.type}
              containerStyle={styles.healthTag}
            />
          ))}
        </View>
      </CommonCard>
    </View>
  );
};

const NutritionTabContent = ({
  styles,
}: {
  styles: ReturnType<typeof getStyles>;
}): React.ReactElement => {
  const [isWeekSummaryExpanded, setIsWeekSummaryExpanded] = useState(true);
  const [showAllDates, setShowAllDates] = useState(false);

  const renderMacroSummary = (log: NutritionDayLog): React.ReactElement => {
    const renderMacro = (
      val: number,
      target: number,
      unit: string,
      isLast = false,
    ): React.ReactElement => (
      <React.Fragment key={unit}>
        <Text style={styles.summaryValueMain}>{val}</Text>
        <Text style={styles.summaryValueMain}>/</Text>
        <Text style={styles.summaryValueSub}>
          {target}
          {unit.includes('g') ? 'g' : ''}
        </Text>
        <Text style={styles.summaryUnit}> {unit.replace('g ', '')}</Text>
        {!isLast && <Text style={styles.summaryDot}> • </Text>}
      </React.Fragment>
    );

    return (
      <Text style={styles.dailySummaryText}>
        {renderMacro(log.kcal, log.kcalTarget, 'Kcal')}
        {renderMacro(log.pro, log.proTarget, 'g P')}
        {renderMacro(log.carbs, log.carbsTarget, 'g C')}
        {renderMacro(log.fat, log.fatTarget, 'g F', true)}
      </Text>
    );
  };

  return (
    <View style={styles.nutritionContent}>
      <View style={styles.nutritionHeader}>
        <Text style={styles.nutritionTitle}>Nutrition</Text>
        <View style={styles.nutritionActions}>
          <Pressable style={styles.fineTuneButton}>
            <Text style={styles.fineTuneText}>Find tune</Text>
          </Pressable>
          <View style={styles.nutritionAllDatesBox}>
            <Text style={styles.nutritionAllDatesText}>All Dates</Text>
            <Switch on={showAllDates} onChange={setShowAllDates} size="small" />
          </View>
        </View>
      </View>

      <View style={styles.weekSection}>
        <Pressable
          style={styles.weekHeader}
          onPress={() => setIsWeekSummaryExpanded(!isWeekSummaryExpanded)}
        >
          <View style={styles.weekLabelContainer}>
            <Text style={styles.weekLabel}>
              {DUMMY_NUTRITION_DATA.week.label}
            </Text>
            <Text style={styles.weekRange}>
              {DUMMY_NUTRITION_DATA.week.dateRange}
            </Text>
          </View>
          <View
            style={[
              styles.arrowIcon,
              isWeekSummaryExpanded && styles.arrowRotated,
            ]}
          >
            <ArrowDownIconSvg
              width={moderateScale(12)}
              height={moderateScale(7)}
            />
          </View>
        </Pressable>

        {isWeekSummaryExpanded && (
          <React.Fragment>
            <View style={styles.weekDetail}>
              <Text style={styles.weekKcal}>
                <Text style={styles.weekKcalMain}>
                  {DUMMY_NUTRITION_DATA.week.kcal.split('/')[0]}
                </Text>
                <Text style={styles.weekKcalSub}>
                  /{DUMMY_NUTRITION_DATA.week.kcal.split('/')[1]}
                </Text>
              </Text>
              <View style={styles.weekMacrosRow}>
                {DUMMY_NUTRITION_DATA.week.macros.map(macro => (
                  <MacroItem
                    key={macro.label}
                    label={macro.label}
                    current={macro.current}
                    target={macro.target}
                    status={macro.status}
                    statusColor={macro.statusColor}
                    containerStyle={styles.weekMacroItem}
                  />
                ))}
              </View>
              <View style={styles.weekStatusBox}>
                <StatusDot color={colors.MatrixMain} size={moderateScale(8)} />
                <Text style={styles.weekStatusText}>
                  {DUMMY_NUTRITION_DATA.week.insight}
                </Text>
              </View>
            </View>

            {DUMMY_NUTRITION_DATA.dailyLogs.map(log => (
              <View key={log.id} style={styles.dailyLogCard}>
                <View style={styles.dailyHeader}>
                  <Text style={styles.dailyDate}>
                    <Text style={styles.dailyDay}>
                      {log.date.split(',')[0]},{' '}
                    </Text>
                    <Text style={styles.dailyDateText}>
                      {log.date.split(',')[1]}
                    </Text>
                  </Text>
                  <ArrowRightIconSvg width={16} height={16} />
                </View>
                {renderMacroSummary(log)}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.mealCarousel}
                >
                  {log.meals.map(meal => (
                    <MealCard
                      key={meal.id}
                      {...meal}
                      containerStyle={styles.carouselMeal}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

export const ClientDetailScreen = ({
  navigation,
  route,
}: ClientDetailScreenProps): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const { clientId, clientName } = route.params;
  const styles = useMemo(() => getStyles(insets.top), [insets.top]);

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
  const [isSessionsModalVisible, setIsSessionsModalVisible] = useState(false);
  const [isAdjustGoalModalVisible, setIsAdjustGoalModalVisible] =
    useState(false);
  const [isAdjustBodyMetricsModalVisible, setIsAdjustBodyMetricsModalVisible] =
    useState(false);
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
        changeColor: colors.AccentOrangeDark,
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
        changeColor: colors.AccentOrangeDark,
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
        statusColor: colors.AccentOrangeDark,
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
            statusColor: 'blue',
          },
          {
            id: 'm2',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged External meal',
            statusColor: 'gray',
          },
        ],
      },
      {
        category: 'Main meal',
        items: [
          {
            id: 'm3',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Have not logged',
            statusColor: 'red',
          },
          {
            id: 'm4',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged External meal',
            statusColor: 'gray',
          },
        ],
      },
      {
        category: 'Snacks',
        items: [
          {
            id: 'm5',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged External meal',
            statusColor: 'gray',
          },
        ],
      },
      {
        category: 'Supplement',
        items: [
          {
            id: 'm6',
            name: 'Chicken Quinoa Bowl',
            kcal: 1280,
            macros: '42g P • 58g C • 18g F',
            status: 'Logged External meal',
            statusColor: 'gray',
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
        style={styles.pageHeader}
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
                styles={styles}
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
                styles={styles}
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

        {activeTab === 'Nutrition' && <NutritionTabContent styles={styles} />}
        {activeTab === 'Profile' && (
          <ProfileTabContent
            onEditSessions={() => setIsSessionsModalVisible(true)}
            onAdjustGoals={() => setIsAdjustGoalModalVisible(true)}
            onAdjustMetrics={() => setIsAdjustBodyMetricsModalVisible(true)}
            styles={styles}
          />
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

      <AddSessionsModal
        visible={isSessionsModalVisible}
        onClose={() => setIsSessionsModalVisible(false)}
        onUpdate={values => {
          console.log('Update sessions:', values);
          setIsSessionsModalVisible(false);
        }}
        clientName={clientName}
        recentActivity={RECENT_ACTIVITY_DATA}
        initialValues={{
          mode: 'Online',
          months: DUMMY_PROFILE_DATA.sessions.total,
          startDate: '2024-03-20',
        }}
      />

      <AdjustGoalModal
        visible={isAdjustGoalModalVisible}
        onClose={() => setIsAdjustGoalModalVisible(false)}
        clientName={clientName}
        recentActivity={RECENT_GOAL_ACTIVITY}
        initialValues={{
          primaryGoal: DUMMY_PROFILE_DATA.goals.primary,
          timeline: DUMMY_PROFILE_DATA.goals.timeline.split(' ')[0],
          startingWeight: DUMMY_PROFILE_DATA.goals.startingWeight.split(' ')[0],
          currentWeight: DUMMY_PROFILE_DATA.goals.currentWeight.split(' ')[0],
        }}
        onUpdate={values => {
          console.log('Update goals:', values);
          setIsAdjustGoalModalVisible(false);
        }}
      />

      <AdjustBodyMetricsModal
        visible={isAdjustBodyMetricsModalVisible}
        onClose={() => setIsAdjustBodyMetricsModalVisible(false)}
        onUpdate={values => {
          console.log('Update body metrics:', values);
          setIsAdjustBodyMetricsModalVisible(false);
        }}
        initialValues={{
          height: DUMMY_PROFILE_DATA.metrics.height.replace(' cm', ''),
          bodyFat: DUMMY_PROFILE_DATA.metrics.bodyFat.replace('%', ''),
          muscleMass: DUMMY_PROFILE_DATA.metrics.muscleMass.replace(' kg', ''),
          restingHR: DUMMY_PROFILE_DATA.metrics.restingHR.replace(' bpm', ''),
        }}
        recentActivity={RECENT_BODY_METRICS_ACTIVITY}
      />
    </View>
  );
};
