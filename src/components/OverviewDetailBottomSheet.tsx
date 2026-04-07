import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MealsImage } from '@/assets/images';
import {
  BottomSheet,
  Button,
  StatusMessage,
  SummaryItem,
  ActivityItem,
  MacroItem,
  StatusDot,
  MealCard,
} from '@/components';
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
          color={colors.AccentBrightGreen}
        />
        <StatusMessage
          status="On Track"
          message={data.onTrackMessage}
          color={colors.AccentBrightGreen}
        />
      </View>
      <View style={styles.subMetricsGrid}>
        <SummaryItem label="Daily average" value={data.dailyAverage} />
        <View style={styles.subMetricDivider} />
        <SummaryItem label="Time" value={data.time} />
        <View style={styles.subMetricDivider} />
        <SummaryItem label="Km" value={data.distance} />
      </View>
    </MetricDetailCard>

    <MetricDetailCard title="Steps calculated from activities" noPadding>
      {data.activities.map(activity => (
        <ActivityItem
          key={activity.id}
          type={activity.type}
          time={activity.time}
          value={activity.duration}
          subValue={`+${activity.steps} steps`}
        />
      ))}
      {data.activitiesSummary && (
        <View style={styles.activitySummaryGrid}>
          <SummaryItem
            label="Total time"
            value={data.activitiesSummary.totalTime}
            valueStyle={styles.summaryValue}
            labelStyle={styles.summaryLabel}
          />
          <View style={styles.subMetricDivider} />
          <SummaryItem
            label="Calories burned"
            value={data.activitiesSummary.caloriesBurned}
            valueStyle={styles.summaryValue}
            labelStyle={styles.summaryLabel}
          />
          <View style={styles.subMetricDivider} />
          <SummaryItem
            label="Steps converted"
            value={data.activitiesSummary.stepsConverted}
            valueStyle={styles.summaryValue}
            labelStyle={styles.summaryLabel}
          />
        </View>
      )}
    </MetricDetailCard>
  </View>
);

const WeightDetailContent = ({
  data,
}: {
  data: WeightDetailData;
}): React.ReactElement => (
  <View style={styles.contentContainer}>
    <MetricDetailCard title="Weight" noPadding>
      <View style={{ paddingHorizontal: spacing['Spacing-xl'] }}>
        <View style={styles.mainMetricRow}>
          <View style={styles.mainMetricValueBlock}>
            <Text style={styles.mainMetricValue}>{data.current}</Text>
            <Text style={styles.mainMetricUnit}>{data.unit}</Text>
          </View>
          <Text style={styles.syncTime}>Updated {data.updatedAt}</Text>
        </View>
        <StatusMessage
          status={data.status}
          message={data.statusMessage}
          color={
            data.status === 'On Track'
              ? colors.MatrixMain
              : colors.AccentOrangeDark
          }
        />
      </View>
      <View style={styles.subMetricsGrid}>
        <SummaryItem label="Target weight" value={data.targetWeight} />
        <View style={styles.subMetricDivider} />
        <SummaryItem label="Started with" value={data.startedWith} />
        <View style={styles.subMetricDivider} />
        <SummaryItem
          label="Avg weekly"
          value={data.avgWeeklyChange}
          valueStyle={{ color: colors.MatrixMain }}
        />
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
    <MetricDetailCard title="Calories Consumed" noPadding>
      <View style={{ paddingHorizontal: spacing['Spacing-xl'] }}>
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
            <MacroItem
              key={idx}
              label={macro.label}
              current={macro.current}
              target={macro.target}
              status={macro.status}
              statusColor={macro.statusColor}
            />
          ))}
        </View>

        <View style={styles.recommendationCard}>
          <StatusDot
            color={colors.MatrixMain}
            size={moderateScale(8)}
            style={{ marginTop: moderateScale(4) }}
          />
          <Text style={styles.recommendationText}>{data.insightMessage}</Text>
        </View>
        <View style={{ height: spacing['Spacing-xl'] }} />
      </View>
    </MetricDetailCard>

    <MetricDetailCard title="Meals" noPadding>
      <View style={{ paddingTop: spacing['Spacing-xl'] }}>
        {data.meals.map((category, idx) => (
          <View key={idx} style={styles.mealCategory}>
            <Text style={styles.mealCategoryTitle}>{category.category}</Text>
            <View style={{ paddingHorizontal: spacing['Spacing-xl'] }}>
              {category.items.map(item => (
                <MealCard
                  key={item.id}
                  name={item.name}
                  kcal={item.kcal}
                  macros={item.macros}
                  image={
                    item.image
                      ? item.image.includes('meals')
                        ? MealsImage
                        : { uri: item.image }
                      : MealsImage
                  }
                  status={item.status || 'Have not logged'}
                  statusType={
                    item.statusColor === 'blue'
                      ? 'logged_molt'
                      : item.statusColor === 'gray'
                      ? 'logged_external'
                      : 'not_logged'
                  }
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </MetricDetailCard>
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
            label="Got It"
            onPress={onClose}
            variant="outline"
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
    paddingVertical: spacing['Spacing-2xl'],
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
    gap: spacing['Spacing-xl'],
  },
  scrollView: {
    paddingHorizontal: spacing['Spacing-m'],
  },
  contentContainer: {
    paddingVertical: spacing['Spacing-2xl'],
  },
  metricsCard: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(2),
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
    gap: spacing['Spacing-m'],
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
    marginBottom: spacing['Spacing-xl'],
  },
  progressBarFill: {
    height: '100%',
    borderRadius: moderateScale(3),
  },

  subMetricsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.StatesOutline,
    backgroundColor: colors.SurfacePrimaryDefault,
    paddingVertical: spacing['Spacing-xl'],
    borderBottomLeftRadius: moderateScale(2),
    borderBottomRightRadius: moderateScale(2),
  },
  subMetricDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.StatesOutline,
    alignSelf: 'center',
  },
  sectionTitle: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDisabled,
    marginTop: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  sectionTitleMain: {
    ...typography.h10SemiBold,
    color: colors.TextPrimaryDefault,
    marginTop: spacing['Spacing-4xl'],
    marginBottom: spacing['Spacing-2xl'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  activityRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  activitySummaryGrid: {
    flexDirection: 'row',
    backgroundColor: colors.SurfacePrimaryDefault,
    paddingVertical: spacing['Spacing-xl'],
    borderTopWidth: 1,
    borderTopColor: colors.StatesOutline,
    borderBottomLeftRadius: moderateScale(2),
    borderBottomRightRadius: moderateScale(2),
  },
  summaryValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  summaryLabel: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
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
    marginBottom: spacing['Spacing-3xl'],
    gap: spacing['Spacing-xl'],
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.SurfacePrimaryDefault,
    padding: spacing['Spacing-xl'],
    borderRadius: moderateScale(2),
    gap: spacing['Spacing-m'],
    borderWidth: 1,
    borderColor: colors.SurfaceSecondaryDisabled,
  },
  recommendationText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
    flex: 1,
  },
  mealStatusText: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextSecondaryDefault,
  },
  mealCategory: {
    marginBottom: spacing['Spacing-xl'],
  },
  mealCategoryTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
    marginBottom: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-xl'],
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
    height: moderateScale(54),
    borderRadius: moderateScale(4),
  },
});
