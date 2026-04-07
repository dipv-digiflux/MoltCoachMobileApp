import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-3xl'],
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    paddingTop: spacing['Spacing-4xl'],
    marginBottom: spacing['Spacing-4xl'],
  },
  addMoreCard: {
    borderColor: colors.TagSuccessSurface,
  },
  sectionLabel: {
    ...typography.bodySmall2Medium,
    color: colors.BorderSecondaryHover,
    paddingHorizontal: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-2xl'],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-4xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
  },
  itemText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  itemTextOnly: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  actionButton: {
    padding: spacing['Spacing-xs'],
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
  },
});
