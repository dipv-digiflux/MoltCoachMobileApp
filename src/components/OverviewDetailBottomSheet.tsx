import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { InfoIconSvg, CheckCircleIconSvg } from '@/assets/images';
import { BottomSheet, Button } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';

import {
  CaloriesDetailData,
  OverviewDetailBottomSheetProps,
  OverviewDetailTab,
  StepsDetailData,
  WeightDetailData,
} from './OverviewDetailBottomSheet.types';

const ProgressBar = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}): React.ReactElement => (
  <View style={styles.progressBarBg}>
    <View
      style={[
        styles.progressBarFill,
        { width: `${Math.min(progress, 100)}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const MetricDetailCard = ({
  title,
  syncTime,
  children,
  noPadding = false,
}: {
  title: string;
  syncTime?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}): React.ReactElement => (
  <View style={[styles.metricsCard, noPadding && { padding: 0 }]}>
    <View
      style={[
        styles.cardHeader,
        noPadding && {
          paddingHorizontal: spacing['Spacing-xl'],
          paddingTop: spacing['Spacing-xl'],
        },
      ]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      {syncTime && (
        <Text style={styles.cardSyncTime}>Last synced at {syncTime}</Text>
      )}
    </View>
    {children}
  </View>
);

const StepsDetailContent = ({
  data,
}: {
  data: StepsDetailData;
}): React.ReactElement => (
  <View style={styles.contentContainer}>
    <MetricDetailCard title="Steps" syncTime={data.lastSynced} noPadding>
      <View style={{ paddingHorizontal: spacing['Spacing-xl'] }}>
        <View style={styles.mainMetricRow}>
          <View style={styles.mainMetricValueBlock}>
            <Text style={styles.mainMetricValue}>{data.current}</Text>
            <Text style={styles.mainMetricPercentage}>
              {Math.round((data.current / data.target) * 100)}%
            </Text>
          </View>
          <Text style={styles.targetText}>Target: {data.target} steps</Text>
        </View>
        <ProgressBar
          progress={(data.current / data.target) * 100}
          color="#22C55E"
        />
        <View style={styles.statusMessageRow}>
          <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
          <Text style={styles.statusMessage}>
            On Track :{' '}
            <Text style={styles.statusMessageSub}>{data.onTrackMessage}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.subMetricsGrid}>
        <View style={styles.subMetricItem}>
          <Text style={styles.subMetricValue}>{data.dailyAverage}</Text>
          <Text style={styles.subMetricLabel}>Daily average</Text>
        </View>
        <View style={styles.subMetricDivider} />
        <View style={styles.subMetricItem}>
          <Text style={styles.subMetricValue}>{data.time}</Text>
          <Text style={styles.subMetricLabel}>Time</Text>
        </View>
        <View style={styles.subMetricDivider} />
        <View style={styles.subMetricItem}>
          <Text style={styles.subMetricValue}>{data.distance}</Text>
          <Text style={styles.subMetricLabel}>Km</Text>
        </View>
      </View>
    </MetricDetailCard>

    <View style={styles.activitiesCard}>
      <Text style={styles.sectionTitle}>Steps calculated from activities</Text>
      {data.activities.map(activity => (
        <View key={activity.id} style={styles.activityRow}>
          <View style={styles.activityInfo}>
            <Text style={styles.activityType}>{activity.type}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
          <View style={styles.activityValueBlock}>
            <Text style={styles.activityValue}>{activity.duration}</Text>
            <Text style={styles.activitySubValue}>+{activity.steps} steps</Text>
          </View>
        </View>
      ))}
      {data.activitiesSummary && (
        <View style={styles.activitySummaryGrid}>
          <View style={styles.subMetricItem}>
            <Text style={styles.subMetricValue}>
              {data.activitiesSummary.totalTime}
            </Text>
            <Text style={styles.subMetricLabel}>Total time</Text>
          </View>
          <View style={styles.subMetricDivider} />
          <View style={styles.subMetricItem}>
            <Text style={styles.subMetricValue}>
              {data.activitiesSummary.caloriesBurned}
            </Text>
            <Text style={styles.subMetricLabel}>Calories burned</Text>
          </View>
          <View style={styles.subMetricDivider} />
          <View style={styles.subMetricItem}>
            <Text style={styles.subMetricValue}>
              {data.activitiesSummary.stepsConverted}
            </Text>
            <Text style={styles.subMetricLabel}>Steps converted</Text>
          </View>
        </View>
      )}
    </View>
  </View>
);

const WeightDetailContent = ({
  data,
}: {
  data: WeightDetailData;
}): React.ReactElement => (
  <View style={styles.contentContainer}>
    <MetricDetailCard title="Body Weight">
      <View style={styles.mainMetricRow}>
        <View style={styles.mainMetricValueBlock}>
          <Text style={styles.mainMetricValue}>{data.current}</Text>
          <Text style={styles.mainMetricUnit}>{data.unit}</Text>
        </View>
        <Text style={styles.syncTime}>Updated {data.updatedAt}</Text>
      </View>
      <View style={styles.statusMessageRow}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor:
                data.status === 'On Track' ? colors.MatrixMain : '#EA580C',
            },
          ]}
        />
        <Text style={styles.statusMessage}>
          <Text style={{ fontWeight: 'bold' }}>{data.status}</Text> :{' '}
          {data.statusMessage}
        </Text>
      </View>
      <View style={styles.subMetricsGrid}>
        <View style={styles.subMetricItem}>
          <Text style={styles.subMetricValue}>{data.targetWeight}</Text>
          <Text style={styles.subMetricLabel}>Target weight</Text>
        </View>
        <View style={styles.subMetricDivider} />
        <View style={styles.subMetricItem}>
          <Text style={styles.subMetricValue}>{data.startedWith}</Text>
          <Text style={styles.subMetricLabel}>Started with</Text>
        </View>
        <View style={styles.subMetricDivider} />
        <View style={styles.subMetricItem}>
          <Text style={[styles.subMetricValue, { color: colors.MatrixMain }]}>
            {data.avgWeeklyChange}
          </Text>
          <Text style={styles.subMetricLabel}>Avg weekly</Text>
        </View>
      </View>
    </MetricDetailCard>

    <Text style={styles.sectionTitle}>Daily logs for the week</Text>
    {data.logs.map(log => (
      <View key={log.id} style={styles.logRow}>
        <View style={styles.logInfo}>
          <Text style={styles.logDate}>{log.date}</Text>
          <Text style={styles.logTime}>{log.time}</Text>
        </View>
        {log.value === 'No logged' ? (
          <Text style={styles.noLoggedText}>{log.value}</Text>
        ) : (
          <View style={styles.logValuesContainer}>
            <Text style={styles.logValue}>{log.value}</Text>
            <Text style={[styles.logChange, { color: log.changeColor }]}>
              {log.change}
            </Text>
          </View>
        )}
      </View>
    ))}
  </View>
);

const CaloriesDetailContent = ({
  data,
}: {
  data: CaloriesDetailData;
}): React.ReactElement => (
  <View style={styles.contentContainer}>
    <MetricDetailCard title="Calories Consumed">
      <View style={styles.mainMetricRow}>
        <View style={styles.mainMetricValueBlock}>
          <Text style={styles.mainMetricValue}>{data.consumed}</Text>
          <Text style={styles.mainMetricUnit}>Kcal</Text>
        </View>
        <Text style={styles.kcalInfoText}>
          {data.target} Kcal target • {data.left} kcal left
        </Text>
      </View>
      <ProgressBar
        progress={(data.consumed / data.target) * 100}
        color={colors.MatrixMain}
      />

      <View style={styles.macrosContainer}>
        {data.macros.map((macro, idx) => (
          <View key={idx} style={styles.macroItem}>
            <Text style={styles.macroLabel}>{macro.label}</Text>
            <Text style={styles.macroValue}>
              {macro.current}
              <Text style={styles.macroTarget}>/{macro.target}g</Text>
            </Text>
            <View style={styles.macroStatusRow}>
              <View
                style={[
                  styles.statusDotSmall,
                  { backgroundColor: macro.statusColor },
                ]}
              />
              <Text style={[styles.macroStatus, { color: macro.statusColor }]}>
                {macro.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.insightBox}>
        <InfoIconSvg width={moderateScale(14)} height={moderateScale(14)} />
        <Text style={styles.insightText}>{data.insightMessage}</Text>
      </View>
    </MetricDetailCard>

    <Text style={styles.sectionTitle}>Meals</Text>
    {data.meals.map((category, idx) => (
      <View key={idx} style={styles.mealCategory}>
        <Text style={styles.mealCategoryTitle}>{category.category}</Text>
        {category.items.map(item => (
          <View key={item.id} style={styles.mealItem}>
            <View style={styles.mealThumb} />
            <View style={styles.mealDetails}>
              <Text style={styles.mealName}>{item.name}</Text>
              <Text style={styles.mealMacros}>
                {item.kcal} Kcal • {item.macros}
              </Text>
              {item.status && (
                <View style={styles.mealStatusBadge}>
                  <CheckCircleIconSvg width={14} height={14} color="#0284C7" />
                  <Text style={styles.mealStatusText}>{item.status}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    ))}
  </View>
);

export const OverviewDetailBottomSheet = ({
  isVisible,
  onClose,
  date,
  initialTab = 'Steps',
  stepsData,
  weightData,
  caloriesData,
  onNudge,
}: OverviewDetailBottomSheetProps): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<OverviewDetailTab>(initialTab);

  const tabs: OverviewDetailTab[] = ['Steps', 'Kcal', 'Weight'];

  return (
    <BottomSheet visible={isVisible} onClose={onClose} variant="default">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{activeTab} detail</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.tabBar}>
          {tabs.map(tab => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabItem,
                activeTab === tab && styles.activeTabItem,
              ]}
            >
              <View style={styles.tabItemContent}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {activeTab === 'Steps' && <StepsDetailContent data={stepsData} />}
          {activeTab === 'Weight' && <WeightDetailContent data={weightData} />}
          {activeTab === 'Kcal' && (
            <CaloriesDetailContent data={caloriesData} />
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label="Got it"
            onPress={onClose}
            variant="secondary"
            style={styles.footerButton}
          />
          <Button
            label="Nudge"
            onPress={onNudge}
            variant="primary"
            style={styles.footerButton}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing['Spacing-xl'],
    maxHeight: moderateScale(600),
  },
  header: {
    paddingHorizontal: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-2xl'],
  },
  title: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
  },
  date: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginTop: moderateScale(2),
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  tabItem: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: colors.TextPrimaryDefault,
  },
  tabText: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDefault,
  },
  activeTabText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  tabItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  scrollView: {
    paddingHorizontal: spacing['Spacing-2xl'],
  },
  contentContainer: {
    paddingVertical: spacing['Spacing-2xl'],
  },
  metricsCard: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(8),
    padding: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-3xl'],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['Spacing-m'],
  },
  cardTitle: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  cardSyncTime: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  mainMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing['Spacing-3xl'],
  },
  mainMetricValueBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing['Spacing-xs'],
  },
  mainMetricValue: {
    ...typography.b1Bold,
    color: colors.TextPrimaryDefault,
  },
  mainMetricPercentage: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginLeft: spacing['Spacing-m'],
  },
  mainMetricUnit: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  targetText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  kcalInfoText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  progressBarBg: {
    height: moderateScale(6),
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(3),
    marginBottom: spacing['Spacing-3xl'],
  },
  progressBarFill: {
    height: '100%',
    borderRadius: moderateScale(3),
  },
  statusMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.StatesFill1,
    padding: spacing['Spacing-m'],
    borderRadius: moderateScale(4),
    marginBottom: spacing['Spacing-xl'],
    gap: spacing['Spacing-m'],
  },
  statusDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
  },
  statusMessage: {
    ...typography.bodySmall3Medium,
    color: colors.TextPrimaryDefault,
  },
  statusMessageSub: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  subMetricsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.StatesOutline,
    backgroundColor: '#F8FAFC',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  subMetricItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subMetricValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  subMetricLabel: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  subMetricDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.StatesOutline,
    alignSelf: 'center',
  },
  activitiesCard: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(8),
    paddingVertical: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-3xl'],
  },
  sectionTitle: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    paddingHorizontal: spacing['Spacing-xl'],
  },
  activityInfo: {
    gap: spacing['Spacing-xs'],
  },
  activityType: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activityTime: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  activityValueBlock: {
    alignItems: 'flex-end',
    gap: spacing['Spacing-xs'],
  },
  activityValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activitySubValue: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextSecondaryDefault,
  },
  activitySummaryGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: spacing['Spacing-xl'],
    marginTop: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    marginHorizontal: spacing['Spacing-xl'],
  },
  syncTime: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    paddingHorizontal: spacing['Spacing-xl'],
  },
  logInfo: {
    gap: spacing['Spacing-xs'],
  },
  logDate: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  logTime: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  logValuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
  },
  logValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    minWidth: moderateScale(60),
    textAlign: 'right',
  },
  logChange: {
    ...typography.bodySmall1SemiBold,
    minWidth: moderateScale(40),
    textAlign: 'right',
  },
  noLoggedText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing['Spacing-xl'],
  },
  macroItem: {
    flex: 1,
  },
  macroLabel: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
    textTransform: 'uppercase',
  },
  macroValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  macroTarget: {
    color: colors.TextSecondaryDefault,
  },
  macroStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xs'],
    marginTop: spacing['Spacing-xs'],
  },
  statusDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  macroStatus: {
    ...typography.bodySmall3SemiBold,
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: spacing['Spacing-m'],
    borderRadius: moderateScale(4),
    gap: spacing['Spacing-m'],
  },
  insightText: {
    ...typography.bodySmall3Medium,
    color: colors.TextPrimaryDefault,
    flex: 1,
  },
  mealCategory: {
    marginBottom: spacing['Spacing-3xl'],
  },
  mealCategoryTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  mealItem: {
    flexDirection: 'row',
    marginBottom: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  mealThumb: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(4),
  },
  mealDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing['Spacing-m'],
  },
  mealName: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  mealMacros: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  mealStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: spacing['Spacing-sm'],
    borderRadius: moderateScale(10),
    gap: spacing['Spacing-m'],
    marginTop: spacing['Spacing-sm'],
  },
  mealStatusText: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextSecondaryDefault,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
    borderTopWidth: 1,
    borderTopColor: colors.StatesOutline,
  },
  footerButton: {
    flex: 1,
    borderRadius: moderateScale(4),
  },
});
