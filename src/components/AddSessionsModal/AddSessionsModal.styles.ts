import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export default StyleSheet.create({
  tabsContainer: {
    marginVertical: spacing['Spacing-xl'],
  },
  tabs: {
    marginHorizontal: 0,
  },
  formContainer: {
    marginBottom: spacing['Spacing-7xl'],
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-3xl'],
    gap: spacing['Spacing-4xl'],
  },
  fieldsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
  },
  fieldWrap: {
    flex: 1,
  },
  recentActivityContainer: {
    marginTop: spacing['Spacing-3xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-10xl'],
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  recentActivityTitle: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-xl'],
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  lastActivityItem: {
    borderBottomWidth: 0,
  },
  activityMain: {
    flex: 1,
    gap: spacing['Spacing-xs'],
  },
  activityLabel: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activityTimestamp: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  activityRight: {
    alignItems: 'flex-end',
    gap: spacing['Spacing-xs'],
  },
  activityValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activityPrevious: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  updateButton: {
    backgroundColor: colors.PrimaryMain,
    borderRadius: moderateScale(4),
  },
  rightIconContainer: {
    marginRight: spacing['Spacing-2xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
