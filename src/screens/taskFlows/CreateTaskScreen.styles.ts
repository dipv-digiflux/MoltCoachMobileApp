import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.StatesWhite,
    },
    scrollContent: {
      paddingHorizontal: spacing['Spacing-5xl'],
      paddingTop: spacing['Spacing-5xl'],
      gap: spacing['Spacing-10xl'],
    },
    section: {
      gap: spacing['Spacing-xl'],
    },
    label: {
      ...typography.b1SemiBold,
      color: colors.TextPrimaryDefault,
    },
    textArea: {
      minHeight: moderateScale(100),
    },
    suggestions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing['Spacing-l'],
      marginTop: spacing['Spacing-xs'],
    },
    suggestionPill: {
      paddingHorizontal: spacing['Spacing-xl'],
      paddingVertical: spacing['Spacing-m'],
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderRadius: moderateScale(4),
    },
    suggestionText: {
      ...typography.bodySmall2Regular,
      color: colors.TextSecondaryDefault,
    },
    typeToggle: {
      flexDirection: 'row',
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderRadius: moderateScale(8),
      padding: spacing['Spacing-xs'],
    },
    typeButton: {
      flex: 1,
      paddingVertical: spacing['Spacing-xl'],
      alignItems: 'center',
      borderRadius: moderateScale(6),
    },
    typeButtonActive: {
      backgroundColor: colors.StatesWhite,
      shadowColor: colors.ShadowDefault,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    typeButtonText: {
      ...typography.bodySmall2Medium,
      color: colors.TextSecondaryDefault,
    },
    typeButtonTextActive: {
      color: colors.TextPrimaryDefault,
    },
    card: {
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: moderateScale(4),
      padding: spacing['Spacing-5xl'],
      gap: spacing['Spacing-xl'],
    },
    cardTitle: {
      ...typography.b1SemiBold,
      color: colors.TextPrimaryDefault,
    },
    cardSubtitle: {
      ...typography.bodySmall1Regular,
      color: colors.TextSecondaryHover,
    },
    frequencyTabs: {
      flexDirection: 'row',
      backgroundColor: colors.SurfaceSecondaryDefault,
      padding: spacing['Spacing-xs'],
      borderRadius: moderateScale(4),
      gap: spacing['Spacing-xs'],
    },
    frequencyInputWrapper: {
      marginTop: spacing['Spacing-xl'],
      gap: spacing['Spacing-xl'],
    },
    frequencyInputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: moderateScale(4),
      paddingHorizontal: spacing['Spacing-xl'],
      paddingVertical: spacing['Spacing-3xl'],
      backgroundColor: colors.StatesWhite,
    },
    frequencyInputText: {
      ...typography.bodySmall1Medium,
      color: colors.TextSecondaryDefault,
    },
    oneTimeDateContainer: {
      marginTop: spacing['Spacing-xl'],
      gap: spacing['Spacing-m'],
    },
    oneTimeHelperText: {
      ...typography.bodySmall2Regular,
      color: colors.AccentBlueDark,
    },
    freqButton: {
      flex: 1,
      paddingVertical: spacing['Spacing-xl'],
      alignItems: 'center',
      borderRadius: moderateScale(4),
    },
    freqButtonActive: {
      backgroundColor: colors.StatesWhite,
      shadowColor: colors.ShadowDefault,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.StatesOutline,
    },
    freqButtonText: {
      ...typography.bodySmall2Regular,
      color: colors.TextSecondaryDefault,
    },
    freqButtonTextActive: {
      ...typography.bodySmall2Medium,
      color: colors.TextPrimaryDefault,
    },
    weeklyDaysSection: {
      gap: spacing['Spacing-xl'],
      marginTop: spacing['Spacing-xl'],
    },
    daySelectorRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dayBubble: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(4),
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.StatesWhite,
    },
    dayBubbleSelected: {
      backgroundColor: colors.PrimaryMain,
      borderColor: colors.PrimaryMain,
    },
    dayBubbleError: {
      borderColor: colors.FeedbackWarningBorder,
    },
    dayLabel: {
      ...typography.bodySmall2Medium,
      color: colors.TextSecondaryDefault,
    },
    dayLabelSelected: {
      color: colors.StatesWhite,
    },
    errorText: {
      ...typography.bodySmall3Medium,
      color: colors.FeedbackWarningText,
      marginTop: spacing['Spacing-xs'],
    },
    repeatSummaryText: {
      ...typography.bodySmall2Medium,
      color: colors.TextPrimaryDefault,
    },
    repeatSummaryDays: {
      color: colors.TextSecondaryHover,
      ...typography.bodySmall2Regular,
    },
    reminderCard: {
      gap: spacing['Spacing-5xl'],
    },
    reminderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timePickerContainer: {
      alignItems: 'center',
      gap: spacing['Spacing-m'],
      marginTop: spacing['Spacing-xl'],
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-8xl'],
      width: moderateScale(160),
      justifyContent: 'center',
    },
    timeRowActive: {
      paddingVertical: spacing['Spacing-xs'],
    },
    timeTextActive: {
      ...typography.b1Medium,
      color: colors.TextPrimaryDefault,
      width: moderateScale(30),
      textAlign: 'center',
    },
    timeTextFaded: {
      ...typography.b1Medium,
      color: colors.TextSecondaryDisabled,
      width: moderateScale(30),
      textAlign: 'center',
      opacity: 0.3,
    },
    periodPlaceholder: {
      width: moderateScale(30),
    },
    summaryCard: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderRadius: moderateScale(8),
      padding: spacing['Spacing-5xl'],
      gap: spacing['Spacing-xl'],
    },
    summaryTitle: {
      ...typography.bodySmall1SemiBold,
      color: colors.TextSecondaryDefault,
      marginBottom: spacing['Spacing-xs'],
    },
    summaryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['Spacing-xl'],
    },
    summaryText: {
      ...typography.bodySmall1Medium,
      color: colors.TextPrimaryDefault,
    },
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
