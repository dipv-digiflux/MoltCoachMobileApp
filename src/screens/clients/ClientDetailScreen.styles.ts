import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStyles = (insetsTop: number) =>
  StyleSheet.create({
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
      color: colors.AccentAmberDark,
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
    nutritionContent: {
      paddingHorizontal: spacing['Spacing-xl'],
      paddingTop: spacing['Spacing-xl'],
    },
    nutritionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing['Spacing-xl'],
    },
    nutritionTitle: {
      ...typography.bodySmall1SemiBold,
      color: colors.PrimaryMain,
    },
    nutritionActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-m'],
    },
    fineTuneButton: {
      paddingHorizontal: spacing['Spacing-xl'],
      paddingVertical: spacing['Spacing-sm'],
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: moderateScale(4),
    },
    fineTuneText: {
      ...typography.bodySmall4Medium,
      color: colors.PrimaryMain,
    },
    nutritionAllDatesBox: {
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
    nutritionAllDatesText: {
      ...typography.bodySmall2Medium,
      color: colors.TextSecondaryDefault,
    },
    weekSection: {
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: moderateScale(2),
      marginBottom: spacing['Spacing-xl'],
      overflow: 'hidden',
    },
    weekHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing['Spacing-xl'],
      backgroundColor: colors.SurfacePrimaryDefault,
    },
    weekLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-m'],
    },
    weekLabel: {
      ...typography.b1SemiBold,
      color: colors.PrimaryMain,
    },
    weekRange: {
      ...typography.bodySmall2Regular,
      color: colors.PrimarySecondary,
    },
    arrowIcon: {
      transform: [{ rotate: '0deg' }],
    },
    arrowRotated: {
      transform: [{ rotate: '180deg' }],
    },
    weekDetail: {
      padding: spacing['Spacing-xl'],
      borderTopWidth: 1,
      borderTopColor: colors.StatesOutline,
    },
    weekKcal: {
      marginBottom: spacing['Spacing-xl'],
    },
    weekKcalMain: {
      ...typography.b1Bold,
      color: colors.PrimaryMain,
    },
    weekKcalSub: {
      ...typography.bodySmall2Regular,
      color: colors.PrimarySecondary,
    },
    weekMacrosRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing['Spacing-xl'],
    },
    weekMacroItem: {
      flex: 1,
    },
    macroLabel: {
      ...typography.bodySmall3Regular,
      color: colors.TextSecondaryDefault,
      marginBottom: spacing['Spacing-xs'],
    },
    macroValue: {
      ...typography.bodySmall1SemiBold,
      color: colors.TextPrimaryDefault,
    },
    macroTarget: {
      ...typography.bodySmall1Regular,
      color: colors.TextSecondaryDefault,
    },
    macroStatusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-xs'],
      marginTop: spacing['Spacing-xs'],
    },
    macroStatusText: {
      ...typography.bodySmall3Medium,
      color: colors.TextSecondaryDefault,
    },
    weekStatusBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-m'],
      backgroundColor: colors.SurfacePrimaryDefault,
      padding: spacing['Spacing-m'],
      borderRadius: moderateScale(2),
    },
    weekStatusText: {
      ...typography.bodySmall2Medium,
      color: colors.PrimaryMain,
    },
    dailyLogCard: {
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: moderateScale(2),
      padding: spacing['Spacing-xl'],
      marginBottom: spacing['Spacing-xl'],
    },
    dailyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing['Spacing-xs'],
    },
    dailyDate: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    dailyDay: {
      ...typography.bodySmall2Bold,
      color: colors.PrimaryMain,
      letterSpacing: 0.5,
    },
    dailyDateText: {
      ...typography.bodySmall2Regular,
      color: colors.PrimaryMain,
      letterSpacing: 0.5,
    },
    dailySummaryText: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: spacing['Spacing-xl'],
    },
    summaryValueMain: {
      ...typography.bodySmall2Medium,
      color: colors.PrimaryMain,
    },
    summaryValueSub: {
      ...typography.bodySmall3Regular,
      color: colors.PrimarySecondary,
    },
    summaryUnit: {
      ...typography.bodySmall3Medium,
      color: colors.PrimarySecondary,
    },
    summaryDot: {
      ...typography.bodySmall2Medium,
      color: colors.StatesOutline,
    },
    mealCarousel: {
      paddingRight: spacing['Spacing-xl'],
    },
    carouselMeal: {
      width: moderateScale(270),
      marginRight: spacing['Spacing-xl'],
      marginBottom: 0,
    },
    statusDot: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
    },
    profileContent: {
      paddingHorizontal: spacing['Spacing-xl'],
      paddingTop: spacing['Spacing-xl'],
    },
    profileStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    profileStatsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    profileStatGridItem: {
      width: '50%',
    },
    nutritionPlanHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-m'],
      marginBottom: spacing['Spacing-xl'],
    },
    nutritionPlanKcal: {
      ...typography.b1Bold,
      color: colors.PrimaryMain,
    },
    healthTagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing['Spacing-l'],
    },
    healthTag: {
      marginBottom: spacing['Spacing-xs'],
    },
    pageHeader: {
      paddingTop: insetsTop + spacing['Spacing-m'],
      paddingBottom: spacing['Spacing-m'],
    },
  });
